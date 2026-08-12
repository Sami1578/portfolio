import os
import sys
import random
import re
import io
import zipfile
import requests
import json
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode
from openai import OpenAI

# Load Environment Variables
# Gemini API via Google's OpenAI-compatible endpoint.
# The model is selected below in the chat completion request.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
RESOURCE_API_URL = os.getenv("RESOURCE_API_URL")
RESOURCE_AUTOMATION_KEY = os.getenv("RESOURCE_AUTOMATION_KEY")


def check_required_env():
    """
    Fail loudly and immediately if required secrets are missing, instead of
    letting the script proceed with None values that produce confusing
    downstream errors (or, worse, silently-wrong requests).
    """
    required = {
        "GEMINI_API_KEY": GEMINI_API_KEY,
        "RESOURCE_API_URL": RESOURCE_API_URL,
        "RESOURCE_AUTOMATION_KEY": RESOURCE_AUTOMATION_KEY,
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
        print("WARNING: UNSPLASH_ACCESS_KEY is not set — resources will be created without thumbnails.")


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
# RESOURCE CATEGORIES
# Each category shapes a different kind of downloadable — a "cheatsheet" and
# a "starter template" need completely different code shapes and instructions,
# same reasoning as the blog's POST_CATEGORIES.
# ---------------------------------------------------------------------------
RESOURCE_CATEGORIES = {
    "starter_template": {
        "weight": 3,
        "brief": (
            "Create a small, genuinely useful starter/boilerplate file for "
            "{stack} that a developer could drop into a real project — for "
            "example: a reusable form component with validation, an API "
            "service wrapper with error handling, an auth middleware, a "
            "config file with sensible defaults, or a base repository/service "
            "class pattern. Pick ONE concrete thing and build it fully, not a "
            "toy example."
        ),
    },
    "snippet_pack": {
        "weight": 2,
        "brief": (
            "Create a single well-organized code file containing 3-5 small, "
            "genuinely handy utility functions or hooks for {stack} that "
            "developers commonly need and rewrite from scratch each time "
            "(for example: debounce, a fetch-with-retry wrapper, a "
            "localStorage-safe hook, a currency/date formatter set). Each "
            "function should have a short comment explaining what it does."
        ),
    },
    "cheatsheet": {
        "weight": 2,
        "brief": (
            "Create a single reference/cheatsheet code file for {stack} "
            "covering the most commonly looked-up commands, syntax, or "
            "patterns (for example: common CLI commands with flags, common "
            "query/ORM patterns, common config options). Organize with clear "
            "comment section headers."
        ),
    },
    "config_boilerplate": {
        "weight": 1,
        "brief": (
            "Create a production-ready config or setup file for {stack} that "
            "developers usually have to piece together from scattered docs "
            "(for example: a CI/CD pipeline file, a Docker setup, an eslint/"
            "prettier config, an environment config loader). It should be "
            "usable with minimal edits."
        ),
    },
}


def parse_model_json(raw_text):
    """
    Parse the JSON object returned by Gemini, defensively. See daily_blog_agent.py
    for the two known failure modes this guards against (code-fence wrapping and
    unescaped control characters inside string values).
    """
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_text.strip())

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as strict_err:
        try:
            return json.loads(cleaned, strict=False)
        except json.JSONDecodeError:
            print("JSON parse failed even with strict=False. Raw model output was:")
            print(cleaned)
            raise strict_err


def pick_category():
    names = list(RESOURCE_CATEGORIES.keys())
    weights = [RESOURCE_CATEGORIES[n]["weight"] for n in names]
    return random.choices(names, weights=weights, k=1)[0]


# Target crop size for the thumbnail, matching ResourceCard's aspect-video box.
THUMBNAIL_WIDTH = 1200
THUMBNAIL_HEIGHT = 675  # 16:9, matches aspect-video


def _sized_unsplash_url(raw_photo_url, width, height):
    """
    Build a sized Unsplash URL from the bare "raw" photo URL rather than
    appending on top of the already-parameterized "regular" URL — same fix
    as daily_blog_agent.py, avoids overlong URLs blowing a varchar column.
    """
    parts = urlsplit(raw_photo_url)
    params = dict(parse_qsl(parts.query))
    params.update({
        "w": str(width),
        "h": str(height),
        "fit": "crop",
        "crop": "entropy",
        "q": "80",
    })
    new_query = urlencode(params)
    return urlunsplit((parts.scheme, parts.netloc, parts.path, new_query, parts.fragment))


def fetch_unsplash_image(query, width=None, height=None):
    try:
        res = requests.get(
            f"https://api.unsplash.com/search/photos?query={query}&per_page=5",
            headers={"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"},
            timeout=10
        ).json()
        if res.get("results"):
            photo = random.choice(res["results"])
            if width and height:
                url = _sized_unsplash_url(photo["urls"]["raw"], width, height)
            else:
                url = photo["urls"]["regular"]
            photographer = photo["user"]["name"]
            profile_link = photo["user"]["links"]["html"]
            return url, photographer, profile_link
    except Exception as e:
        print(f"Unsplash error (non-fatal): {e}")
    return None, None, None


