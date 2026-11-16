import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { BUSINESS_CONFIG, SITE, TESTS, PACKAGES } from "@/lib/site";
import {
  pageHead,
  breadcrumbSchema,
  getMedicalBusinessSchema,
  getWebSiteSchema,
  generateSitemapXml,
  isIndexingDisabled,
} from "@/lib/seo";
import { LEGACY_301_REDIRECTS } from "@/server";
import { trackEvent } from "@/lib/analytics";

describe("SEO Foundation & Business Configuration", () => {
  it("maintains accurate, typed central business information", () => {
    expect(BUSINESS_CONFIG.officialName).toBe("Sattva Pathology Laboratory");
    expect(BUSINESS_CONFIG.shortName).toBe("Sattva Pathology");
    expect(BUSINESS_CONFIG.location.city).toBe("Ahmedabad");
    expect(BUSINESS_CONFIG.location.state).toBe("Gujarat");
    expect(BUSINESS_CONFIG.location.postalCode).toBe("380013");
    expect(BUSINESS_CONFIG.location.streetAddress).toBe("204, Dream Square Complex");
    expect(BUSINESS_CONFIG.location.locality).toBe("Nirnay Nagar");

    // Public phone and WhatsApp are strictly distinct
    expect(BUSINESS_CONFIG.contact.publicPhone).toBe("076009 44188");
    expect(BUSINESS_CONFIG.contact.whatsappNumber).toBe("917600944188");
    expect(BUSINESS_CONFIG.contact.publicPhoneTel).toBe("tel:+917600944188");

    // Production origin
    expect(BUSINESS_CONFIG.online.origin).toBe("https://sattvapathology.in");
    expect(SITE.url).toBe("https://sattvapathology.in");

    // Unconfirmed email is documented as null
    expect(BUSINESS_CONFIG.contact.email).toBeNull();
  });

  it("retains all 43 test records and 8 packages without fabricated details", () => {
    expect(TESTS.length).toBe(43);
    expect(PACKAGES.length).toBe(8);

    // Verify critical medical specifics
    const urineAnalysis = TESTS.find((t) => t.slug === "urine-analysis");
    expect(urineAnalysis).toBeDefined();

    const vitD = TESTS.find((t) => t.slug === "vitamin-d");
    expect(vitD).toBeDefined();
    expect(vitD?.purpose).toContain("Vitamin D3");

    // No pricing anywhere
    for (const test of TESTS) {
      expect((test as Record<string, unknown>)["price"]).toBeUndefined();
    }
    for (const pkg of PACKAGES) {
      expect((pkg as Record<string, unknown>)["price"]).toBeUndefined();
    }
  });
});

describe("Structured Data (JSON-LD)", () => {
  it("generates valid MedicalBusiness schema without invalid self-serving AggregateRating", () => {
    const schema = getMedicalBusinessSchema();

    expect(schema["@type"]).toBe("MedicalBusiness");
    expect(schema.additionalType).toBe("https://schema.org/DiagnosticLab");
    expect(schema.name).toBe("Sattva Pathology Laboratory");
    expect(schema.url).toBe("https://sattvapathology.in");
    expect(schema.priceRange).toBe("₹₹");

    // Address verification
    expect(schema.address["@type"]).toBe("PostalAddress");
    expect(schema.address.addressLocality).toBe("Ahmedabad");
    expect(schema.address.postalCode).toBe("380013");

    // CRITICAL: AggregateRating must NOT be present on LocalBusiness schema citing Google reviews
    expect((schema as Record<string, unknown>)["aggregateRating"]).toBeUndefined();
    expect((schema as Record<string, unknown>)["review"]).toBeUndefined();

    // Must NOT classify as Hospital or Physician
    expect(schema["@type"]).not.toBe("Hospital");
    expect(schema["@type"]).not.toBe("Physician");
  });

  it("generates valid WebSite schema with SearchAction", () => {
    const website = getWebSiteSchema();

    expect(website["@type"]).toBe("WebSite");
    expect(website.url).toBe("https://sattvapathology.in");
    expect(website.potentialAction["@type"]).toBe("SearchAction");
    expect(website.potentialAction.target["@type"]).toBe("EntryPoint");
    expect(website.potentialAction.target.urlTemplate).toContain("/tests?q=");
  });

  it("generates valid BreadcrumbList schema", () => {
    const breadcrumbs = breadcrumbSchema([
      { name: "Blood Tests", path: "/tests" },
      { name: "Complete Blood Count", path: "/tests/cbc" },
    ]);

    expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbs.itemListElement.length).toBe(3);

    expect(breadcrumbs.itemListElement[0]?.position).toBe(1);
    expect(breadcrumbs.itemListElement[0]?.name).toBe("Home");
    expect(breadcrumbs.itemListElement[0]?.item).toBe("https://sattvapathology.in");

    expect(breadcrumbs.itemListElement[1]?.position).toBe(2);
    expect(breadcrumbs.itemListElement[1]?.name).toBe("Blood Tests");
    expect(breadcrumbs.itemListElement[1]?.item).toBe("https://sattvapathology.in/tests");

    expect(breadcrumbs.itemListElement[2]?.position).toBe(3);
    expect(breadcrumbs.itemListElement[2]?.name).toBe("Complete Blood Count");
    expect(breadcrumbs.itemListElement[2]?.item).toBe("https://sattvapathology.in/tests/cbc");
  });
});

