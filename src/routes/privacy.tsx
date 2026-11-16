import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, FileText, Phone, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { SITE, PRIVACY_POLICY_REVISION_DATE, waServiceLink } from "@/lib/site";
import { pageHead, breadcrumbSchema } from "@/lib/seo";
import { ServiceBreadcrumbs } from "@/components/service-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    ...pageHead(
      "/privacy",
      "Privacy Policy | Sattva Pathology Ahmedabad",
      "Privacy Policy and health information protection terms for patients and visitors of Sattva Pathology Laboratory in Ahmedabad.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }])),
      },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  { id: "scope", title: "1. Scope and Website Scope" },
  { id: "information-collected", title: "2. Information Entered in Enquiry Forms" },
  { id: "how-information-used", title: "3. How Enquiry Information Is Used" },
  { id: "whatsapp-communication", title: "4. What Happens When You Continue to WhatsApp" },
  { id: "third-parties", title: "5. Third-Party Services and External Links" },
  { id: "technical-data", title: "6. Technical Information, Cookies, and Hosting" },
  { id: "sensitive-information", title: "7. Sensitive Medical Information" },
  { id: "retention", title: "8. Data Retention" },
  { id: "security", title: "9. Information Security" },
  { id: "your-rights", title: "10. Privacy Enquiries, Corrections, and Concerns" },
  { id: "dependents", title: "11. Enquiries Concerning Children or Dependents" },
  { id: "policy-changes", title: "12. Changes to This Privacy Policy" },
  { id: "contact-privacy", title: "13. Contact Information for Privacy Matters" },
];

function PrivacyPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const breadcrumbs = [{ label: "Privacy Policy" }];

  return (
    <>
      {/* HEADER */}
      <section className="border-b bg-soft py-10 md:py-14">
        <div className="container-site max-w-4xl">
          <ServiceBreadcrumbs items={breadcrumbs} />

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Shield className="h-4 w-4" />
            <span>Legal Documentation</span>
          </div>

          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>Last revised: {PRIVACY_POLICY_REVISION_DATE}</span>
            <span>·</span>
            <span>Status: Operational Website Policy (Subject to Client Legal Review)</span>
          </div>

          <div className="mt-6 rounded-[8px] border border-navy/12 bg-background p-5 text-sm leading-relaxed text-foreground/85">
            <p>
              <strong>Summary:</strong> This website is an informational service provided by Sattva
              Pathology Laboratory. We do not maintain an online account database, user registration
              system, or web-based medical record repository. Information entered in website forms
              is formatted into an external WhatsApp communication for direct transmission to our
              laboratory team. Please review this document to understand how website data, WhatsApp
              links, and technical information are handled.
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
                  {SECTIONS.map((s) => (
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
                  {SECTIONS.map((s) => (
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

            {/* Main Policy Content (No scroll-reveal delay to ensure immediate accessibility) */}
            <article className="prose max-w-none text-foreground/85 space-y-12">
              {/* Section 1 */}
              <section id="scope" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  1. Scope and Website Scope
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    This Privacy Policy applies to personal information collected or transmitted
                    through the website of
                    <strong> Sattva Pathology Laboratory</strong> (located at Dream Square Complex,
                    Ahmedabad, Gujarat, India; accessible at sattvapathology.in).
                  </p>
                  <p>
                    This policy specifically describes how information provided via website enquiry
                    forms, WhatsApp link helpers, and technical server interactions is handled. It
                    does not represent an exhaustive description of internal clinical or physical
                    records managed offline at the physical laboratory, which are governed by
                    applicable Indian medical regulations and standard laboratory confidentiality
                    protocols.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="information-collected" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  2. Information Entered in Enquiry Forms
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    When you use our website enquiry forms (such as the Home Collection Request form
                    or the Contact form), you may choose to provide:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Full Name</li>
                    <li>Mobile Phone Number</li>
                    <li>General Area or Landmark in Ahmedabad (for home collection scheduling)</li>
                    <li>Requested Test or Package Name (if known)</li>
                    <li>Preferred appointment date and approximate time slot</li>
                    <li>General notes, questions, or comments</li>
                  </ul>
                  <p>
                    All form fields are submitted voluntarily by you to facilitate communication
                    with our team.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="how-information-used" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  3. How Enquiry Information Is Used
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>Information you provide through website forms is used exclusively for:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Responding to your test availability, pricing, or laboratory visit enquiries
                    </li>
                    <li>Assessing home collection coverage and verifying appointment slots</li>
                    <li>Providing preparation guidance relevant to your doctor's test order</li>
                    <li>
                      Communicating regarding laboratory report availability and collection guidance
                    </li>
                  </ul>
                  <p>
                    Sattva Pathology Laboratory does not sell, rent, lease, or distribute your
                    personal contact information to third-party marketing companies.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="whatsapp-communication" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  4. What Happens When You Continue to WhatsApp
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    It is important to understand the technical mechanism of our website enquiry
                    buttons and forms:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <strong>Typing in the form:</strong> When you enter details into our website
                      form fields, they reside locally within your browser session until you submit
                      the form.
                    </li>
                    <li>
                      <strong>Submitting the form:</strong> Pressing &ldquo;Continue to
                      WhatsApp&rdquo; or &ldquo;Enquire on WhatsApp&rdquo; does not transmit your
                      data to a website database. Instead, our script constructs a prefilled URL
                      (using standard WhatsApp deep-linking protocols) containing the text of your
                      enquiry.
                    </li>
                    <li>
                      <strong>Opening WhatsApp:</strong> Your browser opens the WhatsApp application
                      or WhatsApp Web with the message drafted in your message bar.
                    </li>
                    <li>
                      <strong>Sending the message:</strong> The drafted enquiry is only delivered to
                      Sattva Pathology Laboratory when you actively press &ldquo;Send&rdquo; inside
                      WhatsApp. Simply opening the link does not deliver the message.
                    </li>
                    <li>
                      <strong>Browser history & URL transmission:</strong> Because prefilled
                      messages are passed as URL parameters to WhatsApp, enquiry text may appear in
                      your browser history or address bar. Please clear your history if using a
                      shared or public computer.
                    </li>
                  </ol>
                  <p>
                    Once inside WhatsApp, communications are subject to WhatsApp's own terms of
                    service and end-to-end encryption policies as maintained by Meta Platforms, Inc.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="third-parties" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  5. Third-Party Services and External Links
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>Our website interfaces with selected third-party external services:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>WhatsApp (Meta):</strong> Used for voluntary patient messaging and
                      enquiry intake.
                    </li>
                    <li>
                      <strong>Google Maps:</strong> An embedded map iframe and direction links are
                      provided on the Contact and Visit sections to assist visitors in locating
                      Dream Square Complex. Loading the map or clicking directions transmits
                      standard browser request headers to Google LLC and is subject to Google's
                      Privacy Policy.
                    </li>
                    <li>
                      <strong>Google Business Profile Reviews:</strong> Links to read or submit
                      Google reviews navigate to Google's external platform.
                    </li>
                  </ul>
                  <p>
                    Sattva Pathology Laboratory is not responsible for the independent privacy
                    practices of external websites or platforms.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="technical-data" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  6. Technical Information, Cookies, and Hosting
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    This website does not deploy third-party advertising cookies, behavioural
                    profiling trackers, or marketing pixels.
                  </p>
                  <p>
                    When you access the website, standard technical request information (such as
                    internet protocol [IP] address, browser type, operating system, and timestamp)
                    is processed by our website hosting infrastructure (e.g., Cloudflare content
                    delivery network) to securely deliver web pages, protect against automated
                    denial-of-service abuse, and maintain server reliability.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="sensitive-information" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  7. Sensitive Medical Information
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Website forms on this site are designed solely for general appointment requests
                    and test queries.
                  </p>
                  <p>
                    <strong>Please do not submit:</strong> Government identity numbers, confidential
                    diagnostic reports, photographs of sensitive anatomical areas, or detailed
                    medical histories through general website forms. Clinical documentation and
                    prescription review should be shared directly in person at the laboratory or via
                    direct communication verified with our staff.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="retention" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">8. Data Retention</h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Because this website does not store form submissions in a database, website
                    enquiry records are not retained by the website infrastructure itself.
                  </p>
                  <p>
                    Messages transmitted by you to our laboratory via WhatsApp reside within our
                    active business WhatsApp chat history, maintained on mobile devices or secure
                    backups for customer communication follow-up and appointment verification.
                    Physical laboratory diagnostic registers and reports generated offline are
                    retained in accordance with applicable Indian laboratory record-keeping
                    practices and medical standards.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="security" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  9. Information Security
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    This website is served over Transport Layer Security (HTTPS) to encrypt data in
                    transit between your browser and our hosting provider.
                  </p>
                  <p>
                    While we take proportionate and reasonable administrative precautions to handle
                    patient enquiries responsibly, no internet-based transmission or digital
                    messaging system is completely secure. We cannot guarantee absolute security
                    against unauthorized access or intercept by malicious third parties.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="your-rights" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  10. Privacy Enquiries, Corrections, and Concerns
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Under applicable Indian legal principles, you have the right to request access
                    to the personal contact information you have submitted, request correction of
                    inaccurate details, or request that we cease contacting you on WhatsApp for
                    non-essential communications.
                  </p>
                  <p>
                    To exercise these options, please contact our laboratory team directly using the
                    details provided below. Requests will be addressed within reasonable operational
                    timeframes.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section id="dependents" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  11. Enquiries Concerning Children or Dependents
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    When submitting an enquiry or booking request on behalf of a minor child or
                    dependent family member, you confirm that you are the parent, legal guardian, or
                    authorized caregiver entitled to arrange diagnostic testing for the individual.
                  </p>
                </div>
              </section>

              {/* Section 12 */}
              <section id="policy-changes" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  12. Changes to This Privacy Policy
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    We may update this Privacy Policy from time to time to reflect operational
                    changes, laboratory service updates, or changes in applicable legal guidance.
                    The revised date will be displayed at the top of this page. Continued use of the
                    website following revisions indicates awareness of the updated terms.
                  </p>
                </div>
              </section>

              {/* Section 13 */}
              <section id="contact-privacy" className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy">
                  13. Contact Information for Privacy Matters
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    If you have questions, comments, or concerns regarding this Privacy Policy or
                    how your enquiry information is handled, please contact Sattva Pathology
                    Laboratory through our confirmed channels:
                  </p>
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
            <Link to="/terms" className="hover:text-navy hover:underline">
              Terms & Conditions
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
