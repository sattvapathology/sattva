import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Check,
  MessageCircle,
  Phone,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  ShieldCheck,
} from "lucide-react";
import { SITE, waPackageLink } from "@/lib/site";
import { PACKAGES_DATA, resolvePackageInclusions, type PackageData } from "@/lib/packages-data";
import { DetailsDialog } from "@/components/home-sections";
import { PackageIllustration } from "@/components/package-illustration";
import { pageHead, breadcrumbSchema } from "@/lib/seo";
import {
  ServiceHero,
  BookingSteps,
  PreparationGuidance,
  ReportGuidanceCard,
  ServiceFaqSection,
  RelatedServices,
  CompactCtaBand,
} from "@/components/service-layout";

export const Route = createFileRoute("/packages")({
  head: () => ({
    ...pageHead(
      "/packages",
      "Health Checkup Packages in Ahmedabad | Sattva Pathology",
      "Explore preventive health checkup packages at Sattva Pathology Laboratory in Ahmedabad. Comprehensive body profiles and routine wellness screening.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([{ name: "Health Packages", path: "/packages" }]),
        ),
      },
    ],
  }),
  component: PackagesPage,
});

const PACKAGE_FAQS = [
  [
    "How do I choose between the Basic and Advanced Body Profiles?",
    "The Basic Body Profile provides a strong routine baseline covering blood counts, fasting blood glucose, lipid profile, basic liver and kidney markers, thyroid, and urine. The Advanced Body Profile includes full liver and renal function panels along with Vitamin B12 for a more comprehensive systemic review. Consult your physician to determine which profile suits your health review needs.",
  ],
  [
    "What are the differences among the Advanced-derived packages?",
    "The Advanced + Diabetic Profile combines the Advanced panel with HbA1c for complete blood sugar tracking. The Silver Body Profile adds Vitamin D3 for bone wellness, while the Gold Body Profile includes both Vitamin D3 and HbA1c. The Male and Female Executive Profiles incorporate specialized biological markers (PSA and CA-125 respectively).",
  ],
  [
    "Do all health checkup packages require overnight fasting?",
    "Fasting requirements depend on the tests included in your selected package. Packages containing fasting blood sugar or lipid profile typically require an overnight fast. Contact our laboratory team to confirm specific preparation instructions prior to your appointment.",
  ],
  [
    "Can checkup packages be scheduled for home sample collection?",
    "Yes, sample collection for eligible checkup packages is available across confirmed neighbourhoods in Ahmedabad. Submitting a request allows our team to confirm test eligibility, area coverage, and your preferred appointment time.",
  ],
  [
    "Can additional doctor-prescribed tests be added to a package?",
    "Yes. If your physician has requested additional specific tests alongside a checkup package, our team can arrange for the additional parameters to be drawn during the same visit.",
  ],
  [
    "What should I do after receiving my health checkup report?",
    "Always schedule a follow-up review with your family physician or treating doctor. Laboratory reports must be interpreted in conjunction with your personal clinical history, lifestyle, and physical examination.",
  ],
] as const;

