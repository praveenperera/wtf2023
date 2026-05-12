import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type Route = {
  label: string;
  route: string;
  summary: string;
};

export default function MobileNav({ routes }: { routes: Route[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-grid h-9 w-9 place-items-center rounded-md border border-border bg-surface text-foreground transition hover:bg-surface-2 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={17} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm transition-opacity" />
        <Dialog.Popup className="fixed inset-x-3 top-3 z-50 rounded-lg border border-border bg-surface p-3 shadow-xl lg:hidden">
          <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
            <div>
              <Dialog.Title className="text-sm font-semibold text-foreground">
                Site sections
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-xs text-muted">
                Jump to a section
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="inline-grid h-8 w-8 place-items-center rounded-md border border-border text-foreground"
              aria-label="Close navigation"
            >
              <X size={16} />
            </Dialog.Close>
          </div>
          <nav className="grid gap-1 pt-3" aria-label="Mobile primary">
            <a
              className="rounded-md px-3 py-3 text-sm font-medium text-foreground no-underline hover:bg-surface-2"
              href="/"
              onClick={() => setOpen(false)}
            >
              Home
            </a>
            {routes.map((route) => (
              <a
                className="rounded-md px-3 py-3 text-sm font-medium text-foreground no-underline hover:bg-surface-2"
                href={route.route}
                key={route.route}
                onClick={() => setOpen(false)}
              >
                <span className="block">{route.label}</span>
                <span className="mt-1 block text-xs font-normal text-muted">
                  {route.summary}
                </span>
              </a>
            ))}
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
