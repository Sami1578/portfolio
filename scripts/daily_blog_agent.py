import os
import sys
import random
import re
import requests
import json
from openai import OpenAI

# Load Environment Variables
# Gemini API via Google's OpenAI-compatible endpoint.
# The model is selected below in the chat completion request.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
BLOG_API_URL = os.getenv("BLOG_API_URL")
BLOG_AUTOMATION_KEY = os.getenv("BLOG_AUTOMATION_KEY")


def check_required_env():
    """
    Fail loudly and immediately if required secrets are missing, instead of
    letting the script proceed with None values that produce confusing
    downstream errors (or, worse, silently-wrong requests).
    """
    required = {
        "GEMINI_API_KEY": GEMINI_API_KEY,
        "BLOG_API_URL": BLOG_API_URL,
        "BLOG_AUTOMATION_KEY": BLOG_AUTOMATION_KEY,
    }
    missing = [name for name, val in required.items() if not val]
    if missing:
        print(f"FATAL: missing required environment variable(s): {', '.join(missing)}")
        print("Check that these are set as GitHub Actions secrets AND passed into")
        print("the job's `env:` block in your workflow YAML — being set as a repo")
        print("secret alone is not enough, it must also be mapped in the workflow.")
        sys.exit(1)
    if not UNSPLASH_ACCESS_KEY:
        # Non-fatal: fetch_unsplash_image() already degrades gracefully to
        # None images, so we only warn here.
        print("WARNING: UNSPLASH_ACCESS_KEY is not set — posts will be created without images.")


# Initialize OpenAI client pointing to Google's Gemini API
client = OpenAI(
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
    api_key=GEMINI_API_KEY,
)

TECH_STACKS = [
    ["Laravel", "Vue.js", "TailwindCSS"],
    ["React", "Vite", "REST API"],
    ["Python", "Django", "PostgreSQL"],
    ["Docker", "Render", "CI/CD"],
    ["Laravel", "Inertia.js", "React"],
    ["Laravel", "Livewire", "Alpine.js"],
    ["React", "TypeScript", "Tailwind CSS"],
]

# ---------------------------------------------------------------------------
# POST CATEGORIES
# Each category has its own instructions because a "build a component"
# tutorial needs a completely different shape than a "release roundup" or a
# "vs" comparison. Rotating categories is what actually drives varied search
# traffic instead of five near-identical "intro to X" posts.
# ---------------------------------------------------------------------------
POST_CATEGORIES = {
    "component_tutorial": {
        "weight": 3,
        "brief": (
            "Write a hands-on tutorial that builds ONE specific, commonly-searched "
            "UI component or feature using {stack}. Pick something developers "
            "genuinely google, for example: a multi-step form, drag-and-drop file "
            "upload, OTP/verification input, infinite scroll list, real-time "
            "notification bell, searchable dropdown with debounce, image cropper, "
            "or a reusable modal system. Choose ONE, name it explicitly in the title. "
            "Walk through it step by step with real, working code — not pseudocode."
        ),
    },
    "release_roundup": {
        "weight": 2,
        "brief": (
            "Write a 'what's new' post about the latest meaningful updates in "
            "{stack}. Cover 3-5 concrete features or changes, explain what each one "
            "actually does, and give a short before/after code example for at least "
            "two of them. Focus on changes that affect how developers write code "
            "day to day, not marketing fluff."
        ),
    },
    "comparison": {
        "weight": 2,
        "brief": (
            "Write a practical comparison post between two real options a developer "
            "using {stack} has to choose between (for example a library vs a "
            "built-in feature, or two competing tools solving the same problem). "
            "Structure it as: the decision developers face, a fair breakdown of "
            "both sides with a short code example each, then a clear "
            "recommendation for common cases. Avoid being wishy-washy at the end."
        ),
    },
    "concept_explainer": {
        "weight": 2,
        "brief": (
            "Write a beginner-friendly explainer that teaches ONE core concept "
            "relevant to {stack} from scratch (for example: what RBAC is and how "
            "to build a simple version, what JWT auth actually does, how database "
            "indexing works, what N+1 queries are and how to fix them). Assume the "
            "reader is a junior developer. Build up from 'why does this matter' to "
            "a small working example."
        ),
    },
    "debugging_story": {
        "weight": 1,
        "brief": (
            "Write a first-person 'real bug I hit and how I fixed it' post using "
            "{stack}. Invent a realistic, specific bug (a subtle one, like a race "
            "condition, a silent type coercion issue, a caching bug, or a "
            "third-party API quirk) that a developer would plausibly hit in a real "
            "project. Structure it as: what broke, what it looked like to the user, "
            "how it was diagnosed step by step, what the actual fix was with code, "
            "and the one-sentence lesson learned."
        ),
    },
}


