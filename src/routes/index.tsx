import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Clock, Home, ShieldCheck, FileText, Users, MapPin, ArrowRight, Check, Phone, MessageCircle } from "lucide-react";
import { SITE, TESTS, POPULAR, FAQS, REVIEWS, waLink, mapsEmbed, mapsDirections, reviewsLink } from "@/lib/site";
import { FaqList, CtaBand } from "@/components/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "/",
      "Sattva Pathology Laboratory — 24/7 Pathology Lab in Ahmedabad",
      "24/7 pathology laboratory in Ahmedabad. Blood tests, health packages and home sample collection near Nirnaynagar. Rated 4.8 on Google.",
    ),
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      }),
    }],
  }),
  component: HomePage,
});

const WHY = [
  { icon: Clock, t: "Open 24/7", d: "Walk-in tests and home collection, day or night." },
  { icon: FileText, t: "Accurate, timely reports", d: "Careful processing and reports delivered on time." },
  { icon: ShieldCheck, t: "Hygienic collection", d: "Sterile, single-use kits and professional handling." },
  { icon: Users, t: "Friendly, experienced staff", d: "Supportive care for patients of every age." },
  { icon: Check, t: "Clear report guidance", d: "We explain your report in simple language." },
  { icon: Home, t: "Home sample collection", d: "Convenient collection across Ahmedabad." },
];

function HomePage() {
  const popular = POPULAR.map((s) => TESTS.find((t) => t.slug === s)!);
  return (
    <>
      {/* Hero */}
      <section className="bg-soft">
        <div className="container-site grid gap-12 py-14 md:py-20 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">{SITE.name} · Ahmedabad</p>
            <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
              Accurate Testing.<br /><span className="text-primary">Trusted Care.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              24/7 pathology laboratory in Ahmedabad with accurate reports, hygienic sample handling, and convenient home sample collection.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/home-collection" className="btn btn-accent">Book Home Collection</Link>
              <a href={SITE.phoneHref} className="btn btn-primary"><Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}</a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
            </div>
          </div>
          <dl className="grid grid-cols-2 border bg-background">
            {[
              { k: <span className="flex items-center gap-1.5">4.8 <Star className="h-6 w-6 fill-accent text-accent" /></span>, v: "Google rating" },
              { k: "186+", v: "Patient reviews" },
              { k: "24 hrs", v: "Open every day" },
              { k: "Home", v: "Collection available" },
            ].map((s, i) => (
              <div key={i} className={`p-6 md:p-8 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}>
                <dt className="font-display text-3xl font-extrabold text-navy md:text-4xl">{s.k}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Popular tests */}
      <section className="container-site py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Popular tests</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Commonly booked tests</h2>
          </div>
          <Link to="/tests" className="inline-flex items-center gap-1 font-semibold text-primary hover:text-navy">View all tests <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <ul className="mt-10 divide-y border-y">
          {popular.map((t) => (
            <li key={t.slug}>
              <Link to="/tests/$slug" params={{ slug: t.slug }} className="group grid gap-2 py-5 md:grid-cols-[1.2fr_2fr_auto] md:items-center md:gap-8">
                <span className="font-display text-lg font-bold text-navy group-hover:text-primary">{t.short ? `${t.short} — ` : ""}{t.name}</span>
                <span className="text-sm text-muted-foreground">{t.purpose}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Details <ArrowRight className="h-4 w-4" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Why */}
      <section className="border-y bg-soft">
        <div className="container-site py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="eyebrow">Why Sattva</p>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Care you can rely on, any hour</h2>
              <p className="mt-4 text-muted-foreground">Trusted by patients in Nirnaynagar and across Ahmedabad, with a 4.8 Google rating.</p>
            </div>
            <div className="grid gap-px border bg-border sm:grid-cols-2">
              {WHY.map(({ icon: Icon, t, d }) => (
                <div key={t} className="bg-background p-6">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  <h3 className="mt-4 text-lg font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Home collection */}
      <section className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Home sample collection</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Get tested without leaving home</h2>
          <p className="mt-4 text-muted-foreground">Our trained staff visit at your chosen time with sterile, sealed kits. Ideal for elderly patients, busy families and anyone unwell.</p>
          <Link to="/home-collection" className="btn btn-accent mt-8">Book Home Collection</Link>
        </div>
        <ol className="space-y-0 border-l-2 border-primary">
          {["Book online, by phone, or on WhatsApp", "We confirm your time slot", "Sample collected hygienically at home", "Report sent on WhatsApp or email"].map((s, i) => (
            <li key={s} className="relative py-4 pl-8">
              <span className="absolute -left-[0.95rem] top-4 grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
              <span className="font-medium text-navy">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Reviews */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-70">Patient reviews</p>
              <h2 className="mt-2 text-3xl font-extrabold text-navy-foreground md:text-4xl">4.8 stars from 186 patients</h2>
            </div>
            <a href={reviewsLink} target="_blank" rel="noopener noreferrer" className="btn btn-invert">View All Google Reviews</a>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <figure key={i} className="border-t border-navy-foreground/20 pt-6">
                <div className="flex gap-0.5" aria-label="5 stars">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-accent text-accent" />)}</div>
                <blockquote className="mt-4 text-lg leading-relaxed">“{r.text}”</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Visit us</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Location & contact</h2>
          <p className="mt-6 flex gap-2 text-lg"><MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />{SITE.address}</p>
          <p className="mt-2 flex gap-2"><Clock className="mt-1 h-5 w-5 text-primary" />Open 24 hours, 7 days a week</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get Directions</a>
            <a href={SITE.phoneHref} className="btn btn-outline"><Phone className="h-4 w-4" /> Call</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          </div>
        </div>
        <iframe title="Sattva Pathology Laboratory on Google Maps" src={mapsEmbed} loading="lazy" className="h-80 w-full border lg:h-full" referrerPolicy="no-referrer-when-downgrade" />
      </section>

      {/* FAQ */}
      <section className="border-t bg-soft">
        <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Common questions</h2>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
