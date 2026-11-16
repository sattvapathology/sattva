import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Phone, MapPin, ChevronDown, ShieldAlert } from "lucide-react";
import { SITE, TERMS_REVISION_DATE } from "@/lib/site";
import { pageHead, breadcrumbSchema } from "@/lib/seo";
import { ServiceBreadcrumbs } from "@/components/service-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    ...pageHead(
      "/terms",
      "Terms of Service | Sattva Pathology Ahmedabad",
      "Terms of service and laboratory testing guidelines for Sattva Pathology Laboratory in Ahmedabad.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema([{ name: "Terms of Service", path: "/terms" }])),
      },
    ],
  }),
  component: TermsPage,
});

const TERMS_SECTIONS = [
  { id: "purpose-scope", title: "1. Website Purpose and Scope" },
  { id: "medical-disclaimer", title: "2. General Information, Not Medical Advice" },
  { id: "enquiries-appointments", title: "3. Enquiries vs. Confirmed Appointments" },
  { id: "test-availability", title: "4. Test and Package Availability" },
  { id: "preparation-guidance", title: "5. Test Preparation Instructions" },
  { id: "pricing-payment", title: "6. Pricing and Payment Confirmation" },
  { id: "home-collection-terms", title: "7. Home Sample Collection Terms" },
  { id: "report-arrangements", title: "8. Report Availability and Follow-up" },
  { id: "visitor-accuracy", title: "9. Accuracy of Information Supplied by Visitors" },
  { id: "external-services", title: "10. Use of WhatsApp, Google Maps, and External Services" },
  { id: "website-use", title: "11. Acceptable Website Use" },
  { id: "intellectual-property", title: "12. Intellectual Property and Content Ownership" },
  { id: "privacy-link", title: "13. Privacy and Data Handling" },
  { id: "changes-rescheduling", title: "14. Service Adjustments, Rescheduling, and Cancellations" },
  { id: "contact-updates", title: "15. Contact Information and Updates to Terms" },
];

function TermsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const breadcrumbs = [{ label: "Terms & Conditions" }];

  return (
    <>
      {/* HEADER */}
      <section className="border-b bg-soft py-10 md:py-14">
        <div className="container-site max-w-4xl">
          <ServiceBreadcrumbs items={breadcrumbs} />

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <FileText className="h-4 w-4" />
            <span>Legal Documentation</span>
          </div>

          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl md:text-5xl">
            Terms & Conditions
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>Last revised: {TERMS_REVISION_DATE}</span>
            <span>·</span>
            <span>Status: Operational Website Terms (Subject to Client Legal Review)</span>
          </div>

          <div className="mt-6 rounded-[8px] border border-navy/12 bg-background p-5 text-sm leading-relaxed text-foreground/85">
            <p>
              <strong>Summary:</strong> These Terms & Conditions govern your use of the Sattva
              Pathology Laboratory website. This website provides general laboratory information and
              enquiry links. It does not provide medical diagnosis, online consultations, or
              automated online payment processing. Please review these terms carefully prior to
              using our site.
            </p>
          </div>
        </div>
      </section>

      {/* BODY WITH TABLE OF CONTENTS */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-site max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
            {/* Desktop Table of Contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-[10px] border border-navy/12 bg-soft p-5 text-xs">
                <p className="font-display font-bold text-navy uppercase tracking-wider text-[0.7rem]">
                  On This Page
                </p>
                <nav aria-label="Table of contents" className="mt-4 space-y-2">
                  {TERMS_SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-muted-foreground transition-colors hover:text-navy hover:underline"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Mobile Table of Contents Accordion */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="flex w-full items-center justify-between rounded-[8px] border border-navy/15 bg-soft p-4 text-left font-display text-sm font-bold text-navy"
                aria-expanded={mobileNavOpen}
              >
                <span>Jump to section on this page</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileNavOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileNavOpen && (
                <div className="mt-2 rounded-[8px] border border-navy/12 bg-background p-4 text-xs space-y-2 shadow-sm">
                  {TERMS_SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => setMobileNavOpen(false)}
                      className="block py-1 text-muted-foreground hover:text-navy hover:underline"
                    >
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Main Terms Content */}
            <article className="prose max-w-none text-foreground/85 space-y-12">
              {/* Section 1 */}
              <section id="purpose-scope" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  1. Website Purpose and Scope
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    These Terms and Conditions (&ldquo;Terms&rdquo;) govern access to and use of the
                    website located at
                    <strong> sattvapathology.in</strong>, operated by{" "}
                    <strong>Sattva Pathology Laboratory</strong> in Ahmedabad, Gujarat, India.
                  </p>
                  <p>
                    The website is provided exclusively as an informational platform to present
                    general diagnostic test catalogues, facility details, and enquiry contact
                    channels. Accessing or browsing this website signifies your agreement to these
                    Terms.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="medical-disclaimer" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  2. General Information, Not Medical Advice
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    All content, educational descriptions, test overviews, and health package
                    summaries published on this website are intended strictly for general
                    informational purposes.
                  </p>
                  <p>
                    <strong>Medical Notice:</strong> Information on this website does not constitute
                    medical advice, medical diagnosis, clinical treatment, or an individual
                    physician-patient relationship. Diagnostic investigations must always be
                    selected, conducted, and evaluated in consultation with your treating qualified
                    healthcare practitioner. Never disregard professional clinical advice or delay
                    seeking medical attention based on information read on this website.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="enquiries-appointments" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  3. Enquiries vs. Confirmed Appointments
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Submitting an enquiry form or clicking a WhatsApp communication button on this
                    website formats and drafts an enquiry message.{" "}
                    <strong>
                      It does not create a confirmed, binding, or guaranteed appointment.
                    </strong>
                  </p>
                  <p>
                    An appointment for in-lab testing or home sample collection is only confirmed
                    when our laboratory team actively communicates with you, verifies test
                    availability, reviews scheduling, and directly confirms the slot with you via
                    WhatsApp or telephone.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="test-availability" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  4. Test and Package Availability
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Tests, diagnostic panels, and health packages listed on the website represent
                    standard pathology offerings available at or through our facility. However,
                    specific test availability, reagent supply, and analytical schedules may vary.
                  </p>
                  <p>
                    Sattva Pathology Laboratory reserves the right to confirm, adjust, or decline
                    test availability upon review of a patient's prescription or specific clinical
                    request.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="preparation-guidance" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  5. Test Preparation Instructions
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    General preparation notes on the website (e.g., &ldquo;Ask our team about
                    preparation&rdquo;) are reminders that preparation rules vary by investigation.
                  </p>
                  <p>
                    Patients are responsible for confirming exact preparation requirements (such as
                    fasting duration, hydration, or medication timing) directly with our laboratory
                    staff and their prescribing doctor prior to attending the laboratory or
                    receiving a home visit. Never discontinue prescribed medications without
                    explicit physician authorisation.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="pricing-payment" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  6. Pricing and Payment Confirmation
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    This website does not feature an online checkout, automated cart, or integrated
                    payment gateway. Any pricing figures communicated via WhatsApp, telephone, or
                    printed literature represent current laboratory tariff schedules as confirmed
                    directly by our staff.
                  </p>
                  <p>
                    Payment for laboratory services is completed directly with the laboratory or
                    attending collection personnel in accordance with confirmed laboratory billing
                    procedures.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="home-collection-terms" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  7. Home Sample Collection Terms
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Doorstep sample collection is an optional convenience service provided subject
                    to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Test suitability (certain delicate or specialized specimens may require
                      immediate in-lab draw)
                    </li>
                    <li>Geographic location and transit feasibility within Ahmedabad</li>
                    <li>Staff scheduling and confirmed appointment slot availability</li>
                    <li>
                      Payment of any applicable collection charges communicated during booking
                      confirmation
                    </li>
                  </ul>
                  <p>
                    Sattva Pathology Laboratory does not represent that home collection is available
                    in every neighbourhood or at all hours.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="report-arrangements" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  8. Report Availability and Follow-up
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Turnaround times for laboratory reports depend on the complexity of the
                    analytical assay, quality control verifications, and specimen batching.
                  </p>
                  <p>
                    Our laboratory communicates estimated report availability timelines when samples
                    are accessioned. Physical report copies can be collected at the laboratory at
                    204, Dream Square Complex. Report delivery via digital messaging is arranged
                    upon patient confirmation. Patients are urged to share completed reports
                    promptly with their treating clinician for professional evaluation.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="visitor-accuracy" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  9. Accuracy of Information Supplied by Visitors
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    When submitting enquiry forms or communicating test requests, you agree to
                    provide truthful, accurate, and complete contact details. Providing inaccurate
                    telephone numbers, patient names, or address details may prevent our team from
                    verifying appointments or communicating report availability.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="external-services" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  10. Use of WhatsApp, Google Maps, and External Services
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Our website incorporates links and embed elements provided by third-party
                    technology providers, notably WhatsApp (Meta Platforms, Inc.) and Google Maps
                    (Google LLC).
                  </p>
                  <p>
                    Your engagement with third-party platforms is governed by their respective terms
                    of service and privacy agreements. Sattva Pathology Laboratory is not liable for
                    technical interruptions, software errors, or data practices originating on
                    third-party networks.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section id="website-use" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  11. Acceptable Website Use
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    You agree to use this website solely for lawful personal health information and
                    enquiry purposes. You must not:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Use automated scrapers, bots, or data extraction scripts against website
                      endpoints
                    </li>
                    <li>
                      Attempt to breach or probe the website's security or content delivery
                      infrastructure
                    </li>
                    <li>
                      Submit defamatory, abusive, or fraudulent enquiries through website form
                      fields
                    </li>
                    <li>Transmit malicious files, scripts, or unwanted commercial solicitations</li>
                  </ul>
                </div>
              </section>

              {/* Section 12 */}
              <section id="intellectual-property" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  12. Intellectual Property and Content Ownership
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    All original website content—including textual educational descriptions, layout
                    design, branding, trademarks, and facility photographs taken at Sattva Pathology
                    Laboratory—is the property of Sattva Pathology Laboratory or used under
                    authorization.
                  </p>
                  <p>
                    Third-party trademarks (such as WhatsApp, Google, or brand names visible on
                    analytical instrumentation) remain the intellectual property of their respective
                    owners. Patient review excerpts are reproduced under fair informational
                    attribution without claiming ownership of Google reviews or individual author
                    comments.
                  </p>
                </div>
              </section>

              {/* Section 13 */}
              <section id="privacy-link" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  13. Privacy and Data Handling
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Our data handling practices regarding website enquiry information and WhatsApp
                    link generation are detailed in our dedicated{" "}
                    <Link
                      to="/privacy"
                      className="text-primary font-medium underline hover:text-navy"
                    >
                      Privacy Policy
                    </Link>
                    , which is incorporated into these Terms by reference.
                  </p>
                </div>
              </section>

              {/* Section 14 */}
              <section id="changes-rescheduling" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  14. Service Adjustments, Rescheduling, and Cancellations
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    If you need to reschedule or cancel a confirmed home sample collection
                    appointment or laboratory visit, please contact our laboratory team as early as
                    possible via WhatsApp or telephone at 076009 44188.
                  </p>
                  <p>
                    Because payments are handled in person rather than through this website, billing
                    adjustments or inquiries regarding specific test fees are addressed directly
                    with our laboratory desk.
                  </p>
                </div>
              </section>

              {/* Section 15 */}
              <section id="contact-updates" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  15. Contact Information and Updates to Terms
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Sattva Pathology Laboratory may revise these Terms and Conditions periodically
                    to reflect changes in our services, operational processes, or regulatory
                    guidance. The date of the latest revision will appear at the top of this page.
                  </p>
                  <p>For questions regarding these Terms, please contact our laboratory:</p>
                  <div className="mt-4 rounded-[10px] border border-navy/12 bg-soft p-5 text-sm text-foreground/85">
                    <p className="font-bold text-navy">Sattva Pathology Laboratory</p>
                    <p className="mt-1 flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{SITE.address}</span>
                    </p>
                    <p className="mt-1 flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-primary" />
                      <span>
                        Phone: {SITE.phoneDisplay} / WhatsApp: +{SITE.whatsapp}
                      </span>
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Operating hours: Open 24 hours, 7 days a week.
                    </p>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>

      {/* FOOTER NOTICE */}
      <section className="border-t bg-soft py-10">
        <div className="container-site max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sattva Pathology Laboratory, Ahmedabad.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-navy hover:underline">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-navy hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
