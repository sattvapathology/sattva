import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TESTS } from "@/lib/site";
import { ContactButtons, CtaBand } from "@/components/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/tests/$slug")({
  loader: ({ params }) => {
    const test = TESTS.find((t) => t.slug === params.slug);
    if (!test) throw notFound();
    return { test };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Test not found" }, { name: "robots", content: "noindex" }] };
    const t = loaderData.test;
    return pageHead(`/tests/${params.slug}`, `${t.name}${t.short ? ` (${t.short})` : ""} Test in Ahmedabad — Sattva Pathology`, `${t.purpose} Preparation, sample type and report time. Book home collection in Ahmedabad.`, "article");
  },
  notFoundComponent: TestNotFound,
  component: TestPage,
});

function TestNotFound() {
  return (
    <div className="container-site py-24">
      <h1 className="text-3xl font-extrabold">Test not found</h1>
      <Link to="/tests" className="btn btn-primary mt-6">Browse all tests</Link>
    </div>
  );
}

function TestPage() {
  const { test: t } = Route.useLoaderData();
  const rows = [
    ["Purpose", t.purpose],
    ["Sample type", t.sample],
    ["Preparation", t.preparation],
    ["Report time", t.turnaround],
    ["Price", "Please call or WhatsApp us for the current price."],
  ];
  return (
    <>
      <section className="border-b bg-soft">
        <div className="container-site py-12 md:py-16">
          <Link to="/tests" className="text-sm font-medium text-primary">← All tests</Link>
          <p className="eyebrow mt-6">{t.category}</p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">{t.name}{t.short ? ` (${t.short})` : ""}</h1>
        </div>
      </section>
      <section className="container-site grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <dl className="divide-y border-y">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="font-semibold text-navy">{k}</dt>
              <dd className="text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <aside className="h-fit border bg-soft p-6">
          <h2 className="text-xl font-bold">Book this test</h2>
          <p className="mt-2 text-sm text-muted-foreground">Walk in any time, or get your sample collected at home.</p>
          <Link to="/home-collection" search={{ test: t.name }} className="btn btn-accent mt-5 w-full">Book Home Collection</Link>
          <div className="mt-3"><ContactButtons /></div>
          <p className="mt-5 text-xs text-muted-foreground">Information is general guidance. Follow your doctor's advice for your test.</p>
        </aside>
      </section>
      <CtaBand />
    </>
  );
}
