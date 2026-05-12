import { ChevronRight } from "lucide-react";

type Category = {
  label: string;
  kind: string;
  share?: number;
  note: string;
};

type PressureMapData = {
  fetchedAt: string;
  source: string;
  sourceUrl?: string;
  notes: string[];
  categories: Category[];
};

const colors: Record<string, string> = {
  payments: "var(--payment)",
  inscriptions: "var(--accent)",
  bareMultisig: "var(--utxo)",
  opReturn: "var(--purple)",
  other: "var(--other)",
};

const pressureSteps = [
  {
    label: "Relay",
    body: "Node policy decides what ordinary peers forward.",
  },
  {
    label: "Fees",
    body: "Every included byte competes in the same block auction.",
  },
  {
    label: "Validation",
    body: "UTXO-heavy data leaves long-lived costs for node operators.",
  },
];

function hasShare(
  category: Category,
): category is Category & { share: number } {
  return typeof category.share === "number";
}

function getCategoryColor(category: Category) {
  return colors[category.kind] ?? colors.other;
}

export default function BlockspacePressureMap({
  data,
}: {
  data: PressureMapData;
}) {
  const knownCategories = data.categories.filter(hasShare);
  const unknownCategories = data.categories.filter(
    (category) => !hasShare(category),
  );
  const shareSummary = knownCategories
    .map((category) => `${category.label} about ${category.share}%`)
    .join(", ");

  return (
    <section
      className="section-band"
      id="pressure-map"
      aria-labelledby="pressure-map-title"
    >
      <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
          <div>
            <p className="section-label">Blockspace pressure map</p>
            <h2
              id="pressure-map-title"
              className="mt-3 max-w-md text-3xl font-semibold leading-tight md:text-5xl"
            >
              Spam competes for the same scarce blockspace payments use
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              The important relationship is not just transaction count. Activity
              enters through relay and private channels, then ends up competing
              for included blockspace, fee priority, and node resources.
            </p>
            <a
              className="command-link mt-6 border-accent/55 text-accent"
              href="/stats-about-spam/"
            >
              <span>Explore mempool data</span>
              <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
            </a>
          </div>

          <div className="data-panel p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  Shared blockspace
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  One fee market, competing uses
                </h3>
              </div>
              <span className="rounded-md border border-border bg-background/45 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-dim">
                Approximate map
              </span>
            </div>

            <div
              aria-label={`Approximate category shares: ${shareSummary}`}
              className="mt-6 rounded-md border border-border bg-background/45 p-3"
              role="img"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-dim">
                  Approx. share during Feb-Mar 2023
                </p>
                <p className="text-xs text-muted">Known shares only</p>
              </div>
              <div className="flex h-10 overflow-hidden rounded-sm bg-surface-2">
                {knownCategories.map((category) => (
                  <span
                    key={`${category.kind}-${category.label}`}
                    style={{
                      width: `${category.share}%`,
                      backgroundColor: getCategoryColor(category),
                    }}
                    title={`${category.label}: ~${category.share}%`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem]">
              <div className="overflow-hidden rounded-md border border-border">
                <div className="hidden grid-cols-[0.85fr_0.75fr_1.25fr] border-b border-border bg-surface-2/55 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-dim sm:grid">
                  <span>Category</span>
                  <span>Share</span>
                  <span>Notes</span>
                </div>
                {knownCategories.map((category) => (
                  <div
                    className="grid gap-3 border-b border-border px-3 py-3 last:border-b-0 sm:grid-cols-[0.85fr_0.75fr_1.25fr]"
                    key={`${category.kind}-${category.label}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: getCategoryColor(category) }}
                      />
                      <h4 className="text-sm font-semibold text-foreground">
                        {category.label}
                      </h4>
                    </div>
                    <div className="grid gap-2">
                      <span className="font-mono text-xs text-muted">
                        ~{category.share}%
                      </span>
                      <span className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${category.share}%`,
                            backgroundColor: getCategoryColor(category),
                          }}
                        />
                      </span>
                    </div>
                    <p className="text-xs leading-5 text-muted">
                      {category.note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 border-l border-border pl-4">
                {pressureSteps.map((step) => (
                  <div key={step.label}>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                      {step.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {step.body}
                    </p>
                  </div>
                ))}
                {unknownCategories.map((category) => (
                  <div
                    className="border-t border-border pt-4"
                    key={category.label}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-dim">
                      Path only
                    </p>
                    <h4 className="mt-2 text-sm font-semibold text-foreground">
                      {category.label}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {category.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-4 text-xs leading-5 text-dim">
              <p>
                Source:{" "}
                {data.sourceUrl ? (
                  <a
                    className="font-semibold text-accent no-underline hover:text-accent-strong"
                    href={data.sourceUrl}
                  >
                    {data.source}
                  </a>
                ) : (
                  data.source
                )}{" "}
                · Snapshot: {data.fetchedAt}
              </p>
              <ul className="mt-3 grid gap-1">
                {data.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
