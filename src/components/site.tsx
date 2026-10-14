import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Phone, MessageCircle, Menu, X, MapPin, Clock, ArrowRight, Plus } from "lucide-react";
import { SITE, waLink, reviewsLink } from "@/lib/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/tests", label: "Tests" },
  { to: "/packages", label: "Health Packages" },
  { to: "/home-collection", label: "Home Collection" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center py-2" aria-label={`${SITE.name} home`} title="Official Sattva logo placeholder — replace with uploaded logo" data-placeholder="official-logo">
      <span className={`leading-tight ${invert ? "text-navy-foreground" : "text-navy"}`}>
        <span className="block font-display text-2xl font-extrabold">Sattva</span>
        <span className={`mt-1 block text-[0.68rem] font-semibold uppercase ${invert ? "opacity-80" : "text-accent"}`}>Pathology Laboratory</span>
      </span>
    </Link>
  );
}

export function UtilityBar() {
  return (
    <div className="bg-navy text-navy-foreground">
      <div className="container-site flex h-9 items-center justify-between gap-4 text-xs">
        <p className="truncate"><span className="hidden sm:inline">Open 24 Hours · Home Sample Collection Available · </span>Call <a href={SITE.phoneHref} className="font-semibold underline-offset-4 hover:underline">{SITE.phoneDisplay}</a></p>
        <div className="flex shrink-0 items-center gap-4">
          <span lang="gu" title="Gujarati version coming soon" className="opacity-80">ગુજરાતી</span>
          <Link to="/contact" className="font-semibold underline-offset-4 hover:underline">Patient Enquiries</Link>
        </div>
      </div>
    </div>
  );
}

export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t bg-background p-3 md:hidden">
      <a href={SITE.phoneHref} className="btn btn-outline px-4" aria-label={`Call ${SITE.phoneDisplay}`}><Phone className="h-4 w-4" /> Call</a>
      <Link to="/home-collection" className="btn btn-accent whitespace-nowrap">Book Home Collection</Link>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <UtilityBar />
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Logo />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav-u whitespace-nowrap text-[0.9rem] font-medium text-navy" activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/reports" className="link-u whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-navy">Reports</Link>
          <a href={SITE.phoneHref} className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-navy hover:text-primary 2xl:inline-flex"><Phone className="h-4 w-4" /> {SITE.phoneDisplay}</a>
          <Link to="/home-collection" className="btn btn-accent whitespace-nowrap">Book Home Collection</Link>
        </div>
        <button className="grid h-12 w-12 place-items-center xl:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Menu className="h-6 w-6 text-navy" />
        </button>
      </div>
    </header>
    {open && (
      <div className="fixed inset-0 z-[60] flex flex-col bg-navy text-navy-foreground xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="container-site flex h-16 items-center justify-between">
          <Logo invert />
          <button className="grid h-12 w-12 place-items-center" onClick={() => setOpen(false)} aria-label="Close menu" autoFocus><X className="h-6 w-6" /></button>
        </div>
        <nav className="container-site flex flex-1 flex-col overflow-y-auto pt-6" aria-label="Mobile">
          {[...NAV, { to: "/reports", label: "Reports" } as const].map((n, i) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-navy-foreground/15 py-4 font-display text-2xl font-bold">
              <span className="w-6 text-xs font-semibold text-navy-foreground/50">0{i + 1}</span>{n.label}
            </Link>
          ))}
        </nav>
        <div className="container-site grid grid-cols-2 gap-3 py-6">
          <a href={SITE.phoneHref} className="btn btn-invert"><Phone className="h-4 w-4" /> Call</a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-invert"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          <Link to="/home-collection" onClick={() => setOpen(false)} className="btn btn-accent col-span-2">Book Home Collection</Link>
        </div>
      </div>
    )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-site border-b border-navy-foreground/15 py-14 md:py-20">
        <p className="label-x text-navy-foreground/60">Open 24 Hours · Ahmedabad</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{SITE.tagline}</p>
          <Link to="/home-collection" className="btn btn-accent">Book Home Collection <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo invert />
          <ul className="mt-6 space-y-2 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{SITE.address}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4" /><a href={SITE.phoneHref}>{SITE.phoneDisplay}</a></li>
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4" />Open 24 hours, 7 days</li>
          </ul>
        </div>
        <div>
          <p className="label-x opacity-60">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:underline">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="label-x opacity-60">Patients</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/home-collection" className="hover:underline">Book home collection</Link></li>
            <li><Link to="/reports" className="hover:underline">Reports</Link></li>
            <li><span lang="gu" title="Gujarati version coming soon" className="opacity-80">ગુજરાતી</span></li>
            <li><Link to="/privacy" className="hover:underline">Privacy policy</Link></li>
            <li><a href={reviewsLink} target="_blank" rel="noopener noreferrer" className="hover:underline">Google Business Profile</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15">
        <div className="container-site space-y-2 py-5 pb-24 text-xs opacity-70 md:pb-5">
          <p>Information on this website is for service information only and does not replace medical advice.</p>
          <p>© {new Date().getFullYear()} {SITE.name}, Ahmedabad.</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 md:bottom-5 md:right-5 z-50 grid h-14 w-14 place-items-center rounded-full border border-background bg-primary text-primary-foreground hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b bg-soft">
      <div className="container-site py-12 md:py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function ContactButtons({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={SITE.phoneHref} className={`btn ${invert ? "btn-invert" : "btn-primary"}`}><Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}</a>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className={`btn ${invert ? "btn-invert" : "btn-outline"}`}><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-site flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-primary-foreground md:text-3xl">Need a test today?</h2>
          <p className="mt-2 opacity-90">We're open 24 hours. Walk in, call, or book a home collection.</p>
        </div>
        <ContactButtons invert />
      </div>
    </section>
  );
}

