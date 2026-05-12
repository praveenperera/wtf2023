import { Tabs } from "@base-ui/react/tabs";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Copy,
  Pickaxe,
  Server,
  User,
} from "lucide-react";

type RoleAction =
  | string
  | {
      label: string;
      href: string;
      note?: string;
    };

type Role = {
  id: string;
  label: string;
  summary: string;
  actions: RoleAction[];
  code?: string;
  href: string;
};

export default function RoleActions({ roles }: { roles: Role[] }) {
  const roleIcons = {
    "node-runner": Server,
    miner: Pickaxe,
    developer: Code2,
    pleb: User,
  } as const;
  const sectionIconClass = "size-7 shrink-0 text-accent";
  const sectionLabelClass =
    "font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-dim whitespace-nowrap";

  return (
    <Tabs.Root
      className="overflow-hidden rounded-lg border border-border bg-surface text-foreground shadow-[0_24px_90px_color-mix(in_srgb,var(--foreground)_14%,transparent)]"
      defaultValue={roles[0]?.id}
    >
      <div className="lg:grid lg:grid-cols-[22rem_minmax(0,1fr)]">
        <Tabs.List
          className="grid grid-cols-2 gap-2 border-b border-border bg-surface-2 p-2 sm:grid-cols-4 lg:grid-cols-1 lg:gap-3 lg:border-r lg:border-b-0 lg:p-3"
          aria-label="Role actions"
        >
          {roles.map((role) => {
            const Icon = roleIcons[role.id as keyof typeof roleIcons] ?? User;

            return (
              <Tabs.Tab
                className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-transparent px-3 py-2.5 text-center text-sm font-medium text-muted transition hover:border-border hover:bg-surface aria-selected:border-accent aria-selected:bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface))] aria-selected:text-accent lg:min-h-24 lg:justify-start lg:gap-4 lg:px-5 lg:text-left lg:text-lg"
                key={role.id}
                value={role.id}
              >
                <Icon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-dim transition group-aria-selected:text-accent lg:size-7"
                  strokeWidth={1.8}
                />
                <span className="min-w-0 truncate">{role.label}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="ml-auto hidden size-5 text-dim transition group-aria-selected:text-accent lg:block"
                  strokeWidth={1.8}
                />
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        <div className="min-w-0">
          {roles.map((role) => (
            <Tabs.Panel
              className="p-4 sm:p-5 lg:p-0"
              key={role.id}
              value={role.id}
            >
              <div className="divide-y divide-border">
                <div className="grid gap-4 py-5 lg:px-8 lg:py-8 xl:grid-cols-[12.5rem_minmax(0,1fr)]">
                  <div className="flex items-center gap-4 border-border xl:border-r xl:pr-6">
                    {(() => {
                      const Icon =
                        roleIcons[role.id as keyof typeof roleIcons] ?? User;

                      return (
                        <Icon
                          aria-hidden="true"
                          className={sectionIconClass}
                          strokeWidth={1.7}
                        />
                      );
                    })()}
                    <p className={sectionLabelClass}>Summary</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight text-foreground">
                      {role.label}
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
                      {role.summary}
                    </p>
                  </div>
                </div>

                <a
                  className="grid gap-4 py-5 text-foreground no-underline transition hover:bg-surface-2 hover:text-foreground lg:px-8 lg:py-7 xl:grid-cols-[12.5rem_minmax(0,1fr)_2rem]"
                  href={role.href}
                >
                  <div className="flex items-center gap-4 border-border xl:border-r xl:pr-6">
                    <ArrowRight
                      aria-hidden="true"
                      className={sectionIconClass}
                      strokeWidth={1.7}
                    />
                    <p className={sectionLabelClass}>Full instructions</p>
                  </div>
                  <p className="max-w-3xl text-base leading-7 text-muted">
                    Open the complete role guide and source-backed context.
                  </p>
                  <ArrowRight
                    aria-hidden="true"
                    className="hidden size-5 self-center justify-self-end text-accent lg:block"
                    strokeWidth={1.8}
                  />
                </a>

                <div className="grid gap-4 py-5 lg:px-8 lg:py-7 xl:grid-cols-[12.5rem_minmax(0,1fr)]">
                  <div className="flex items-center gap-4 border-border xl:border-r xl:pr-6">
                    <CheckCircle2
                      aria-hidden="true"
                      className={sectionIconClass}
                      strokeWidth={1.7}
                    />
                    <p className={sectionLabelClass}>Next steps</p>
                  </div>
                  <ul className="grid max-w-4xl gap-3">
                    {role.actions.map((action) => {
                      const isLinked = typeof action !== "string";
                      const label = isLinked ? action.label : action;

                      return (
                        <li key={label}>
                          {isLinked ? (
                            <a
                              className="block rounded-md border border-border bg-surface-2 px-4 py-3 text-sm leading-6 text-foreground no-underline transition hover:border-accent/45 hover:bg-[color-mix(in_srgb,var(--accent)_7%,var(--surface))]"
                              href={action.href}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <span className="font-medium">
                                {action.label}
                              </span>
                              {action.note ? (
                                <span className="mt-1 block text-sm leading-6 text-muted">
                                  {action.note}
                                </span>
                              ) : null}
                            </a>
                          ) : (
                            <div className="rounded-md border border-border bg-surface-2 px-4 py-3 text-sm font-medium leading-6 text-foreground">
                              {action}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {role.code ? (
                  <div className="grid gap-4 py-5 lg:px-8 lg:py-7 xl:grid-cols-[12.5rem_minmax(0,1fr)]">
                    <div className="flex items-center gap-4 border-border xl:border-r xl:pr-6">
                      <Copy
                        aria-hidden="true"
                        className={sectionIconClass}
                        strokeWidth={1.7}
                      />
                      <p className={sectionLabelClass}>Policy snippet</p>
                    </div>
                    <pre className="min-w-0 overflow-x-auto rounded-md border border-border bg-background p-4 text-sm leading-7 text-foreground shadow-sm">
                      <code>{role.code}</code>
                    </pre>
                  </div>
                ) : null}
              </div>
            </Tabs.Panel>
          ))}
        </div>
      </div>
    </Tabs.Root>
  );
}
