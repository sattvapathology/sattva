import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Phone, MessageCircle, Star } from "lucide-react";
import { SITE, FAQS, REVIEWS, waLink, mapsEmbed, mapsDirections, reviewsLink } from "@/lib/site";
import { FaqList, EnquiryForm } from "@/components/site";
import { PackagesSection, PopularTestsSection, ReviewsSection } from "@/components/home-sections";
import { pageHead } from "@/lib/seo";
import { SattvaImage } from "@/components/sattva-image";
import { IMAGE_PLACEMENTS } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "/",
      "Sattva Pathology Laboratory — 24 Hour Pathology Lab in Ahmedabad",
      "Sattva Pathology Laboratory, Ahmedabad: 24-hour pathology lab for blood tests, health checkup packages and home sample collection. Rated 4.8 on Google.",
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

/* CLIENT CONFIRMATION REQUIRED before launch: all "Add …" placeholders, genuine photos,
   package inclusions/prices, report process, team details and service areas. */

const Placeholder = ({ children, invert = false }: { children: string; invert?: boolean }) => (
  <span className={`inline-block border border-dashed px-2 py-1 text-xs ${invert ? "border-navy-foreground/40 text-navy-foreground/75" : "border-navy/30 text-muted-foreground"}`} data-placeholder="client-confirm">{children}</span>
);

const PKG_FIELDS = ["Add approved test inclusions", "Add fasting instructions", "Add report availability details", "Add approved pricing"];

