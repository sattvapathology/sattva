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
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter, WhatsAppFloat, MobileBookBar } from "@/components/site";
import { SITE } from "@/lib/site";
import { useReveal } from "@/hooks/use-reveal";
import { getMedicalBusinessSchema, getWebSiteSchema, isIndexingDisabled } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="mt-4 text-muted-foreground">This page doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary mt-6">
        Go home
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="container-site py-24 text-center">
      <h1 className="text-xl font-semibold">This page didn't load</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Please try again or call us on {SITE.phoneDisplay}.
      </p>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="btn btn-primary mt-6"
      >
        Try again
      </button>
    </div>
  );
}

const rootStructuredData = {
  "@context": "https://schema.org",
  "@graph": [getMedicalBusinessSchema(), getWebSiteSchema()],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const gscVerification =
      (typeof import.meta !== "undefined" && import.meta.env?.["VITE_GSC_VERIFICATION"]) ||
      undefined;
    const indexingDisabled = isIndexingDisabled();

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: `${SITE.name} | Blood Tests in Ahmedabad` },
        {
          name: "description",
          content:
            "Explore blood tests and health checkup packages at Sattva Pathology Laboratory in Ahmedabad. Contact our team for home collection and booking guidance.",
        },
        ...(indexingDisabled ? [{ name: "robots", content: "noindex, nofollow" }] : []),
        ...(gscVerification
          ? [{ name: "google-site-verification", content: gscVerification }]
          : []),
        { property: "og:site_name", content: SITE.name },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_IN" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "theme-color", content: "#278CCB" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
        { rel: "icon", href: "/favicon.png", type: "image/png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap",
        },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(rootStructuredData) }],
    };
  },
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
  useReveal();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <MobileBookBar />
    </QueryClientProvider>
  );
}
