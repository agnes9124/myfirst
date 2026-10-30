// EDIT THIS FILE to change all text, tracks, links and images on the site.
export const artist = {
  name: "JACK HR",
  alias: "de4fC_ssette",
  tagline: "Holy Fuck. What the Fu...",
  soundcloudUser: "https://soundcloud.com/", // swap in the real profile URL
  featured: {
    title: "03-05-LOVESONG(s1ng_th1s)-[DEMO;2025]",
    url: "https://on.soundcloud.com/3JxNIOmtwL6h0xrdPb",
  },
};

// Custom player. Put audio files in /public/audio and match the names below. mp3 is best (small, fast).
// If a file is missing, the player runs in demo mode so the client can still see the UI.
export const wavs = [
  // Album: Cognitive Dissonance (real audio, converted to mp3)
  { title: "Horrorwave (Take One)", file: "/audio/horrorwave-take-one.mp3", length: "5:30", seconds: 330 },
  { title: "Horrorwave (Take Two)", file: "/audio/horrorwave-take-two.mp3", length: "6:13", seconds: 373 },
  { title: "Horrorwave (Take Three)", file: "/audio/horrorwave-take-three.mp3", length: "3:41", seconds: 221 },
  // Placeholders: demo mode until these files are added
  { title: "MessageInABottle", file: "/audio/MessageInABottle.wav", length: "4:12", seconds: 252 },
  { title: "Sir Duke (Noise)", file: "/audio/Sir Duke (Noise).wav", length: "3:56", seconds: 236 },
  { title: "Sir Duke", file: "/audio/Sir Duke.wav", length: "3:56", seconds: 236 },
];

// hue = colour shift applied to the placeholder knight art
export const releases = [
  { title: "Cognitive Dissonance", type: "Album", year: "2022", hue: -30 },
  { title: "s1ng_th1s", type: "Demo", year: "2025", hue: 0 },
  { title: "MessageInABottle", type: "Single", year: "2025", hue: 40 },
  { title: "Sir Duke (Noise)", type: "Edit", year: "2025", hue: -50 },
  { title: "PIXEL_GRAVE", type: "EP", year: "2025", hue: 90 },
  { title: "nightcore.exe", type: "Single", year: "2024", hue: -20 },
  { title: "red_eyes_open", type: "Single", year: "2024", hue: 160 },
];

export const stories = [
  { title: "Holy Fuck. What the Fu...", tag: "Short story", read: "6 min", excerpt: "The sword was already in my hand when the power cut out. Somewhere behind the static, a voice kept counting backwards, and every number came out in red." },
  { title: "Saturday Static", tag: "Journal", read: "3 min", excerpt: "I wrote the whole hook on a dead phone screen, then lost it. This is what I remember, and what I made up to fill the gaps." },
  { title: "Eyes Like Warning Lights", tag: "Short story", read: "8 min", excerpt: "He never took the helmet off. People said there was nothing underneath. People were wrong, and that was worse." },
];

// h = tile height in the masonry gallery, pos = crop of the placeholder art
export const gallery = [
  { alt: "Knight, red sky", hue: 0, pos: "50% 20%", h: "h-80" },
  { alt: "Visor close-up", hue: 30, pos: "50% 28%", h: "h-56" },
  { alt: "Blade study", hue: -40, pos: "50% 85%", h: "h-72" },
  { alt: "Static portrait", hue: 100, pos: "50% 40%", h: "h-64" },
  { alt: "Glitch frame", hue: 150, pos: "30% 50%", h: "h-52" },
  { alt: "Night shift", hue: -80, pos: "50% 60%", h: "h-80" },
];

export const links = [
  { label: "SoundCloud", sub: "de4fC_ssette", href: "https://soundcloud.com/" },
  { label: "Discord", sub: "Join the server", href: "https://discord.com/" },
  { label: "TikTok", sub: "@de4fC_ssette", href: "https://tiktok.com/" },
  { label: "Instagram", sub: "@de4fc_ssette", href: "https://instagram.com/" },
  { label: "YouTube", sub: "Visuals and edits", href: "https://youtube.com/" },
];

export const contactEmail = "booking@example.com";