function HomePage() {
  return (
    <>
      {/* 3 HERO */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-12 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="label-x flex items-center gap-3 text-navy-foreground/75"><span className="h-8 w-px bg-accent" aria-hidden="true" />Sattva Pathology Laboratory · Ahmedabad</p>
            <h1 className="mt-6 max-w-2xl font-display text-5xl font-bold leading-[1.0] tracking-[-0.035em] text-navy-foreground md:text-[5.25rem]">Accurate testing.<br /><span className="text-navy-foreground/70">Trusted care.</span></h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-navy-foreground/80">Pathology testing and convenient home sample collection for patients and families across Ahmedabad.</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/home-collection" className="btn btn-accent px-7">Book a Test <ArrowRight className="h-4 w-4" /></Link>
              <a href={SITE.phoneHref} className="link-u px-3"><Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}</a>
            </div>
            <a href="#visit" className="link-u mt-8 text-navy-foreground/80">Find our lab <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="relative pb-20 lg:pb-0">
            <SattvaImage eager image={IMAGE_PLACEMENTS.hero} tone="navy" className="aspect-[3/4] lg:ml-auto lg:max-w-[30rem]" />
            <dl className="absolute bottom-0 left-0 w-64 divide-y rounded-[6px] border border-navy/15 bg-background p-6 text-foreground lg:-left-12 lg:bottom-14" data-r-skip>
              <p className="label-x mb-3 flex items-center gap-2 text-[0.62rem] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />Service status</p>
              {[["Open", "24 Hours"], ["Home Collection", "Available"], ["4.8 ★", "Google Rating"]].map(([a, b]) => (
                <div key={a} className="flex items-baseline justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <dt className="font-display text-lg font-bold text-navy">{a}</dt><dd className="text-sm text-muted-foreground">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 4 TRUST STRIP */}
      <section className="border-b bg-background" aria-label="Sattva at a glance">
        <dl className="container-site grid grid-cols-2 lg:grid-cols-4">
          {[["4.8 ★", "Google Rating"], ["186+", "Google Reviews"], ["24 / 7", "Open"], ["Ahmedabad", "Home Collection"]].map(([k, v], i) => (
            <div key={k} className={`py-8 md:py-10 ${i % 2 ? "border-l pl-6 md:pl-10" : "pr-6"} ${i === 2 ? "lg:border-l lg:pl-10" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}>
              <dt className="font-display text-3xl font-extrabold text-navy md:text-4xl">{k}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 5 ABOUT */}
      <section className="bg-background">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SattvaImage image={IMAGE_PLACEMENTS.about} className="aspect-[4/3]" />
          <div>
            <p className="eyebrow">About Sattva</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">Pathology care built around patients.</h2>
            <p className="mt-6 text-lg text-muted-foreground">Sattva Pathology Laboratory supports patients and families with reliable testing, helpful staff, hygienic sample handling, and a convenient home collection option. Our focus is simple: make the testing process smoother, clearer, and more accessible.</p>
            <ul className="mt-8 grid grid-cols-2 border-t">
              {["Open 24 hours", "Home sample collection", "Timely report support", "Friendly and helpful team"].map((t, i) => (
                <li key={t} className={`border-b py-4 font-display font-bold text-navy ${i % 2 ? "border-l pl-5" : "pr-5"}`}>{t}</li>
              ))}
            </ul>
            <Link to="/about" className="btn btn-outline mt-8">Learn About Sattva</Link>
          </div>
        </div>
      </section>

      {/* 6 PACKAGES */}
      <PackagesSection />

      {/* 6b POPULAR TESTS */}
      <PopularTestsSection />

      {/* 7 FIND BY NEED */}
      <section className="bg-background">
        <div className="container-site py-20 md:py-28">
          <div className="grid gap-6 border-b pb-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">What brings you here today?</h2>
            <p className="text-lg text-muted-foreground">Find a test or package based on your health need.</p>
          </div>
          <div data-stagger className="mt-10 grid gap-3 md:grid-cols-3 md:auto-rows-[16rem]">
            <NeedTile to="/tests" title="Routine Blood Tests" className="bg-navy text-navy-foreground md:col-span-1" big />
            <NeedTile to="/tests" title="Diabetes Monitoring" className="bg-soft md:col-span-1" />
            <NeedTile to="/tests" title="Thyroid Tests" className="border bg-background md:col-span-1" />
            <NeedTile to="/tests" title="Fever & Infection Tests" className="bg-primary text-primary-foreground md:col-span-1" />
            <NeedTile to="/tests" title="Vitamin Tests" className="bg-soft md:col-span-1" />
            <NeedTile to="/packages" title="Full Body Checkups" className="border border-t-4 border-t-accent bg-background md:col-span-1" />
          </div>
        </div>
      </section>

      {/* 8 WHY */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-navy-foreground md:text-5xl">Care that feels clear, calm, and personal.</h2>
            <SattvaImage image={IMAGE_PLACEMENTS.why} tone="navy" className="mt-10 aspect-[4/3]" />
          </div>
          <ol data-stagger className="divide-y divide-navy-foreground/15 border-y border-navy-foreground/15 self-center">
            {["Hygienic sample handling", "Smooth home collection experience", "Timely report support", "Friendly, supportive staff", "Convenient Ahmedabad location", "Open 24 hours"].map((t, i) => (
              <li key={t} className="grid grid-cols-[4rem_1fr] items-baseline py-6">
                <span className="font-display text-3xl font-extrabold text-navy-foreground/40">0{i + 1}</span>
                <span className="font-display text-xl font-bold md:text-2xl">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9 INSIDE SATTVA */}
      <section className="bg-background">
        <div className="container-site py-20 md:py-28">
          <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-5xl">A comfortable experience from collection to report.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-12">
            {IMAGE_PLACEMENTS.gallery.map((image, i) => (
              <div key={image} className={i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12"}>
                <SattvaImage image={image} className={i === 0 ? "aspect-[4/3]" : i === 1 ? "aspect-[4/5] md:aspect-[20/21]" : "aspect-[16/9] md:aspect-[21/8]"} />
                <p className="mt-3 border-t pt-3 font-display font-semibold text-navy">{["Lab entrance with Sattva signage", "Reception", "Equipment close-up"][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 HOME COLLECTION */}
      <section id="home-collection" className="border-t bg-soft">
        <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Home sample collection</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">Testing from the comfort of home.</h2>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">Request a home sample collection appointment and our team will contact you to confirm availability, location, and timing.</p>
            <ol className="mt-10 grid gap-6 border-t border-navy/15 pt-6 sm:grid-cols-3">
              {["Request collection", "Confirm your visit", "Sample collection and report support"].map((s, i) => (
                <li key={s}><span className="font-display text-sm font-bold text-accent">0{i + 1}</span><p className="mt-2 font-display font-bold leading-snug text-navy">{s}</p></li>
              ))}
            </ol>
          </div>
          <div className="self-start bg-background p-6 md:p-8">
              <EnquiryForm
                title="Home Collection Request"
                submit="Request Home Collection"
                fields={[
                  { name: "name", label: "Full Name", required: true },
                  { name: "phone", label: "Mobile Number", type: "tel", required: true },
                  { name: "area", label: "Area / Landmark", required: true },
                  { name: "test", label: "Test or Package" },
                  { name: "date", label: "Preferred Date", type: "date" },
                  { name: "time", label: "Preferred Time", type: "time" },
                  { name: "notes", label: "Additional Notes", textarea: true },
                  { name: "home", label: "I need home sample collection", type: "checkbox" },
                ]}
              />
          </div>
        </div>
      </section>

      {/* 11 VISIT */}
      <section id="visit" className="bg-background">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">Visit Sattva Pathology Laboratory.</h2>
            <dl className="mt-10 divide-y border-y">
              {[["Address", SITE.address], ["Phone", SITE.phoneDisplay], ["Hours", "Open 24 Hours"]].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 py-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="text-lg text-navy">{k === "Phone" ? <a href={SITE.phoneHref} className="hover:underline">{v}</a> : v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get Directions</a>
              <a href={SITE.phoneHref} className="btn btn-outline"><Phone className="h-4 w-4" /> Call the Lab</a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <iframe title="Sattva Pathology Laboratory on Google Maps" src={mapsEmbed} loading="lazy" className="h-80 w-full rounded-[10px] border grayscale-[0.6] sm:h-full sm:min-h-[26rem]" referrerPolicy="no-referrer-when-downgrade" />
            <SattvaImage image={IMAGE_PLACEMENTS.visit} className="aspect-[4/3] sm:aspect-[3/4] sm:self-start" />
          </div>
        </div>
      </section>

      {/* 12 REVIEWS */}
      <ReviewsSection />

      {/* 13 FAQ */}
      <section className="bg-soft">
        <div className="container-site grid gap-10 py-20 md:py-24 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">Questions before you book?</h2>
            <a href={SITE.phoneHref} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:text-navy">Call {SITE.phoneDisplay} <ArrowRight className="h-4 w-4" /></a>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>

      {/* 14 AREAS */}
      <section className="bg-background">
        <div className="container-site grid gap-10 py-20 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">Serving patients across Ahmedabad.</h2>
            <p className="mt-5 text-lg text-muted-foreground">Home sample collection availability depends on area and booking confirmation.</p>
            <a href={waLink("Hello Sattva Pathology, is home sample collection available in my area?")} target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-8">Check Home Collection Availability</a>
          </div>
          <div className="border border-dashed border-navy/30 p-8" data-placeholder="service-areas">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Editable list</p>
            <p className="mt-3 font-display text-xl font-bold text-navy">Add approved service areas here</p>
          </div>
        </div>
      </section>
    </>
  );
}

function PackageBody({ n, name, invert = false, wide = false }: { n: string; name: string; invert?: boolean; wide?: boolean }) {
  return (
    <div className={`flex h-full flex-col p-8 md:p-10 ${wide ? "md:grid md:grid-cols-2 md:gap-10" : ""}`}>
      <div>
        <p className={`font-display text-sm font-bold ${invert ? "opacity-70" : "text-primary"}`}>{n}</p>
        <h3 className={`mt-3 font-display text-2xl font-extrabold md:text-3xl ${invert ? "text-current" : ""}`}>{name}</h3>
      </div>
      <div className="flex flex-1 flex-col">
        <ul className="mt-6 flex flex-wrap gap-2 md:mt-0 md:pt-6">
          {PKG_FIELDS.map((f) => <li key={f}><Placeholder invert={invert}>{f}</Placeholder></li>)}
        </ul>
        <div className="mt-auto pt-8">
          <a href={waLink(`Hello Sattva Pathology, I would like to enquire about the ${name}.`)} target="_blank" rel="noopener noreferrer" className={`btn ${invert ? "btn-invert" : "btn-outline"}`}>Enquire About This Package</a>
        </div>
      </div>
    </div>
  );
}

function Stars() {
  return <span className="flex gap-0.5" aria-label="5 stars">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />)}</span>;
}

function NeedTile({ to, title, className, big }: { to: "/tests" | "/packages"; title: string; className: string; big?: boolean }) {
  return (
    <Link to={to} className={`lift group flex min-h-36 rounded-[10px] flex-col justify-between p-6 md:min-h-0 md:p-7 ${className}`}>
      <ArrowUpRight className="h-6 w-6 self-end transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none" strokeWidth={1.5} />
      <span className={`block font-display font-extrabold leading-tight ${big ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>{title}</span>
    </Link>
  );
}
