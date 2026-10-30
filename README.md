# JACK HR / de4fC_ssette demo site

Next.js 14 + Tailwind. No database, no env vars.

## Deploy from your phone
1. Upload this folder to a new GitHub repo (or unzip in a Codespace and push).
2. On vercel.com choose Add New > Project, import the repo, press Deploy.

## Edit content
- All text, tracks, stories and links: lib/data.js
- Real audio: put the three .wav files in public/audio (names in public/audio/README.txt)
- Real art: replace public/images/knight.svg with a PNG/JPG and update the path in app/page.js (Art component)
- SoundCloud: if the short link will not embed, paste the full track URL into artist.featured.url
