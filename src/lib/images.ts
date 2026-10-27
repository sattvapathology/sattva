export type ImageKey = "buildingExterior" | "labEntrance" | "reception" | "equipmentOne" | "equipmentTwo" | "equipmentThree";
export type ImageConfig = {
  /** Leave empty until the genuine photo is supplied. Example: src/assets/reception.jpg */
  src: string;
  label: string;
  alt: string;
  fit: "contain" | "cover";
  /** CSS object-position: adjust to keep signage visible. */
  position: string;
};

// Update paths here only. Local asset paths and CDN asset-pointer paths are supported.
// For signage, start with contain; use cover only after checking the crop.
export const IMAGES: Record<ImageKey, ImageConfig> = {
  buildingExterior: { src: "", label: "Building exterior & signboard", alt: "Sattva Pathology Laboratory building exterior and signboard", fit: "contain", position: "center" },
  labEntrance: { src: "", label: "Lab entrance · Sattva signage", alt: "Lab entrance with Sattva Pathology Laboratory signage", fit: "contain", position: "center" },
  reception: { src: "", label: "Reception", alt: "Sattva Pathology Laboratory reception", fit: "cover", position: "center" },
  equipmentOne: { src: "", label: "Equipment close-up · 01", alt: "Sattva laboratory equipment close-up", fit: "cover", position: "center" },
  equipmentTwo: { src: "", label: "Equipment close-up · 02", alt: "Second close-up of Sattva laboratory equipment", fit: "cover", position: "center" },
  equipmentThree: { src: "", label: "Equipment close-up · 03", alt: "Third close-up of Sattva laboratory equipment", fit: "cover", position: "center" },
};

// Change section assignments here without editing page components.
export const IMAGE_PLACEMENTS = {
  hero: "equipmentOne",
  about: "reception",
  why: "equipmentTwo",
  gallery: ["labEntrance", "reception", "equipmentThree"],
  visit: "buildingExterior",
} as const satisfies {
  hero: ImageKey; about: ImageKey; why: ImageKey; gallery: readonly ImageKey[]; visit: ImageKey;
};

const localImages = import.meta.glob<string>("/src/assets/**/*.{jpg,jpeg,png,webp,avif,svg}", { eager: true, query: "?url", import: "default" });
const pointers = import.meta.glob<{ url: string }>("/src/assets/**/*.asset.json", { eager: true, import: "default" });

export function resolveImagePath(path: string): string | undefined {
  const value = path.trim();
  if (!value) return undefined;
  if (/^https?:\/\//.test(value) || (value.startsWith("/") && !value.startsWith("/src/"))) return value;
  const key = value.replace(/^@\//, "src/").replace(/^src\//, "/src/");
  return localImages[key] ?? pointers[key]?.url;
}