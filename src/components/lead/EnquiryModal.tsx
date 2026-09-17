"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { QuickLeadForm } from "./QuickLeadForm";

/**
 * One enquiry dialog for the whole page.
 *
 * Every "Plan My Trip" / "Book Now" control opens this same dialog, and it
 * contains nothing but the form — no packages, no upsell — so there is only one
 * thing to do once it is open.
 *
 * It also opens itself once, a few seconds in, for visitors who would otherwise
 * read and leave. That auto-open is deliberately limited: once per browser
 * session, never after someone has already opened or dismissed it, and never
 * while another dialog is on screen.
 */

const AUTO_OPEN_DELAY_MS = 4500;
const SESSION_KEY = "ttk:enquiry-shown";

interface EnquiryContextValue {
  open: (reason?: string) => void;
  close: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

/** Opens the shared enquiry dialog from anywhere inside the provider. */
export function useEnquiry(): EnquiryContextValue {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  }
  return context;
}

export function EnquiryProvider({
  children,
  destination = "Himachal Pradesh",
  autoOpen = true,
}: {
  children: ReactNode;
  destination?: string;
  autoOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  // Set as soon as the dialog is shown or dismissed, so the timer can never
  // interrupt someone who has already engaged with it.
  const settled = useRef(false);

  const open = useCallback(() => {
    settled.current = true;
    lastFocused.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    settled.current = true;
    setIsOpen(false);
    lastFocused.current?.focus?.();
  }, []);

  // Auto-open, once per session.
  useEffect(() => {
    if (!autoOpen) return;
    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private browsing or blocked storage: fall back to once per page load.
    }
    if (alreadyShown) return;

    const timer = window.setTimeout(() => {
      if (settled.current) return;
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* nothing to do */
      }
      open();
    }, AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [autoOpen, open]);

  // Escape to close, and keep Tab inside the dialog while it is open.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    // Locking the body with `overflow: hidden` alone lets iOS Safari jump the
    // page to the top, so the position is captured and restored on close.
    const scrollY = window.scrollY;
    const previous = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    // Focus the first field rather than the close button.
    window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("input")?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous.overflow;
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, close]);

  return (
    <EnquiryContext.Provider value={{ open, close }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-ink-900/60 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          {/*
            The scroll container is this outer div and the flex lives on an
            inner wrapper with `min-h-full`. Centring (or end-aligning) a flex
            child taller than its container makes the overflow at the *start*
            edge unreachable — scrollTop cannot go negative — which put the
            close button above the top of the screen on phones with no way to
            scroll to it. This structure keeps the whole dialog reachable.
          */}
          <div
            className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-title"
              className="relative w-full max-w-md rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
            >
              {/* Sticky so the close button stays on screen however far the
                  form is scrolled, and whatever the keyboard does to the
                  viewport. */}
              <div className="sticky top-0 z-10 rounded-t-3xl bg-white px-6 pb-3 pt-6 sm:px-7 sm:pt-7">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close enquiry form"
                  className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-ink-600/70 transition-colors hover:bg-sand-100 hover:text-ink-900"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>

                <h2
                  id="enquiry-title"
                  className="pr-12 font-display text-xl font-extrabold leading-tight text-ink-900 sm:text-2xl"
                >
                  Plan your {destination} trip
                </h2>
                <p className="mt-1 pr-12 text-sm text-ink-600/75">
                  Four quick answers and a travel expert will call you back.
                </p>
              </div>

              <div className="px-6 pb-6 sm:px-7 sm:pb-7">
                <QuickLeadForm destination={destination} onSubmitted={close} />
              </div>
            </div>
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}

/** A button that opens the shared enquiry dialog. */
export function EnquiryButton({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const { open } = useEnquiry();
  return (
    <button type="button" onClick={() => open()} aria-label={ariaLabel} className={className}>
      {children}
    </button>
  );
}
