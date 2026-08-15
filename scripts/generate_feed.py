from __future__ import annotations

import hashlib
import html
import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import quote_plus, urlparse
from urllib.request import Request, urlopen

import feedparser

OUT_JSON = Path("data/feed.json")
OUT_JS = Path("data/feed.js")
ITEMS_PER_TOPIC = 6
MAX_PER_SOURCE = 2
USER_AGENT = "YourDailyQueue/1.0 (+https://yourdailyqueue.netlify.app/)"


def google_news(query: str) -> str:
    return f"https://news.google.com/rss/search?q={quote_plus(query)}&hl=en-US&gl=US&ceid=US:en"


FEEDS: dict[str, list[tuple[str, str]]] = {
    "us": [
        ("NPR", "https://feeds.npr.org/1001/rss.xml"),
        ("BBC US & Canada", "https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml"),
        ("U.S. News Search", google_news("site:apnews.com (Congress OR White House OR Supreme Court OR election OR economy OR immigration) when:2d")),
        ("U.S. News Search", google_news("site:reuters.com/world/us (Congress OR White House OR economy OR court OR immigration OR climate) when:2d")),
    ],
    "world": [
        ("BBC World", "https://feeds.bbci.co.uk/news/world/rss.xml"),
        ("World News Search", google_news("site:reuters.com/world when:2d")),
        ("World News Search", google_news("site:apnews.com/world-news when:2d")),
        ("NPR World", google_news("site:npr.org international world when:2d")),
    ],
    "science": [
        ("BBC Science", "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml"),
        ("ScienceDaily", "https://www.sciencedaily.com/rss/top/science.xml"),
        ("Smithsonian", "https://www.smithsonianmag.com/rss/smart-news/"),
        ("Science Search", google_news("science research discovery study when:3d")),
    ],
    "tech": [
        ("MIT Technology Review", "https://www.technologyreview.com/feed/"),
        ("BBC Technology", "https://feeds.bbci.co.uk/news/technology/rss.xml"),
        ("The Verge", "https://www.theverge.com/rss/index.xml"),
        ("Ars Technica", "https://feeds.arstechnica.com/arstechnica/index"),
    ],
    "animals": [
        ("Smithsonian", "https://www.smithsonianmag.com/rss/smart-news/"),
        ("BBC Science", "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml"),
        ("Wildlife Search", google_news("animals wildlife conservation rescue when:4d")),
        ("Pet Search", google_news("pets dogs cats animal rescue when:4d")),
    ],
    "wellbeing": [
        ("BBC Health", "https://feeds.bbci.co.uk/news/health/rss.xml"),
        ("ScienceDaily Mind & Brain", "https://www.sciencedaily.com/rss/mind_brain.xml"),
        ("NIMH", "https://www.nimh.nih.gov/site-info/index-rss"),
        ("Psychology Search", google_news("psychology mental health wellbeing research when:4d")),
    ],
    "wonderful": [
        ("Good News Network", "https://www.goodnewsnetwork.org/feed/"),
        ("Positive News", "https://www.positive.news/feed/"),
        ("Wonderful News Search", google_news("uplifting inspiring community kindness rescue when:5d")),
    ],
    "entertainment": [
        ("Variety", "https://variety.com/feed/"),
        ("BBC Entertainment", "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml"),
        ("NPR Music", "https://feeds.npr.org/1039/rss.xml"),
        ("Pitchfork", "https://pitchfork.com/rss/news/"),
    ],
    "markets": [
        ("BBC Business", "https://feeds.bbci.co.uk/news/business/rss.xml"),
        ("Markets Search", google_news("site:reuters.com/markets (stocks OR markets OR economy OR rates OR earnings) when:2d")),
        ("Business Search", google_news("site:apnews.com (business OR economy OR markets OR stocks) when:2d")),
        ("Markets Search", google_news("stocks markets economy interest rates earnings when:2d")),
    ],
    "sports": [
        ("BBC Sport", "https://feeds.bbci.co.uk/sport/rss.xml?edition=uk"),
        ("Sports Search", google_news("site:reuters.com/sports when:2d")),
        ("ESPN Search", google_news("site:espn.com sports when:2d")),
        ("Sports Search", google_news("sports scores highlights playoffs championship when:2d")),
    ],
    "local": [
        ("Madison Local", google_news("Madison Wisconsin local news when:3d")),
        ("Wisconsin Public Radio", "https://www.wpr.org/feed"),
        ("Dane County", google_news("Dane County Wisconsin news when:3d")),
    ],
}

ANIMAL_TERMS = {
    "animal", "animals", "dog", "dogs", "cat", "cats", "pet", "pets", "wildlife", "bird", "birds",
    "bear", "wolf", "whale", "dolphin", "elephant", "horse", "rabbit", "fox", "otter", "capybara",
    "zoo", "species", "habitat", "conservation", "rescue", "shelter", "marine", "insect", "bee",
    "butterfly", "turtle", "shark", "penguin", "primate", "gorilla", "lion", "tiger", "deer", "moose",
}

