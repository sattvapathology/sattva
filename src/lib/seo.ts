import { SITE, BUSINESS_CONFIG, TESTS } from "@/lib/site";

/**
 * Checks whether the current runtime environment is a non-production preview
 * or staging deployment where search engine indexing should be prevented.
 */
export function isIndexingDisabled(): boolean {
  if (typeof process !== "undefined" && process.env) {
    if (
      process.env["VERCEL_ENV"] === "preview" ||
      process.env["STAGING"] === "true" ||
      process.env["DISABLE_INDEXING"] === "true" ||
      (process.env["CF_PAGES_BRANCH"] &&
        process.env["CF_PAGES_BRANCH"] !== "main" &&
        process.env["CF_PAGES_BRANCH"] !== "master")
    ) {
      return true;
    }
  }

  if (typeof import.meta !== "undefined" && import.meta.env) {
    if (
      import.meta.env["VITE_VERCEL_ENV"] === "preview" ||
      import.meta.env["VITE_DISABLE_INDEXING"] === "true"
    ) {
      return true;
    }
  }

  return false;
}

export function pageHead(
  path: string,
  title: string,
  description: string,
  type = "website",
  image = `${SITE.url}/og-image.png`,
) {
  const canonicalUrl = `${SITE.url}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;
  const robotsDirective = isIndexingDisabled()
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robotsDirective },

      // Open Graph / Meta / Facebook / WhatsApp
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: type },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl || SITE.url },
      { property: "og:image", content: image },
      { property: "og:image:secure_url", content: image },
      { property: "og:image:width", content: "1510" },
      { property: "og:image:height", content: "1004" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: `${title} — ${SITE.name}` },

      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: `${title} — ${SITE.name}` },
    ],
    links: [{ rel: "canonical", href: canonicalUrl || SITE.url }],
  };
}

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

/**
 * Generates schema.org compliant BreadcrumbList structured data.
 */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.name,
        ...(item.path
          ? {
              item: `${SITE.url}${item.path === "/" ? "" : item.path.startsWith("/") ? item.path : `/${item.path}`}`,
            }
          : {}),
      })),
    ],
  };
}

/**
 * Returns the primary MedicalBusiness JSON-LD entity without invalid self-serving
 * aggregate ratings, adhering strictly to Google Search guidelines.
 */
export function getMedicalBusinessSchema() {
  const loc = BUSINESS_CONFIG.location;
  const ops = BUSINESS_CONFIG.operations;

  return {
    "@type": "MedicalBusiness",
    "@id": `${SITE.url}/#laboratory`,
    additionalType: "https://schema.org/DiagnosticLab",
    name: BUSINESS_CONFIG.officialName,
    alternateName: BUSINESS_CONFIG.shortName,
    slogan: BUSINESS_CONFIG.tagline,
    url: BUSINESS_CONFIG.online.origin,
    logo: BUSINESS_CONFIG.online.logoUrl,
    image: BUSINESS_CONFIG.online.ogImageUrl,
    priceRange: ops.priceRange,
    telephone: "+91-7600944188",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.streetAddress,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.postalCode,
      addressCountry: loc.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.0668,
      longitude: 72.5545,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...ops.openingHoursSpecification.dayOfWeek],
      opens: ops.openingHoursSpecification.opens,
      closes: ops.openingHoursSpecification.closes,
    },
    areaServed: {
      "@type": "City",
      name: loc.city,
    },
    ...(BUSINESS_CONFIG.online.socialProfiles.length > 0
      ? { sameAs: [...BUSINESS_CONFIG.online.socialProfiles] }
      : {}),
  };
}

/**
 * Returns WebSite JSON-LD entity with working SearchAction pointing to /tests.
 */
export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: BUSINESS_CONFIG.officialName,
    alternateName: BUSINESS_CONFIG.shortName,
    description:
      "Accurate blood tests, health checkup packages, and home sample collection in Ahmedabad.",
    publisher: {
      "@id": `${SITE.url}/#laboratory`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/tests?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-IN",
  };
}

/**
 * Builds valid XML sitemap containing only canonical, indexable routes with lastmod.
 * Excludes legacy redirects, modal-only routes, and internal error states.
 */
export function generateSitemapXml(): string {
  const lastmod = "2026-11-16";

  const staticPages = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/tests", changefreq: "weekly", priority: "0.9" },
    { path: "/packages", changefreq: "weekly", priority: "0.9" },
    { path: "/home-collection", changefreq: "weekly", priority: "0.8" },
    { path: "/contact", changefreq: "monthly", priority: "0.8" },
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/reports", changefreq: "monthly", priority: "0.7" },
    { path: "/privacy", changefreq: "yearly", priority: "0.3" },
    { path: "/terms", changefreq: "yearly", priority: "0.3" },
  ];

  const staticEntries = staticPages
    .map(
      (p) => `  <url>
    <loc>${SITE.url}${p.path === "/" ? "" : p.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
    )
    .join("\n");

  const testEntries = TESTS.map(
    (t) => `  <url>
    <loc>${SITE.url}/tests/${t.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${testEntries}
</urlset>`.trim();
}
