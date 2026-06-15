// Canonical registry of people who have an individual updates page.
// Decoupled from updates.json so a person can have a Research feed even if they
// have no weekly-status updates (e.g. alumni, new members). Weekly updates are
// matched from updates.json by slug; research updates from /data/research/<slug>.json.

export interface Person {
  slug: string;
  name: string;
  /** teampic filename; empty for channel-type entries (rendered with a # icon). */
  photo: string;
  /** Slack channel the research feed is pulled from (used by the fetch script). */
  researchChannel: string;
  /** A shared Slack channel (e.g. #general) rather than a person — archive-only,
   *  no Weekly tab, every message shown with its author. */
  isChannel?: boolean;
}

export const PEOPLE: Person[] = [
  { slug: "arjun-dahal", name: "Arjun Dahal", photo: "arjun.jpeg", researchChannel: "arjun-research" },
  { slug: "fadul-sikder", name: "Fadul Sikder", photo: "fadul.jpg", researchChannel: "fadul-research" },
  { slug: "krishna-khadka", name: "Krishna Khadka", photo: "krishna.jpeg", researchChannel: "krishna-research" },
  { slug: "pujan-budhathoki", name: "Pujan Budhathoki", photo: "pujan.png", researchChannel: "pujan-research" },
  { slug: "qiping-wei", name: "Qiping Wei", photo: "qiping.jpg", researchChannel: "qiping-research" },
  { slug: "saif-uddin-mahmud", name: "Saif Uddin Mahmud", photo: "saif-pic.jpg", researchChannel: "saif-research" },
  { slug: "shovon-niverd", name: "Shovon Niverd", photo: "shovon_pereira.jpg", researchChannel: "shovon-research" },
  { slug: "mekdelawit-gebrewold", name: "Mekdelawit Gebrewold", photo: "Mekdelawit.jpg", researchChannel: "mekdelawit-research" },
  { slug: "samreen", name: "Samreen", photo: "samreen.jpeg", researchChannel: "samreen-research" },
  { slug: "sunny-shree", name: "Sunny Shree", photo: "sunny.jpg", researchChannel: "sunny-research" },
  { slug: "general", name: "general", photo: "", researchChannel: "general", isChannel: true },
];

export function getPerson(slug: string): Person | undefined {
  return PEOPLE.find((p) => p.slug === slug);
}
