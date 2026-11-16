import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  Search,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import {
  CATEGORIES,
  CATEGORIES_INFO,
  TESTS,
  waTestLink,
  waServiceLink,
  type Category,
} from "@/lib/site";
import { BRAND_LOGOS } from "@/lib/images";
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

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/tests/")({
  validateSearch: searchSchema,
  head: () => ({
    ...pageHead(
      "/tests",
      "Blood Tests in Ahmedabad | Sattva Pathology",
      "Browse clinical laboratory tests available at Sattva Pathology Laboratory in Ahmedabad. Search routine hematology, biochemistry, and hormone profiles.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema([{ name: "Blood Tests", path: "/tests" }])),
      },
    ],
  }),
  component: TestsIndexPage,
});

const GENERAL_TEST_FAQS = [
  [
    "How do I know which test I need to book?",
    "Always consult your treating doctor or family physician. Your doctor evaluates your symptoms, medical history, and clinical signs to determine the exact laboratory investigations required.",
  ],
  [
    "Do all blood tests require fasting?",
    "No. Many routine tests, such as Complete Blood Count (CBC) or random blood glucose, typically do not require fasting, while lipid profiles or fasting sugar tests usually do. Always confirm preparation requirements with our laboratory team before your visit.",
  ],
  [
    "Can I get my test sample collected at home?",
    "Yes. Home sample collection is available for eligible tests across confirmed neighbourhoods in Ahmedabad, subject to area and appointment confirmation.",
  ],
  [
    "Are tests available for walk-in patients without an appointment?",
    "Yes. Sattva Pathology Laboratory is open 24 hours a day. Patients with or without appointments are welcome to walk in at our Dream Square Complex lab in Ahmedabad.",
  ],
  [
    "How will I receive my laboratory report?",
    "Our team can guide you on report availability timelines and delivery options when you contact the laboratory. Printed copies can also be collected from the lab.",
  ],
] as const;

type CategoryFilter = Category | "All";

function TestsIndexPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();
  const selectedCat: CategoryFilter = (search.category as CategoryFilter) || "All";
  const [searchTerm, setSearchTerm] = useState(search.q || "");

  const activeCategoryInfo = selectedCat !== "All" ? CATEGORIES_INFO[selectedCat] : null;

  const filteredTests = useMemo(() => {
    const s = searchTerm.toLowerCase().trim();
    return TESTS.filter((t) => {
      const matchCat =
        selectedCat === "All" || t.category.toLowerCase() === selectedCat.toLowerCase();
      const matchSearch =
        !s ||
        `${t.name} ${t.short ?? ""} ${t.category} ${t.purpose} ${t.whatItMeasures} ${t.aliases?.join(" ") ?? ""}`
          .toLowerCase()
          .includes(s);
      return matchCat && matchSearch;
    });
  }, [selectedCat, searchTerm]);

  const handleCategorySelect = (cat: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: cat === "All" ? undefined : cat,
      }),
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    navigate({
      search: (prev) => ({
        ...prev,
        category: undefined,
        q: undefined,
      }),
    });
  };

  const breadcrumbs =
    selectedCat !== "All"
      ? [{ label: "Tests", to: "/tests" }, { label: selectedCat }]
      : [{ label: "Tests" }];

  const heroTitle = activeCategoryInfo
    ? activeCategoryInfo.name
    : "Pathology Tests & Diagnostic Directory";

  const heroDesc = activeCategoryInfo
    ? activeCategoryInfo.overview
    : "Explore curated routine and general pathology tests at Sattva Pathology Laboratory in Ahmedabad. Review clinical descriptions, what each test evaluates, and contact our team for preparation guidance and scheduling.";

  const activeFaqs = activeCategoryInfo ? activeCategoryInfo.faqs : GENERAL_TEST_FAQS;

  return (
    <>
      {/* 1. HERO */}
      <ServiceHero
        breadcrumbs={breadcrumbs}
        badge={selectedCat !== "All" ? "Diagnostic Category" : "Test Directory"}
        title={heroTitle}
        subtitle="Sattva Pathology Laboratory · 24/7 Quality Testing"
        description={heroDesc}
        serviceName={selectedCat !== "All" ? selectedCat : "Diagnostic Pathology Tests"}
        imageKey="equipmentTwo"
        imageTone="soft"
      />

      {/* 2. OVERVIEW & CLINICAL SCOPE */}
      <section className="bg-background py-14 md:py-16">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow">Diagnostic Care</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
                Accurate investigations supporting clinician-directed care
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                At Sattva Pathology Laboratory, diagnostic testing covers general hematology, organ
                function panels (liver, kidney, thyroid), metabolic assessments, and infectious
                disease investigations. Contact our laboratory team to confirm test availability,
                preparation instructions, and booking.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Whether you have a specific doctor's prescription or are scheduling periodic
                monitoring, our laboratory team is on hand 24 hours a day to guide you on
                preparation requirements and sample collection.
              </p>
            </div>

            <div className="rounded-[12px] border border-navy/12 bg-soft p-6 lg:col-span-5">
              <div className="flex items-center gap-2.5 font-display text-base font-bold text-navy">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>What to enquire about:</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-foreground/85">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Test availability for your prescribed parameters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Fasting or timing instructions specific to your doctor's order</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Home collection eligibility across confirmed Ahmedabad areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Guidance on report collection and turnaround timelines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TEST CATALOG BROWSER & FILTER */}
      <section className="border-t bg-soft py-16 md:py-20" id="catalog">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Available Tests</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
                Browse our test directory
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Filter by diagnostic category or search by test name or abbreviation. Select any
                test to review clinical scope and preparation guidance.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <label htmlFor="test-search" className="mb-1.5 block text-xs font-semibold text-navy">
                Search tests
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id="test-search"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tests (e.g. CBC, HbA1c, TSH)..."
                  className="field h-11 w-full pl-10 pr-4 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <button
              onClick={() => handleCategorySelect("All")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors sm:text-sm cursor-pointer ${
                selectedCat === "All"
                  ? "bg-navy text-navy-foreground shadow-xs"
                  : "border border-navy/15 bg-background text-navy hover:bg-navy/5"
              }`}
            >
              All Categories ({TESTS.length})
            </button>
            {CATEGORIES.map((c) => {
              const count = TESTS.filter((t) => t.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => handleCategorySelect(c)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors sm:text-sm cursor-pointer ${
                    selectedCat === c
                      ? "bg-navy text-navy-foreground shadow-xs"
                      : "border border-navy/15 bg-background text-navy hover:bg-navy/5"
                  }`}
                >
                  {c} {count > 0 && <span className="opacity-75 font-normal">({count})</span>}
                </button>
              );
            })}
          </div>

          {/* Result Count and Clear Filters */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 pb-4 text-xs">
            <p className="font-medium text-muted-foreground">
              Showing <span className="font-bold text-navy">{filteredTests.length}</span>{" "}
              {filteredTests.length === 1 ? "test" : "tests"}
              {selectedCat !== "All" && (
                <span>
                  {" "}
                  in <strong className="text-navy">{selectedCat}</strong>
                </span>
              )}
              {searchTerm && (
                <span>
                  {" "}
                  matching &ldquo;<strong className="text-navy">{searchTerm}</strong>&rdquo;
                </span>
              )}
            </p>

            {(selectedCat !== "All" || searchTerm) && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-navy cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear filters</span>
              </button>
            )}
          </div>

          {/* Active Category Description Note */}
          {activeCategoryInfo && (
            <div className="mt-6 rounded-[12px] border border-primary/20 bg-background p-5">
              <span className="label-x text-primary">{activeCategoryInfo.name}</span>
              <p className="mt-2 text-sm text-foreground/85">{activeCategoryInfo.whatItCovers}</p>
            </div>
          )}

          {/* Tests Grid */}
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredTests.map((t) => (
              <article
                key={t.slug}
                className="group flex h-full flex-col justify-between rounded-[14px] border border-navy/12 bg-card p-5 shadow-[0_1px_2px_color-mix(in_oklab,var(--navy)_5%,transparent)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm focus-within:border-primary/60"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-block rounded-full bg-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      {t.category}
                    </span>
                    <img
                      src={BRAND_LOGOS.symbol}
                      alt=""
                      aria-hidden="true"
                      className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 shrink-0 object-contain pointer-events-none select-none"
                      width={36}
                      height={36}
                      loading="lazy"
                    />
                  </div>

                  <h3 className="mt-2.5 font-display text-lg font-bold text-navy group-hover:text-primary transition-colors">
                    {t.name}
                    {t.short && (
                      <span className="ml-1 text-xs font-normal text-muted-foreground">
                        ({t.short})
                      </span>
                    )}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {t.purpose}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-navy/10 pt-4">
                  <Link
                    to="/tests/$slug"
                    params={{ slug: t.slug }}
                    className="link-u text-xs font-semibold text-navy hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <span>Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href={waTestLink(t.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring"
                    aria-label={`Enquire on WhatsApp about ${t.name}`}
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Enquire</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="mt-12 rounded-[12px] border border-dashed border-navy/20 bg-background p-12 text-center">
              <HelpCircle className="mx-auto h-8 w-8 text-muted-foreground/60" />
              <h3 className="mt-3 font-display text-lg font-bold text-navy">
                No tests matched your search
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                Our laboratory performs many specialized investigations that may not be displayed in
                this preview list. Please contact our team directly.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={handleClearFilters} className="btn btn-outline">
                  Reset filters
                </button>
                <a
                  href={waServiceLink("Prescribed Test")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                >
                  <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
                </a>
              </div>
            </div>
          )}

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Contact our team for test preparation, availability, and booking guidance.
          </p>
        </div>
      </section>

      {/* 4. BEFORE YOU BOOK GUIDANCE */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-site max-w-4xl">
          <PreparationGuidance
            title="Before scheduling your test: practical guidance"
            points={[
              "Keep your test prescription or requisition slip handy if you have one.",
              "Ask our team whether specific fasting or morning sample collection applies to your test.",
              "Continue your regular prescription medications unless your physician has explicitly advised pausing them.",
              "Confirm whether doorstep collection is available for your test and area.",
            ]}
          />
        </div>
      </section>

      {/* 5. BOOKING PROCESS */}
      <BookingSteps />

      {/* 6. REPORT GUIDANCE */}
      <section className="bg-soft py-16 md:py-20">
        <div className="container-site max-w-4xl">
          <ReportGuidanceCard />
        </div>
      </section>

      {/* 7. SPECIFIC FAQS */}
      <ServiceFaqSection
        title={selectedCat !== "All" ? `${selectedCat} FAQs` : "Diagnostic Testing FAQs"}
        subtitle="Common questions regarding test preparation, appointment arrangements, and reports."
        items={activeFaqs}
      />

      {/* 8. RELATED HEALTH SERVICES */}
      <RelatedServices
        title="Explore related health services"
        items={[
          {
            title: "Health Checkup Packages",
            description:
              "Curated preventive health checkups combining essential hematology, liver, kidney, and metabolic markers.",
            to: "/packages",
            badge: "Preventive Care",
          },
          {
            title: "Home Sample Collection",
            description:
              "Convenient doorstep sample collection across confirmed neighbourhoods in Ahmedabad with sterile sealed kits.",
            to: "/home-collection",
            badge: "Doorstep Service",
          },
          {
            title: "Contact & Laboratory Location",
            description:
              "Visit our 24/7 laboratory at Dream Square Complex in Ahmedabad or speak with our team directly.",
            to: "/contact",
            badge: "Open 24/7",
          },
        ]}
      />

      {/* 9. COMPACT FINAL CTA */}
      <CompactCtaBand
        title="Need assistance with a prescribed test?"
        subtitle="Our team is available 24 hours a day to assist with test availability, preparation guidance, and appointments."
        serviceName={selectedCat !== "All" ? selectedCat : "Diagnostic Pathology Testing"}
      />
    </>
  );
}
