import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, Building2 } from "lucide-react";
import { PageHeader, EnquiryForm, ContactButtons } from "@/components/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/reports")({
  head: () => pageHead("/reports", "Lab Reports & Report Status — Sattva Pathology Ahmedabad", "How to receive your pathology reports from Sattva Pathology Laboratory and request your report status."),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <>
      <PageHeader eyebrow="Reports" title="Getting your reports" intro="Reports are shared as soon as they're ready. Need an update? Send a report status request." />
      <section className="container-site grid gap-12 py-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          {[
            { icon: MessageCircle, t: "On WhatsApp", d: "A PDF of your report is sent to your registered mobile number." },
            { icon: Mail, t: "By email", d: "Share your email at registration to receive reports by email." },
            { icon: Building2, t: "At the lab", d: "Collect a printed copy from the lab at any time, 24 hours." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4">
              <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div><h2 className="text-lg font-bold">{t}</h2><p className="text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
          <div className="border-t pt-6"><ContactButtons /></div>
        </div>
        <div className="border bg-soft p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-extrabold">Report status request</h2>
          <EnquiryForm
            title="Report Status Request"
            submit="Request Report Status"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "mobile", label: "Mobile Number", type: "tel", required: true },
              { name: "date", label: "Test Date", type: "date", required: true },
              { name: "registered", label: "Registered Mobile Number", type: "tel", required: true },
            ]}
          />
        </div>
      </section>
    </>
  );
}
