import { describe, expect, it } from "vitest";
import {
  TESTS,
  PACKAGES,
  CATEGORIES,
  packageEnquiryText,
  testEnquiryText,
  waPackageLink,
  waTestLink,
  serviceEnquiryText,
} from "@/lib/site";
import { PACKAGES_DATA, resolvePackageInclusions } from "@/lib/packages-data";

describe("Service pages, packages and clinical data integrity", () => {
  it("includes all 43 authorized routine pathology tests across categories A through K", () => {
    expect(TESTS.length).toBe(43);
    for (const test of TESTS) {
      expect(test.slug).toBeTruthy();
      expect(test.name).toBeTruthy();
      expect(test.category).toBeTruthy();
      expect(test.purpose).toBeTruthy();
      expect(test.whatItMeasures).toBeTruthy();
      expect(test.clinicalRole).toBeTruthy();
      expect(CATEGORIES).toContain(test.category);
      // Operational details must use safe visitor-facing wording
      expect(test.preparation).toBe("Ask our team about preparation");
      expect(test.turnaround).toBe("Contact the laboratory for report availability");
      // Price must NOT be displayed
      expect((test as Record<string, unknown>)["price"]).toBeUndefined();
    }
  });

  it("contains all 8 confirmed client packages with inheritance and conservative operational defaults", () => {
    expect(PACKAGES.length).toBe(8);
    expect(PACKAGES_DATA.length).toBe(8);

    const expectedIds = [
      "basic-body-profile",
      "advanced-body-profile",
      "advanced-diabetic-profile",
      "silver-body-profile",
      "gold-body-profile",
      "male-executive-profile",
      "female-executive-profile",
      "diabetic-profile",
    ];

    expect(PACKAGES.map((p) => p.id)).toEqual(expectedIds);

    for (const pkg of PACKAGES) {
      expect(pkg.name).toBeTruthy();
      expect(pkg.category).toBeTruthy();
      expect(pkg.summary).toBeTruthy();
      expect(pkg.benefit).toBeTruthy();
      expect(pkg.tests.length).toBeGreaterThan(0);
      expect(pkg.preparation).toBe("Ask our team about preparation");
      expect(pkg.report).toBe("Contact the laboratory for report availability");
      // Price must NOT be displayed
      expect((pkg as Record<string, unknown>)["price"]).toBeUndefined();
    }
  });

  it("resolves inherited inclusions correctly for Advanced-derived packages", () => {
    const adv = PACKAGES_DATA.find((p) => p.id === "advanced-body-profile")!;
    const advInclusions = resolvePackageInclusions(adv).map((i) => i.name);

    // Advanced Body Profile must include confirmed LFT and RFT
    expect(advInclusions).toContain("LFT (Liver Function Profile)");
    expect(advInclusions).toContain("RFT (Renal Function Profile)");
    expect(advInclusions).toContain("Vitamin B12");

    // Silver Body Profile inherits Advanced + Vitamin D3
    const silver = PACKAGES_DATA.find((p) => p.id === "silver-body-profile")!;
    expect(silver.inheritsFrom).toBe("advanced-body-profile");
    expect(silver.additionalTests).toEqual(["Vitamin D3"]);
    const silverResolved = resolvePackageInclusions(silver).map((i) => i.name);
    for (const testName of advInclusions) {
      expect(silverResolved).toContain(testName);
    }
    expect(silverResolved).toContain("Vitamin D3");

    // Gold Body Profile inherits Advanced + Vitamin D3 + HbA1c
    const gold = PACKAGES_DATA.find((p) => p.id === "gold-body-profile")!;
    expect(gold.inheritsFrom).toBe("advanced-body-profile");
    expect(gold.additionalTests).toEqual(["Vitamin D3", "HbA1c"]);
    const goldResolved = resolvePackageInclusions(gold).map((i) => i.name);
    expect(goldResolved).toContain("Vitamin D3");
    expect(goldResolved).toContain("HbA1c");

    // Male Executive Profile inherits Advanced + Vitamin D3 + PSA
    const male = PACKAGES_DATA.find((p) => p.id === "male-executive-profile")!;
    expect(male.additionalTests).toEqual(["Vitamin D3", "PSA"]);
    const maleResolved = resolvePackageInclusions(male).map((i) => i.name);
    expect(maleResolved).toContain("PSA");

    // Female Executive Profile inherits Advanced + Vitamin D3 + CA-125
    const female = PACKAGES_DATA.find((p) => p.id === "female-executive-profile")!;
    expect(female.additionalTests).toEqual(["Vitamin D3", "CA-125"]);
    const femaleResolved = resolvePackageInclusions(female).map((i) => i.name);
    expect(femaleResolved).toContain("CA-125");
  });

  it("keeps 'Ur' unchanged and unexpanded in Diabetic Profile", () => {
    const diabetic = PACKAGES_DATA.find((p) => p.id === "diabetic-profile")!;
    const directNames = (diabetic.directInclusions || []).map((i) => i.name);

    // Must contain "Ur" exactly as supplied
    expect(directNames).toContain("Ur");
    expect(directNames).toEqual([
      "FBS (Fasting Blood Sugar)",
      "FUS (Fasting Urine Sugar)",
      "PPBS (Postprandial Blood Sugar)",
      "HbA1c",
      "Ur",
      "Urine Microalbumin",
      "Creatinine",
    ]);

    // Ensure there is no standalone "Ur" test in general catalogue
    const urStandalone = TESTS.find((t) => t.slug === "ur");
    expect(urStandalone).toBeUndefined();
  });

  it("generates correctly formatted and URL-encoded WhatsApp enquiry links per client specifications", () => {
    // Package enquiry format
    const pkgName = "Basic Body Profile";
    const expectedPkgText =
      "Hello Sattva Pathology Laboratory, I would like to enquire about the Basic Body Profile. Please share preparation instructions, availability, and booking details.";
    expect(packageEnquiryText(pkgName)).toBe(expectedPkgText);
    const pkgLink = waPackageLink(pkgName);
    expect(pkgLink).toContain("https://wa.me/917600944188?text=");
    expect(pkgLink).toContain(encodeURIComponent(expectedPkgText));
    expect(pkgLink).not.toContain("pricing");
    expect(pkgLink).not.toContain("price");

    // Test enquiry format
    const testName = "Complete Blood Count";
    const expectedTestText =
      "Hello Sattva Pathology Laboratory, I would like to enquire about Complete Blood Count. Please share preparation instructions, availability, and booking details.";
    expect(testEnquiryText(testName)).toBe(expectedTestText);
    const testLink = waTestLink(testName);
    expect(testLink).toContain("https://wa.me/917600944188?text=");
    expect(testLink).toContain(encodeURIComponent(expectedTestText));
    expect(testLink).not.toContain("pricing");
    expect(testLink).not.toContain("price");

    // Universal serviceEnquiryText
    expect(serviceEnquiryText("Complete Blood Count")).toBe(expectedTestText);
    expect(serviceEnquiryText("Advanced Body Profile")).toBe(
      "Hello Sattva Pathology Laboratory, I would like to enquire about the Advanced Body Profile. Please share preparation instructions, availability, and booking details.",
    );
  });
});