US_CIVIC_TERMS = {
    "trump", "president", "white house", "congress", "senate", "house", "supreme court", "federal",
    "governor", "election", "vote", "immigration", "economy", "inflation", "jobs", "health", "education",
    "climate", "law", "policy", "justice", "court", "police", "wildfire", "hurricane", "public health",
    "united states", "u.s.", "america", "state department", "pentagon", "department of justice",
}
US_SPORTS_TERMS = {
    "soccer", "football", "basketball", "baseball", "hockey", "tennis", "golf", "nfl", "nba", "mlb",
    "nhl", "world cup", "champions league", "psg", "barcelona", "arsenal", "liverpool", "playoffs",
}
MARKET_TERMS = {
    "stock", "stocks", "market", "markets", "dow", "nasdaq", "s&p", "economy", "economic", "inflation",
    "interest rate", "rates", "federal reserve", "fed", "earnings", "investor", "investment", "bond", "bonds",
    "tariff", "trade", "jobs", "unemployment", "currency", "dollar", "oil", "business", "company", "companies",
}


def clean_text(value: str | None, limit: int = 480) -> str:
    if not value:
        return "Open the original source for the full details."
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    value = re.split(r"\bThe post\b", value, maxsplit=1, flags=re.IGNORECASE)[0].strip()
    if not value:
        return "Open the original source for the full details."
    if len(value) <= limit:
        return value
    return f"{value[:limit].rsplit(' ', 1)[0]}…"


def image_from_entry(entry: Any) -> str:
    for key in ("media_content", "media_thumbnail"):
        for item in entry.get(key) or []:
            if item.get("url"):
                return html.unescape(item["url"])
    for enclosure in entry.get("enclosures", []) or []:
        href = enclosure.get("href") or enclosure.get("url")
        media_type = enclosure.get("type", "")
        if href and ("image" in media_type or re.search(r"\.(jpe?g|png|webp)(\?|$)", href, re.I)):
            return html.unescape(href)
    raw = entry.get("summary") or entry.get("description") or ""
    match = re.search(r'<img[^>]+src=["\']([^"\']+)', raw, re.I)
    return html.unescape(match.group(1)) if match else ""


def og_image_from_url(url: str) -> str:
    if not url or "news.google.com" in urlparse(url).netloc.lower():
        return ""
    try:
        request = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"})
        with urlopen(request, timeout=7) as response:
            content_type = response.headers.get("Content-Type", "")
            if "html" not in content_type:
                return ""
            raw = response.read(550_000).decode("utf-8", errors="ignore")
        patterns = [
            r'<meta[^>]+(?:property|name)=["\']og:image["\'][^>]+content=["\']([^"\']+)',
            r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']og:image["\']',
            r'<meta[^>]+(?:property|name)=["\']twitter:image(?::src)?["\'][^>]+content=["\']([^"\']+)',
            r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']twitter:image(?::src)?["\']',
        ]
        for pattern in patterns:
            match = re.search(pattern, raw, re.I)
            if match:
                return html.unescape(match.group(1).strip())
    except Exception:
        pass
    return ""


def entry_timestamp(entry: Any) -> float:
    parsed = entry.get("published_parsed") or entry.get("updated_parsed")
    if not parsed:
        return 0
    return datetime(*parsed[:6], tzinfo=timezone.utc).timestamp()


