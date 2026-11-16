import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import {
  MessageCircle,
  Phone,
  Droplet,
  ClipboardList,
  Clock,
  ShieldCheck,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { SITE, TESTS, waTestLink } from "@/lib/site";
import { pageHead, breadcrumbSchema } from "@/lib/seo";
import {
  ServiceBreadcrumbs,
  BookingSteps,
  PreparationGuidance,
  ReportGuidanceCard,
  ServiceFaqSection,
  RelatedServices,
  CompactCtaBand,
} from "@/components/service-layout";

export const Route = createFileRoute("/tests/$slug")({
  loader: ({ params }) => {
    const slug = params.slug.toLowerCase();

    // Legacy redirects
    if (slug === "full-body-checkup") {
      throw redirect({ to: "/packages" });
    }
    if (slug === "urine-routine") {
      throw redirect({ to: "/tests/$slug", params: { slug: "urine-analysis" } });
    }
    if (slug === "blood-sugar") {
      throw redirect({ to: "/tests/$slug", params: { slug: "fasting-blood-sugar" } });
    }

    const test = TESTS.find(
      (t) => t.slug === slug || t.aliases.map((a) => a.toLowerCase()).includes(slug),
    );
    if (!test) throw notFound();
    return { test };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Test Not Found | Sattva Pathology Laboratory" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const t = loaderData.test;
    const title = `${t.name}${t.short ? ` (${t.short})` : ""} in Ahmedabad | Sattva Pathology`;
    const desc = `${t.purpose} Educational test information and sample collection guidance at Sattva Pathology Laboratory in Ahmedabad.`;
    const breadcrumbs = [
      { name: "Blood Tests", path: "/tests" },
      { name: t.category, path: `/tests?category=${encodeURIComponent(t.category)}` },
      { name: t.short ? `${t.name} (${t.short})` : t.name, path: `/tests/${params.slug}` },
    ];
    return {
      ...pageHead(`/tests/${params.slug}`, title, desc, "article"),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema(breadcrumbs)),
        },
      ],
    };
  },
  notFoundComponent: TestNotFound,
  component: TestPage,
});

function TestNotFound() {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="font-display text-4xl font-extrabold text-navy">Test not found</h1>
      <p className="mt-4 text-muted-foreground">
        The requested test could not be located in our directory. Please browse all available tests
        or contact our team.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/tests" className="btn btn-primary">
          Browse All Tests
        </Link>
        <a href={SITE.phoneHref} className="btn btn-outline">
          Call the Lab
        </a>
      </div>
    </div>
  );
}

