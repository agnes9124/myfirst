"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const BARS = 72;
const FADE = 1.5; // seconds of fade-out at the end of a song and fade-in at the start of the next
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// stable pseudo-random peaks per track so the waveform looks real
function peaks(seed) {
  let x = [...seed].reduce((a, c) => a + c.charCodeAt(0), 7);
  return Array.from({ length: BARS }, (_, i) => {
    x = (x * 9301 + 49297) % 233280;
    const env = 0.35 + 0.65 * Math.abs(Math.sin(i / 9 + seed.length));
    return Math.max(0.12, Math.min(1, (x / 233280) * 0.7 * env + 0.25 * env));
  });
}

export default function Player({ tracks }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [demo, setDemo] = useState(false);
  const audio = useRef(null);
  const pos = useRef(0); // demo clock
  const advance = useRef(() => {});
  const track = tracks[i];
  const bars = useMemo(() => peaks(track.title), [track.title]);
  const a = () => audio.current;
  const dur = () => (!demo && a() && isFinite(a().duration) ? a().duration : track.seconds);
  const pct = Math.min(1, t / track.seconds);

  // go to the next song automatically; stop after the last one
  advance.current = () => {
    if (i < tracks.length - 1) setI(i + 1);
    else { setPlaying(false); setT(0); pos.current = 0; }
  };

  // load a track (starts silent, the ticker fades it in)
  useEffect(() => {
    pos.current = 0;
    setT(0);
    setDemo(false);
    const el = a();
    el.src = encodeURI(track.file);
    el.volume = 0;
    el.load();
    if (playing) el.play().catch(() => setDemo(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  // clock + fades
  useEffect(() => {
    const el = a();
    if (!playing) { el.pause(); return; }
    if (!demo) el.play().catch(() => setDemo(true));
    const id = setInterval(() => {
      const cur = demo ? (pos.current += 0.1) : el.currentTime;
      const d = dur();
      const vol = Math.max(0, Math.min(1, cur / FADE, (d - cur) / FADE));
      if (!demo) el.volume = vol;
      setT(cur);
      if (d - cur <= 0.12) advance.current();
    }, 100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, demo, i]);

  const seek = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const v = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * dur();
    pos.current = v;
    setT(v);
    if (!demo) a().currentTime = v;
  };

  return (
    <div className="border border-violet/50 bg-black/50 p-4 sm:p-6">
      <audio ref={audio} preload="metadata" onError={() => setDemo(true)} onEnded={() => advance.current()} />
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-display text-2xl sm:text-3xl">{track.title}</p>
          <p className="text-xs text-white/50">{demo ? "Demo mode: audio file not added yet" : "Custom player"}</p>
        </div>
        <button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}
          className="btn h-14 w-14 shrink-0 !p-0 text-xl">{playing ? "❚❚" : "▶"}</button>
      </div>
      <div onClick={seek} role="slider" aria-label="Seek" aria-valuenow={Math.round(pct * 100)} tabIndex={0}
        className="flex h-24 cursor-pointer items-center gap-[2px] sm:h-28">
        {bars.map((b, n) => (
          <span key={n} style={{ height: `${b * 100}%` }}
            className={`flex-1 transition-colors duration-300 ${n / BARS < pct ? "bg-neon shadow-[0_0_8px_#ff003c]" : "bg-violet/50"}`} />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-white/60"><span>{fmt(t)}</span><span>{track.length}</span></div>
      <ul className="mt-5 divide-y divide-white/10 border-t border-white/10">
        {tracks.map((k, n) => (
          <li key={k.file}>
            <button onClick={() => { if (n === i) setPlaying(!playing); else { setI(n); setPlaying(true); } }}
              className={`flex w-full items-center justify-between py-3 text-left text-sm hover:text-neon ${n === i ? "text-neon" : ""}`}>
              <span>{n === i && playing ? "▶ " : ""}{k.title}</span><span className="text-white/50">{k.length}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
