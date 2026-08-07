import os
import random
import re
import time
import requests
import json
from google import genai
from google.genai import errors

# Load Config
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
BLOG_API_URL = os.getenv("BLOG_API_URL")
BLOG_AUTOMATION_KEY = os.getenv("BLOG_AUTOMATION_KEY")

# Initialize GenAI Client
client = genai.Client(api_key=GEMINI_API_KEY)

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
        print(f"Error fetching image: {e}")
    return None, None, None

def generate_and_post():
    selected_stack = random.choice(TECH_STACKS)
    main_tech = selected_stack[0]
    secondary_tech = selected_stack[1]

    # Fetch images
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

    # Call gemini-1.5-flash with exponential retry backoff
    max_retries = 3
    response = None
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-1.5-flash",
                contents=prompt,
            )
            break
        except errors.ClientError as e:
            if "429" in str(e) and attempt < max_retries - 1:
                wait_time = (attempt + 1) * 15
                print(f"Rate limited (429). Retrying in {wait_time}s...")
                time.sleep(wait_time)
            else:
                raise e

    raw_text = response.text.strip()
    clean_json = re.sub(r"^```json\s*|\s*```$", "", raw_text, flags=re.MULTILINE)
    post_data = json.loads(clean_json)

    # Build inline image tag with attribution
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
    print(f"Status: {res.status_code}, Payload: {res.text}")

if __name__ == "__main__":
    generate_and_post()