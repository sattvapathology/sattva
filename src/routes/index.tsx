import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Navigation,
  Building2,
} from "lucide-react";
import { SITE, FAQS, REVIEWS, waLink, mapsEmbed, mapsDirections, reviewsLink } from "@/lib/site";
import { FaqList, EnquiryForm } from "@/components/site";
import { PackagesSection, PopularTestsSection, ReviewsSection } from "@/components/home-sections";
import { pageHead } from "@/lib/seo";
import { SattvaImage } from "@/components/sattva-image";
import { IMAGE_PLACEMENTS, getHealthNeedImageConfig } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "/",
      "Sattva Pathology Laboratory | Blood Tests in Ahmedabad",
      "Explore blood tests and health checkup packages at Sattva Pathology Laboratory in Ahmedabad. Contact our team for home collection and booking guidance.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

/* CLIENT CONFIRMATION REQUIRED before launch: all "Add …" placeholders, genuine photos,
   package inclusions/prices, report process, team details and service areas. */

const Placeholder = ({ children, invert = false }: { children: string; invert?: boolean }) => (
  <span
    className={`inline-block border border-dashed px-2 py-1 text-xs ${invert ? "border-navy-foreground/40 text-navy-foreground/75" : "border-navy/30 text-muted-foreground"}`}
    data-placeholder="client-confirm"
  >
    {children}
  </span>
);