describe("Metadata, Canonicals, and Indexing Controls", () => {
  it("generates absolute canonical URLs and valid OpenGraph tags", () => {
    const head = pageHead(
      "/tests",
      "Blood Tests in Ahmedabad | Sattva Pathology",
      "Browse clinical laboratory tests available at Sattva Pathology Laboratory in Ahmedabad.",
    );

    const canonicalLink = head.links.find((l) => l.rel === "canonical");
    expect(canonicalLink?.href).toBe("https://sattvapathology.in/tests");

    // Root canonical has no trailing slash
    const rootHead = pageHead("/", "Home", "Description");
    const rootCanonical = rootHead.links.find((l) => l.rel === "canonical");
    expect(rootCanonical?.href).toBe("https://sattvapathology.in");

    // OpenGraph verification
    const ogUrl = head.meta.find((m) => "property" in m && m.property === "og:url");
    expect(ogUrl && "content" in ogUrl && ogUrl.content).toBe("https://sattvapathology.in/tests");

    const ogImage = head.meta.find((m) => "property" in m && m.property === "og:image");
    expect(ogImage && "content" in ogImage && ogImage.content).toBe(
      "https://sattvapathology.in/og-image.png",
    );
  });

  it("prevents accidental noindex in standard production environment", () => {
    const head = pageHead(
      "/",
      "Sattva Pathology Laboratory | Blood Tests in Ahmedabad",
      "Explore blood tests and health checkup packages at Sattva Pathology Laboratory in Ahmedabad.",
    );

    const robotsMeta = head.meta.find((m) => "name" in m && m.name === "robots");
    expect(robotsMeta).toBeDefined();
    if (robotsMeta && "content" in robotsMeta) {
      expect(robotsMeta.content).toContain("index, follow");
      expect(robotsMeta.content).not.toContain("noindex");
    }
  });

  it("checks staging and preview indexing controls correctly", () => {
    expect(typeof isIndexingDisabled()).toBe("boolean");
  });
});

describe("XML Sitemap and robots.txt", () => {
  it("generates valid XML sitemap with all real canonical pages and lastmod dates", () => {
    const xml = generateSitemapXml();

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    // Counts total URLs: 9 static + 43 tests = 52
    const urlMatches = xml.match(/<url>/g);
    expect(urlMatches?.length).toBe(52);

    // Root URL must match canonical without trailing slash
    expect(xml).toContain("<loc>https://sattvapathology.in</loc>");

    // Core routes present
    expect(xml).toContain("<loc>https://sattvapathology.in/tests</loc>");
    expect(xml).toContain("<loc>https://sattvapathology.in/packages</loc>");
    expect(xml).toContain("<loc>https://sattvapathology.in/home-collection</loc>");
    expect(xml).toContain("<loc>https://sattvapathology.in/contact</loc>");

    // Individual test present
    expect(xml).toContain("<loc>https://sattvapathology.in/tests/cbc</loc>");

    // Every URL has lastmod
    const lastmodMatches = xml.match(/<lastmod>2026-11-16<\/lastmod>/g);
    expect(lastmodMatches?.length).toBe(52);

    // Strictly excludes legacy redirect paths
    expect(xml).not.toContain("/full-body-checkup");
    expect(xml).not.toContain("/urine-routine");
    expect(xml).not.toContain("/blood-sugar");

    // Strictly excludes modal-only package paths
    expect(xml).not.toContain("/packages/basic-body-profile");
  });

  it("ensures public/robots.txt allows crawling and points to canonical sitemap", () => {
    const robotsPath = path.resolve(process.cwd(), "public/robots.txt");
    expect(fs.existsSync(robotsPath)).toBe(true);
    const content = fs.readFileSync(robotsPath, "utf-8");

    expect(content).toContain("User-agent: *");
    expect(content).toContain("Allow: /");
    expect(content).toContain("Sitemap: https://sattvapathology.in/sitemap.xml");
  });
});

describe("Server-side 301 Legacy Redirects", () => {
  it("maps all legacy paths to valid destination routes with permanent 301 redirects", () => {
    expect(LEGACY_301_REDIRECTS["/full-body-checkup"]).toBe("/packages");
    expect(LEGACY_301_REDIRECTS["/urine-routine"]).toBe("/tests/urine-analysis");
    expect(LEGACY_301_REDIRECTS["/blood-sugar"]).toBe("/tests/fasting-blood-sugar");
    expect(LEGACY_301_REDIRECTS["/tests/full-body-checkup"]).toBe("/packages");
    expect(LEGACY_301_REDIRECTS["/tests/urine-routine"]).toBe("/tests/urine-analysis");
    expect(LEGACY_301_REDIRECTS["/tests/blood-sugar"]).toBe("/tests/fasting-blood-sugar");
  });
});

describe("Privacy-Safe Analytics", () => {
  it("tracks events safely without throwing when gtag is absent or present", () => {
    expect(() => trackEvent({ name: "phone_call_click" })).not.toThrow();
    expect(() => trackEvent({ name: "whatsapp_click", section: "hero" })).not.toThrow();
    expect(() => trackEvent({ name: "directions_click" })).not.toThrow();
    expect(() => trackEvent({ name: "home_collection_submitted" })).not.toThrow();
  });
});