def parse_model_json(raw_text):
    """
    Parse the JSON object returned by Gemini, defensively.

    Two known failure modes handled here:
    1. The response is wrapped in ```json ... ``` fences even though
       response_format={"type": "json_object"} was requested.
    2. The model emits raw/unescaped control characters (literal newlines,
       tabs) inside JSON string values -- e.g. inside "content" where the
       HTML spans multiple lines. Python's json.loads is strict by default
       and rejects this ("Invalid control character at..."), even though
       it's a common, recoverable LLM output quirk.
    """
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_text.strip())

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as strict_err:
        # Retry allowing literal control characters inside strings. This is
        # the actual fix for the "Invalid control character" crash.
        try:
            return json.loads(cleaned, strict=False)
        except json.JSONDecodeError:
            print("JSON parse failed even with strict=False. Raw model output was:")
            print(cleaned)
            raise strict_err


def pick_category():
    names = list(POST_CATEGORIES.keys())
    weights = [POST_CATEGORIES[n]["weight"] for n in names]
    return random.choices(names, weights=weights, k=1)[0]


# Target crop size for the FEATURED image only, matching the blog Show page's
# full-height left column (split-screen layout). Unsplash's base photo URLs
# accept w/h/fit params directly, so we request the exact crop instead of
# cropping client-side. Width is generous since the column is ~50% of a
# desktop viewport; height is tall since it fills the full viewport height.
FEATURED_IMAGE_WIDTH = 1200
FEATURED_IMAGE_HEIGHT = 1600  # portrait-ish, matches a full-height side panel


def _sized_unsplash_url(raw_url, width, height):
    """Append/override Unsplash crop params on a base photo URL."""
    separator = "&" if "?" in raw_url else "?"
    return f"{raw_url}{separator}w={width}&h={height}&fit=crop&crop=entropy&q=80"


def fetch_unsplash_image(query, width=None, height=None):
    try:
        res = requests.get(
            f"https://api.unsplash.com/search/photos?query={query}&per_page=5",
            headers={"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"},
            timeout=10
        ).json()
        if res.get("results"):
            photo = random.choice(res["results"])
            url = photo["urls"]["regular"]
            if width and height:
                url = _sized_unsplash_url(url, width, height)
            photographer = photo["user"]["name"]
            profile_link = photo["user"]["links"]["html"]
            return url, photographer, profile_link
    except Exception as e:
        print(f"Unsplash error (non-fatal): {e}")
    return None, None, None


def build_image_html(url, author, link, alt_text):
    if not url:
        return ""
    return f"""
    <figure class="my-6">
        <img src="{url}" alt="{alt_text}" class="rounded-lg w-full object-cover max-h-96" />
        <figcaption class="text-xs text-gray-500 mt-1 text-center">
            Photo by <a href="{link}?utm_source=portfolio&utm_medium=referral" target="_blank" class="underline">{author}</a> on <a href="https://unsplash.com?utm_source=portfolio&utm_medium=referral" target="_blank" class="underline">Unsplash</a>
        </figcaption>
    </figure>
    """


