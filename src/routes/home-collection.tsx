import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ShieldCheck, Clock, MapPin } from "lucide-react";
import { PACKAGES, TESTS } from "@/lib/site";
import { PageHeader, EnquiryForm, ContactButtons } from "@/components/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/home-collection")({
  validateSearch: z.object({ test: z.string().optional() }),
  head: () => pageHead("/home-collection", "Home Sample Collection in Ahmedabad — Sattva Pathology", "Book home blood sample collection in Ahmedabad. Hygienic collection by trained staff, 24/7 availability and timely reports."),
  component: HomeCollectionPage,
});

function HomeCollectionPage() {
  const { test } = Route.useSearch();
  const options = Array.from(new Set([...(test ? [test] : []), ...PACKAGES.map((p) => p.name), ...TESTS.map((t) => t.name), "Not sure — please advise"]));
  return (
    <>
      <PageHeader eyebrow="Home sample collection" title="We collect your sample at home" intro="Trained staff, sterile sealed kits, and reports on WhatsApp or email. Available across Nirnaynagar and nearby areas of Ahmedabad." />
      <section className="container-site grid gap-12 py-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-8">
          {[
            { icon: ShieldCheck, t: "Hygienic handling", d: "Single-use needles, gloves and sealed containers for every patient." },
            { icon: Clock, t: "Timely reports", d: "Samples reach the lab quickly so your reports arrive on time." },
            { icon: MapPin, t: "Coverage", d: "Nirnaynagar and nearby areas of Ahmedabad. Call to confirm your location." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4">
              <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div><h2 className="text-lg font-bold">{t}</h2><p className="text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
          <div className="border-t pt-6">
            <p className="mb-3 font-semibold text-navy">Prefer to talk?</p>
            <ContactButtons />
          </div>
        </div>
        <div className="border bg-soft p-6 md:p-8">
          <h2 className="text-2xl font-extrabold">Book home collection</h2>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">We'll confirm your slot by phone or WhatsApp.</p>
          <EnquiryForm
            key={test}
            title="Home Collection Request"
            submit="Request Home Collection"
            fields={[
              { name: "name", label: "Full Name", required: true },
              { name: "mobile", label: "Mobile Number", type: "tel", required: true },
              { name: "area", label: "Area / Pin Code", required: true },
              { name: "test", label: "Test or Package", options: options, required: true },
              { name: "date", label: "Preferred Date", type: "date", required: true },
              { name: "slot", label: "Preferred Time Slot", options: ["6–9 AM", "9 AM–12 PM", "12–3 PM", "3–6 PM", "6–9 PM", "Night (9 PM onwards)"], required: true },
              { name: "notes", label: "Additional Notes", textarea: true },
            ]}
          />
        </div>
      </section>
    </>
  );
}
