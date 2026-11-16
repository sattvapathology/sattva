import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  ExternalLink,
  Shield,
  HelpCircle,
} from "lucide-react";
import { SITE, waLink, mapsEmbed, mapsDirectionsUrl, waServiceLink } from "@/lib/site";
import { pageHead, breadcrumbSchema } from "@/lib/seo";
import { SattvaImage } from "@/components/sattva-image";
import { ServiceBreadcrumbs, ServiceFaqSection } from "@/components/service-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageHead(
      "/contact",
      "Contact & Directions | Sattva Pathology Ahmedabad",
      "Visit Sattva Pathology Laboratory at Dream Square Complex, Nirnaynagar, Ahmedabad. 24-hour service, direct phone helpline, and Google Maps directions.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([{ name: "Contact & Directions", path: "/contact" }]),
        ),
      },
    ],
  }),
  component: ContactPage,
});

const CONTACT_FAQS = [
  [
    "How can I reach Sattva Pathology Laboratory for test enquiries?",
    "You can call our 24/7 desk at 076009 44188, message us on WhatsApp, or visit us directly at 204, Dream Square Complex in Ahmedabad.",
  ],
  [
    "Do I need to make an appointment before visiting the laboratory?",
    "No appointment is required for in-lab walk-in testing. Our facility is open 24 hours every day. However, contacting our team beforehand helps confirm specific test availability and preparation requirements.",
  ],
  [
    "How do I request home sample collection?",
    "You can submit the enquiry form below selecting 'Home collection request', or contact us via WhatsApp or phone. Our team will verify your area and schedule an available slot.",
  ],
  [
    "How can I check if my test reports are ready?",
    "Contact our laboratory team via WhatsApp or phone with your name and registration details to check report availability timelines and collection options.",
  ],
  [
    "What should I do if I have a doctor's prescription?",
    "Keep your prescription handy when contacting us. You can read the prescribed test names to our team or discuss them so we can confirm availability and preparation.",
  ],
] as const;

type EnquiryType = "test-enquiry" | "home-collection" | "report-assistance" | "general";