function PackagesPage() {
  const [selectedPkg, setSelectedPkg] = useState<PackageData | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = (pkg: PackageData, btn: HTMLButtonElement) => {
    triggerRef.current = btn;
    setSelectedPkg(pkg);
  };

  const handleClose = () => {
    setSelectedPkg(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const breadcrumbs = [{ label: "Health Packages" }];

  return (
    <>
      {/* 1. HERO */}
      <ServiceHero
        breadcrumbs={breadcrumbs}
        badge="Preventive & Diagnostic Panels"
        title="Health Checkup Packages in Ahmedabad"
        subtitle="Sattva Pathology Laboratory · 24/7 Quality Testing"
        description="Explore eight structured diagnostic profiles combining essential haematology, organ function markers, metabolic parameters, and specialized assessments. Review inclusions, preparation advice, and arrange a lab visit or doorstep collection."
        serviceName="Health Checkup Packages"
        imageKey="equipmentOne"
        imageTone="navy"
      />

      {/* 2. OVERVIEW & COMPARISON GUIDANCE */}
      <section className="bg-background py-14 md:py-16">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow">Preventive Care</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
                Structured health packages designed for clarity and peace of mind
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Health checkup packages group essential diagnostic tests into structured,
                single-visit panels. Whether you are scheduling an annual health review, monitoring
                chronic metabolic parameters, or fulfilling employer requirements, our laboratory
                provides organized testing supported by modern automated instrumentation.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                All samples are handled with sterile, hygienic collection materials by trained
                personnel. Our team is on hand 24 hours a day to guide you through package
                inclusions, fasting preparation, and scheduling.
              </p>
            </div>

            <div className="rounded-[12px] border border-navy/12 bg-soft p-6 lg:col-span-5">
              <div className="flex items-center gap-2 font-display text-base font-bold text-navy">
                <Info className="h-5 w-5 text-primary" />
                <span>How to compare packages:</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-foreground/85">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <strong className="text-navy">Basic & Advanced:</strong> Core systemic profiles
                    reviewing blood counts, glucose, lipids, liver enzymes, renal filtration,
                    thyroid, and urine.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <strong className="text-navy">Targeted Extensions:</strong> Silver, Gold, and
                    Advanced + Diabetic add Vitamin D3 and HbA1c for enriched metabolic and
                    musculoskeletal surveillance.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <strong className="text-navy">Executive & Diabetic:</strong> Executive profiles
                    incorporate auxiliary markers (PSA / CA-125), while the Diabetic Profile focuses
                    specifically on glycemic and microalbumin parameters.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PACKAGES GRID */}
      <section className="border-t bg-soft py-16 md:py-20" id="packages-list">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">Select a package</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
              Available health checkup panels
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Review included tests and purpose. Contact our laboratory team for availability,
              preparation requirements, and booking.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PACKAGES_DATA.map((pkg) => {
              const inclusions = resolvePackageInclusions(pkg);
              return (
                <article
                  key={pkg.id}
                  className="group flex h-full flex-col rounded-[16px] border border-navy/12 bg-card p-6 shadow-[0_1px_3px_color-mix(in_oklab,var(--navy)_6%,transparent)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-within:border-primary/60"
                >
                  {/* A. Header Area */}
                  <div className="border-b border-navy/10 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <span className="inline-flex items-center rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {pkg.category}
                        </span>
                        <h3 className="mt-2.5 font-display text-xl font-bold tracking-tight text-navy break-words">
                          {pkg.name}
                        </h3>
                        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                          {pkg.summary}
                        </p>
                      </div>

                      {/* Dedicated Top-Right Illustration Area (88-112px desktop, 64-80px mobile) */}
                      <PackageIllustration packageId={pkg.id} />
                    </div>
                  </div>

                  {/* B. Main Inclusions Area */}
                  <div className="flex-1 py-4">
                    <p className="label-x text-muted-foreground/90">Key inclusions</p>

                    {pkg.inheritsFrom ? (
                      <div className="mt-2.5 space-y-3">
                        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-soft px-3 py-2 text-xs font-semibold text-navy">
                          <Layers className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>Includes complete Advanced Body Profile</span>
                        </div>
                        {pkg.additionalTests && pkg.additionalTests.length > 0 && (
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                              Additional tests:
                            </p>
                            <ul className="mt-1.5 space-y-1.5 text-sm text-foreground/85">
                              {pkg.additionalTests.map((test) => (
                                <li key={test} className="flex items-start gap-2">
                                  <Check
                                    className="mt-0.5 h-4 w-4 shrink-0 text-accent font-bold"
                                    aria-hidden="true"
                                  />
                                  <span className="font-semibold text-navy">{test}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <ul className="mt-2.5 space-y-1.5 text-sm text-foreground/85">
                        {inclusions.slice(0, 6).map((item) => (
                          <li key={item.name} className="flex items-start gap-2">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            <span className="text-xs sm:text-sm">
                              {item.name}
                              {item.subComponents && (
                                <span className="block text-[11px] text-muted-foreground">
                                  ({item.subComponents.join(", ")})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                        {inclusions.length > 6 && (
                          <li className="text-xs text-muted-foreground pl-6">
                            + {inclusions.length - 6} more inclusions
                          </li>
                        )}
                      </ul>
                    )}
                  </div>

                  {/* C. Details Link Area */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => handleOpen(pkg, e.currentTarget)}
                      className="link-u text-xs font-semibold text-primary hover:text-navy cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      View complete inclusions
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* D. CTA Area */}
                  <div className="mt-auto border-t border-navy/10 pt-4">
                    <a
                      href={waPackageLink(pkg.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-accent w-full text-center"
                      aria-label={`Enquire on WhatsApp about ${pkg.name}`}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Contact our team for test preparation, availability, and booking guidance.
          </p>
        </div>
      </section>

      {/* 4. PREPARATION & BOOKING GUIDANCE */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-site max-w-4xl">
          <PreparationGuidance
            title="Before scheduling your checkup package: practical guidance"
            points={[
              "Check with your treating physician regarding which checkup package fits your health background.",
              "Ask our team whether overnight fasting (typically water allowed) is required for your package.",
              "Continue taking all prescribed regular medications unless your doctor has specifically directed otherwise.",
              "Wear loose, comfortable clothing with accessible sleeves for easy blood sample collection.",
              "Confirm doorstep collection availability in your area with our team.",
            ]}
          />
        </div>
      </section>

      {/* 5. 4-STEP BOOKING FLOW */}
      <BookingSteps title="How to book your health checkup" />

      {/* 6. HOME COLLECTION ENQUIRY EXPLANATION */}
      <section className="bg-soft py-16 md:py-20">
        <div className="container-site">
          <div className="grid gap-10 rounded-[12px] border border-navy/12 bg-background p-8 md:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Doorstep Convenience</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl">
                Home collection for checkup packages
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Home sample collection can be requested for eligible checkup packages across
                confirmed areas of Ahmedabad. Contact our laboratory team to verify whether your
                chosen package can be collected at your residence.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                * Home collection is subject to test eligibility, location, and appointment
                confirmation by the laboratory.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/home-collection" className="btn btn-accent">
                  Book Home Collection <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={waPackageLink("Home Collection for Health Package")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <MessageCircle className="h-4 w-4" /> Check Area Availability
                </a>
              </div>
            </div>

            <div className="rounded-[10px] border border-navy/10 bg-soft p-6">
              <h3 className="font-display text-lg font-bold text-navy">Confirming your checkup:</h3>
              <ul className="mt-4 space-y-3 text-sm text-foreground/85">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    Check with your doctor regarding which test panel matches your medical profile
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    Contact our team to confirm fasting instructions and appointment details
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    Schedule your lab visit or request an eligible doorstep collection appointment
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REPORT GUIDANCE */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-site max-w-4xl">
          <ReportGuidanceCard />
        </div>
      </section>

      {/* 8. PACKAGE FAQS */}
      <ServiceFaqSection
        title="Health checkup package FAQs"
        subtitle="Common questions about package selection, preparation, reports, and home collection."
        items={PACKAGE_FAQS}
      />

      {/* 9. RELATED SERVICES */}
      <RelatedServices
        title="Other diagnostic services"
        items={[
          {
            title: "Individual Test Catalog",
            description:
              "Explore our curated directory of routine blood, glucose, liver, kidney, thyroid, and vitamin investigations.",
            to: "/tests",
            badge: "All Tests",
          },
          {
            title: "Home Sample Collection",
            description:
              "Learn more about our doorstep sample collection protocols and schedule a visit.",
            to: "/home-collection",
            badge: "Doorstep Service",
          },
          {
            title: "Lab Location & Visit Info",
            description:
              "Find our 24/7 laboratory at Dream Square Complex, Ahmedabad for walk-in testing.",
            to: "/contact",
            badge: "Open 24/7",
          },
        ]}
      />

      {/* 10. COMPACT CTA BAND */}
      <CompactCtaBand
        title="Ready to book a health checkup package?"
        subtitle="Contact our laboratory team on WhatsApp or phone for availability, preparation instructions, and booking."
        serviceName="Health Checkup Package"
      />

      <DetailsDialog
        item={
          selectedPkg
            ? {
                id: selectedPkg.id,
                slug: selectedPkg.id,
                name: selectedPkg.name,
                category: selectedPkg.category,
                summary: selectedPkg.summary,
                inheritsFrom: selectedPkg.inheritsFrom,
                additionalTests: selectedPkg.additionalTests,
                inclusions: resolvePackageInclusions(selectedPkg),
                clinicalNotice: selectedPkg.clinicalNotice,
              }
            : null
        }
        onClose={handleClose}
      />
    </>
  );
}
