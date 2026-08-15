import { copyFile, cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const coreFiles = ['styles.css', 'polish.css'];
const assetExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico']);

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const file of coreFiles) {
  await copyFile(file, `dist/${file}`);
}

let index = await readFile('index.html', 'utf8');
index = index.replace(
  '<script src="app.js" defer></script>',
  '<script src="data/feed.js"></script>\n  <script src="app.js" defer></script>'
);
await writeFile('dist/index.html', index);

let app = await readFile('app.js', 'utf8');

// Keep the original demo stories as an automatic fallback for any topic whose
// live feeds are temporarily empty. Live feed stories replace demo stories by topic.
app = app.replace('const STORIES = [', 'const DEMO_STORIES = [');
app = app.replace(
  '\n];\n\nconst DEFAULTS',
  `\n];\n\nconst LIVE_STORIES = Array.isArray(window.YDQ_LIVE_STORIES) ? window.YDQ_LIVE_STORIES : [];\nconst LIVE_TOPICS = new Set(LIVE_STORIES.map(story => story.topic));\nconst STORIES = LIVE_STORIES.length\n  ? [...LIVE_STORIES, ...DEMO_STORIES.filter(story => !LIVE_TOPICS.has(story.topic))]\n  : DEMO_STORIES;\n\nconst DEFAULTS`
);

// Use publisher/article imagery when available, with the designed category art
// sitting behind it as a reliable visual fallback.
app = app.replace(
  "<div class=\"top-story-bg\" style=\"background-image:url('${topic.banner}')\"></div>",
  "<div class=\"top-story-bg\" style=\"background-image:url('${story.image||topic.banner}'),url('${topic.banner}')\"></div>"
);
app = app.replace(
  '<article class="mini-story">\n    <img src="${topic.banner}" alt="">',
  '<article class="mini-story ${story.image?\'has-article-image\':\'\'}">\n    <img src="${story.image||topic.banner}" onerror="this.onerror=null;this.src=\'${topic.banner}\'" alt="">'
);
app = app.replaceAll(
  '<article class="queue-story">',
  '<article class="queue-story">\n        <img class="queue-story-image ${story.image?\'has-article-image\':\'\'}" src="${story.image||topic.banner}" onerror="this.onerror=null;this.src=\'${topic.banner}\'" alt="">'
);

// Give live stories a clear path back to the publisher and include that URL when sharing.
app = app.replace(
  '<button class="story-action" type="button" data-share-story><img src="22-share.svg" alt=""> Share</button>',
  '<button class="story-action" type="button" data-share-story><img src="22-share.svg" alt=""> Share</button>${story.url?`<a class="story-action story-source-link" href="${escapeHTML(story.url)}" target="_blank" rel="noopener noreferrer"><img src="26-external-link.svg" alt=""> Source</a>`:\'\'}'
);
app = app.replace(
  "  const text=`${story.headline}\\n\\n${story.quick}\\n\\nYour Daily Queue demo`;\n  try{\n    if(navigator.share) await navigator.share({title:story.headline,text});\n    else if(navigator.clipboard){await navigator.clipboard.writeText(text);showToast('Story copied to clipboard.');}",
  "  const text=`${story.headline}\\n\\n${story.quick}\\n\\nYour Daily Queue`;\n  const shareUrl=story.url||location.href;\n  try{\n    if(navigator.share) await navigator.share({title:story.headline,text,url:shareUrl});\n    else if(navigator.clipboard){await navigator.clipboard.writeText(`${text}\\n\\n${shareUrl}`);showToast('Story copied to clipboard.');}"
);

// Local News is the one category that must react to the reader's current home base,
// so ask a Netlify function for a location-specific RSS slice when that tab opens.
const localHelper = `\nlet localStoryCache={key:'',stories:[]};\nasync function fetchLocalStories(){\n  const location=preferences.location||{};\n  const key=[location.name||location.query||'',location.latitude||'',location.longitude||''].join('|');\n  if(localStoryCache.key===key && localStoryCache.stories.length)return localStoryCache.stories;\n  try{\n    const params=new URLSearchParams({\n      location:location.name||location.query||'',\n      lat:String(location.latitude||''),\n      lon:String(location.longitude||'')\n    });\n    const response=await fetch('/.netlify/functions/local-news?'+params.toString());\n    if(!response.ok)throw new Error('local news request failed');\n    const payload=await response.json();\n    const stories=Array.isArray(payload.stories)?payload.stories:[];\n    if(stories.length)localStoryCache={key,stories};\n    return stories;\n  }catch{return [];}\n}\n\n`;
app = app.replace('function renderTopicPanel(id){', localHelper + 'async function renderTopicPanel(id){');
app = app.replace(
  '  const stories=STORIES.filter(s=>s.topic===id);',
  "  let stories=STORIES.filter(s=>s.topic===id);\n  if(id==='local'){\n    const localStories=await fetchLocalStories();\n    if(localStories.length)stories=localStories;\n  }"
);

await writeFile('dist/app.js', app);

for (const entry of await readdir('.')) {
  if (coreFiles.includes(entry) || ['index.html', 'app.js', 'dist', 'node_modules'].includes(entry)) continue;
  const info = await stat(entry);
  if (info.isFile() && assetExtensions.has(extname(entry).toLowerCase())) {
    await copyFile(entry, join('dist', entry));
  }
}

for (const directory of ['Assets', 'data']) {
  try {
    await cp(directory, `dist/${directory}`, { recursive: true });
  } catch {
    // Optional during early development.
  }
}

console.log('Built Your Daily Queue → dist with live feed data, article imagery, and visual assets');
