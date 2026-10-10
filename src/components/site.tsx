import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Phone, MessageCircle, Menu, X, MapPin, Mail, Clock, ChevronDown } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

const NAV = [
  { to: "/tests", label: "Tests" },
  { to: "/packages", label: "Health Packages" },
  { to: "/home-collection", label: "Home Collection" },
  { to: "/reports", label: "Reports" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
      <span className="grid h-9 w-9 place-items-center rounded-sm bg-primary font-display text-lg font-extrabold text-primary-foreground">S</span>
      <span className="leading-tight">
        <span className="block font-display text-base font-extrabold text-navy">Sattva</span>
        <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent">Pathology Laboratory</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-foreground hover:text-primary" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={SITE.phoneHref} className="btn btn-outline"><Phone className="h-4 w-4" /> Call Now</a>
          <Link to="/home-collection" className="btn btn-accent">Book Home Collection</Link>
        </div>
        <button className="btn btn-outline px-3 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-background lg:hidden">
          <nav className="container-site flex flex-col py-3" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b py-3 font-medium text-navy last:border-0">
                {n.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <a href={SITE.phoneHref} className="btn btn-outline"><Phone className="h-4 w-4" /> Call</a>
              <Link to="/home-collection" onClick={() => setOpen(false)} className="btn btn-accent">Book Collection</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-extrabold">{SITE.name}</p>
          <p className="mt-1 opacity-80">{SITE.tagline}</p>
          <ul className="mt-6 space-y-2 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{SITE.address}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4" /><a href={SITE.phoneHref}>{SITE.phoneDisplay}</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4" />Open 24 hours, 7 days</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-70">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:underline">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-70">Patients</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/home-collection" className="hover:underline">Book home collection</Link></li>
            <li><Link to="/reports" className="hover:underline">Report status</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15">
        <p className="container-site py-5 text-xs opacity-70">© {new Date().getFullYear()} {SITE.name}, Ahmedabad.</p>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-navy">
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
    <div className="divide-y border-y">
      {items.map(([q, a]) => (
        <details key={q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-navy">
            {q}
            <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-muted-foreground">{a}</p>
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
        ))}
      </div>
      <button type="submit" className="btn btn-accent w-full sm:w-auto">{submit}</button>
      {sent && <p className="text-sm text-primary" role="status">Your details have opened in WhatsApp. Please press send to complete your request.</p>}
    </form>
  );
}