function ContactPage() {
  const breadcrumbs = [{ label: "Contact" }];

  const [enquiryType, setEnquiryType] = useState<EnquiryType>("test-enquiry");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [area, setArea] = useState("");
  const [testName, setTestName] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!mobile.trim() || !/^[0-9+\s-]{10,14}$/.test(mobile.trim())) {
      setErrorMsg("Please enter a valid mobile number (10–14 digits).");
      return;
    }
    if (enquiryType === "home-collection" && !area.trim()) {
      setErrorMsg("Please enter your area or landmark for home collection.");
      return;
    }
    if (!consent) {
      setErrorMsg(
        "Please check the checkbox to agree to the Privacy Policy and Terms & Conditions.",
      );
      return;
    }

    const typeLabels: Record<EnquiryType, string> = {
      "test-enquiry": "Test or Package Enquiry",
      "home-collection": "Home Collection Request",
      "report-assistance": "Report Collection Assistance",
      general: "General Enquiry",
    };

    const lines: string[] = [
      `*${typeLabels[enquiryType]}*`,
      `Name: ${name.trim()}`,
      `Mobile: ${mobile.trim()}`,
    ];

    if (enquiryType === "home-collection" && area.trim()) {
      lines.push(`Area / Landmark: ${area.trim()}`);
    }
    if ((enquiryType === "test-enquiry" || enquiryType === "home-collection") && testName.trim()) {
      lines.push(`Test / Package: ${testName.trim()}`);
    }
    if (enquiryType === "home-collection") {
      if (preferredDate) lines.push(`Preferred Date: ${preferredDate}`);
      if (preferredTime) lines.push(`Preferred Time: ${preferredTime}`);
    }
    if (message.trim()) {
      lines.push(`Notes: ${message.trim()}`);
    }

    const text = lines.join("\n");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* 1. HERO */}
      <section className="border-b bg-soft">
        <div className="container-site py-12 md:py-16">
          <ServiceBreadcrumbs items={breadcrumbs} />

          <div className="max-w-3xl">
            <span className="eyebrow">Laboratory & Service Enquiries</span>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
              Contact Sattva Pathology Laboratory
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              We are here 24 hours a day to assist you with test availability, preparation
              instructions, doorstep collection enquiries, and report availability guidance in
              Ahmedabad.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={SITE.phoneHref} className="btn btn-accent">
                <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
              </a>
              <a
                href={waServiceLink("General Enquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS */}
      <section className="bg-background py-14 md:py-16">
        <div className="container-site">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[12px] border border-navy/12 bg-soft p-6">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-navy">Call the laboratory</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Speak directly with our front-desk team for immediate test or visit enquiries.
              </p>
              <div className="mt-4">
                <a
                  href={SITE.phoneHref}
                  className="font-display text-lg font-extrabold text-navy hover:text-primary hover:underline"
                >
                  {SITE.phoneDisplay}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">
                  Available 24 hours, 7 days a week
                </p>
              </div>
            </div>

            <div className="rounded-[12px] border border-navy/12 bg-soft p-6">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-navy">WhatsApp enquiry</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Send your test name or enquiry directly to our WhatsApp number for quick guidance.
              </p>
              <div className="mt-4">
                <a
                  href={waServiceLink("Contact Enquiry")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg font-extrabold text-navy hover:text-primary hover:underline"
                >
                  +{SITE.whatsapp}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">Monitored 24/7 by our team</p>
              </div>
            </div>

            <div className="rounded-[12px] border border-navy/12 bg-soft p-6 sm:col-span-2 lg:col-span-1">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-navy">
                Visit the laboratory
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                204, Dream Square Complex, Ahmedabad, Gujarat 380013.
              </p>
              <div className="mt-4">
                <p className="font-semibold text-navy text-sm">Open 24 hours, 7 days a week</p>
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Get Directions <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION & ARRIVAL PHOTOS */}
      <section className="border-t bg-soft py-16 md:py-20" id="location">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">Laboratory Location</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
              Finding our facility in Ahmedabad
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sattva Pathology Laboratory is located on the second floor of Dream Square Complex.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-[10px] border border-navy/12 bg-background p-6">
                <h3 className="font-display text-base font-bold text-navy">Registered Address</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{SITE.address}</p>
                <div className="mt-4 border-t border-navy/10 pt-4 space-y-2 text-xs text-muted-foreground">
                  <p>
                    <strong className="text-navy">Building:</strong> Dream Square Complex (Unit 204)
                  </p>
                  <p>
                    <strong className="text-navy">Locality:</strong> Ahmedabad, Gujarat 380013
                  </p>
                  <p>
                    <strong className="text-navy">Timing:</strong> Open 24 hours every day
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-xs w-full text-center"
                  >
                    Open Google Maps Directions <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="rounded-[10px] border border-navy/12 bg-background p-5 text-xs text-muted-foreground">
                <p>
                  <strong className="text-navy">Note:</strong> Please confirm with our staff prior
                  to arrival if you have specific fasting or sample collection requirements for your
                  doctor's order.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <div>
                <SattvaImage
                  image="buildingExterior"
                  tone="soft"
                  className="aspect-[4/3] rounded-[10px] border"
                />
                <p className="mt-2 text-xs font-semibold text-navy">
                  Building exterior · Dream Square Complex
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Sattva signboard visible on the building facade.
                </p>
              </div>

              <div>
                <SattvaImage
                  image="labEntrance"
                  tone="soft"
                  className="aspect-[4/3] rounded-[10px] border"
                />
                <p className="mt-2 text-xs font-semibold text-navy">Laboratory glass entrance</p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Entrance with operating hours and laboratory contact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAP SECTION */}
      <section className="bg-background py-14 md:py-16">
        <div className="container-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
            <div>
              <p className="eyebrow">Map Overview</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-navy">
                Google Maps location overview
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Google Maps search overview based on registered address (Dream Square Complex,
                Ahmedabad 380013).
              </p>
            </div>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-xs"
            >
              Get Directions <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="overflow-hidden rounded-[10px] border">
            <iframe
              title="Sattva Pathology Laboratory on Google Maps"
              src={mapsEmbed}
              loading="lazy"
              className="h-80 w-full sm:h-96"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 5. STRUCTURED ENQUIRY FORM */}
      <section className="border-t bg-soft py-16 md:py-20" id="enquiry-form">
        <div className="container-site max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">Send an Enquiry</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
              Send us a message via WhatsApp
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Select your enquiry type below. This form formats your request and opens WhatsApp so
              you can send it directly to our laboratory team.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-[12px] border border-navy/12 bg-background p-6 sm:p-10 shadow-sm"
          >
            {errorMsg && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-md border border-accent/30 bg-accent/10 p-4 text-sm text-accent"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Enquiry Type Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Enquiry Type <span className="text-accent">*</span>
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { id: "test-enquiry", label: "Test Enquiry" },
                  { id: "home-collection", label: "Home Collection" },
                  { id: "report-assistance", label: "Report Status" },
                  { id: "general", label: "General Query" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEnquiryType(item.id as EnquiryType)}
                    className={`rounded-md border p-2.5 text-center text-xs font-semibold transition-colors ${
                      enquiryType === item.id
                        ? "border-navy bg-navy text-navy-foreground"
                        : "border-navy/15 bg-soft text-navy hover:bg-navy/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="c-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-navy"
                >
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  id="c-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="field mt-1.5 w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="c-phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-navy"
                >
                  Mobile Number <span className="text-accent">*</span>
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="e.g. 98250 12345"
                  className="field mt-1.5 w-full"
                  inputMode="tel"
                />
              </div>

              {enquiryType === "home-collection" && (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="c-area"
                    className="block text-xs font-semibold uppercase tracking-wider text-navy"
                  >
                    Area / Landmark in Ahmedabad <span className="text-accent">*</span>
                  </label>
                  <input
                    id="c-area"
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Nirnaynagar, Near Dream Square"
                    className="field mt-1.5 w-full"
                  />
                  <p className="mt-1 text-[0.68rem] text-muted-foreground">
                    Required to verify staff transit and schedule availability for doorstep
                    collection.
                  </p>
                </div>
              )}

              {(enquiryType === "test-enquiry" || enquiryType === "home-collection") && (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="c-test"
                    className="block text-xs font-semibold uppercase tracking-wider text-navy"
                  >
                    Test or Package Name (if known)
                  </label>
                  <input
                    id="c-test"
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="e.g. Complete Blood Count, Thyroid Profile, Full Body Checkup"
                    className="field mt-1.5 w-full"
                  />
                </div>
              )}

              {enquiryType === "home-collection" && (
                <>
                  <div>
                    <label
                      htmlFor="c-date"
                      className="block text-xs font-semibold uppercase tracking-wider text-navy"
                    >
                      Preferred Date
                    </label>
                    <input
                      id="c-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="field mt-1.5 w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="c-time"
                      className="block text-xs font-semibold uppercase tracking-wider text-navy"
                    >
                      Preferred Time Slot
                    </label>
                    <select
                      id="c-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="field mt-1.5 w-full"
                    >
                      <option value="">Select slot</option>
                      <option value="6 AM - 9 AM">Morning (6 AM – 9 AM)</option>
                      <option value="9 AM - 12 PM">Late Morning (9 AM – 12 PM)</option>
                      <option value="12 PM - 3 PM">Afternoon (12 PM – 3 PM)</option>
                      <option value="3 PM - 6 PM">Evening (3 PM – 6 PM)</option>
                    </select>
                  </div>
                </>
              )}

              <div className="sm:col-span-2">
                <label
                  htmlFor="c-msg"
                  className="block text-xs font-semibold uppercase tracking-wider text-navy"
                >
                  Additional Notes or Questions
                </label>
                <textarea
                  id="c-msg"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any questions regarding fasting instructions, doctor prescription, or scheduling..."
                  className="field mt-1.5 w-full"
                />
              </div>
            </div>

            {/* Medical details reminder */}
            <div className="mt-5 rounded-md border border-navy/10 bg-soft p-3 text-xs text-muted-foreground flex items-start gap-2">
              <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span>
                <strong>Privacy reminder:</strong> Please do not include sensitive medical records,
                identity documents, or detailed personal diagnostic histories in this general
                enquiry form.
              </span>
            </div>

            {/* Explicit Consent Acknowledgement */}
            <div className="mt-5">
              <label className="flex items-start gap-2.5 text-xs text-foreground/85 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-navy/20 accent-primary"
                />
                <span>
                  I agree to the{" "}
                  <Link to="/privacy" className="text-primary underline hover:text-navy">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms" className="text-primary underline hover:text-navy">
                    Terms &amp; Conditions
                  </Link>
                  , and agree to be contacted by Sattva Pathology Laboratory regarding this enquiry.
                  I understand that submitting an enquiry does not confirm an appointment and that
                  availability is confirmed by the laboratory.
                </span>
              </label>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="btn btn-accent w-full sm:w-auto">
                <MessageCircle className="h-4 w-4" /> Continue to WhatsApp
              </button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              <em>Helper text:</em> This button formats your message and opens WhatsApp. Please send
              the message in WhatsApp to contact the laboratory. Opening WhatsApp does not confirm a
              booking or guarantee slot availability.
            </p>
          </form>
        </div>
      </section>

      {/* 6. BEFORE YOU CONTACT US CHECKLIST */}
      <section className="bg-background py-14 md:py-16">
        <div className="container-site max-w-3xl">
          <div className="rounded-[10px] border border-navy/12 bg-soft p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-navy flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" /> Before you contact us
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/85">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Have the test name or your doctor's written prescription available if you have
                  one.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Share your specific area in Ahmedabad to check home collection transit and slot
                  availability.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Ask our team to verify specific fasting instructions and preparation guidance for
                  your prescription.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Contact the laboratory for guidance on report availability timelines and
                  collection options.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. MEDICAL EMERGENCY NOTICE */}
      <section className="bg-soft pb-12 pt-4">
        <div className="container-site max-w-3xl">
          <div className="rounded-[8px] border border-accent/30 bg-background p-4 text-xs text-muted-foreground flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p>
              <strong className="text-navy">Medical emergency notice:</strong> This website and
              enquiry form are not emergency-response services. Sattva Pathology Laboratory provides
              diagnostic laboratory testing and does not provide emergency medical treatment. If you
              are experiencing a medical emergency, please contact an ambulance service or visit the
              nearest emergency medical facility immediately.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CONTACT FAQS */}
      <ServiceFaqSection
        title="Contact & Visit FAQs"
        subtitle="Common questions about reaching Sattva Pathology Laboratory and arranging visits."
        items={CONTACT_FAQS}
      />
    </>
  );
}
