"use client";
import { useEffect, useRef, useState } from "react";
import Player from "./Player";

export default function MusicGrid({ releases }) {
  const [open, setOpen] = useState(null);
  const panel = useRef(null);
  const rel = releases.find((r) => r.id === open);

  useEffect(() => {
    if (open && panel.current) panel.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open]);

  return (
    <>
      {rel && (
        <div ref={panel} className="mb-10 scroll-mt-20">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="truncate font-display text-3xl sm:text-4xl">{rel.title}</h3>
            <button onClick={() => setOpen(null)} className="btn shrink-0 !px-4 !py-2 text-sm" aria-label="Close player">✕ Close</button>
          </div>
          <Player key={rel.id} id={`rel-${rel.id}`} tracks={rel.tracks} autoStart />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {releases.map((r) => {
          const playable = !!(r.tracks && r.tracks.length);
          const Tag = playable ? "button" : "div";
          return (
            <Tag key={r.id} onClick={playable ? () => setOpen(r.id) : undefined}
              className={`group block text-left ${playable ? "cursor-pointer" : ""}`}>
              <div className="relative">
                <div className={`gl-wrap scan relative aspect-square overflow-hidden border bg-black ${open === r.id ? "border-neon" : "border-white/10 group-hover:border-neon"}`}>
                  <img src="/images/knight.svg" alt="" loading="lazy" className="gl-img h-full w-full object-cover"
                    style={{ objectPosition: "50% 30%", filter: `hue-rotate(${r.hue}deg)` }} />
                </div>
                {playable && (
                  <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center bg-neon text-lg shadow-[0_0_20px_#ff003c]">▶</span>
                )}
              </div>
              <p className="mt-3 truncate font-display text-xl sm:text-2xl">{r.title}</p>
              <p className="text-xs text-white/50">{[r.type, r.year].filter(Boolean).join(", ")}</p>
            </Tag>
          );
        })}
      </div>
    </>
  );
}
