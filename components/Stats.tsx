import styles from "./Stats.module.css";

/** Four numbers in Anton on a 2px rule: reach and scale at a glance. */
export function Stats({ stats }: { stats: readonly { n: string; l: string }[] }) {
  return (
    <ul className={styles.stats}>
      {stats.map((s) => (
        <li key={s.l}>
          <span className={styles.n}>{s.n}</span>
          <span className={styles.l}>{s.l}</span>
        </li>
      ))}
    </ul>
  );
}