function TestPage() {
  const { test: t } = Route.useLoaderData();

  // Find related tests in the same category or relevant tests
  const relatedTests = TESTS.filter(
    (other) => other.slug !== t.slug && other.category === t.category,
  )
    .concat(TESTS.filter((other) => other.slug !== t.slug && other.category !== t.category))
    .slice(0, 3)
    .map((r) => ({
      title: r.name,
      description: r.purpose,
      to: "/tests/$slug",
      params: { slug: r.slug },
      badge: r.category,
    }));

  const breadcrumbs = [
    { label: "Tests", to: "/tests" },
    { label: t.category, to: "/tests", search: { category: t.category } },
    { label: t.short ? `${t.name} (${t.short})` : t.name },
  ];

  const testFaqs: (readonly [string, string])[] = [
    [`What does the ${t.name} generally evaluate?`, t.whatItMeasures],
    [
      `How do I prepare for the ${t.name}?`,
      "Preparation requirements depend on the specific instructions provided by your doctor. Please contact our laboratory team before your visit to confirm if any special fasting, dietary, or timing guidelines apply to your prescription.",
    ],
    [
      `Can the ${t.name} sample be collected at home?`,
      "Home sample collection is available for eligible tests across confirmed neighbourhoods in Ahmedabad. Submitting a request allows our team to confirm test eligibility, area coverage, and appointment timing.",
    ],
    [
      `How do I receive the report for my ${t.name}?`,
      "Please contact our laboratory team for report availability timelines and collection guidance. Printed report copies are also available at our laboratory at Dream Square Complex in Ahmedabad.",
    ],
    [
      "Can this test alone diagnose my condition?",
      "No single laboratory test replaces a complete clinical evaluation. Diagnostic conclusions must be established by your treating clinician, taking into consideration your medical history, clinical symptoms, and physical examination.",
    ],
  ];

  return (
    <>
      {/* 1. HERO */}
      <section className="border-b bg-soft">
        <div className="container-site py-12 md:py-16">
          <ServiceBreadcrumbs items={breadcrumbs} />

          <div className="max-w-4xl">
            <div className="mb-3">
              <Link
                to="/tests"
                search={{ category: t.category }}
                className="eyebrow inline-flex items-center gap-1.5 hover:underline"
              >
                {t.category}
              </Link>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
              {t.name}
              {t.short && (
                <span className="ml-2 text-2xl font-normal text-muted-foreground sm:text-3xl">
                  ({t.short})
                </span>
              )}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.purpose}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waTestLink(t.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
              <Link to="/home-collection" search={{ test: t.name }} className="btn btn-primary">
                <Calendar className="h-4 w-4" /> Request Home Collection
              </Link>
              <a href={SITE.phoneHref} className="btn btn-outline">
                <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IT MEASURES & CLINICAL ROLE */}
      <section className="bg-background py-14 md:py-16">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="space-y-10 lg:col-span-7">
              <div>
                <p className="eyebrow">Educational overview</p>
                <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl">
                  What does this test measure?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/85">
                  {t.whatItMeasures}
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-navy">
                  Role in clinician-directed assessment
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/85">
                  {t.clinicalRole}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Treating physicians commonly utilize this investigation to help evaluate baseline
                  physiological status, monitor ongoing therapy, or investigate related clinical
                  questions.
                </p>
              </div>

              {t.clinicalNotice && (
                <div className="flex items-start gap-3 rounded-[10px] border border-accent/25 bg-accent/5 p-4 text-xs text-foreground/85">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <p>{t.clinicalNotice}</p>
                </div>
              )}

              {t.components && t.components.length > 0 && (
                <div className="rounded-[10px] border border-navy/12 bg-soft p-6">
                  <h3 className="font-display text-base font-bold text-navy">
                    Key components / parameters evaluated:
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-foreground/85">
                    {t.components.map((comp) => (
                      <li key={comp} className="flex items-start gap-2">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Note: Exact reported parameters depend on the specific analytical panel
                    requested by your physician.
                  </p>
                </div>
              )}
            </div>

            {/* 3. PRACTICAL TEST INFORMATION PANEL */}
            <aside className="lg:col-span-5">
              <div className="rounded-[12px] border border-navy/15 bg-soft p-6 shadow-xs">
                <h3 className="font-display text-xl font-bold text-navy">
                  Test information summary
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Operational details to confirm with our laboratory team
                </p>

                <dl className="mt-6 divide-y divide-navy/10 text-sm">
                  <div className="flex items-center justify-between py-3">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <Droplet className="h-4 w-4 text-primary" /> Sample type
                    </dt>
                    <dd className="font-semibold text-navy">{t.sample}</dd>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <ClipboardList className="h-4 w-4 text-primary" /> Preparation
                    </dt>
                    <dd className="font-semibold text-navy">{t.preparation}</dd>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" /> Report availability
                    </dt>
                    <dd className="text-right text-xs font-semibold text-navy">{t.turnaround}</dd>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary" /> Home collection
                    </dt>
                    <dd className="text-right text-xs font-semibold text-navy">
                      Eligible (subject to area)
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 space-y-3 pt-2">
                  <a
                    href={waTestLink(t.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent w-full text-center"
                  >
                    <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
                  </a>
                  <Link
                    to="/home-collection"
                    search={{ test: t.name }}
                    className="btn btn-outline w-full text-center"
                  >
                    Book Home Collection
                  </Link>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  <span>
                    Contact our team for test preparation, availability, and booking guidance.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 4. PREPARATION GUIDANCE */}
      <section className="border-t bg-soft py-16 md:py-20">
        <div className="container-site max-w-4xl">
          <PreparationGuidance
            title={`Before your ${t.name}: practical guidance`}
            points={[
              "Keep your test prescription or requisition slip handy if you have one.",
              "Ask our laboratory team about specific preparation or fasting requirements prior to your visit.",
              "Continue taking all prescribed regular medications unless your physician has explicitly advised otherwise.",
              "Confirm whether doorstep collection is available for this investigation in your area.",
              "Always review and discuss your diagnostic report with your treating healthcare provider.",
            ]}
          />
        </div>
      </section>

      {/* 5. 4-STEP BOOKING FLOW */}
      <BookingSteps title={`How to schedule your ${t.short || t.name}`} />

      {/* 6. REPORT GUIDANCE */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-site max-w-4xl">
          <ReportGuidanceCard />
        </div>
      </section>

      {/* 7. TEST SPECIFIC FAQS */}
      <ServiceFaqSection
        title={`${t.short || t.name} FAQs`}
        subtitle="Common questions regarding test preparation, appointment arrangements, and reports."
        items={testFaqs}
      />

      {/* 8. RELATED TESTS */}
      <RelatedServices title="Other investigations you may explore" items={relatedTests} />

      {/* 9. COMPACT FINAL CTA */}
      <CompactCtaBand
        title={`Ready to enquire about ${t.name}?`}
        subtitle="Our laboratory team is available 24/7 to assist with test availability, preparation guidance, and appointments."
        serviceName={t.name}
      />
    </>
  );
}
