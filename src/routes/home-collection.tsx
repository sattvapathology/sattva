import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  ShieldCheck,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileCheck2,
  ClipboardList,
} from "lucide-react";
import { SITE, PACKAGES, TESTS, waServiceLink } from "@/lib/site";
import { EnquiryForm } from "@/components/site";
import { pageHead, breadcrumbSchema } from "@/lib/seo";
import {
  ServiceBreadcrumbs,
  PreparationGuidance,
  ReportGuidanceCard,
  ServiceFaqSection,
  RelatedServices,
  CompactCtaBand,
} from "@/components/service-layout";

export const Route = createFileRoute("/home-collection")({
  validateSearch: z.object({ test: z.string().optional() }),
  head: () => ({
    ...pageHead(
      "/home-collection",
      "Home Sample Collection in Ahmedabad | Sattva Pathology",
      "Doorstep blood and pathology sample collection across Ahmedabad by Sattva Pathology Laboratory. Call or WhatsApp to check availability.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([{ name: "Home Collection", path: "/home-collection" }]),
        ),
      },
    ],
  }),
  component: HomeCollectionPage,
});

const HOME_COLLECTION_FAQS = [
  [
    "How do I know if home sample collection is available in my area?",
    "Home sample collection is available in selected areas of Ahmedabad, including Nirnaynagar and nearby neighbourhoods. Please contact our laboratory team with your landmark and area to check availability.",
  ],
  [
    "Does submitting this online request confirm my appointment?",
    "No. Submitting this request sends your details to our team via WhatsApp so we can review slot and area availability. Your appointment is confirmed once our laboratory team replies and verifies your booking.",
  ],
  [
    "How should I prepare before the phlebotomist arrives?",
    "Ask our laboratory team about specific preparation when booking. For tests requiring fasting, continue normal water intake unless advised otherwise by your doctor, and do not stop prescribed medications without clinical advice.",
  ],
  [
    "Are there any collection guidelines for home visits?",
    "Any applicable home collection guidelines depend on the test requested and your location. Our team will communicate all booking details when confirming your appointment.",
  ],
  [
    "Can I reschedule or cancel my home collection request?",
    "Yes. If you need to adjust your appointment date or time, please message us on WhatsApp or call our team at 076009 44188 as early as possible so we can update our schedule.",
  ],
  [
    "How and when will I receive my laboratory report?",
    "Our team can guide you on report availability timelines and delivery options when confirming your appointment. Physical copies can also be collected from the laboratory.",
  ],
] as const;