def build_prompt(category_key, selected_stack):
    category = POST_CATEGORIES[category_key]
    stack_str = ", ".join(selected_stack)
    brief = category["brief"].format(stack=stack_str)

    return f"""
You are writing a blog post for a developer's personal portfolio blog. The
audience includes junior-to-mid developers, so clarity beats cleverness.

TOPIC BRIEF:
{brief}

WRITING STYLE RULES (follow strictly):
- Use short sentences and short paragraphs (2-4 sentences max per paragraph).
- Explain any non-trivial term the first time it's used, in plain language.
- Avoid filler phrases like "in today's fast-paced world" or "in conclusion."
- Write like you're explaining it to a smart friend, not writing a textbook.
- Prefer concrete examples over abstract descriptions.

STRUCTURE RULES (follow strictly):
1. Open with a 2-3 sentence hook that states the real problem or question —
   no throat-clearing intro.
2. Add a short "What you'll learn" bullet list (3-5 bullets) right after the
   hook, wrapped in a <ul>.
3. Break the body into clear sections using <h3> headings.
4. Include at least one real, working code example inside <pre><code>...
   </code></pre> tags, with a short sentence before it explaining what it
   does and a short sentence after explaining the key takeaway.
5. Include a "Common mistakes" or "Things to watch out for" <h3> section
   near the end — this is a required section, not optional.
6. Place the exact marker <!-- INLINE_IMAGE_PLACEHOLDER --> once, at a
   natural midpoint in the post (not at the very top or bottom).
7. End with a short, concrete conclusion — a next step the reader can
   actually take, not a generic summary sentence.

SEO RULES:
- The title must be specific and searchable (include the actual
  technology/component name). Avoid vague titles like "Building with X."
- The excerpt must be 2 sentences that would make someone click from a
  search result.

Respond strictly in JSON with this structure and nothing else (no markdown
fences, no commentary):
{{
    "title": "Post Title Here",
    "excerpt": "A 2-sentence summary of the post.",
    "content": "<p>Hook paragraph...</p><ul><li>...</li></ul><h3>Section Title</h3><p>...</p><pre><code>...</code></pre><!-- INLINE_IMAGE_PLACEHOLDER --><h3>Common mistakes</h3><p>...</p><p>Conclusion...</p>"
}}
Ensure content is clean HTML compatible with rich text sanitizers.
"""


def generate_and_post():
    category_key = pick_category()
    selected_stack = random.choice(TECH_STACKS)
    main_tech = selected_stack[0]
    secondary_tech = selected_stack[1]

    # Fetch Unsplash images.
    # Featured image is cropped to the exact size the Show page's full-height
    # left panel needs. Inline image stays uncropped (regular size) since it
    # just sits inside the article body at a natural aspect ratio.
    featured_url, feat_author, feat_link = fetch_unsplash_image(
        f"{main_tech} code web development",
        width=FEATURED_IMAGE_WIDTH,
        height=FEATURED_IMAGE_HEIGHT,
    )
    inline_url, inline_author, inline_link = fetch_unsplash_image(f"{secondary_tech} programming software")

    prompt = build_prompt(category_key, selected_stack)

    # Generate content using Google AI Studio's free Gemini tier
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are an expert technical blog writer who responds strictly in JSON and writes in clear, simple language for a broad developer audience."},
            {"role": "user", "content": prompt},
        ],
        model="gemini-3.5-flash-lite",
        response_format={"type": "json_object"}
    )

    raw_text = response.choices[0].message.content.strip()
    post_data = parse_model_json(raw_text)

    # Build inline image HTML
    inline_image_html = build_image_html(
        inline_url, inline_author, inline_link, f"{secondary_tech} development"
    )

    final_content = post_data["content"].replace("<!-- INLINE_IMAGE_PLACEHOLDER -->", inline_image_html)

    payload = {
        "title": post_data["title"],
        "excerpt": post_data["excerpt"],
        "content": final_content,
        "featured_image_path": featured_url,
        "tech_tags": selected_stack,
        "post_category": category_key,
    }

    headers = {
        "Content-Type": "application/json",
        "X-Automation-Key": BLOG_AUTOMATION_KEY
    }

    print(f"Category: {category_key} | Stack: {selected_stack}")
    print(f"POST {BLOG_API_URL}")
    res = requests.post(BLOG_API_URL, json=payload, headers=headers, timeout=60)
    print(f"Status: {res.status_code}")
    print(f"Response: {res.text}")

    # THIS is the actual fix for "no error but no post created": requests
    # does NOT raise on 4xx/5xx by default, so a rejected request (bad auth
    # key, validation error, server error) would previously just print and
    # let the script — and the whole GitHub Actions job — exit 0 as if it
    # succeeded. raise_for_status() makes a failed post actually fail the job.
    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print(f"FATAL: blog API rejected the post (status {res.status_code}).")
        print("Common causes: wrong/rotated BLOG_AUTOMATION_KEY, BLOG_API_URL")
        print("pointing at the wrong route, or a validation error on one of")
        print("the payload fields above (check the Response body for details).")
        sys.exit(1)

    print("Post created successfully.")


if __name__ == "__main__":
    check_required_env()
    generate_and_post()