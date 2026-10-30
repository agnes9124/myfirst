import Player from "../components/Player";
import { artist, wavs, releases, stories, gallery, links, contactEmail } from "../lib/data";

const sc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(artist.featured.url)}&color=%23ff003c&auto_play=false&hide_related=true&show_comments=false&visual=false`;

function Art({ hue = 0, pos = "50% 30%", className = "" }) {
  return (
    <div className={`gl-wrap scan relative overflow-hidden bg-black ${className}`}>
      <img src="/images/knight.svg" alt="" loading="lazy"
        className="gl-img h-full w-full object-cover" style={{ objectPosition: pos, filter: `hue-rotate(${hue}deg)` }} />
    </div>
  );
}

function Title({ children, sub }) {
  return (
    <div className="mb-8 sm:mb-12">
      <h2 className="glitch font-display text-5xl uppercase leading-none sm:text-7xl" data-text={children}>{children}</h2>
      {sub && <p className="mt-3 max-w-xl text-sm text-white/60">{sub}</p>}
    </div>
  );
}

const nav = ["Listen", "Music", "Stories", "Gallery", "About", "Links"];

export default function Home() {
  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-ink/80 px-4 py-3 backdrop-blur sm:px-8">
        <a href="#top" className="font-display text-xl text-neon">JACK HR</a>
        <nav className="flex gap-4 overflow-x-auto text-xs sm:gap-6 sm:text-sm">
          {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-neon">{n}</a>)}
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-24 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(138,43,226,.35),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(255,0,60,.25),transparent_50%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-display text-[22vw] uppercase leading-[.85] sm:text-[11rem] md:text-[8.5rem] lg:text-[10rem]">
              <span className="glitch" data-text="JACK HR">JACK HR</span>
            </h1>
            <p className="mt-3 font-display text-3xl text-violet sm:text-4xl">{artist.alias}</p>
            <p className="mt-6 text-lg text-neon [text-shadow:0_0_14px_rgba(255,0,60,.6)] sm:text-xl">{artist.tagline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={artist.soundcloudUser} className="btn">LISTEN ON SOUNDCLOUD</a>
              <a href="#stories" className="btn btn-alt">READ STORIES</a>
            </div>
          </div>
          <Art className="mx-auto aspect-[3/4] w-full max-w-sm border border-neon/50 shadow-[0_0_60px_rgba(255,0,60,.35)] md:max-w-none" />
        </div>
      </section>

      {/* NOW PLAYING */}
      <section id="listen" className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
        <Title sub="Featured track from SoundCloud, plus the raw files in the custom player.">Now playing</Title>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <iframe title="SoundCloud player" src={sc} width="100%" height="300" allow="autoplay" loading="lazy" className="border border-neon/50" />
            <p className="mt-2 text-xs text-white/50">{artist.featured.title}</p>
          </div>
          <Player tracks={wavs} />
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
        <Title>Music</Title>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {releases.map((r) => (
            <a key={r.title} href="#listen" className="group block">
              <div className="relative">
                <Art hue={r.hue} className="aspect-square border border-white/10 group-hover:border-neon" />
                <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center bg-neon text-lg opacity-100 shadow-[0_0_20px_#ff003c] sm:opacity-0 sm:transition sm:group-hover:opacity-100">▶</span>
              </div>
              <p className="mt-3 truncate font-display text-xl sm:text-2xl">{r.title}</p>
              <p className="text-xs text-white/50">{r.type}, {r.year}</p>
            </a>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
        <Title sub="Short fiction and journal entries.">Stories</Title>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s, n) => (
            <article key={s.title} className={`border border-white/10 bg-white/[.03] p-6 transition hover:border-violet ${n === 0 ? "md:col-span-3 md:grid md:grid-cols-[1fr_2fr] md:gap-8" : ""}`}>
              {n === 0 && <Art pos="50% 30%" hue={20} className="mb-5 aspect-video md:mb-0 md:aspect-auto md:min-h-48" />}
              <div>
                <p className="text-xs text-violet">{s.tag}, {s.read} read</p>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{s.excerpt}</p>
                <a href="#stories" className="mt-5 inline-block text-sm text-neon underline underline-offset-4">Read story</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
        <Title>Gallery</Title>
        <div className="columns-2 gap-4 md:columns-3">
          {gallery.map((g) => (
            <Art key={g.alt} hue={g.hue} pos={g.pos} className={`mb-4 w-full break-inside-avoid border border-white/10 ${g.h}`} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
        <Title>About</Title>
        <div className="max-w-2xl space-y-4 leading-relaxed text-white/80">
          <p>Chettra, known as JACK HR and de4fC_ssette, is a writer, producer and SoundCloud artist. His music sits between nightcore, hyperpop and distorted late-night internet noise.</p>
          <p>He writes the stories that sit next to the songs, and draws the knight that shows up on the covers. Placeholder bio: replace this with his own words.</p>
        </div>
      </section>

      {/* LINKS */}
      <section id="links" className="mx-auto max-w-3xl px-4 py-20 sm:px-8">
        <Title>Links</Title>
        <ul className="space-y-3">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between border border-white/15 px-5 py-4 transition hover:border-neon hover:bg-neon/10 hover:shadow-[0_0_24px_rgba(255,0,60,.3)]">
                <span className="font-display text-2xl">{l.label}</span>
                <span className="text-sm text-white/50">{l.sub}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-4 py-12 text-center sm:px-8">
        <p className="mx-auto inline-block border-2 border-white px-4 py-2 font-display text-xl tracking-wide">PARENTAL ADVISORY<span className="block text-sm font-mono">EXPLICIT CONTENT</span></p>
        <p className="mt-6 text-sm"><a href={`mailto:${contactEmail}`} className="underline underline-offset-4 hover:text-neon">{contactEmail}</a></p>
        <p className="mt-2 text-xs text-white/50">© 2025 JACK HR</p>
      </footer>
    </main>
  );
}
