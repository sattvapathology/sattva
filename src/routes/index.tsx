import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { SITE, FAQS, mapsEmbed, mapsDirections, reviewsLink } from "@/lib/site";
import { FaqList, PhotoSlot } from "@/components/site";
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

const PACKAGES = [
  { name: "Everyday Health Check", purpose: "A sensible yearly baseline for adults who feel well and want to stay that way.", tests: ["Complete Blood Count", "Fasting Blood Sugar", "Lipid Profile", "Liver Function", "Kidney Function"], fasting: "10–12 hours fasting", report: "Reports usually same day", tone: "white" },
  { name: "Complete Body Check", purpose: "A thorough review of the body's major systems for a fuller picture of your health.", tests: ["CBC & ESR", "HbA1c", "Lipid Profile", "Liver & Kidney Function", "Thyroid Profile (T3, T4, TSH)", "Vitamin D & B12"], fasting: "10–12 hours fasting", report: "Reports within 24–36 hours", tone: "navy" },
  { name: "Diabetes Care Profile", purpose: "Regular monitoring for people managing diabetes or at risk of it.", tests: ["Fasting & PP Blood Sugar", "HbA1c", "Kidney Function", "Urine Microalbumin", "Lipid Profile"], fasting: "8–10 hours fasting", report: "Reports usually same day", tone: "soft" },
] as const;

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-12 py-14 md:py-20 lg:min-h-[calc(100svh-7.25rem)] lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-foreground/70"><span className="mr-2 inline-block h-2 w-2 bg-accent align-middle" aria-hidden="true" />Sattva Pathology Laboratory · Ahmedabad</p>
            <h1 className="mt-6 max-w-2xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-navy-foreground md:text-7xl">
              Clarity begins with accurate answers.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-navy-foreground/80">
              Reliable pathology testing and convenient home sample collection, available around the clock in Ahmedabad.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/home-collection" className="btn btn-accent h-14 px-8 text-base">Book a Home Visit</Link>
              <a href={SITE.phoneHref} className="group inline-flex items-center gap-2 border-b border-navy-foreground/40 pb-1 font-semibold hover:border-navy-foreground">
                Call {SITE.phoneDisplay} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          <div className="relative pb-16 lg:pb-0">
            <PhotoSlot tone="navy" label="Tall photo — sample collection or Sattva reception, cropped portrait" className="aspect-[4/5] w-full border-navy-foreground/25 bg-navy lg:ml-auto lg:max-w-md" />
            <dl className="absolute bottom-0 left-0 w-64 divide-y bg-background p-6 text-foreground lg:-left-10 lg:bottom-10">
              {[["Open", "24 Hours"], ["Home Collection", "Available"], ["4.8 ★", "on Google"]].map(([a, b]) => (
                <div key={a} className="flex items-baseline justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <dt className="font-display text-lg font-bold text-navy">{a}</dt><dd className="text-sm text-muted-foreground">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b bg-background" aria-label="Why patients trust Sattva">
        <dl className="container-site grid grid-cols-2 lg:grid-cols-4">
          {[["4.8 ★", "Google Rating"], ["186+", "Patient Reviews"], ["24/7", "Laboratory Service"], ["Ahmedabad", "Home Collection"]].map(([k, v], i) => (
            <div key={k} className={`py-8 md:py-10 ${i % 2 ? "pl-6 md:pl-10" : "pr-6"} ${i > 0 ? "lg:border-l lg:pl-10" : ""} ${i % 2 ? "border-l" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}>
              <dt className="font-display text-3xl font-extrabold text-navy md:text-4xl">{k}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CARE NEEDS */}
      <section className="bg-soft">
        <div className="container-site py-20 md:py-28">
          <div className="grid gap-6 border-b border-navy/15 pb-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">What brings you here today?</h2>
            <p className="text-lg text-muted-foreground">Find the right test, package, or collection option for your health need.</p>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-6 md:grid-rows-[16rem_16rem]">
            <CareTile to="/packages" title="Routine Health Check" note="Yearly baseline tests" className="bg-navy text-navy-foreground md:col-span-3 md:row-span-1" big />
            <CareTile to="/tests" title="Diabetes Care" note="Sugar, HbA1c, kidney" className="bg-background md:col-span-2" />
            <PhotoSlot label="Close crop — sample tubes or analyser" className="hidden md:col-span-1 md:flex" />
            <PhotoSlot label="Close crop — phlebotomist at work" className="hidden md:col-span-2 md:flex" />
            <CareTile to="/tests" title="Thyroid Tests" note="T3, T4, TSH" className="bg-background md:col-span-1" />
            <CareTile to="/tests" title="Fever & Infection" note="CBC, malaria, dengue, typhoid" className="bg-primary text-primary-foreground md:col-span-1" />
            <CareTile to="/packages" title="Women's Wellness" note="Iron, thyroid, vitamins" className="bg-background md:col-span-1" />
            <CareTile to="/packages" title="Senior Health" note="Gentle home collection" className="border-t-4 border-accent bg-background md:col-span-1" />
          </div>
        </div>
      </section>

      {/* HOME COLLECTION */}
      <section className="bg-background">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
          <PhotoSlot label="Real home sample-collection photo — staff visiting a patient" className="aspect-[4/5] md:aspect-[5/6]" />
          <div>
            <p className="eyebrow">Home sample collection</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">Healthcare should not require a waiting room.</h2>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">Our trained staff come to your home at a time that suits you, with sterile single-use kits.</p>
            <ol className="mt-12 grid gap-8 border-t border-navy/15 pt-8 sm:grid-cols-3 sm:gap-6">
              {["Request collection", "A trained professional visits you", "Receive reports securely"].map((s, i) => (
                <li key={s}>
                  <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
                  <p className="mt-3 font-display text-lg font-bold leading-snug text-navy">{s}</p>
                </li>
              ))}
            </ol>
            <Link to="/home-collection" className="btn btn-accent mt-12 h-14 px-8 text-base">Schedule Home Collection</Link>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="border-t bg-soft">
        <div className="container-site py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-4xl font-extrabold leading-tight md:text-6xl">Health checks that make sense.</h2>
            <Link to="/packages" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-navy">All packages <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.25fr_1fr] lg:items-stretch">
            {PACKAGES.map((p, i) => {
              const dark = p.tone === "navy";
              return (
                <article key={p.name} className={`flex flex-col p-8 md:p-10 ${dark ? "bg-navy text-navy-foreground lg:-my-6" : p.tone === "white" ? "border bg-background" : "border border-navy/15 bg-soft"}`}>
                  <p className={`font-display text-sm font-bold ${dark ? "text-navy-foreground/60" : "text-primary"}`}>0{i + 1}</p>
                  <h3 className={`mt-4 font-display text-2xl font-extrabold md:text-3xl ${dark ? "text-navy-foreground" : ""}`}>{p.name}</h3>
                  <p className={`mt-3 ${dark ? "text-navy-foreground/80" : "text-muted-foreground"}`}>{p.purpose}</p>
                  <ul className={`mt-8 divide-y border-y text-sm ${dark ? "divide-navy-foreground/15 border-navy-foreground/15" : ""}`}>
                    {p.tests.map((t) => <li key={t} className="py-2.5">{t}</li>)}
                  </ul>
                  <dl className={`mt-6 grid grid-cols-2 gap-4 text-sm ${dark ? "text-navy-foreground/80" : "text-muted-foreground"}`}>
                    <div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Fasting</dt><dd className="mt-1">{p.fasting}</dd></div>
                    <div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Report</dt><dd className="mt-1">{p.report}</dd></div>
                  </dl>
                  <div className="mt-auto pt-8">
                    <Link to="/home-collection" className={`btn w-full ${dark ? "btn-accent" : "btn-outline"}`}>Book this check</Link>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">Call or WhatsApp us for current prices. Test lists may vary slightly — our team will confirm when you book.</p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="bg-background">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <PhotoSlot label="Sattva laboratory, reception or team photo — wide landscape" className="aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]" />
          <div className="lg:col-span-5 lg:pl-6">
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">Care that feels personal. Results you can rely on.</h2>
            <ul className="mt-10 divide-y border-y">
              {[["Hygienic handling", "Sterile, sealed, single-use collection kits."], ["Timely reports", "Delivered by WhatsApp or email when promised."], ["Helpful staff", "Patient, experienced, kind to every age."], ["Transparent support", "We explain your report in plain language."]].map(([t, d]) => (
                <li key={t} className="grid grid-cols-[9rem_1fr] gap-4 py-4 text-sm">
                  <span className="font-display font-bold text-navy">{t}</span><span className="text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-10 border-t pt-12 md:grid-cols-[1.3fr_1fr] lg:col-span-12">
            <figure>
              <blockquote className="font-display text-2xl font-semibold leading-snug text-navy md:text-4xl">“Professional, supportive staff and reports delivered on time.”</blockquote>
              <figcaption className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Stars /> Google review</figcaption>
            </figure>
            <figure className="md:mt-16 md:border-l md:pl-10">
              <blockquote className="font-display text-xl font-semibold leading-snug text-navy md:text-2xl">“Smooth home collection and clear communication.”</blockquote>
              <figcaption className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Stars /> Google review</figcaption>
              <a href={reviewsLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:text-navy">Read all 186+ reviews <ArrowUpRight className="h-4 w-4" /></a>
            </figure>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col">
            <h2 className="font-display text-5xl font-extrabold leading-none text-navy-foreground md:text-7xl">Here when you need us.</h2>
            <dl className="mt-12 divide-y divide-navy-foreground/15 border-y border-navy-foreground/15">
              {[["Address", SITE.address], ["Hours", "Open 24 Hours"], ["Phone", SITE.phoneDisplay]].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 py-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-navy-foreground/60">{k}</dt>
                  <dd className="text-lg">{k === "Phone" ? <a href={SITE.phoneHref} className="hover:underline">{v}</a> : v}</dd>
                </div>
              ))}
            </dl>
            <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="group mt-10 inline-flex w-fit items-center gap-2 border-b border-navy-foreground/40 pb-1 text-lg font-semibold hover:border-navy-foreground">
              Get Directions <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <iframe title="Sattva Pathology Laboratory on Google Maps" src={mapsEmbed} loading="lazy" className="h-80 w-full border border-navy-foreground/20 grayscale lg:h-full lg:min-h-[28rem]" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft">
        <div className="container-site grid gap-10 py-20 md:py-24 lg:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Common questions</h2>
          <FaqList items={FAQS} />
        </div>
      </section>
    </>
  );
}

function Stars() {
  return <span className="flex gap-0.5" aria-label="5 stars">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />)}</span>;
}

function CareTile({ to, title, note, className, big }: { to: "/tests" | "/packages"; title: string; note: string; className: string; big?: boolean }) {
  return (
    <Link to={to} className={`group flex min-h-40 flex-col justify-between p-6 md:min-h-0 md:p-7 ${className}`}>
      <ArrowUpRight className="h-6 w-6 self-end transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.5} />
      <span>
        <span className={`block font-display font-extrabold leading-tight ${big ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>{title}</span>
        <span className="mt-2 block text-sm opacity-75">{note}</span>
      </span>
    </Link>
  );
}
