import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Star,
  CheckCircle2,
} from "lucide-react";
import { SITE, REVIEWS, getGoogleListingUrl, mapsDirectionsUrl, waServiceLink } from "@/lib/site";
import { pageHead, breadcrumbSchema } from "@/lib/seo";
import { SattvaImage } from "@/components/sattva-image";
import { ServiceBreadcrumbs, CompactCtaBand } from "@/components/service-layout";
import { RateUsButton } from "@/components/review-action";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...pageHead(
      "/about",
      "About Us | Sattva Pathology Laboratory Ahmedabad",
      "Learn about Sattva Pathology Laboratory in Ahmedabad. Dedicated clinical diagnostics, 24/7 service, and patient-centered laboratory care.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema([{ name: "About Us", path: "/about" }])),
      },
    ],
  }),
  component: AboutPage,
});

export default function AboutPage() {
  const breadcrumbs = [{ label: "About" }];

  const expectations = [
    {
      num: "01",
      title: "Clear enquiry assistance",
      desc: "Our team helps you confirm test availability, doctor's prescription details, and relevant options before booking.",
    },
    {
      num: "02",
      title: "Preparation guidance",
      desc: "Clear advice on whether your prescribed test requires specific fasting or sample collection timing.",
    },
    {
      num: "03",
      title: "Lab visit or doorstep collection",
      desc: "Attend our 24/7 laboratory at Dream Square Complex or enquire about eligible home collection scheduling in Ahmedabad.",
    },
    {
      num: "04",
      title: "Report availability guidance",
      desc: "Information from our staff regarding report availability timelines, collection options, and medical follow-up.",
    },
  ];

  return (
    <>
      {/* 1. HERO */}
      <section className="border-b bg-soft">
        <div className="container-site py-12 md:py-16">
          <ServiceBreadcrumbs items={breadcrumbs} />

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow">Diagnostic Laboratory · Ahmedabad</span>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
                About Sattva Pathology Laboratory
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Sattva Pathology Laboratory provides clinical pathology testing for patients,
                families, and referring clinicians in Ahmedabad. Operating 24 hours a day at Dream
                Square Complex, our laboratory focuses on accessible testing, helpful communication,
                and responsive patient service.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="btn btn-accent">
                  Contact the Lab <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/tests" className="btn btn-outline">
                  Explore Tests
                </Link>
              </div>
            </div>

            <div className="relative">
              <SattvaImage
                image="reception"
                tone="soft"
                className="aspect-[4/3] rounded-[12px] shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
              Accessible diagnostic testing in Ahmedabad
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
              <p>
                Located at 204, Dream Square Complex in Ahmedabad, Sattva Pathology Laboratory
                operates around the clock to support urgent and routine diagnostic needs. Our
                facility offers walk-in sample collection at any hour, alongside home sample
                collection enquiries for patients who prefer testing from home.
              </p>
              <p>
                Patient feedback gathered through Google reviews highlights key themes that shape
                our day-to-day service: supportive communication from our front-desk and phlebotomy
                team, a focus on clean sample handling, smooth sample collection, and timely
                guidance on report availability.
              </p>
              <p className="text-sm text-muted-foreground">
                <em>Note:</em> Patient reviews reflect individual experiences and service
                impressions, and are not presented as claims of clinical accuracy or medical
                guarantees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT PATIENTS CAN EXPECT */}
      <section className="border-t bg-soft py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">Patient experience</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
              What patients can expect
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our service flow is designed to give you clarity from your first enquiry through
              report collection.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map((exp) => (
              <div
                key={exp.num}
                className="rounded-[10px] border border-navy/12 bg-background p-6 shadow-sm"
              >
                <span className="font-display text-3xl font-extrabold text-accent">{exp.num}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">{exp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. A LOOK INSIDE SATTVA */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">Our Facility</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
              A look inside Sattva Pathology
            </h2>
            <p className="mt-3 text-muted-foreground">
              Photographs of our laboratory entrance, reception counter, and automated testing
              equipment.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
              <SattvaImage
                image="labEntrance"
                tone="soft"
                className="aspect-[4/3] rounded-[10px] border"
              />
              <p className="mt-2.5 font-display text-sm font-semibold text-navy">
                Lab entrance with signage & operating hours
              </p>
              <p className="text-xs text-muted-foreground">
                Front entrance at Dream Square Complex with contact signage.
              </p>
            </div>

            <div className="flex flex-col">
              <SattvaImage
                image="reception"
                tone="soft"
                className="aspect-[4/3] rounded-[10px] border"
              />
              <p className="mt-2.5 font-display text-sm font-semibold text-navy">
                Reception desk & patient area
              </p>
              <p className="text-xs text-muted-foreground">
                Desk area for test registration and enquiry assistance.
              </p>
            </div>

            <div className="flex flex-col sm:col-span-2 lg:col-span-1">
              <SattvaImage
                image="equipmentOne"
                tone="soft"
                className="aspect-[4/3] rounded-[10px] border"
              />
              <p className="mt-2.5 font-display text-sm font-semibold text-navy">
                Automated laboratory analyzer
              </p>
              <p className="text-xs text-muted-foreground">
                Automated clinical analytical instrument inside our Ahmedabad facility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PATIENT EXPERIENCES */}
      <section className="border-t bg-soft py-16 md:py-20" id="reviews">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Patient Feedback</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
                Patient experiences
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Excerpts from patient feedback on our Google Business Profile.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getGoogleListingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-xs"
              >
                Read Google Reviews <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <RateUsButton className="btn btn-accent text-xs">Rate Us on Google</RateUsButton>
            </div>
          </div>

          {/* Rating Summary Indicator */}
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[10px] border border-navy/12 bg-background p-4 text-sm text-navy">
            <span className="flex items-center gap-1 font-bold text-accent">
              <Star className="h-4 w-4 fill-accent" /> {SITE.rating} / 5.0
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">
              Based on {SITE.reviews} patient reviews on Google (recorded business listing data)
            </span>
          </div>

          {/* Review Cards Grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="flex flex-col justify-between rounded-[12px] border border-navy/12 bg-background p-6 shadow-sm"
              >
                <div>
                  <p className="font-display font-bold text-navy">{r.name}</p>
                  <p className="text-xs text-muted-foreground">Google review · edited excerpt</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RATE YOUR EXPERIENCE */}
      <section className="bg-background py-14 md:py-16">
        <div className="container-site">
          <div className="rounded-[12px] border border-navy/12 bg-soft p-8 md:p-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                Visited Sattva? Share your experience.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Your honest feedback helps us understand what went well and where we can improve. We
                welcome candid reviews from all patients and families.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <RateUsButton className="btn btn-accent">
                  Rate Us on Google <ExternalLink className="h-4 w-4" />
                </RateUsButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PLAN YOUR VISIT */}
      <section className="border-t bg-soft py-16 md:py-20" id="visit">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">Location & Hours</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
              Plan your laboratory visit
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sattva Pathology Laboratory is open 24 hours a day for walk-ins and patient queries.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-[10px] border border-navy/12 bg-background p-6">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-display text-base font-bold text-navy">Address</h3>
              <p className="mt-1 text-sm text-muted-foreground">{SITE.address}</p>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Get Directions <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            <div className="rounded-[10px] border border-navy/12 bg-background p-6">
              <Phone className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-display text-base font-bold text-navy">Phone & WhatsApp</h3>
              <p className="mt-1 text-sm text-muted-foreground">Phone: {SITE.phoneDisplay}</p>
              <p className="text-sm text-muted-foreground">WhatsApp: +{SITE.whatsapp}</p>
              <div className="mt-4 flex gap-3 text-xs font-semibold text-primary">
                <a href={SITE.phoneHref} className="hover:underline">
                  Call
                </a>
                <span>·</span>
                <a
                  href={waServiceLink("Lab Enquiry")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-[10px] border border-navy/12 bg-background p-6">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-display text-base font-bold text-navy">Opening Hours</h3>
              <p className="mt-1 text-sm text-muted-foreground">Open 24 hours, 7 days a week</p>
              <p className="text-xs text-muted-foreground mt-1">
                Walk-in testing and report collection available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMPACT CTA */}
      <CompactCtaBand
        title="Have questions for our laboratory team?"
        subtitle="Contact us on WhatsApp or call our 24/7 desk at Dream Square Complex in Ahmedabad."
        serviceName="General Enquiry"
      />
    </>
  );
}
