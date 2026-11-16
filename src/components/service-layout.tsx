import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  Phone,
  MessageCircle,
  Plus,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  ClipboardList,
  Calendar,
  Clock,
  Droplet,
  FileCheck2,
} from "lucide-react";
import { SITE, waServiceLink } from "@/lib/site";
import { SattvaImage } from "@/components/sattva-image";
import { type ImageKey } from "@/lib/images";

/* ---------------- Breadcrumbs ---------------- */
export type BreadcrumbItem = {
  label: string;
  to?: string;
  search?: Record<string, string>;
};

export function ServiceBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
    >
      <Link to="/" className="hover:text-navy hover:underline">
        Home
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="inline-flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden="true" />
            {isLast || !item.to ? (
              <span className="font-semibold text-navy" aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            ) : item.search ? (
              <Link to={item.to} search={item.search} className="hover:text-navy hover:underline">
                {item.label}
              </Link>
            ) : (
              <Link to={item.to} className="hover:text-navy hover:underline">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/* ---------------- Hero Section ---------------- */
export function ServiceHero({
  breadcrumbs,
  badge,
  badgeLink,
  badgeSearch,
  title,
  subtitle,
  description,
  serviceName,
  imageKey,
  imageTone = "soft",
  children,
}: {
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
  badgeLink?: string;
  badgeSearch?: Record<string, string>;
  title: string;
  subtitle?: string;
  description: string;
  serviceName: string;
  imageKey?: ImageKey;
  imageTone?: "soft" | "navy";
  children?: ReactNode;
}) {
  return (
    <section className="border-b bg-soft">
      <div className="container-site py-12 md:py-16">
        <ServiceBreadcrumbs items={breadcrumbs} />

        <div
          className={`grid gap-10 lg:items-center ${imageKey ? "lg:grid-cols-[1.25fr_1fr]" : "max-w-4xl"}`}
        >
          <div>
            {badge && (
              <div className="mb-3">
                {badgeLink ? (
                  badgeSearch ? (
                    <Link
                      to={badgeLink}
                      search={badgeSearch}
                      className="eyebrow inline-flex items-center gap-1.5 hover:underline"
                    >
                      {badge}
                    </Link>
                  ) : (
                    <Link
                      to={badgeLink}
                      className="eyebrow inline-flex items-center gap-1.5 hover:underline"
                    >
                      {badge}
                    </Link>
                  )
                ) : (
                  <span className="eyebrow">{badge}</span>
                )}
              </div>
            )}

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-2 font-display text-lg font-medium text-navy/80 sm:text-xl">
                {subtitle}
              </p>
            )}

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waServiceLink(serviceName)}
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

            {children}
          </div>

          {imageKey && (
            <div className="relative">
              <SattvaImage
                image={imageKey}
                tone={imageTone}
                className="aspect-[4/3] rounded-[10px] shadow-sm"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4-Step Booking Flow ---------------- */
export function BookingSteps({
  title = "How to book or enquire",
  intro = "Follow these simple steps to arrange a test or checkup with Sattva Pathology Laboratory.",
}: {
  title?: string;
  intro?: string;
}) {
  const steps = [
    {
      num: "01",
      title: "Contact the laboratory",
      text: "Call our phone line or send an enquiry via WhatsApp with the test name or your doctor's request.",
    },
    {
      num: "02",
      title: "Confirm details & preparation",
      text: "Our team will confirm test availability, preparation instructions, and booking details.",
    },
    {
      num: "03",
      title: "Lab visit or eligible home collection",
      text: "Visit our 24/7 laboratory or arrange an eligible home collection appointment at a confirmed slot.",
    },
    {
      num: "04",
      title: "Report collection & clinician review",
      text: "Receive guidance from our team on report availability and discuss your results with your treating doctor.",
    },
  ];

  return (
    <section className="border-t bg-background py-16 md:py-20">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">Booking process</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-muted-foreground">{intro}</p>
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
  );
}

/* ---------------- Preparation Guidance ---------------- */
export function PreparationGuidance({
  title = "Before you book: practical guidance",
  points,
}: {
  title?: string;
  points?: string[];
}) {
  const defaultPoints = [
    "Keep your test prescription or clinician's requisition available if you have one.",
    "Ask our laboratory team about test-specific preparation requirements before scheduling.",
    "Confirm test availability and booking guidance with our team.",
    "Confirm whether a walk-in lab visit or eligible home collection is suitable for your test.",
    "Always follow instructions provided by your treating clinician. Never pause or modify prescribed medicines without physician guidance.",
  ];

  const items = points ?? defaultPoints;

  return (
    <div className="rounded-[10px] border border-navy/12 bg-soft p-6 md:p-8">
      <div className="flex items-center gap-3 border-b border-navy/12 pb-4">
        <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="font-display text-xl font-bold text-navy">{title}</h3>
      </div>

      <ul className="mt-6 space-y-3.5 text-sm text-foreground/85">
        {items.map((pt, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-start gap-3 rounded-md border border-accent/20 bg-background p-4 text-xs text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <p>
          <strong className="text-navy">Clinical notice:</strong> Information on this website is for
          service guidance only and does not replace medical advice. Always discuss test selection
          and preparation with your treating healthcare provider.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Report Guidance Card ---------------- */
export function ReportGuidanceCard() {
  return (
    <div className="rounded-[10px] border border-navy/12 bg-background p-6 md:p-8">
      <div className="flex items-center gap-3 border-b border-navy/12 pb-4">
        <FileCheck2 className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="font-display text-xl font-bold text-navy">
          Report collection & clinical guidance
        </h3>
      </div>

      <div className="mt-5 space-y-3 text-sm text-muted-foreground">
        <p>
          Contact the laboratory team for report availability timelines and collection guidance for
          your test. Physical report copies can also be collected from our laboratory during opening
          hours.
        </p>
        <p className="font-medium text-navy">
          “Discuss your results with your treating clinician. Website information does not replace
          medical advice.”
        </p>
      </div>
    </div>
  );
}

/* ---------------- FAQ Accordion Section ---------------- */
export function ServiceFaqSection({
  title = "Frequently asked questions",
  subtitle = "Common questions about this service, preparation, and reports.",
  items,
}: {
  title?: string;
  subtitle?: string;
  items: readonly (readonly [string, string])[];
}) {
  return (
    <section className="border-t bg-soft py-16 md:py-20">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">Got questions?</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="mt-10 divide-y divide-navy/12 border-y border-navy/12">
          {items.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-navy transition-colors hover:text-primary sm:text-lg">
                <span>{q}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/20 transition-transform duration-200 group-open:rotate-45">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Related Tests / Services ---------------- */
export function RelatedServices({
  title = "Related tests & services",
  items,
}: {
  title?: string;
  items: {
    title: string;
    description: string;
    to: string;
    params?: Record<string, string>;
    search?: Record<string, string>;
    badge?: string;
  }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-t bg-background py-16 md:py-20">
      <div className="container-site">
        <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">{title}</h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.title}
              to={it.to}
              {...(it.params ? { params: it.params } : {})}
              {...(it.search ? { search: it.search } : {})}
              className="group flex flex-col justify-between rounded-[10px] border border-navy/12 bg-soft p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50"
            >
              <div>
                {it.badge && (
                  <span className="inline-block rounded-full bg-background px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {it.badge}
                  </span>
                )}
                <h3 className="mt-2 font-display text-lg font-bold text-navy group-hover:text-primary">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.description}</p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span>View details</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Compact CTA Band ---------------- */
export function CompactCtaBand({
  title = "Ready to book or have questions?",
  subtitle = "Our team is available 24/7 to assist with test availability, preparation guidance, and appointments.",
  serviceName = "Laboratory Testing",
}: {
  title?: string;
  subtitle?: string;
  serviceName?: string;
}) {
  return (
    <section className="border-t bg-navy text-navy-foreground py-14 md:py-16">
      <div className="container-site flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="label-x text-navy-foreground/70">Sattva Pathology Laboratory · Ahmedabad</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-navy-foreground sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-sm text-navy-foreground/80 sm:text-base">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={waServiceLink(serviceName)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
          </a>
          <a href={SITE.phoneHref} className="btn btn-invert">
            <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
