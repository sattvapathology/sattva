import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter, WhatsAppFloat } from "@/components/site";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="mt-4 text-muted-foreground">This page doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary mt-6">Go home</Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="container-site py-24 text-center">
      <h1 className="text-xl font-semibold">This page didn't load</h1>
      <p className="mt-2 text-sm text-muted-foreground">Please try again or call us on {SITE.phoneDisplay}.</p>
      <button onClick={() => { router.invalidate(); reset(); }} className="btn btn-primary mt-6">Try again</button>
    </div>
  );
}

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  additionalType: "https://schema.org/DiagnosticLab",
  name: SITE.name,
  slogan: SITE.tagline,
  url: SITE.url,
  telephone: "+91-7600944188",
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "204, Dream Square Complex",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380013",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 23.0668, longitude: 72.5545 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: SITE.rating, reviewCount: SITE.reviews },
  areaServed: "Ahmedabad",
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} — 24/7 Pathology Lab in Ahmedabad` },
      { name: "description", content: "24/7 pathology laboratory in Ahmedabad offering blood tests, health packages and home sample collection." },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#278CCB" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusiness) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </QueryClientProvider>
  );
}
