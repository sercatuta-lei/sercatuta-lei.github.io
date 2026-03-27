import PasswordProtected from "@/components/PasswordProtected";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const resources = [
  {
    title: "How to Read a Paper",
    author: "S. Keshav",
    venue: "ACM SIGCOMM Computer Communication Review, 2007",
    href: "http://ccr.sigcomm.org/online/files/p83-keshavA.pdf",
    category: "Conducting solid research",
    why: [
      "Introduces the three-pass method for efficiently reading research papers and conducting literature surveys.",
    ],
  },
  {
    title: "The Big LLM Architecture Comparison",
    author: null,
    venue: null,
    href: "https://share.google/Fd4Bly5zkWyJiRwhd",
    category: "LLM foundations / architecture",
    why: [
      "This survey covers key LLM design patterns such as MoE, gated networks, MLA, GQA, sliding-window attention, and Delta Attention, offering a quick understanding of how architectures are evolving and where they’re headed.",
    ],
  },
  {
    title: "Interpretable Machine Learning",
    author: "Christoph Molnar",
    venue: "Online book",
    href: "https://christophm.github.io/interpretable-ml-book/",
    category: "Interpretability",
    why: [
      "Relevant for anyone starting out in interpretability research: a broad, practical overview of interpretability methods and concepts.",
    ],
  },
];

export default function ResourcesPage() {
  const RESOURCES_PASSWORD_HASH =
    "c88d15cc19d169a10b7643d64c8ac8835c1295c1d4aa44ff493520856c2d310d"; // SHA-256 of "sercutalei@123"

  return (
    <PasswordProtected
      passwordHash={RESOURCES_PASSWORD_HASH}
      sessionKey="resourcesSessionTimestamp"
      title="Lab Resources"
      description="Enter password to access lab resources"
    >
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Lab Resources
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-300 mb-10">
          Curated reading and references for the lab.
        </p>

        <div className="space-y-6">
          {resources.map((r) => (
            <Card
              key={r.href}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-slate-200/60 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge
                    variant="outline"
                    className="border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/40"
                  >
                    {r.category}
                  </Badge>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 underline-offset-4 hover:underline transition-colors"
                  >
                    {r.title}
                  </a>
                </h2>
                {(r.author || r.venue) && (
                  <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">
                    {[r.author, r.venue].filter(Boolean).join(" · ")}
                  </p>
                )}
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-gray-400">
                    Why it&apos;s useful
                  </p>
                  {r.why.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-slate-600 dark:text-gray-300 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PasswordProtected>
  );
}
