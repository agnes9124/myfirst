"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const BARS = 72;
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
  const track = tracks[i];
  const bars = useMemo(() => peaks(track.title), [track.title]);
  const pct = Math.min(1, t / track.seconds);

  // load the track
  useEffect(() => {
    setT(0);
    setDemo(false);
    const a = audio.current;
    a.src = encodeURI(track.file);
    a.load();
    if (playing) a.play().catch(() => setDemo(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  // real audio clock, or a demo clock when the file is missing
  useEffect(() => {
    const a = audio.current;
    if (!playing) { a.pause(); return; }
    if (!demo) a.play().catch(() => setDemo(true));
    const id = setInterval(() => {
      setT((p) => (demo ? p + 0.25 : a.currentTime));
    }, 250);
    return () => clearInterval(id);
  }, [playing, demo]);

  useEffect(() => { if (t >= track.seconds) { setPlaying(false); setT(0); } }, [t, track.seconds]);

  const seek = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const v = ((e.clientX - r.left) / r.width) * track.seconds;
    setT(v);
    if (!demo) audio.current.currentTime = v;
  };

  return (
    <div className="border border-violet/50 bg-black/50 p-4 sm:p-6">
      <audio ref={audio} preload="none" onError={() => setDemo(true)} onEnded={() => setPlaying(false)} />
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
            className={`flex-1 ${n / BARS < pct ? "bg-neon shadow-[0_0_8px_#ff003c]" : "bg-violet/50"}`} />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-white/60"><span>{fmt(t)}</span><span>{track.length}</span></div>
      <ul className="mt-5 divide-y divide-white/10 border-t border-white/10">
        {tracks.map((k, n) => (
          <li key={k.file}>
            <button onClick={() => { setI(n); setPlaying(true); }}
              className={`flex w-full items-center justify-between py-3 text-left text-sm hover:text-neon ${n === i ? "text-neon" : ""}`}>
              <span>{n === i && playing ? "▶ " : ""}{k.title}</span><span className="text-white/50">{k.length}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
