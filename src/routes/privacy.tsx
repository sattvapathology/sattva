import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { PageHeader } from "@/components/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("/privacy", "Privacy Policy — Sattva Pathology Laboratory", "How Sattva Pathology Laboratory keeps patient personal and medical information confidential."),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy policy" title="Your information stays confidential" />
      <section className="container-site max-w-3xl space-y-8 py-12">
        <div><h2 className="text-xl font-bold">Patient confidentiality</h2><p className="mt-2 text-muted-foreground">We treat all patient details and test results as strictly confidential. Reports are shared only with the patient or the person they authorise.</p></div>
        <div><h2 className="text-xl font-bold">How we use your information</h2><p className="mt-2 text-muted-foreground">Personal and medical information you share is used only for test booking, communication about your tests, and report delivery. We do not sell or share it for marketing.</p></div>
        <div><h2 className="text-xl font-bold">Website forms</h2><p className="mt-2 text-muted-foreground">Details entered in our booking, contact and report status forms are sent to us on WhatsApp so we can respond to your request.</p></div>
        <div><h2 className="text-xl font-bold">Privacy concerns</h2><p className="mt-2 text-muted-foreground">For any privacy question, contact us at <a className="text-primary" href={`mailto:${SITE.email}`}>{SITE.email}</a> or <a className="text-primary" href={SITE.phoneHref}>{SITE.phoneDisplay}</a>, or visit {SITE.address}.</p></div>
      </section>
    </>
  );
}
