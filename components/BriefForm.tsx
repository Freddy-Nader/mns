"use client";

import { useId, type FormEvent } from "react";
import { mailtoLink, site, whatsappLink } from "@/content/site";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./BriefForm.module.css";

type Form = Dictionary["encargos"]["form"];

/**
 * Numbered rows on hairlines, after Büro's project brief. There is no
 * backend: submitting composes the brief as a message and opens it in
 * WhatsApp or the visitor's mail client, ready to send.
 */
export function BriefForm({ t }: { t: Form }) {
  const id = useId();
  const choices = [
    { name: "que", ...t.que },
    { name: "para", ...t.para },
    { name: "instrumentos", ...t.instrumentos },
    { name: "cuando", ...t.cuando },
  ] as const;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const m = t.message;
    const lines = [
      m.greeting,
      "",
      ...(["que", "para", "instrumentos", "cuando", "detalles"] as const)
        .filter((k) => get(k))
        .map((k) => `• ${m[k]}: ${get(k)}`),
      "",
      `— ${get("nombre")}`,
    ];
    const text = lines.join("\n");
    const submitter = (e.nativeEvent as SubmitEvent).submitter;
    if (submitter?.getAttribute("value") === "email") {
      window.location.href = mailtoLink(site.email, `${m.subject}: ${get("que")}`, text);
    } else {
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} aria-label={t.label}>
      {choices.map((q, i) => (
        <div key={q.name} className={styles.row} role="radiogroup" aria-labelledby={`${id}-${q.name}`}>
          <p id={`${id}-${q.name}`} className={styles.q}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            {q.label}
          </p>
          <div className={styles.chips}>
            {q.options.map((o) => (
              <label key={o} className={styles.chip}>
                <input type="radio" name={q.name} value={o} required={q.name === "que"} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className={styles.row}>
        <label className={styles.q} htmlFor={`${id}-detalles`}>
          <span className={styles.num}>05</span>
          <span>
            {t.detalles.label} <span className={styles.optional}>({t.optional})</span>
          </span>
        </label>
        <textarea
          id={`${id}-detalles`}
          name="detalles"
          rows={4}
          className={styles.field}
          placeholder={t.detalles.placeholder}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.q} htmlFor={`${id}-nombre`}>
          <span className={styles.num}>06</span>
          {t.nombre.label}
        </label>
        <input
          id={`${id}-nombre`}
          name="nombre"
          required
          autoComplete="name"
          className={styles.field}
          placeholder={t.nombre.placeholder}
        />
      </div>

      <div className={styles.actions}>
        <button className="btn" type="submit" value="whatsapp">
          {t.whatsapp}
        </button>
        <button className="btn btn--ghost" type="submit" value="email">
          {t.email}
        </button>
      </div>
      <p className={styles.privacy}>{t.privacy}</p>
    </form>
  );
}