function HomeCollectionPage() {
  const { test } = Route.useSearch();
  const options = Array.from(
    new Set([
      ...(test ? [test] : []),
      ...PACKAGES.map((p) => p.name),
      ...TESTS.map((t) => t.name),
      "Not sure — please advise",
    ]),
  );

  const breadcrumbs = [{ label: "Home Collection" }];

  const steps = [
    {
      num: "01",
      title: "Share your request",
      text: "Submit the online request form below or contact our team directly via WhatsApp or phone with your prescribed test.",
    },
    {
      num: "02",
      title: "Confirm appointment details",
      text: "Our team will verify test eligibility, your area, preparation instructions, and confirm your preferred time slot.",
    },
    {
      num: "03",
      title: "Home sample collection",
      text: "Laboratory personnel visit your home for sample collection according to your confirmed booking.",
    },
    {
      num: "04",
      title: "Report guidance & doctor review",
      text: "Receive guidance from our team on report availability and discuss your results with your treating healthcare provider.",
    },
  ];

  return (
    <>
      {/* 1. HERO (Typography-Led, Solid Colors, No AI Photos) */}
      <section className="border-b bg-soft">
        <div className="container-site py-12 md:py-16">
          <ServiceBreadcrumbs items={breadcrumbs} />

          <div className="max-w-3xl">
            <span className="eyebrow">Doorstep Diagnostic Service</span>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
              Home Sample Collection in Ahmedabad
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Convenient blood and urine sample collection from the comfort of your home. Doorstep
              sample collection arranged by laboratory personnel, with direct transport to Sattva
              Pathology Laboratory.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waServiceLink("Home Sample Collection")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
              <a href={SITE.phoneHref} className="btn btn-outline">
                <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
              </a>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              * Home collection is subject to test eligibility, area coverage, and appointment
              confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (Numbered Flow) */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">Step-by-step process</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
              How home sample collection works
            </h2>
            <p className="mt-3 text-muted-foreground">
              From your initial request to report collection, our process is designed for patient
              comfort and sample integrity.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.num}
                className="rounded-[10px] border border-navy/12 bg-soft p-6 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="font-display text-3xl font-extrabold text-accent">{s.num}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT TO CONFIRM BEFORE BOOKING */}
      <section className="border-t bg-soft py-14 md:py-16">
        <div className="container-site">
          <div className="rounded-[12px] border border-navy/12 bg-background p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
              What to confirm before your appointment
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Please have these details ready when submitting your request or speaking with our
              team:
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Requested test or package
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Share your doctor's prescription or the specific tests required.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Area, landmark & address
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Provide complete locality details so we can confirm team availability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Preferred time slot
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select your preferred morning or daytime window for sample draw.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Preparation instructions
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ask our laboratory team whether fasting or medication timing is required.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Applicable collection charges
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our team will confirm any applicable home collection charges before booking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Appointment confirmation
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Wait for our team's direct WhatsApp or phone verification before your slot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOOKING FORM & HYGIENE COMMITMENT */}
      <section className="bg-background py-16 md:py-20" id="book-form">
        <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="border bg-soft p-6 md:p-8 rounded-[12px]">
            <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
              Request home collection
            </h2>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              Fill in your details below. This will prefill a WhatsApp message for our laboratory
              team to review slot availability.
            </p>

            <div className="mb-6 flex items-start gap-2.5 rounded-md border border-navy/15 bg-background p-3 text-xs text-muted-foreground">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                <strong className="text-navy">Please note:</strong> Submitting this request does not
                confirm an appointment. Our team will contact you directly to confirm slot and area
                availability.
              </span>
            </div>

            <EnquiryForm
              key={test}
              title="Home Collection Request"
              submit="Submit Request via WhatsApp"
              fields={[
                { name: "name", label: "Full Name", required: true },
                { name: "mobile", label: "Mobile Number", type: "tel", required: true },
                { name: "area", label: "Area / Landmark in Ahmedabad", required: true },
                { name: "test", label: "Test or Package", options: options, required: true },
                { name: "date", label: "Preferred Date", type: "date", required: true },
                {
                  name: "slot",
                  label: "Preferred Time Slot",
                  options: ["6–9 AM", "9 AM–12 PM", "12–3 PM", "3–6 PM", "6–9 PM"],
                  required: true,
                },
                { name: "notes", label: "Additional Notes or Landmark Details", textarea: true },
              ]}
            />
          </div>

          <div className="space-y-8">
            <div>
              <p className="eyebrow">Service Information</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy">
                Doorstep sample collection
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Doorstep sample collection is arranged by Sattva Pathology Laboratory for patients
                who prefer testing from home.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 rounded-[10px] border border-navy/10 bg-soft p-5">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Collection at your residence
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Laboratory personnel visit your confirmed address at an agreed time slot for
                    sample collection.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-[10px] border border-navy/10 bg-soft p-5">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Direct laboratory transport
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Collected samples are delivered directly to Sattva Pathology Laboratory for
                    analytical evaluation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-[10px] border border-navy/10 bg-soft p-5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">Area availability</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Home collection is subject to staff availability and location. Please contact
                    our team with your area to check current coverage.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[10px] border border-navy/15 bg-background p-6">
              <h3 className="font-display text-base font-bold text-navy">
                Prefer to arrange by phone?
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Call our 24/7 laboratory desk directly to discuss test options or schedule a
                collection.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={SITE.phoneHref} className="btn btn-outline text-xs">
                  <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
                </a>
                <a
                  href={waServiceLink("Home Collection Query")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent text-xs"
                >
                  <MessageCircle className="h-4 w-4" /> Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PREPARATION GUIDANCE */}
      <section className="border-t bg-soft py-16 md:py-20">
        <div className="container-site max-w-4xl">
          <PreparationGuidance
            title="Home collection preparation: general guidance"
            points={[
              "Confirm specific fasting instructions with our team when your appointment is verified.",
              "Stay normally hydrated with plain water unless your doctor has specified fluid restriction.",
              "Do not discontinue or modify any prescribed medications without explicit physician instructions.",
              "Wear loose, comfortable clothing with easy arm access for the phlebotomist.",
              "Have any previous diagnostic reports or doctor's prescription ready for reference.",
            ]}
          />
        </div>
      </section>

      {/* 6. SERVICE AREA & COVERAGE GUIDANCE */}
      <section className="bg-background py-14 md:py-16">
        <div className="container-site max-w-4xl text-center">
          <p className="eyebrow">Service Coverage</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl">
            Service area in Ahmedabad
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Home sample collection is currently available in selected areas of Ahmedabad, including
            Nirnaynagar and nearby localities. Because coverage depends on team transit and
            scheduling, please contact our team with your landmark to confirm availability.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href={waServiceLink("Check Home Collection Area Availability")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              <MessageCircle className="h-4 w-4" /> Check Area Availability on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 7. SPECIFIC HOME COLLECTION FAQS */}
      <ServiceFaqSection
        title="Home collection FAQs"
        subtitle="Common questions about doorstep sample collection, preparation, and reports."
        items={HOME_COLLECTION_FAQS}
      />

      {/* 8. REPORT GUIDANCE */}
      <section className="bg-soft py-16 md:py-20">
        <div className="container-site max-w-4xl">
          <ReportGuidanceCard />
        </div>
      </section>

      {/* 9. COMPACT CTA */}
      <CompactCtaBand
        title="Ready to request your home collection?"
        subtitle="Contact our laboratory team at any time to verify availability, preparation instructions, and confirm your slot."
        serviceName="Home Sample Collection"
      />
    </>
  );
}
