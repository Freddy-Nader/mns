"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./VideoShowcase.module.css";

export type ShowcaseVideo = {
  id: string;
  obra: string;
  autor: string;
  nota: string;
  posterHD?: boolean;
  score?: { href: string; label: string };
};

const poster = (v: ShowcaseVideo) =>
  `https://i.ytimg.com/vi/${v.id}/${v.posterHD ? "maxresdefault" : "sddefault"}.jpg`;
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

/**
 * A featured player with the rest listed beside it. Nothing loads from
 * YouTube until someone presses play — the poster is a plain image — and the
 * embed uses the no-cookie domain.
 */
export function VideoShowcase({
  videos,
  labels,
}: {
  videos: ShowcaseVideo[];
  labels: { play: string; playing: string; more: string };
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const main = useRef<HTMLDivElement>(null);
  const v = videos[active];

  const choose = (i: number) => {
    setActive(i);
    setPlaying(true);
    // On narrow screens the player sits above the list.
    main.current?.scrollIntoView({ block: "nearest" });
  };

  return (
    <div className={styles.grid}>
      <div ref={main}>
        <div className={styles.frame}>
          {playing ? (
            <iframe
              key={v.id}
              src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
              title={`${v.autor}: ${v.obra}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className={styles.poster}
              onClick={() => setPlaying(true)}
              aria-label={`${labels.play}: ${v.autor}, ${v.obra}`}
            >
              <Image src={poster(v)} alt="" fill sizes="(min-width: 1000px) 66vw, 100vw" />
              <span className={styles.play} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className={styles.caption}>
          <div>
            <p className={styles.autor}>{v.autor}</p>
            <h3 className={styles.obra}>{v.obra}</h3>
            <p className={styles.nota}>{v.nota}</p>
          </div>
          {v.score && (
            <a
              className="btn btn--ghost btn--small"
              href={v.score.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {v.score.label}
            </a>
          )}
        </div>
      </div>

      <ol className={styles.list} aria-label={labels.more}>
        {videos.map((x, i) => (
          <li key={x.id}>
            <button
              type="button"
              className={styles.item}
              aria-current={i === active ? "true" : undefined}
              onClick={() => choose(i)}
            >
              <span className={styles.thumb}>
                <Image src={thumb(x.id)} alt="" width={320} height={180} />
              </span>
              <span className={styles.itemText}>
                <span className={styles.itemAutor}>{x.autor}</span>
                <span className={styles.itemObra}>{x.obra}</span>
                <span className={styles.itemNota}>{i === active ? labels.playing : x.nota}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
