import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { CATEGORIES, TESTS } from "@/lib/site";
import { PageHeader, CtaBand } from "@/components/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/tests/")({
  head: () => pageHead("/tests", "Blood Tests & Lab Tests in Ahmedabad — Sattva Pathology", "Search blood, diabetes, thyroid, liver, kidney, vitamin, fever and urine tests at Sattva Pathology Laboratory, Ahmedabad. Home collection available."),
  component: TestsPage,
});

function TestsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return TESTS.filter((t) => (cat === "All" || t.category === cat) && (!s || `${t.name} ${t.short ?? ""} ${t.category}`.toLowerCase().includes(s)));
  }, [q, cat]);

  return (
    <>
      <PageHeader eyebrow="Test catalog" title="Find your test" intro="Search by test name or browse by category. Each test lists preparation, sample type and report time." />
      <section className="container-site py-12">
        <label className="relative block max-w-xl">
          <span className="sr-only">Search tests</span>
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search e.g. CBC, thyroid, vitamin D" className="field pl-10" />
        </label>
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Categories">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`rounded-sm border px-3 py-1.5 text-sm font-medium ${cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-background text-navy hover:border-navy"}`}>
              {c}
            </button>
          ))}
        </div>
        <ul className="mt-10 divide-y border-y">
          {list.map((t) => (
            <li key={t.slug}>
              <Link to="/tests/$slug" params={{ slug: t.slug }} className="group grid gap-2 py-5 md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-center md:gap-6">
                <span className="font-display text-lg font-bold text-navy group-hover:text-primary">{t.name}{t.short ? ` (${t.short})` : ""}</span>
                <span className="text-sm text-muted-foreground">{t.category}</span>
                <span className="text-sm text-muted-foreground">Report: {t.turnaround}</span>
                <ArrowRight className="hidden h-4 w-4 text-primary md:block" />
              </Link>
            </li>
          ))}
          {list.length === 0 && <li className="py-10 text-muted-foreground">No tests found. Call or WhatsApp us — we offer many more tests than listed here.</li>}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
