import { describe, expect, it } from "vitest";
import { IMAGES, IMAGE_PLACEMENTS, resolveImagePath } from "@/lib/images";

describe("Genuine Sattva photography configuration", () => {
  it("reserves only the six available genuine photograph types with no invented sources", () => {
    expect(Object.keys(IMAGES)).toEqual(["buildingExterior", "labEntrance", "reception", "equipmentOne", "equipmentTwo", "equipmentThree"]);
    expect(Object.values(IMAGES).every((image) => image.src === "")).toBe(true);
  });
  it("assigns equipment to the hero, reception to About, entrance/reception/equipment to the gallery and exterior to Visit", () => {
    expect(IMAGE_PLACEMENTS.hero).toBe("equipmentOne");
    expect(IMAGE_PLACEMENTS.about).toBe("reception");
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