export function FaqList({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="divide-y divide-navy/15 border-y border-navy/15" data-stagger>
      {items.map(([q, a]) => (
        <details key={q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-bold text-navy transition-colors hover:text-primary md:text-xl">
            {q}
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy/20 transition-transform duration-300 group-open:rotate-45"><Plus className="h-4 w-4" /></span>
          </summary>
          <p className="mt-3 max-w-2xl text-muted-foreground">{a}</p>
        </details>
      ))}
    </div>
  );
}

type Field = { name: string; label: string; type?: string; required?: boolean; options?: string[]; textarea?: boolean };

/** Sends the enquiry to the lab's WhatsApp with all details pre-filled. */
export function EnquiryForm({ title, fields, submit, intro }: { title: string; fields: Field[]; submit: string; intro?: ReactNode }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const lines = fields.map((f) => `${f.label}: ${String(fd.get(f.name) || "-")}`);
        window.open(waLink(`${title}\n\n${lines.join("\n")}`), "_blank", "noopener");
        setSent(true);
      }}
    >
      {intro}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          f.type === "checkbox" ? (
            <label key={f.name} className="flex items-center gap-3 text-sm font-medium text-navy sm:col-span-2">
              <input type="checkbox" name={f.name} value="Yes" defaultChecked className="h-5 w-5 accent-primary" /> {f.label}
            </label>
          ) : (
          <label key={f.name} className={`block text-sm font-medium text-navy ${f.textarea ? "sm:col-span-2" : ""}`}>
            {f.label}{f.required && <span className="text-accent"> *</span>}
            {f.options ? (
              <select name={f.name} required={f.required} className="field mt-1.5" defaultValue="">
                <option value="" disabled>Select</option>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.textarea ? (
              <textarea name={f.name} rows={3} className="field mt-1.5" />
            ) : (
              <input name={f.name} type={f.type ?? "text"} required={f.required} className="field mt-1.5"
                {...(f.type === "tel" ? { pattern: "[0-9+ ]{10,14}", inputMode: "tel" as const } : {})} />
            )}
          </label>
          )
        ))}
      </div>
      <button type="submit" className="btn btn-accent w-full sm:w-auto">{submit}</button>
      {sent && <p className="text-sm text-primary" role="status">Your details have opened in WhatsApp. Please press send to complete your request.</p>}
    </form>
  );
}

/** Labelled placeholder until an authentic Sattva photograph is supplied. Never fill with AI or stock imagery. */
export function PhotoSlot({ label, tone = "soft", className = "" }: { label: string; tone?: "soft" | "navy" | "white"; className?: string }) {
  const t = tone === "navy" ? "bg-navy text-navy-foreground border-navy-foreground/20" : tone === "white" ? "bg-background text-navy" : "bg-soft text-navy";
  return (
    <figure className={`relative flex flex-col justify-between border p-5 ${t} ${className}`} aria-label={`Photo placeholder: ${label}`}>
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-60">Photo · Replace with real image</span>
      <figcaption className="max-w-[16rem] font-display text-sm font-semibold opacity-80">{label}</figcaption>
    </figure>
  );
}

/** Demo photograph, clearly tagged for replacement with a genuine Sattva photo before launch. */
export function DemoImage({ src, alt, slot, className = "", w, h, eager = false }: { src: string; alt: string; slot: string; className?: string; w: number; h: number; eager?: boolean }) {
  return (
    <figure className={`img-hover relative overflow-hidden rounded-[10px] bg-soft ${className}`} data-placeholder={slot}>
      <img src={src} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} className="h-full w-full object-cover" />
      <figcaption className="absolute left-3 top-3 rounded-[4px] bg-background px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-navy">Demo image · replace</figcaption>
    </figure>
  );
}