def time_ago(timestamp: float) -> str:
    if not timestamp:
        return "Recently"
    seconds = max(0, datetime.now(timezone.utc).timestamp() - timestamp)
    minutes = int(seconds // 60)
    if minutes < 60:
        return f"{max(1, minutes)} min ago"
    hours = minutes // 60
    if hours < 24:
        return f"{hours} hr{'s' if hours != 1 else ''} ago"
    days = hours // 24
    return f"{days} day{'s' if days != 1 else ''} ago"


def story_id(topic: str, url: str, headline: str) -> str:
    digest = hashlib.sha1(f"{url}|{headline}".encode("utf-8")).hexdigest()[:12]
    return f"{topic}-{digest}"


def title_key(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", title.lower()).strip()


def contains_any(text: str, terms: set[str]) -> bool:
    lowered = text.lower()
    return any(term in lowered for term in terms)


def topic_accepts(topic: str, headline: str, summary: str) -> bool:
    haystack = f"{headline} {summary}".lower()
    if topic == "animals":
        return any(re.search(rf"\b{re.escape(term)}s?\b", haystack) for term in ANIMAL_TERMS)
    if topic == "us":
        if contains_any(haystack, US_SPORTS_TERMS) and not contains_any(haystack, US_CIVIC_TERMS):
            return False
        return True
    if topic == "markets":
        return contains_any(haystack, MARKET_TERMS)
    return True


def entry_source(entry: Any, fallback: str, is_google: bool) -> str:
    if not is_google:
        return fallback
    source = entry.get("source") or {}
    title = source.get("title") if hasattr(source, "get") else ""
    return clean_text(title, 80) if title else fallback


def make_candidate(topic: str, source: str, feed_url: str, feed_rank: int, entry: Any) -> dict[str, Any] | None:
    headline = clean_text(entry.get("title"), 220)
    url = entry.get("link") or ""
    if not headline or not url:
        return None
    summary = clean_text(entry.get("summary") or entry.get("description"), 480)
    if not topic_accepts(topic, headline, summary):
        return None
    is_google = "news.google.com" in urlparse(feed_url).netloc.lower()
    actual_source = entry_source(entry, source, is_google)
    ts = entry_timestamp(entry)
    published = datetime.fromtimestamp(ts, timezone.utc).isoformat() if ts else ""
    words = max(1, len(re.findall(r"\w+", summary)))
    read_minutes = max(2, min(8, round(words / 180) + 1))
    quick = clean_text(summary, 190)
    balanced = clean_text(summary, 430)
    deep = balanced
    if not deep.endswith((".", "!", "?", "…")):
        deep += "."
    deep += " Open the original source for the full reporting, supporting detail, and caveats."
    return {
        "id": story_id(topic, url, headline),
        "topic": topic,
        "source": actual_source,
        "time": time_ago(ts),
        "read": f"{read_minutes} min read",
        "headline": headline,
        "quick": quick,
        "balanced": balanced,
        "deep": deep,
        "image": image_from_entry(entry),
        "url": url,
        "published": published,
        "_timestamp": ts,
        "_is_google": is_google,
        "_feed_rank": feed_rank,
    }


def collect_topic(topic: str, feeds: list[tuple[str, str]]) -> list[dict[str, Any]]:
    candidates: list[dict[str, Any]] = []
    for feed_rank, (source, url) in enumerate(feeds):
        try:
            parsed = feedparser.parse(url, request_headers={"User-Agent": USER_AGENT})
            for entry in (parsed.entries or [])[:18]:
                candidate = make_candidate(topic, source, url, feed_rank, entry)
                if candidate:
                    candidates.append(candidate)
        except Exception as exc:
            print(f"Feed failed: {topic} / {source}: {exc}")

    # Direct publisher feeds are preferred because they generally carry cleaner
    # summaries and real article imagery. Google News fills gaps with fresh breadth.
    candidates.sort(
        key=lambda item: (
            1 if not item.get("_is_google") else 0,
            -int(item.get("_feed_rank", 0)),
            item.get("_timestamp", 0),
        ),
        reverse=True,
    )
    chosen: list[dict[str, Any]] = []
    seen_titles: set[str] = set()
    source_counts: dict[str, int] = {}
    for candidate in candidates:
        key = title_key(candidate["headline"])
        if key in seen_titles:
            continue
        source = candidate["source"]
        if source_counts.get(source, 0) >= MAX_PER_SOURCE:
            continue
        chosen.append(candidate)
        seen_titles.add(key)
        source_counts[source] = source_counts.get(source, 0) + 1
        if len(chosen) >= ITEMS_PER_TOPIC:
            break
    return chosen


def fill_missing_images(stories: list[dict[str, Any]]) -> None:
    missing = [story for story in stories if not story.get("image") and "news.google.com" not in story.get("url", "")]
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(og_image_from_url, story["url"]): story for story in missing}
        for future in as_completed(futures):
            story = futures[future]
            try:
                story["image"] = future.result() or ""
            except Exception:
                story["image"] = ""


def main() -> None:
    all_stories: list[dict[str, Any]] = []
    counts: dict[str, int] = {}
    for topic, feeds in FEEDS.items():
        stories = collect_topic(topic, feeds)
        counts[topic] = len(stories)
        all_stories.extend(stories)
        print(f"{topic}: {len(stories)} stories")

    fill_missing_images(all_stories)
    for story in all_stories:
        story.pop("_timestamp", None)
        story.pop("_is_google", None)
        story.pop("_feed_rank", None)

    generated_at = datetime.now(timezone.utc).isoformat()
    payload = {
        "generatedAt": generated_at,
        "counts": counts,
        "stories": all_stories,
    }

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    OUT_JS.write_text(
        "window.YDQ_LIVE_STORIES = " + json.dumps(all_stories, ensure_ascii=False) + ";\n"
        "window.YDQ_FEED_META = " + json.dumps({"generatedAt": generated_at, "counts": counts}, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(all_stories)} stories to {OUT_JSON} and {OUT_JS}")


if __name__ == "__main__":
    main()
