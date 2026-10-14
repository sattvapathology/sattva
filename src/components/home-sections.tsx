import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Droplet, Clock, ClipboardList, Pause, Play, Star, X, MessageCircle } from "lucide-react";
import { SITE, REVIEWS, waLink, reviewsLink } from "@/lib/site";
import { HOME_PACKAGES, HOME_TESTS, enquiryText, type CardInfo } from "@/lib/home-cards";

/* ---------------- Shared ---------------- */
function InfoRows({ c }: { c: CardInfo }) {
  const rows = [
    { icon: Droplet, label: "Sample", value: c.sample },
    { icon: ClipboardList, label: "Preparation", value: c.preparation ?? "Ask our team about preparation" },
    { icon: Clock, label: "Report", value: c.report },
  ].filter((r) => r.value);
  return (
    <dl className="space-y-2 text-sm">
      {rows.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-start gap-2.5">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <dt className="sr-only">{label}</dt>
          <dd className="text-foreground/85">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SectionHead({ title, text, link }: { title: string; text: string; link: { to: "/packages" | "/tests"; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">{title}</h2>
        <p className="mt-3 text-lg text-muted-foreground">{text}</p>
      </div>
      <Link to={link.to} className="link-u text-navy">{link.label} <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}

const cardCls = "group flex h-full flex-col rounded-[14px] border border-navy/12 bg-background shadow-[0_1px_2px_color-mix(in_oklab,var(--navy)_6%,transparent)] transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50";

/* ---------------- Packages ---------------- */
export function PackagesSection() {
  const [open, setOpen] = useState<CardInfo | null>(null);
  return (
    <section className="border-t bg-soft">
      <div className="container-site py-20 md:py-28">
        <SectionHead title="Health checkup packages" text="Explore packages and contact our team for inclusions, preparation, and booking." link={{ to: "/packages", label: "View All Packages" }} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {HOME_PACKAGES.map((p) => (
            <article key={p.slug} className={`${cardCls} overflow-hidden border-t-2 border-t-navy`}>
              <div className="flex flex-1 flex-col p-6">
                {p.category && <p className="label-x text-primary">{p.category}</p>}
                <h3 className="mt-2 font-display text-2xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                {p.parameterCount != null && (
                  <span className="mt-4 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{p.parameterCount} parameters</span>
                )}
                <div className="mt-5 border-t pt-5"><InfoRows c={p} /></div>
                <div className="mt-5 border-t pt-5 text-sm">
                  <p className="label-x text-muted-foreground">Included tests</p>
                  {p.tests?.length ? (
                    <ul className="mt-2 space-y-1">{p.tests.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
                  ) : <p className="mt-2 text-foreground/85">Contact us for the complete test list</p>}
                </div>
                <div className="mt-auto pt-6">
                  <p className="font-display text-xl font-bold text-navy">
                    {p.price ?? "Contact for pricing"}
                    {p.price && p.previousPrice && <s className="ml-2 text-sm font-medium text-muted-foreground">{p.previousPrice}</s>}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a href={waLink(enquiryText(p.name))} target="_blank" rel="noopener noreferrer" className="btn btn-accent flex-1">
                      {p.approved ? "Book Package" : <><MessageCircle className="h-4 w-4" /> Enquire on WhatsApp</>}
                    </a>
                    <button type="button" onClick={() => setOpen(p)} className="link-u text-sm text-navy">View Details</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <DetailsDialog item={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function DetailsDialog({ item, onClose }: { item: CardInfo | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) d.showModal();
    if (!item && d.open) d.close();
  }, [item]);
  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="pkg-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-[14px] border bg-background p-0 text-foreground backdrop:bg-navy/60">
      {item && (
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 id="pkg-dialog-title" className="font-display text-2xl font-bold">{item.name}</h3>
            <button type="button" onClick={onClose} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border hover:border-navy"><X className="h-4 w-4" /></button>
          </div>
          <p className="mt-2 text-muted-foreground">{item.description}</p>
          <div className="mt-6 border-t pt-5"><InfoRows c={item} /></div>
          <div className="mt-5 border-t pt-5 text-sm">
            <p className="label-x text-muted-foreground">Included tests</p>
            {item.tests?.length ? <ul className="mt-2 list-disc space-y-1 pl-5">{item.tests.map((t) => <li key={t}>{t}</li>)}</ul>
              : <p className="mt-2">Contact us for the complete test list. Our team will share inclusions, price, preparation and home collection availability.</p>}
          </div>
          <p className="mt-5 font-display text-lg font-bold text-navy">{item.price ?? "Contact for pricing"}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink(enquiryText(item.name))} target="_blank" rel="noopener noreferrer" className="btn btn-accent"><MessageCircle className="h-4 w-4" /> Enquire on WhatsApp</a>
            <a href={SITE.phoneHref} className="btn btn-outline">Call {SITE.phoneDisplay}</a>
          </div>
        </div>
      )}
    </dialog>
  );
}

/* ---------------- Popular tests ---------------- */
export function PopularTestsSection() {
  return (
    <section className="bg-background">
      <div className="container-site py-20 md:py-28">
        <SectionHead title="Popular tests" text="Find a test and contact our team for preparation and booking details." link={{ to: "/tests", label: "View All Tests" }} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HOME_TESTS.map((t) => (
            <article key={t.slug} className={`${cardCls} p-5`}>
              {t.category && <p className="label-x text-primary">{t.category}</p>}
              <h3 className="mt-2 font-display text-xl font-bold">{t.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-4 border-t pt-4"><InfoRows c={t} /></div>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <p className="text-sm font-semibold text-navy">{t.price ?? "Contact for pricing"}</p>
                <div className="flex items-center gap-4">
                  <Link to="/tests/$slug" params={{ slug: t.slug }} className="link-u text-sm text-navy">Details</Link>
                  <a href={waLink(enquiryText(t.name))} target="_blank" rel="noopener noreferrer" className="btn btn-accent min-h-10 px-4 py-2 text-sm md:min-h-10">{t.approved ? "Book Test" : "Enquire"}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */
const SPEED = 25; // px per second

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <figure className="flex w-[290px] shrink-0 flex-col rounded-[14px] border border-navy/12 bg-background p-6 shadow-[0_1px_2px_color-mix(in_oklab,var(--navy)_6%,transparent)] md:w-[360px]">
      <blockquote className="flex-1 text-base leading-relaxed text-foreground">{r.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
        <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-sm font-bold text-navy-foreground">
          {r.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </span>
        <span className="text-sm">
          <span className="block font-semibold text-navy">{r.name}</span>
          <span className="text-muted-foreground">Google review · edited excerpt</span>
        </span>
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
    let raf = 0, last = performance.now(), acc = el.scrollLeft;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      if (!hold.current) {
        const half = el.scrollWidth / 2;
        if (Math.abs(el.scrollLeft - acc) > 2) acc = el.scrollLeft; // manual swipe moved it
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
    <section className="bg-soft" aria-labelledby="reviews-title">
      <div className="container-site py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 id="reviews-title" className="font-display text-4xl font-extrabold leading-tight md:text-5xl">Patient experiences</h2>
            <p className="mt-3 text-lg text-muted-foreground">Read what patients have shared about Sattva Pathology.</p>
            <p className="mt-5 flex items-center gap-3 text-navy">
              <span className="font-display text-3xl font-extrabold">{SITE.rating}</span>
              <span className="flex text-accent" aria-hidden="true">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span>
              <span className="text-sm text-muted-foreground">{SITE.rating} rating from {SITE.reviews} Google reviews</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            {auto && (
              <button type="button" onClick={() => setUserPaused((p) => !p)} aria-pressed={userPaused}
                className="btn btn-outline min-h-11 px-4 md:min-h-11" aria-label={userPaused ? "Play review scrolling" : "Pause review scrolling"}>
                {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />} {userPaused ? "Play" : "Pause"}
              </button>
            )}
            <a href={SITE.googleListingUrl || reviewsLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Google Reviews <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div
        ref={scroller}
        className="-mt-8 overflow-x-auto pb-20 md:-mt-12 md:pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onPointerEnter={holdOn} onPointerLeave={holdOff} onFocus={holdOn} onBlur={holdOff}
        onTouchStart={holdOn} onTouchEnd={() => setTimeout(holdOff, 1500)}
        tabIndex={0} role="region" aria-label="Google review excerpts, scrollable"
      >
        <div className="flex w-max gap-5 px-5 md:px-8">
          {REVIEWS.map((r) => <ReviewCard key={r.name} r={r} />)}
          {auto && (
            <div className="flex gap-5" aria-hidden="true" inert>
              {REVIEWS.map((r) => <ReviewCard key={`d-${r.name}`} r={r} />)}
              {REVIEWS.map((r) => <ReviewCard key={`e-${r.name}`} r={r} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
