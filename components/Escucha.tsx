import { site } from "@/content/site";
import { partituras } from "@/content/partituras";
import { canalVideos, videos } from "@/content/videos";
import { fill, formatMXN, getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { VideoShowcase, type ShowcaseVideo } from "./VideoShowcase";
import styles from "./Escucha.module.css";

/**
 * Video first, best first. Where he sells the score of what he is playing,
 * the recording is its free sample and the link to buy sits under it.
 */
export function Escucha({ lang }: { lang: Locale }) {
  const d = getDictionary(lang).escucha;
  const items: ShowcaseVideo[] = videos.map((v) => {
    const score = partituras.find((p) => p.slug === v.partitura);
    return {
      id: v.id,
      obra: v.obra,
      autor: v.autor,
      nota: v.nota[lang],
      posterHD: v.posterHD,
      score: score && { href: score.url, label: `${d.score} · ${formatMXN(score.precioMXN)}` },
    };
  });

  return (
    <section id="escucha" className="dark on-dark section wrap">
      <div className="section-head">
        <h2 className="display">{d.title}</h2>
        <p>{d.intro}</p>
      </div>
      <VideoShowcase videos={items} labels={{ play: d.play, playing: d.playing, more: d.more }} />
      <p className={styles.channel}>
        <a className="arrow" href={site.social.youtube} target="_blank" rel="noopener noreferrer">
          {fill(d.channel, { n: canalVideos })}
        </a>
      </p>
    </section>
  );
}
