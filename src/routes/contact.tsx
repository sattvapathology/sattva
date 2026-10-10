import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { SITE, waLink, mapsEmbed, mapsDirections } from "@/lib/site";
import { PageHeader, EnquiryForm } from "@/components/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("/contact", "Contact Sattva Pathology Laboratory — Ahmedabad", "Call 076009 44188, WhatsApp or visit 204, Dream Square Complex, Ahmedabad 380013. Open 24 hours."),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact us" title="We're here 24 hours a day" />
      <section className="container-site grid gap-12 py-12 lg:grid-cols-2">
        <div>
          <ul className="divide-y border-y">
            <li className="flex gap-4 py-4"><MapPin className="mt-1 h-5 w-5 text-primary" /><span>{SITE.address}</span></li>
            <li className="flex gap-4 py-4"><Phone className="mt-1 h-5 w-5 text-primary" /><a className="font-semibold text-navy" href={SITE.phoneHref}>{SITE.phoneDisplay}</a></li>
            <li className="flex gap-4 py-4"><MessageCircle className="mt-1 h-5 w-5 text-primary" /><a className="font-semibold text-navy" href={waLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>
            <li className="flex gap-4 py-4"><Mail className="mt-1 h-5 w-5 text-primary" /><a className="text-navy" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex gap-4 py-4"><Clock className="mt-1 h-5 w-5 text-primary" />Open 24 hours, 7 days a week</li>
          </ul>
          <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">Get Directions</a>
          <iframe title="Map to Sattva Pathology Laboratory" src={mapsEmbed} loading="lazy" className="mt-8 h-72 w-full border" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="h-fit border bg-soft p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-extrabold">Send us a message</h2>
          <EnquiryForm
            title="Website Enquiry"
            submit="Send Message"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "mobile", label: "Mobile Number", type: "tel", required: true },
              { name: "email", label: "Email", type: "email" },
              { name: "message", label: "Message", textarea: true },
            ]}
          />
        </div>
      </section>
    </>
  );
}
