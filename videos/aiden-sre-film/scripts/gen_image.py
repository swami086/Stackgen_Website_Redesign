"""Generate one image with Gemini. Usage: gen_image.py <out.png> "<prompt>" """
import base64
import json
import os
import sys
import urllib.error
import urllib.request

MODEL = os.environ.get("GEMINI_IMAGE_MODEL", "gemini-2.5-flash-image")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"


def _request(body):
    req = urllib.request.Request(
        URL,
        data=json.dumps(body).encode(),
        method="POST",
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": os.environ["GEMINI_API_KEY"],
        },
    )
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)


def _save_image(data, out):
    for part in data["candidates"][0]["content"]["parts"]:
        if "inlineData" in part:
            with open(out, "wb") as fh:
                fh.write(base64.b64decode(part["inlineData"]["data"]))
            print(out)
            return True
    return False


def main(out, prompt):
    body_with_ar = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": "16:9"},
        },
    }
    body_plain = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE"]},
    }
    try:
        data = _request(body_with_ar)
    except urllib.error.HTTPError as e:
        err = e.read().decode(errors="replace")
        if "imageConfig" in err or e.code == 400:
            data = _request(body_plain)
        else:
            raise
    if not _save_image(data, out):
        sys.exit(f"no image in response: {json.dumps(data)[:400]}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