function HomePage() {
  return (
    <>
      {/* 3 HERO */}
      <section className="hero-section text-navy-foreground">
        {/* Decorative curved shape accent */}
        <div className="hero-curve-accent" aria-hidden="true" />

        <div className="container-site relative z-10 grid gap-12 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="label-x flex items-center gap-3 text-navy-foreground/75">
              <span className="h-8 w-px bg-accent" aria-hidden="true" />
              Accurate Testing · Trusted Care · 24 Hours
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-5xl font-bold leading-[1.05] tracking-[-0.035em] text-navy-foreground md:text-[4.75rem]">
              Sattva Pathology Laboratory{" "}
              <span className="text-navy-foreground/70">in Ahmedabad</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-navy-foreground/80">
              Clinical diagnostic blood tests, preventive health checkup packages, and convenient
              home sample collection for patients and families across Ahmedabad.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/home-collection" className="btn btn-accent px-7">
                Book a Test <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE.phoneHref} className="link-u px-3">
                <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
              </a>
            </div>
            <a href="#visit" className="link-u mt-8 text-navy-foreground/80">
              Find our lab <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative pb-20 lg:pb-0">
            {/* Soft radial blue glow behind the right-side image */}
            <div className="hero-image-glow" aria-hidden="true" />

            {/* Rounded laboratory image container with subtle shadow and smooth blending */}
            <div className="hero-image">
              <SattvaImage
                eager
                image={IMAGE_PLACEMENTS.hero}
                tone="navy"
                className="aspect-[4/3] lg:aspect-[4/3] lg:ml-auto lg:max-w-[32rem]"
              />
            </div>

            <dl
              className="absolute bottom-0 left-0 w-64 divide-y rounded-[6px] border border-navy/15 bg-background p-6 text-foreground shadow-xl lg:-left-12 lg:bottom-6 z-20"
              data-r-skip
            >
              <p className="label-x mb-3 flex items-center gap-2 text-[0.62rem] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Service status
              </p>
              {[
                ["Open", "24 Hours"],
                ["Home Collection", "Available"],
                ["4.8 ★", "Google Rating"],
              ].map(([a, b]) => (
                <div
                  key={a}
                  className="flex items-baseline justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <dt className="font-display text-lg font-bold text-navy">{a}</dt>
                  <dd className="text-sm text-muted-foreground">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 4 TRUST STRIP */}
      <section className="border-b bg-background" aria-label="Sattva at a glance">
        <dl className="container-site grid grid-cols-2 lg:grid-cols-4">
          {[
            ["4.8 ★", "Google Rating"],
            ["186+", "Google Reviews"],
            ["24 / 7", "Open"],
            ["Ahmedabad", "Home Collection"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`py-8 md:py-10 ${i % 2 ? "border-l pl-6 md:pl-10" : "pr-6"} ${i === 2 ? "lg:border-l lg:pl-10" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}
            >
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
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Pathology care built around patients.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Sattva Pathology Laboratory supports patients and families with reliable testing,
              helpful staff, hygienic sample handling, and a convenient home collection option. Our
              focus is simple: make the testing process smoother, clearer, and more accessible.
            </p>
            <ul className="mt-8 grid grid-cols-2 border-t">
              {[
                "Open 24 hours",
                "Home sample collection",
                "Timely report support",
                "Friendly and helpful team",
              ].map((t, i) => (
                <li
                  key={t}
                  className={`border-b py-4 font-display font-bold text-navy ${i % 2 ? "border-l pl-5" : "pr-5"}`}
                >
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn btn-outline mt-8">
              Learn About Sattva
            </Link>
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
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
              What brings you here today?
            </h2>
            <p className="text-lg text-muted-foreground">
              Find a test or package based on your health need.
            </p>
          </div>
          <div data-stagger className="mt-10 grid gap-3 md:grid-cols-3 md:auto-rows-[16rem]">
            <NeedTile
              to="/tests"
              title="Routine Blood Tests"
              needId="routine-blood-tests"
              className="md:col-span-1"
              big
            />
            <NeedTile
              to="/tests"
              title="Diabetes Monitoring"
              needId="diabetes-monitoring"
              className="md:col-span-1"
            />
            <NeedTile
              to="/tests"
              title="Thyroid Tests"
              needId="thyroid-tests"
              className="md:col-span-1"
            />
            <NeedTile
              to="/tests"
              title="Fever & Infection Tests"
              needId="fever-infection-tests"
              className="md:col-span-1"
            />
            <NeedTile
              to="/tests"
              title="Vitamin Tests"
              needId="vitamin-tests"
              className="md:col-span-1"
            />
            <NeedTile
              to="/packages"
              title="Full Body Checkups"
              needId="full-body-checkups"
              className="md:col-span-1"
            />
          </div>
        </div>
      </section>

      {/* 8 WHY */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-navy-foreground md:text-5xl">
              Care that feels clear, calm, and personal.
            </h2>
            <SattvaImage image={IMAGE_PLACEMENTS.why} tone="navy" className="mt-10 aspect-[4/3]" />
          </div>
          <ol
            data-stagger
            className="divide-y divide-navy-foreground/15 border-y border-navy-foreground/15 self-center"
          >
            {[
              "Hygienic sample handling",
              "Smooth home collection experience",
              "Timely report support",
              "Friendly, supportive staff",
              "Convenient Ahmedabad location",
              "Open 24 hours",
            ].map((t, i) => (
              <li key={t} className="grid grid-cols-[4rem_1fr] items-baseline py-6">
                <span className="font-display text-3xl font-extrabold text-navy-foreground/40">
                  0{i + 1}
                </span>
                <span className="font-display text-xl font-bold md:text-2xl">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9 INSIDE SATTVA */}
      <section className="bg-background">
        <div className="container-site py-20 md:py-28">
          <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-5xl">
            A comfortable experience from collection to report.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-12">
            {IMAGE_PLACEMENTS.gallery.map((image, i) => (
              <div
                key={image}
                className={i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12"}
              >
                <SattvaImage
                  image={image}
                  className={
                    i === 0
                      ? "aspect-[4/3]"
                      : i === 1
                        ? "aspect-[4/5] md:aspect-[20/21]"
                        : "aspect-[16/9] md:aspect-[21/8]"
                  }
                />
                <p className="mt-3 border-t pt-3 font-display font-semibold text-navy">
                  {
                    [
                      "Lab entrance with Sattva signage",
                      "Reception desk and waiting area",
                      "Automated laboratory analyzer",
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 HOME COLLECTION */}
      <section
        id="home-collection"
        className="relative overflow-hidden border-t border-navy/10 bg-soft/75 py-20 md:py-28"
      >
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
            {/* Left Content Column */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Doorstep Diagnostic Service</span>
                </div>

                <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
                  Testing from the comfort of home.
                </h2>

                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Request a home sample collection appointment and our team will contact you to
                  confirm availability, location, and timing.
                </p>

                {/* Service Highlights */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2.5 rounded-xl border border-navy/8 bg-white/80 p-3 shadow-2xs">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">Sterile Single-Use Kits</p>
                      <p className="text-[11px] text-muted-foreground">
                        Vacuum tubes &amp; sealed needles
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl border border-navy/8 bg-white/80 p-3 shadow-2xs">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">Early Morning Fasting</p>
                      <p className="text-[11px] text-muted-foreground">
                        Convenient pre-breakfast slots
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connected 3-Step Process Cards */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3.5 rounded-xl border border-navy/10 bg-white p-4 shadow-2xs transition hover:border-primary/40 hover:shadow-xs">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy font-display text-xs font-extrabold text-white">
                      01
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-display text-sm font-bold text-navy">
                        Request collection
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        Submit your preferred time, area, and test requirements using the form or
                        WhatsApp.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 rounded-xl border border-navy/10 bg-white p-4 shadow-2xs transition hover:border-primary/40 hover:shadow-xs">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy font-display text-xs font-extrabold text-white">
                      02
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-display text-sm font-bold text-navy">
                        Confirm your visit
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        Our laboratory team verifies area coverage, test preparation, and confirms
                        your schedule.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 rounded-xl border border-navy/10 bg-white p-4 shadow-2xs transition hover:border-primary/40 hover:shadow-xs">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy font-display text-xs font-extrabold text-white">
                      03
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-display text-sm font-bold text-navy">
                        Sample collection and report support
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        Hygienic collection by trained staff, followed by prompt verified reports
                        sent to your phone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Footer Bar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-navy/8 bg-white/70 p-3.5 text-xs">
                <span className="text-muted-foreground">
                  Need immediate assistance or urgent booking?
                </span>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-1.5 font-bold text-navy hover:text-primary hover:underline"
                >
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  <span>Call {SITE.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right Form Card Column */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[24px] border border-navy/12 bg-white p-6 shadow-md sm:p-8 md:p-9">
                {/* Soft decorative glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/5 blur-3xl" />

                {/* Form Card Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-navy/8 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                      Doorstep Booking
                    </span>
                    <h3 className="font-display text-xl font-extrabold text-navy sm:text-2xl">
                      Home Collection Request
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-soft px-3 py-1 text-xs font-semibold text-navy/80">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>24/7 Response</span>
                  </span>
                </div>

                <EnquiryForm
                  title="Home Collection Request"
                  submit="Request Home Collection via WhatsApp"
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

                <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                  * Submitting this request prepares your details in WhatsApp so our laboratory team
                  can quickly confirm your slot and fasting guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11 VISIT */}
      <section id="visit" className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
            {/* Left Info Column */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Walk-Ins &amp; 24/7 Diagnostics</span>
                </div>

                <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
                  Visit Sattva Pathology Laboratory.
                </h2>

                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Centrally located at Dream Square Complex near Akhbar Nagar Circle. Visit our
                  diagnostic facility anytime for walk-in blood tests, routine sample drop-offs, and
                  direct report consultations.
                </p>

                {/* Compact Unified Details Panel */}
                <div className="mt-6 divide-y divide-navy/8 rounded-2xl border border-navy/10 bg-white p-5 shadow-2xs">
                  {/* Address */}
                  <div className="flex items-start gap-3.5 pb-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0 flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold uppercase tracking-wider text-muted-foreground">
                          Address
                        </span>
                        <a
                          href={mapsDirections}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-semibold text-primary hover:underline"
                        >
                          <span>Directions</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                      <p className="mt-0.5 text-sm font-bold text-navy leading-snug">
                        {SITE.address}
                      </p>
                      <p className="mt-0.5 text-muted-foreground">
                        Near Akhbar Nagar Circle, Nirnay Nagar, Ahmedabad
                      </p>
                    </div>
                  </div>

                  {/* Phone & Hours Grid */}
                  <div className="grid gap-4 pt-3.5 sm:grid-cols-2">
                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                        <Phone className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 text-xs">
                        <span className="font-bold uppercase tracking-wider text-muted-foreground">
                          Phone (24/7)
                        </span>
                        <a
                          href={SITE.phoneHref}
                          className="mt-0.5 block font-display text-sm font-extrabold text-navy hover:text-primary hover:underline"
                        >
                          {SITE.phoneDisplay}
                        </a>
                        <p className="text-muted-foreground">Emergency &amp; enquiries</p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                        <Clock className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 text-xs">
                        <span className="font-bold uppercase tracking-wider text-muted-foreground">
                          Working Hours
                        </span>
                        <p className="mt-0.5 text-sm font-extrabold text-navy">Open 24 Hours</p>
                        <p className="text-muted-foreground">Walk-ins welcome</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center gap-2 shadow-xs hover:shadow-md"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Get Directions</span>
                </a>

                <a href={SITE.phoneHref} className="btn btn-outline inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Call the Lab</span>
                </a>

                <a
                  href={waLink("Hello Sattva Pathology, I would like to visit the laboratory.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Right Map & Exterior Photo Showcase (Perfect Equal-Height Twin Cards) */}
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {/* Building Exterior Showcase */}
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-navy/12 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-navy/8 bg-soft/40 px-3.5 py-2 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-navy">
                    <Building2 className="h-3.5 w-3.5 text-accent" />
                    <span>Laboratory Exterior</span>
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">Signboard</span>
                </div>
                <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden bg-soft sm:aspect-auto">
                  <SattvaImage
                    image={IMAGE_PLACEMENTS.visit}
                    className="h-full w-full rounded-none border-0"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-navy/8 bg-soft/50 px-3.5 py-2.5 text-xs">
                  <span className="font-semibold text-navy">Dream Square Complex</span>
                  <span className="text-muted-foreground">2nd Floor Walk-in Entrance</span>
                </div>
              </div>

              {/* Interactive Map Viewport */}
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-navy/12 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-navy/8 bg-soft/40 px-3.5 py-2 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-navy">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    <span>Google Maps Location</span>
                  </div>
                  <a
                    href={mapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-primary hover:underline"
                  >
                    Open ↗
                  </a>
                </div>
                <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden sm:aspect-auto">
                  <iframe
                    title="Sattva Pathology Laboratory on Google Maps"
                    src={mapsEmbed}
                    loading="lazy"
                    className="h-full w-full grayscale-[0.2] transition-[filter] duration-300 hover:grayscale-0 min-h-[220px]"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-navy/8 bg-soft/50 px-3.5 py-2.5 text-xs">
                  <span className="font-semibold text-navy">Near Akhbar Nagar Circle</span>
                  <span className="text-muted-foreground">Ahmedabad 380013</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 REVIEWS */}
      <ReviewsSection />

      {/* 13 FAQ */}
      <section className="bg-soft">
        <div className="container-site grid gap-10 py-20 md:py-24 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              Questions before you book?
            </h2>
            <a
              href={SITE.phoneHref}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:text-navy"
            >
              Call {SITE.phoneDisplay} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>

      {/* 14 SERVICE AREAS & HOME COLLECTION */}
      <section className="relative overflow-hidden border-t border-navy/8 bg-gradient-to-b from-background via-soft/25 to-background py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary">
                <MapPin className="h-3.5 w-3.5" />
                <span>Doorstep Sample Collection · Ahmedabad</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
                Serving patients across Ahmedabad.
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Home sample collection availability depends on area and booking confirmation.
                Convenient doorstep blood and routine pathology sample collection arranged by
                trained laboratory phlebotomists, with safe, temperature-controlled transit directly
                to our 24/7 central laboratory.
              </p>

              {/* Service Highlights */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-navy/8 bg-white p-4 shadow-2xs">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-navy">
                      Sterile Single-Use Kits
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Sealed disposables and vacuum collection tubes for utmost safety and hygiene.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-navy/8 bg-white p-4 shadow-2xs">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-navy">
                      24/7 Central Lab Processing
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Direct transport to our Nirnaynagar automated facility for timely, accurate
                      results.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href={waLink(
                    "Hello Sattva Pathology, is home sample collection available in my area?",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Check Home Collection Availability</span>
                </a>

                <Link to="/home-collection" className="btn btn-outline flex items-center gap-2">
                  <span>How Collection Works</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                * Home sample collection is subject to test eligibility, technician availability,
                and appointment confirmation.
              </p>
            </div>

            {/* Right Card: How to Book / Coverage Highlights */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-navy/12 bg-white p-6 shadow-sm sm:p-8">
                {/* Decorative subtle backdrop accent */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

                <div className="flex items-center justify-between border-b border-navy/8 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                      Simple 3-Step Process
                    </span>
                    <h3 className="font-display text-lg font-extrabold text-navy">
                      Requesting a Home Visit
                    </h3>
                  </div>
                  <span className="rounded-full bg-soft px-2.5 py-1 text-xs font-semibold text-navy/75">
                    Ahmedabad
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                      1
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-bold text-navy">
                        Share Area &amp; Prescribed Test
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        Message us on WhatsApp with your location, landmark, and prescribed tests or
                        health packages.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                      2
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-bold text-navy">
                        Confirm Slot &amp; Fasting Guidance
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        Our team verifies coverage, provides test preparation guidance, and confirms
                        your visit slot.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                      3
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-bold text-navy">
                        Home Visit &amp; Digital Reports
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        Hygienic collection by laboratory staff, followed by timely digital reports
                        delivered to your phone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Hub Information */}
                <div className="mt-6 rounded-xl border border-navy/8 bg-soft/70 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="text-xs">
                      <p className="font-bold text-navy">Central Laboratory Hub</p>
                      <p className="mt-0.5 text-muted-foreground">
                        Dream Square Complex, Near Akhbarnagar Circle, Nirnaynagar
                      </p>
                      <p className="mt-1 font-semibold text-primary">
                        Serving Nirnaynagar &amp; nearby Ahmedabad areas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, j) => (
        <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
      ))}
    </span>
  );
}

function NeedTile({
  to,
  title,
  needId,
  className = "",
  big,
}: {
  to: "/tests" | "/packages";
  title: string;
  needId?: string;
  className?: string;
  big?: boolean;
}) {
  const { url, position } = getHealthNeedImageConfig(needId || title);

  return (
    <Link
      to={to}
      className={`lift group relative flex min-h-40 md:min-h-0 flex-col justify-between overflow-hidden rounded-[14px] border border-navy/15 bg-navy p-6 text-white shadow-xs transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-white md:p-7 ${className}`}
    >
      {/* Background photograph (when added by user) */}
      {url && (
        <img
          src={url}
          alt=""
          aria-hidden="true"
          style={{ objectPosition: position }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] pointer-events-none select-none motion-reduce:transform-none"
          loading="lazy"
        />
      )}

      {/* Uniform solid navy translucent overlay (strictly NO gradients; solid navy fallback when no image) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-200 ${
          url ? "bg-navy/75 group-hover:bg-navy/70" : "bg-navy"
        }`}
        aria-hidden="true"
      />

      {/* Arrow */}
      <ArrowUpRight
        className="relative z-10 h-6 w-6 self-end text-white/90 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white motion-reduce:transform-none"
        strokeWidth={1.75}
        aria-hidden="true"
      />

      {/* Title */}
      <span
        className={`relative z-10 block font-display font-extrabold leading-tight text-white ${
          big ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl md:text-2xl"
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
