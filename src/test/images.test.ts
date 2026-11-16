import { describe, expect, it } from "vitest";
import {
  IMAGES,
  IMAGE_PLACEMENTS,
  BRAND_LOGOS,
  PACKAGE_ILLUSTRATIONS,
  HEALTH_NEEDS_IMAGES,
  getPackageIllustrationUrl,
  getHealthNeedImageConfig,
  resolveImagePath,
} from "@/lib/images";

describe("Genuine Sattva photography configuration", () => {
  it("configures genuine photograph types with real asset sources", () => {
    const keys = Object.keys(IMAGES);
    expect(keys).toContain("hero");
    expect(keys).toContain("logo");
    expect(keys).toContain("logoText");
    expect(keys).toContain("logoSymbol");
    expect(keys).toContain("primaryLogo");
    expect(keys).toContain("buildingExterior");
    expect(keys).toContain("labEntrance");
    expect(keys).toContain("reception");
    expect(keys).toContain("equipmentOne");
    expect(keys).toContain("equipmentTwo");
    expect(keys).toContain("equipmentThree");
    expect(keys).toContain("equipmentFour");
    expect(keys).toContain("equipmentFive");
    expect(Object.values(IMAGES).every((image) => Boolean(image.src))).toBe(true);
    expect(IMAGES.logo.src).toContain("sattva-logo-text");
    expect(resolveImagePath(IMAGES.equipmentTwo.src)).toBeDefined();
    expect(resolveImagePath("src/assets/equipmentTwo.png")).toBeDefined();
  });

  it("assigns hero photo to the hero, logo to About, entrance/reception/equipment to the gallery and exterior to Visit", () => {
    expect(IMAGE_PLACEMENTS.hero).toBe("hero");
    expect(IMAGE_PLACEMENTS.about).toBe("logo");
    expect(IMAGE_PLACEMENTS.gallery).toEqual(["labEntrance", "reception", "equipmentThree"]);
    expect(IMAGE_PLACEMENTS.visit).toBe("buildingExterior");
  });

  it("defaults signage photographs to contain so signs are not cropped", () => {
    expect(IMAGES.buildingExterior.fit).toBe("contain");
    expect(IMAGES.labEntrance.fit).toBe("contain");
  });

  it("returns no image source for empty and missing project assets", () => {
    expect(resolveImagePath("")).toBeUndefined();
    expect(resolveImagePath("src/assets/not-supplied.jpg")).toBeUndefined();
  });
});

describe("Visual asset configuration for packages, health needs, and test cards", () => {
  it("maps all 8 confirmed packages to exact expected illustration paths in src/assets/packages/", () => {
    const expectedPackages = [
      ["basic-body-profile", "src/assets/packages/basic-body-profile.png"],
      ["advanced-body-profile", "src/assets/packages/advanced-body-profile.png"],
      ["advanced-diabetic-profile", "src/assets/packages/advanced-diabetic-profile.png"],
      ["silver-body-profile", "src/assets/packages/silver-body-profile.png"],
      ["gold-body-profile", "src/assets/packages/gold-body-profile.png"],
      ["male-executive-profile", "src/assets/packages/male-executive-profile.png"],
      ["female-executive-profile", "src/assets/packages/female-executive-profile.png"],
      ["diabetic-profile", "src/assets/packages/diabetic-profile.png"],
    ];

    for (const item of expectedPackages) {
      const id = item[0]!;
      const expectedPath = item[1]!;
      expect(PACKAGE_ILLUSTRATIONS[id]).toBeDefined();
      expect(PACKAGE_ILLUSTRATIONS[id]?.path).toBe(expectedPath);
      // With illustrations placed in src/assets/packages/, helper resolves url successfully
      expect(typeof getPackageIllustrationUrl(id)).toBe("string");
    }
    // Verifies missing package assets return undefined gracefully without crashing
    expect(getPackageIllustrationUrl("non-existent-package")).toBeUndefined();
  });

  it("maps all 6 health needs cards to exact expected paths with configurable object-position", () => {
    const expectedNeeds = [
      [
        "routine-blood-tests",
        "Routine Blood Tests",
        "src/assets/health-needs/routine-health-check.png",
      ],
      ["diabetes-monitoring", "Diabetes Monitoring", "src/assets/health-needs/diabetes-care.png"],
      ["thyroid-tests", "Thyroid Tests", "src/assets/health-needs/thyroid-tests.png"],
      [
        "fever-infection-tests",
        "Fever & Infection Tests",
        "src/assets/health-needs/fever-infection.png",
      ],
      ["vitamin-tests", "Vitamin Tests", "src/assets/health-needs/vitamin-tests.png"],
      [
        "full-body-checkups",
        "Full Body Checkups",
        "src/assets/health-needs/full-body-checkups.png",
      ],
    ];

    for (const item of expectedNeeds) {
      const id = item[0]!;
      const title = item[1]!;
      const expectedPath = item[2]!;
      const byId = HEALTH_NEEDS_IMAGES[id];
      expect(byId).toBeDefined();
      expect(byId?.path).toBe(expectedPath);
      expect(byId?.title).toBe(title);
      expect(typeof byId?.position).toBe("string");

      // Verify lookup by id
      const resById = getHealthNeedImageConfig(id);
      expect(resById.config?.id).toBe(id);
      expect(resById.position).toBe(byId?.position);
      // Since PNG files are placed in src/assets/health-needs/, url resolves successfully
      expect(typeof resById.url).toBe("string");

      // Verify lookup by title
      const resByTitle = getHealthNeedImageConfig(title);
      expect(resByTitle.config?.id).toBe(id);
      expect(resByTitle.url).toBe(resById.url);
    }
  });

  it("provides the official Sattva symbol for test cards", () => {
    expect(BRAND_LOGOS.symbol).toBeDefined();
    expect(BRAND_LOGOS.symbol).toContain("sattva-logo-symbol.png");
  });
});
