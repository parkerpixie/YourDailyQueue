# Your Daily Queue

**Curated stories. On your terms.**

Your Daily Queue is a public CapyQueue demo inspired by a personalized Morning Intelligence Report. It demonstrates what happens when a daily briefing is designed around a person's interests, attention, location, and preferred level of detail instead of an infinite feed.

## Current app experience

- Mobile-first app shell with `Today`, `My Queue`, `Topics`, `Saved`, and `Settings`
- Quill owl identity and the full navy/gold visual system
- Topic selection that controls the tabs shown inside `My Queue`
- Eleven topic categories: U.S. News, World News, Science, Tech & Innovation, Animals & Nature, Wellbeing & Mental Health, Wonderful News, Entertainment, Stocks & Markets, Sports, and Local News
- Weather pinned at the front of `My Queue`
- Live weather based on a ZIP/postal code, city search, or optional browser location
- Dynamic dawn/day/dusk/night weather artwork plus condition artwork for clear, partly cloudy, cloudy, rain, thunderstorms, snow, fog, and wind
- Current conditions, feels-like temperature, rain chance, wind, humidity, air quality, UV, sunrise/sunset, next 12 hours, and seven-day outlook
- U.S. National Weather Service active alerts when available for a U.S. location
- Quick Scan, Balanced, and Deep Dive reading modes
- Save-for-later stories
- More/Less feedback stored in the browser
- Share action using the native Web Share API when available, with clipboard fallback
- Search across selected demo topics and stories
- Browser-saved preferences using `localStorage`
- Responsive desktop sidebar plus mobile bottom navigation

## Data sources

The news stories are intentionally fictional demonstration copy. The app does **not** present sample headlines as current reporting.

Weather uses Open-Meteo forecast, geocoding, and air-quality endpoints. U.S. alert checks use the National Weather Service API. No API keys are stored in the repository.

## Privacy

This repository contains no private profile data, private family information, or API keys. User demo preferences are stored only in the current browser via `localStorage`.

## Local build

```bash
npm run build
```

The production site is written to `dist/` for Netlify. The build copies the app files plus PNG/SVG/JPG/WebP visual assets so the generated graphics are available in production.

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`

Built by [CapyQueue](https://capyqueue-company.netlify.app/).
