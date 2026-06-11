import { Accordion } from "@base-ui/react/accordion";
import { ArrowUpRight, ChevronRight } from "lucide-react";

type Narrative = {
  title: string;
  summary: string;
  href: string;
};

export default function NarrativeIndex({
  narratives,
}: {
  narratives: Narrative[];
}) {
  const firstValue = narratives[0]
    ? `0-${narratives[0].href}-${narratives[0].title}`
    : undefined;

  return (
    <Accordion.Root
      className="grid overflow-hidden rounded-lg border border-border bg-surface/75 shadow-[0_18px_70px_rgba(0,0,0,0.18)]"
      defaultValue={firstValue ? [firstValue] : []}
      multiple
    >
      {narratives.map((item, index) => (
        <Accordion.Item
          className="overflow-hidden border-b border-border/80 bg-surface/45 transition-colors last:border-b-0 data-[open]:bg-surface"
          key={`${index}-${item.href}-${item.title}`}
          value={`${index}-${item.href}-${item.title}`}
        >
          <Accordion.Header>
            <Accordion.Trigger className="group grid w-full grid-cols-[3rem_minmax(0,1fr)_1.25rem] items-center gap-4 px-5 py-5 text-left text-lg font-semibold text-foreground transition-colors hover:bg-surface-2/80">
              <span className="font-mono text-base text-accent transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="leading-6">{item.title}</span>
              <ChevronRight
                aria-hidden="true"
                className="h-4 w-4 justify-self-end text-accent transition-transform group-data-[panel-open]:rotate-90"
                strokeWidth={1.8}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="border-t border-border/80 bg-background/20 px-5 py-5 sm:px-[5.5rem]">
            <p className="max-w-3xl text-base leading-7 text-muted">
              {item.summary}
            </p>
            <a
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-accent/60 bg-surface/80 px-3.5 py-2 text-sm font-medium text-accent no-underline transition-colors hover:border-accent hover:bg-surface-2 hover:text-accent-strong"
              href={item.href}
            >
              Read full rebuttal
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
