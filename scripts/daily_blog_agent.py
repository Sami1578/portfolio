import os
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
    ["Laravel", "Inertia.js", "React"]
]

def fetch_unsplash_image(query):
    try:
        res = requests.get(
            f"https://api.unsplash.com/search/photos?query={query}&per_page=5",
            headers={"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"},
            timeout=10
        ).json()
        if res.get("results"):
            photo = random.choice(res["results"])
            url = photo["urls"]["regular"]
            photographer = photo["user"]["name"]
            profile_link = photo["user"]["links"]["html"]
            return url, photographer, profile_link
    except Exception as e:
        print(f"Unsplash error (non-fatal): {e}")
    return None, None, None

def generate_and_post():
    selected_stack = random.choice(TECH_STACKS)
    main_tech = selected_stack[0]
    secondary_tech = selected_stack[1]

    # Fetch Unsplash images
    featured_url, feat_author, feat_link = fetch_unsplash_image(f"{main_tech} code web development")
    inline_url, inline_author, inline_link = fetch_unsplash_image(f"{secondary_tech} programming software")

    prompt = f"""
    Write a detailed technical developer blog post about building applications with: {', '.join(selected_stack)}.

    Respond strictly in JSON with the following structure:
    {{
        "title": "Post Title Here",
        "excerpt": "A 2-sentence summary of the post.",
        "content": "<p>Introductory paragraphs...</p><h3>Section Title</h3><p>More text...</p><!-- INLINE_IMAGE_PLACEHOLDER --><p>Concluding section with code snippets if relevant.</p>"
    }}
    Ensure content is clean HTML compatible with rich text sanitizers.
    """

    # Generate content using Google AI Studio's free Gemini tier
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are an expert technical blog writer who responds strictly in JSON."},
            {"role": "user", "content": prompt},
        ],
        model="gemini-3.5-flash-lite",
        response_format={"type": "json_object"}
    )

    raw_text = response.choices[0].message.content.strip()

    # Gemini's OpenAI-compat layer occasionally wraps JSON in ```json fences
    # even when response_format is set — strip them defensively.
    raw_text = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_text.strip())
    post_data = json.loads(raw_text)

    # Build inline image HTML
    inline_image_html = ""
    if inline_url:
        inline_image_html = f"""
        <figure class="my-6">
            <img src="{inline_url}" alt="{secondary_tech} development" class="rounded-lg w-full object-cover max-h-96" />
            <figcaption class="text-xs text-gray-500 mt-1 text-center">
                Photo by <a href="{inline_link}?utm_source=portfolio&utm_medium=referral" target="_blank" class="underline">{inline_author}</a> on <a href="https://unsplash.com?utm_source=portfolio&utm_medium=referral" target="_blank" class="underline">Unsplash</a>
            </figcaption>
        </figure>
        """

    final_content = post_data["content"].replace("<!-- INLINE_IMAGE_PLACEHOLDER -->", inline_image_html)

    payload = {
        "title": post_data["title"],
        "excerpt": post_data["excerpt"],
        "content": final_content,
        "featured_image_path": featured_url,
        "tech_tags": selected_stack
    }

    headers = {
        "Content-Type": "application/json",
        "X-Automation-Key": BLOG_AUTOMATION_KEY
    }

    res = requests.post(BLOG_API_URL, json=payload, headers=headers, timeout=60)
    print(f"Status: {res.status_code}, Response: {res.text}")

if __name__ == "__main__":
    generate_and_post()