import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Pause,
  Play,
  Star,
  X,
  MessageCircle,
  Phone,
  Calendar,
  Layers,
  CheckCircle2,
  Quote,
  Sparkles,
} from "lucide-react";
import { SITE, REVIEWS, reviewsLink, waPackageLink, waTestLink } from "@/lib/site";
import {
  HOME_PACKAGES,
  HOME_TESTS,
  type HomePackageCard,
  type HomeTestCard,
} from "@/lib/home-cards";
import { PACKAGES_DATA, resolvePackageInclusions } from "@/lib/packages-data";
import { BRAND_LOGOS } from "@/lib/images";
import { PackageIllustration } from "@/components/package-illustration";

function SectionHead({
  title,
  text,
  link,
}: {
  title: string;
  text: string;
  link: { to: "/packages" | "/tests"; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">{title}</h2>
        <p className="mt-3 text-lg text-muted-foreground">{text}</p>
      </div>
      <Link to={link.to} className="link-u text-navy font-semibold">
        {link.label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* ---------------- Packages Section ---------------- */
export function PackagesSection() {
  const [selectedPkg, setSelectedPkg] = useState<HomePackageCard | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = (pkg: HomePackageCard, btn: HTMLButtonElement) => {
    triggerRef.current = btn;
    setSelectedPkg(pkg);
  };

  const handleClose = () => {
    setSelectedPkg(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <section className="border-t bg-soft">
      <div className="container-site py-20 md:py-28">
        <SectionHead
          title="Health checkup packages"
          text="Curated diagnostic profiles designed for clarity, comprehensive organ evaluation, and preventative monitoring."
          link={{ to: "/packages", label: "View All Packages" }}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {HOME_PACKAGES.map((p) => (
            <article
              key={p.slug}
              className="group flex h-full flex-col rounded-[16px] border border-navy/12 bg-card p-6 shadow-[0_1px_3px_color-mix(in_oklab,var(--navy)_6%,transparent)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-within:border-primary/60"
            >
              {/* A. Header Area */}
              <div className="border-b border-navy/10 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {p.category}
                    </span>
                    <h3 className="mt-2.5 font-display text-xl font-bold tracking-tight text-navy sm:text-2xl break-words">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2 md:text-sm">
                      {p.summary}
                    </p>
                  </div>

                  {/* Dedicated Top-Right Illustration Area (88-112px on desktop, 64-80px on mobile) */}
                  <PackageIllustration packageId={p.id} />
                </div>
              </div>

              {/* B. Main Inclusions Area */}
              <div className="flex-1 py-4">
                <p className="label-x text-muted-foreground/90">Key inclusions</p>

                {p.inheritsFrom ? (
                  <div className="mt-2.5 space-y-3">
                    <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-soft px-3 py-2 text-xs font-semibold text-navy">
                      <Layers className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>Includes Advanced Body Profile</span>
                    </div>
                    {p.additionalTests && p.additionalTests.length > 0 && (
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                          Additional tests:
                        </p>
                        <ul className="mt-1.5 space-y-1.5 text-sm text-foreground/85">
                          {p.additionalTests.map((test) => (
                            <li key={test} className="flex items-start gap-2">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-accent font-bold"
                                aria-hidden="true"
                              />
                              <span className="font-semibold text-navy">{test}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <ul className="mt-2.5 space-y-1.5 text-sm text-foreground/85">
                    {p.inclusions.slice(0, 5).map((item) => (
                      <li key={item.name} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-sm">
                          {item.name}
                          {item.subComponents && (
                            <span className="block text-[11px] text-muted-foreground">
                              ({item.subComponents.join(", ")})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                    {p.inclusions.length > 5 && (
                      <li className="text-xs text-muted-foreground pl-6">
                        + {p.inclusions.length - 5} more inclusions
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {/* C. Details Link Area */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => handleOpen(p, e.currentTarget)}
                  className="link-u text-xs font-semibold text-primary hover:text-navy cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
                >
                  View complete inclusions
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* D. CTA Area */}
              <div className="mt-auto border-t border-navy/10 pt-4">
                <a
                  href={waPackageLink(p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent w-full text-center"
                  aria-label={`Enquire on WhatsApp about ${p.name}`}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Contact our team for test preparation, availability, and booking guidance.
        </p>
      </div>

      <DetailsDialog item={selectedPkg} onClose={handleClose} />
    </section>
  );
}

/* ---------------- Package Details Modal ---------------- */
export function DetailsDialog({
  item,
  onClose,
}: {
  item: HomePackageCard | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;

    if (item && !d.open) {
      d.showModal();
    } else if (!item && d.open) {
      d.close();
    }
  }, [item]);

  if (!item) return null;

  // Resolve full details
  const rawPkg = PACKAGES_DATA.find((p) => p.id === item.id);
  const resolvedInclusions = rawPkg ? resolvePackageInclusions(rawPkg) : item.inclusions;
  const parentPkg = rawPkg?.inheritsFrom
    ? PACKAGES_DATA.find((p) => p.id === rawPkg.inheritsFrom)
    : null;
  const parentInclusions = parentPkg ? resolvePackageInclusions(parentPkg) : [];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-labelledby="pkg-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-[18px] border border-navy/20 bg-background p-0 text-foreground shadow-2xl backdrop:bg-navy/60 backdrop:backdrop-blur-xs"
    >
      <div className="max-h-[85vh] overflow-y-auto p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-navy/10 pb-5">
          <div className="min-w-0 flex-1 pr-3">
            <span className="inline-block rounded-full bg-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {item.category}
            </span>
            <h3
              id="pkg-dialog-title"
              className="mt-2 font-display text-2xl font-extrabold text-navy md:text-3xl break-words"
            >
              {item.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
          </div>
          <div className="flex items-start gap-2 shrink-0">
            <PackageIllustration packageId={item.id} className="w-16 h-16 sm:w-20 sm:h-20" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:border-navy hover:bg-soft focus-visible:outline-2 focus-visible:outline-ring"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6">
          {/* Inherited breakdown if derived */}
          {parentPkg && (
            <div className="rounded-[12px] border border-primary/25 bg-soft p-5">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-navy">
                <Layers className="h-4 w-4 text-primary" />
                <span>Base Profile: {parentPkg.name}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                This package includes all inclusions from the Advanced Body Profile:
              </p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 text-xs text-foreground/85">
                {parentInclusions.map((test) => (
                  <li key={test.name} className="flex items-start gap-1.5">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{test.name}</span>
                  </li>
                ))}
              </ul>

              {item.additionalTests && item.additionalTests.length > 0 && (
                <div className="mt-4 border-t border-primary/15 pt-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">
                    Additional tests included in {item.name}:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm font-semibold text-navy">
                    {item.additionalTests.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Check
                          className="h-4 w-4 shrink-0 text-accent font-bold"
                          aria-hidden="true"
                        />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Standalone package inclusions */}
          {!parentPkg && (
            <div>
              <p className="label-x text-muted-foreground">Complete inclusions</p>
              <ul className="mt-3 divide-y divide-navy/10 rounded-[12px] border border-navy/12 bg-card px-4 py-2 text-sm text-foreground/85">
                {resolvedInclusions.map((inc) => (
                  <li key={inc.name} className="flex items-start justify-between py-2.5">
                    <div className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-navy">{inc.name}</span>
                        {inc.subComponents && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Components: {inc.subComponents.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Clinical Notice if present */}
          {item.clinicalNotice && (
            <div className="flex items-start gap-3 rounded-lg border border-accent/25 bg-accent/5 p-4 text-xs text-foreground/85">
              <p>{item.clinicalNotice}</p>
            </div>
          )}

          {/* Preparation & Availability Note */}
          <div className="rounded-lg border border-navy/10 bg-soft p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-navy">Guidance & preparation</p>
            <p className="mt-1">
              Contact our team for test preparation, availability, and booking guidance. Doorstep
              collection is available for eligible packages in confirmed areas.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-navy/10 pt-5 space-y-3">
          <a
            href={waPackageLink(item.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent w-full text-center"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Enquire on WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/home-collection"
              search={{ test: item.name }}
              onClick={onClose}
              className="btn btn-primary text-xs text-center"
            >
              <Calendar className="h-3.5 w-3.5" /> Book Home Visit
            </Link>
            <a href={SITE.phoneHref} className="btn btn-outline text-xs text-center">
              <Phone className="h-3.5 w-3.5" /> Call Laboratory
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}

/* ---------------- Popular Tests Section ---------------- */
export function PopularTestsSection() {
  return (
    <section className="bg-background">
      <div className="container-site py-20 md:py-28">
        <SectionHead
          title="Popular tests"
          text="Common diagnostic investigations supporting routine surveillance and clinical management."
          link={{ to: "/tests", label: "View All Tests" }}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {HOME_TESTS.map((t) => (
            <article
              key={t.slug}
              className="group flex h-full flex-col rounded-[14px] border border-navy/12 bg-card p-5 shadow-[0_1px_2px_color-mix(in_oklab,var(--navy)_5%,transparent)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm focus-within:border-primary/60"
            >
              {/* Header with category label and official Sattva symbol */}
              <div className="flex items-start justify-between gap-3">
                <span className="inline-block rounded-full bg-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  {t.category}
                </span>
                <img
                  src={BRAND_LOGOS.symbol}
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 shrink-0 object-contain pointer-events-none select-none"
                  width={36}
                  height={36}
                  loading="lazy"
                />
              </div>

              <h3 className="mt-2.5 font-display text-lg font-bold text-navy group-hover:text-primary transition-colors">
                {t.name}
                {t.short && (
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    ({t.short})
                  </span>
                )}
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {t.description}
              </p>

              {/* Bottom Action Row */}
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-navy/10 pt-4">
                <Link
                  to="/tests/$slug"
                  params={{ slug: t.slug }}
                  className="link-u text-xs font-semibold text-navy hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <span>Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <a
                  href={waTestLink(t.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring"
                  aria-label={`Enquire on WhatsApp about ${t.name}`}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Enquire</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Contact our team for test preparation, availability, and booking guidance.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Reviews Section (Preserved) ---------------- */
const SPEED = 25; // px per second

function GoogleLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  const initials = r.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <figure className="group relative flex w-[310px] shrink-0 flex-col justify-between rounded-[20px] border border-navy/10 bg-white p-6 shadow-[0_2px_12px_rgba(18,54,80,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg md:w-[380px] md:p-7 select-none">
      <div>
        {/* Card Header: 5 gold stars & Google badge */}
        <div className="flex items-center justify-between border-b border-navy/6 pb-3.5">
          <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/8 bg-soft/75 px-2.5 py-0.5 text-[11px] font-semibold text-navy/75">
            <GoogleLogo className="h-3 w-3" />
            <span>Google</span>
          </span>
        </div>

        {/* Review Quote */}
        <div className="relative mt-4">
          <Quote className="h-6 w-6 text-primary/15 shrink-0" aria-hidden="true" />
          <blockquote className="mt-1.5 text-base font-medium leading-relaxed text-foreground">
            &ldquo;{r.text}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Card Author / Footer */}
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-navy/8 pt-4">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy via-navy/95 to-primary font-display text-xs font-bold tracking-wide text-white shadow-xs"
        >
          {initials}
        </span>
        <div className="min-w-0 flex-1 text-sm">
          <span className="block truncate font-display font-bold text-navy">{r.name}</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
            <span>Google review · edited excerpt</span>
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export function ReviewsSection() {
  const scroller = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const hold = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el || reduced || userPaused) return;
    let raf = 0,
      last = performance.now(),
      acc = el.scrollLeft;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      if (!hold.current) {
        const half = el.scrollWidth / 2;
        if (Math.abs(el.scrollLeft - acc) > 2) acc = el.scrollLeft;
        acc += SPEED * dt;
        if (acc >= half) acc -= half;
        el.scrollLeft = acc;
      } else acc = el.scrollLeft;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, userPaused]);

  const auto = !reduced;
  const holdOn = () => (hold.current = true);
  const holdOff = () => (hold.current = false);

  return (
    <section
      className="relative overflow-hidden bg-soft/75 py-20 md:py-28"
      aria-labelledby="reviews-title"
    >
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Verified Patient Feedback</span>
            </div>

            <h2
              id="reviews-title"
              className="mt-4 font-display text-4xl font-extrabold leading-tight text-navy md:text-5xl"
            >
              Patient experiences
            </h2>

            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Read what patients and families have shared about their testing, hygiene, and home
              collection experience with Sattva Pathology.
            </p>

            {/* Google Rating Trust Badge Card */}
            <div className="mt-6 inline-flex flex-wrap items-center gap-3.5 rounded-2xl border border-navy/10 bg-white px-5 py-3 shadow-xs">
              <GoogleLogo className="h-6 w-6 shrink-0" />
              <div className="flex items-baseline gap-1.5 border-r border-navy/10 pr-3.5">
                <span className="font-display text-2xl font-extrabold text-navy">
                  {SITE.rating}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">/ 5.0</span>
              </div>
              <div className="flex flex-col justify-center">
                <div
                  className="flex items-center gap-1 text-amber-400"
                  aria-label={`${SITE.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground mt-0.5">
                  Rated {SITE.rating} from {SITE.reviews} Google reviews
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {auto && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-pressed={userPaused}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-xs font-semibold text-navy shadow-xs transition hover:border-navy/30 hover:bg-soft focus-visible:outline-2 focus-visible:outline-ring"
                aria-label={userPaused ? "Play review scrolling" : "Pause review scrolling"}
              >
                {userPaused ? (
                  <Play className="h-4 w-4 text-accent" />
                ) : (
                  <Pause className="h-4 w-4 text-accent" />
                )}
                <span>{userPaused ? "Resume Scrolling" : "Pause"}</span>
              </button>
            )}
            <a
              href={SITE.googleListingUrl || reviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center gap-2 shadow-xs hover:shadow-md"
            >
              <span>View Google Reviews</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Marquee Wrapper with smooth edge gradient fade masks */}
      <div className="relative mt-12 md:mt-16">
        {/* Left edge fade gradient mask */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-8 bg-gradient-to-r from-soft to-transparent sm:w-20"
          aria-hidden="true"
        />
        {/* Right edge fade gradient mask */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 bg-gradient-to-l from-soft to-transparent sm:w-20"
          aria-hidden="true"
        />

        <div
          ref={scroller}
          className="overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onPointerEnter={holdOn}
          onPointerLeave={holdOff}
          onFocus={holdOn}
          onBlur={holdOff}
          onTouchStart={holdOn}
          onTouchEnd={() => setTimeout(holdOff, 1500)}
          tabIndex={0}
          role="region"
          aria-label="Google review excerpts, scrollable"
        >
          <div className="flex w-max gap-6 px-6 md:px-12">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} r={r} />
            ))}
            {auto && (
              <div className="flex gap-6" aria-hidden="true" inert>
                {REVIEWS.map((r) => (
                  <ReviewCard key={`d-${r.name}`} r={r} />
                ))}
                {REVIEWS.map((r) => (
                  <ReviewCard key={`e-${r.name}`} r={r} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
