import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, CtaBand } from "@/components/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("/about", "About Us — Sattva Pathology Laboratory, Ahmedabad", "Learn about Sattva Pathology Laboratory, a 24/7 pathology lab in Ahmedabad focused on accurate testing and patient-friendly care."),
  component: AboutPage,
});

const STRENGTHS = [
  ["Experienced staff", "A trained team that handles every sample with care."],
  ["Hygienic process", "Clean, sterile collection and handling at every step."],
  ["Accurate reports", "Careful processing and checks before every report."],
  ["Timely delivery", "Reports shared promptly on WhatsApp, email or in print."],
  ["Clear report guidance", "We help you understand your report in simple words."],
];

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title="A neighbourhood lab, open around the clock" intro="Sattva Pathology Laboratory serves patients in Nirnaynagar and across Ahmedabad with reliable diagnostic testing, 24 hours a day." />
      <section className="container-site grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Our mission</p>
          <h2 className="mt-2 text-3xl font-extrabold">Accurate testing, trusted care, patient-friendly service.</h2>
          <p className="mt-4 text-muted-foreground">We believe getting a test done should be simple and stress-free. That's why we stay open 24 hours, collect samples at home, and take time to explain your results.</p>
        </div>
        <dl className="divide-y border-y">
          {STRENGTHS.map(([k, v]) => (
            <div key={k} className="py-5">
              <dt className="font-display text-lg font-bold text-navy">{k}</dt>
              <dd className="mt-1 text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <CtaBand />
    </>
  );
}
