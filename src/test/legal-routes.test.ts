import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import {
  SITE,
  getGoogleListingUrl,
  getGoogleReviewUrl,
  PRIVACY_POLICY_REVISION_DATE,
  TERMS_REVISION_DATE,
} from "@/lib/site";
import { pageHead } from "@/lib/seo";

describe("Legal and new routes routing", () => {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
  });

  it("matches all core and legal pages", () => {
    const pages = [
      "/",
      "/about",
      "/contact",
      "/privacy",
      "/terms",
      "/tests",
      "/packages",
      "/home-collection",
    ];
    for (const page of pages) {
      const matches = router.matchRoutes(page);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });

  it("handles Google review and listing configuration safely", () => {
    // When googleReviewUrl is empty, getGoogleReviewUrl should return undefined to open dialog
    expect(getGoogleReviewUrl()).toBeUndefined();

    // getGoogleListingUrl should return Maps query fallback when empty
    const listingUrl = getGoogleListingUrl();
    expect(listingUrl).toContain("https://www.google.com/maps/search/?api=1&query=");

    // Revision dates are defined
    expect(PRIVACY_POLICY_REVISION_DATE).toBeTruthy();
    expect(TERMS_REVISION_DATE).toBeTruthy();
  });

  it("generates fully compliant Meta / Open Graph and SEO tags", () => {
    const head = pageHead(
      "/home-collection",
      "Home Sample Collection in Ahmedabad — Sattva Pathology Laboratory",
      "Request convenient doorstep blood and urine sample collection in Ahmedabad.",
    );

    const metaProps = head.meta.reduce(
      (acc, item) => {
        if ("property" in item && item.property && item.content) {
          acc[item.property] = item.content;
        }
        if ("name" in item && item.name && item.content) {
          acc[item.name] = item.content;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    // Canonical & Open Graph URL must be absolute
    expect(metaProps["og:url"]).toBe("https://sattvapathology.in/home-collection");
    expect(head.links[0]?.href).toBe("https://sattvapathology.in/home-collection");

    // Open Graph image tags required by Meta
    expect(metaProps["og:image"]).toBe("https://sattvapathology.in/og-image.png");
    expect(metaProps["og:image:width"]).toBe("1510");
    expect(metaProps["og:image:height"]).toBe("1004");
    expect(metaProps["og:type"]).toBe("website");
    expect(metaProps["og:locale"]).toBe("en_IN");
    expect(metaProps["og:site_name"]).toBe(SITE.name);

    // Twitter card requirements
    expect(metaProps["twitter:card"]).toBe("summary_large_image");
    expect(metaProps["twitter:image"]).toBe("https://sattvapathology.in/og-image.png");

    // Robots indexing
    expect(metaProps["robots"]).toContain("index, follow");
  });

  it("ensures privacy and terms routes are accessible and linked", () => {
    const privacy = router.matchRoutes("/privacy");
    const terms = router.matchRoutes("/terms");
    expect(privacy.at(-1)?.routeId).toContain("privacy");
    expect(terms.at(-1)?.routeId).toContain("terms");
  });
});
