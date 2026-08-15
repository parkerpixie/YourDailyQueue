const headers = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'public, max-age=900, s-maxage=1800',
};

function decode(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTags(value = '') {
  return decode(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return match ? decode(match[1]).trim() : '';
}

function attr(block, element, attribute) {
  const match = block.match(new RegExp(`<${element}[^>]*\\s${attribute}=["']([^"']+)["'][^>]*>`, 'i'));
  return match ? decode(match[1]).trim() : '';
}

function firstImage(block) {
  return (
    attr(block, 'media:content', 'url') ||
    attr(block, 'media:thumbnail', 'url') ||
    attr(decode(tag(block, 'description')), 'img', 'src') ||
    ''
  );
}

function relativeTime(dateString) {
  const then = Date.parse(dateString);
  if (!Number.isFinite(then)) return 'Recently';
  const minutes = Math.max(1, Math.floor((Date.now() - then) / 60000));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

async function resolveCurrentLocation(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return '';
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    if (!response.ok) return '';
    const data = await response.json();
    const city = data.city || data.locality || data.principalSubdivision;
    const region = data.principalSubdivisionCode || data.principalSubdivision || '';
    const country = data.countryName || '';
    return [city, region, country].filter(Boolean).join(', ');
  } catch {
    return '';
  }
}

export default async (request) => {
  const url = new URL(request.url);
  let location = (url.searchParams.get('location') || '').trim();
  const lat = Number(url.searchParams.get('lat'));
  const lon = Number(url.searchParams.get('lon'));

  if (!location || /^current location$/i.test(location)) {
    location = await resolveCurrentLocation(lat, lon);
  }
  if (!location) {
    return new Response(JSON.stringify({ stories: [], error: 'location-required' }), { status: 400, headers });
  }

  const query = `${location} local news when:3d`;
  const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const response = await fetch(feedUrl, { headers: { 'user-agent': 'YourDailyQueue/1.0' } });
    if (!response.ok) throw new Error(`Google News returned ${response.status}`);
    const xml = await response.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 8);

    const stories = items.map((match, index) => {
      const block = match[1];
      const headline = stripTags(tag(block, 'title'));
      const storyUrl = stripTags(tag(block, 'link'));
      const published = stripTags(tag(block, 'pubDate'));
      const source = stripTags(tag(block, 'source')) || 'Local News';
      const description = stripTags(tag(block, 'description'));
      const summary = description && description.toLowerCase() !== headline.toLowerCase()
        ? description.slice(0, 430)
        : `A current local story for ${location}. Open the original source for the full reporting and details.`;
      const quick = summary.length > 190 ? `${summary.slice(0, 187).replace(/\s+\S*$/, '')}…` : summary;
      const idSeed = `${storyUrl}|${headline}|${index}`;
      let hash = 0;
      for (let i = 0; i < idSeed.length; i += 1) hash = ((hash << 5) - hash + idSeed.charCodeAt(i)) | 0;

      return {
        id: `local-${Math.abs(hash)}`,
        topic: 'local',
        source,
        time: relativeTime(published),
        read: '3 min read',
        headline,
        quick,
        balanced: summary,
        deep: `${summary}${/[.!?…]$/.test(summary) ? '' : '.'} Open the original source for the full local reporting, context, and updates.`,
        image: firstImage(block),
        url: storyUrl,
        published,
      };
    }).filter(story => story.headline && story.url);

    return new Response(JSON.stringify({ location, stories }), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify({ stories: [], error: error.message }), { status: 502, headers });
  }
};