def build_prompt(category_key, selected_stack):
    category = RESOURCE_CATEGORIES[category_key]
    stack_str = ", ".join(selected_stack)
    brief = category["brief"].format(stack=stack_str)

    return f"""
You are creating a free downloadable code resource for a developer's personal
portfolio site's "Resources" section. Developers land here wanting something
they can actually use, not a tutorial.

RESOURCE BRIEF:
{brief}

CODE RULES (follow strictly):
- The code must be complete and directly usable, not pseudocode or
  "// TODO: implement this" placeholders.
- Include short inline comments explaining non-obvious parts.
- Pick one sensible filename with the correct extension for {stack_str}.

INSTRUCTIONS RULES (follow strictly):
- Write clean HTML setup instructions: what the file does, how to install it
  (e.g. any dependencies to add), and how to use it in a project.
- Use <h3> for section headings, <p> for prose, <pre><code>...</code></pre>
  for any install commands or usage code, and short paragraphs.
- Keep it practical — a developer should be able to follow it in under
  2 minutes.

SEO / METADATA RULES:
- The title must be specific and name the actual thing (e.g. "Debounced
  Search Hook for React + TypeScript"), not vague ("Useful React Code").
- The short_description must be ONE sentence, under 160 characters, that
  would make someone want to download it.

Respond strictly in JSON with this structure and nothing else (no markdown
fences, no commentary):
{{
    "title": "Resource Title Here",
    "short_description": "One sentence, under 160 characters.",
    "instructions": "<h3>What this is</h3><p>...</p><h3>Setup</h3><p>...</p><pre><code>...</code></pre><h3>Usage</h3><p>...</p>",
    "code_filename": "example.tsx",
    "code_content": "the full, complete file contents as a plain string"
}}
Ensure instructions is clean HTML compatible with rich text sanitizers, and
code_content is the raw file contents (escaped properly for JSON, real
newlines as \\n).
"""


def build_code_zip(filename, content):
    """
    Package the generated code into a single-file zip in memory, matching
    the "download the code bundle" flow ResourceShow.jsx already expects
    (resource.has_code_bundle -> route('resources.download', slug)).
    """
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr(filename, content)
    buffer.seek(0)
    return buffer


def generate_and_post():
    category_key = pick_category()
    selected_stack = random.choice(TECH_STACKS)
    main_tech = selected_stack[0]

    thumbnail_url, thumb_author, thumb_link = fetch_unsplash_image(
        f"{main_tech} code programming",
        width=THUMBNAIL_WIDTH,
        height=THUMBNAIL_HEIGHT,
    )

    prompt = build_prompt(category_key, selected_stack)

    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are an expert developer who writes clean, complete, directly-usable code and clear setup docs. You respond strictly in JSON."},
            {"role": "user", "content": prompt},
        ],
        model="gemini-3.5-flash-lite",
        response_format={"type": "json_object"}
    )

    raw_text = response.choices[0].message.content.strip()
    resource_data = parse_model_json(raw_text)

    zip_buffer = build_code_zip(
        resource_data["code_filename"],
        resource_data["code_content"],
    )

    fields = {
        "title": resource_data["title"],
        "short_description": resource_data["short_description"],
        "instructions": resource_data["instructions"],
        "tech_tags": json.dumps(selected_stack),
        "code_bundle_original_name": resource_data["code_filename"],
        "thumbnail_url": thumbnail_url or "",
    }

    files = {
        "code_bundle": (
            f"{resource_data['code_filename']}.zip",
            zip_buffer,
            "application/zip",
        ),
    }

    headers = {
        "X-Automation-Key": RESOURCE_AUTOMATION_KEY,
    }

    print(f"Category: {category_key} | Stack: {selected_stack}")
    print(f"POST {RESOURCE_API_URL}")
    res = requests.post(RESOURCE_API_URL, data=fields, files=files, headers=headers, timeout=60)
    print(f"Status: {res.status_code}")
    print(f"Response: {res.text}")

    # Same reasoning as the blog agent: requests does NOT raise on 4xx/5xx by
    # default, so a rejected request would otherwise exit 0 and look like a
    # silent no-op success in the Actions log.
    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError:
        print(f"FATAL: resource API rejected the request (status {res.status_code}).")
        print("Common causes: wrong/rotated RESOURCE_AUTOMATION_KEY, RESOURCE_API_URL")
        print("pointing at the wrong route, or a validation error on one of the")
        print("payload fields above (check the Response body for details).")
        sys.exit(1)

    print("Resource created successfully.")


if __name__ == "__main__":
    check_required_env()
    generate_and_post()