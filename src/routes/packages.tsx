import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PACKAGES } from "@/lib/site";
import { PageHeader, CtaBand } from "@/components/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/packages")({
  head: () => pageHead("/packages", "Health Checkup Packages in Ahmedabad — Sattva Pathology", "Full body, diabetes, thyroid, fever, vitamin and pre-employment health checkup packages in Ahmedabad with home sample collection."),
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <>
      <PageHeader eyebrow="Health packages" title="Health checkup packages" intro="Grouped tests for common health needs. Call or WhatsApp us for current prices." />
      <section className="container-site grid gap-px border bg-border py-0 my-12 md:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <article key={p.name} className="flex flex-col bg-background p-7">
            <h2 className="text-xl font-extrabold">{p.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.benefit}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {p.tests.map((t) => <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t}</li>)}
            </ul>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
              <div><dt className="text-muted-foreground">Sample</dt><dd className="font-medium text-navy">{p.sample}</dd></div>
              <div><dt className="text-muted-foreground">Report</dt><dd className="font-medium text-navy">{p.report}</dd></div>
            </dl>
            <div className="mt-auto pt-6">
              <Link to="/home-collection" search={{ test: p.name }} className="btn btn-accent w-full">Book this package</Link>
            </div>
          </article>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
