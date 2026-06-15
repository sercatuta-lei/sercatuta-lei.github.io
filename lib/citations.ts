import type { Publication } from "@/app/publications/data";

// Citation export helpers. Generated from the existing publication fields, so
// they're "good enough" rather than perfect — author strings in the data use a
// few different conventions, so the split is best-effort.

const BIBTEX_TYPE: Record<Publication["type"], string> = {
  conference: "inproceedings",
  workshop: "inproceedings",
  journal: "article",
  book: "incollection",
};

function splitAuthors(authors: string): string[] {
  // Entries use ";" between "Last, First" names, or "," between "First Last".
  const sep = authors.includes(";") ? ";" : ",";
  return authors
    .split(sep)
    .map((s) => s.trim())
    .filter(Boolean);
}

function lastName(author: string): string {
  const a = author.trim();
  if (a.includes(",")) return a.split(",")[0].trim();
  const parts = a.split(/\s+/);
  return parts[parts.length - 1] || a;
}

function citeKey(pub: Publication): string {
  const list = splitAuthors(pub.authors);
  const first = list.length ? lastName(list[0]) : "ref";
  const word = (pub.title.match(/[A-Za-z0-9]+/) || ["ref"])[0];
  return `${first}${pub.year}${word}`.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
}

export function toBibTeX(pub: Publication): string {
  const entry = BIBTEX_TYPE[pub.type] ?? "misc";
  const venueField = pub.type === "journal" ? "journal" : "booktitle";
  const authors = splitAuthors(pub.authors).join(" and ");
  const lines = [
    `@${entry}{${citeKey(pub)},`,
    `  title     = {${pub.title}},`,
    `  author    = {${authors}},`,
    `  ${venueField} = {${pub.venue}},`,
    `  year      = {${pub.year}},`,
  ];
  if (pub.url) lines.push(`  url       = {${pub.url}},`);
  lines.push("}");
  return lines.join("\n");
}

export function toAPA(pub: Publication): string {
  const authors = pub.authors.trim().replace(/\s*;\s*/g, "; ");
  const base = `${authors} (${pub.year}). ${pub.title}. ${pub.venue}.`;
  return pub.url ? `${base} ${pub.url}` : base;
}
