import type { ReactNode } from "react";
import styles from "./Rows.module.css";

/**
 * Label left, value right, each pair on a hairline — HoneyBook's "reserve your
 * spot" list in the site's own grammar. Used by Clases and the biography.
 */
export function Rows({ rows, wide = false }: { rows: (string[] | [string, ReactNode])[]; wide?: boolean }) {
  return (
    <dl className={`${styles.rows} ${wide ? styles.wide : ""}`}>
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
