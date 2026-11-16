import logoPrimary from "@/assets/sattva-logo-primary.png";
import logoDarkBg from "@/assets/sattva-logo-dark-bg.png";
import logoSymbol from "@/assets/sattva-logo-symbol.png";
import logoText from "@/assets/sattva-logo-text.png";
import heroImg from "@/assets/hero.png";
import buildingExteriorImg from "@/assets/buildingExterior.jpg";
import labEntranceImg from "@/assets/labEntrance.png";
import receptionImg from "@/assets/reception.png";
import equipmentOneImg from "@/assets/equipmentOne.png";
import equipmentTwoImg from "@/assets/equipmentTwo.png";
import equipmentThreeImg from "@/assets/equipmentThree.png";
import equipmentFourImg from "@/assets/equipmentFour.png";
import equipmentFiveImg from "@/assets/equipmentFive.png";

export type ImageKey =
  | "hero"
  | "logo"
  | "logoText"
  | "logoSymbol"
  | "primaryLogo"
  | "buildingExterior"
  | "labEntrance"
  | "reception"
  | "equipmentOne"
  | "equipmentTwo"
  | "equipmentThree"
  | "equipmentFour"
  | "equipmentFive";

export type ImageConfig = {
  src: string;
  label: string;
  alt: string;
  fit: "contain" | "cover";
  /** CSS object-position: adjust to keep signage or equipment details visible. */
  position: string;
  /** Optional inner padding for logo/emblem display */
  padding?: string;
};

/** Brand logo assets mapped for context-appropriate surfaces */
export const BRAND_LOGOS = {
  primary: logoPrimary,
  darkBg: logoDarkBg,
  symbol: logoSymbol,
  text: logoText,
} as const;

/** Complete catalog of all brand assets */
export const BRAND_ASSETS = {
  primaryLogo: logoPrimary,
  darkBgLogo: logoDarkBg,
  symbolLogo: logoSymbol,
  textLogo: logoText,
  hero: heroImg,
  buildingExterior: buildingExteriorImg,
  labEntrance: labEntranceImg,
  reception: receptionImg,
  equipmentOne: equipmentOneImg,
  equipmentTwo: equipmentTwoImg,
  equipmentThree: equipmentThreeImg,
  equipmentFour: equipmentFourImg,
  equipmentFive: equipmentFiveImg,
} as const;

// Update paths and positioning here. Local asset paths and imported assets are supported.
export const IMAGES: Record<ImageKey, ImageConfig> = {
  hero: {
    src: heroImg,
    label: "Sattva Pathology Laboratory",
    alt: "Sattva Pathology Laboratory diagnostics and healthcare facility in Ahmedabad",
    fit: "cover",
    position: "center",
  },
  logo: {
    src: logoText,
    label: "Sattva Pathology Laboratory",
    alt: "Sattva Pathology Laboratory official logo",
    fit: "contain",
    position: "center",
    padding: "p-8 sm:p-12 md:p-14",
  },
  logoText: {
    src: logoText,
    label: "Sattva Pathology Laboratory",
    alt: "Sattva Pathology Laboratory official logo wordmark",
    fit: "contain",
    position: "center",
    padding: "p-8 sm:p-12 md:p-14",
  },
  logoSymbol: {
    src: logoSymbol,
    label: "Sattva Pathology Laboratory Symbol",
    alt: "Sattva Pathology Laboratory official brand symbol",
    fit: "contain",
    position: "center",
    padding: "p-10 md:p-14",
  },
  primaryLogo: {
    src: logoPrimary,
    label: "Sattva Pathology Laboratory Logo",
    alt: "Sattva Pathology Laboratory official brand logo",
    fit: "contain",
    position: "center",
    padding: "p-8 sm:p-12 md:p-16",
  },
  buildingExterior: {
    src: buildingExteriorImg,
    label: "Building exterior & signboard",
    alt: "Sattva Pathology Laboratory building exterior and signboard at Dream Square Complex",
    fit: "contain",
    position: "center",
  },
  labEntrance: {
    src: labEntranceImg,
    label: "Lab entrance · Sattva signage",
    alt: "Sattva Pathology Laboratory entrance with clinic signage and operating hours",
    fit: "contain",
    position: "center",
  },
  reception: {
    src: receptionImg,
    label: "Reception",
    alt: "Sattva Pathology Laboratory reception desk and welcoming patient area",
    fit: "cover",
    position: "center",
  },
  equipmentOne: {
    src: equipmentOneImg,
    label: "Automated chemiluminescence immunoassay analyzer",
    alt: "Automated chemiluminescence immunoassay analyzer at Sattva Pathology Laboratory",
    fit: "cover",
    position: "center",
  },
  equipmentTwo: {
    src: equipmentTwoImg,
    label: "Clinical chemistry analyzer",
    alt: "Automated clinical chemistry analyzer at Sattva Pathology Laboratory",
    fit: "cover",
    position: "center",
  },
  equipmentThree: {
    src: equipmentThreeImg,
    label: "Automated hematology analyzer",
    alt: "Automated hematology analyzer at Sattva Pathology Laboratory",
    fit: "cover",
    position: "center",
  },
  equipmentFour: {
    src: equipmentFourImg,
    label: "Automated specific protein analyzer",
    alt: "Automated specific protein analyzer at Sattva Pathology Laboratory",
    fit: "cover",
    position: "center",
  },
  equipmentFive: {
    src: equipmentFiveImg,
    label: "Fluorescence immunoassay analyzer",
    alt: "Fluorescence immunoassay analyzer at Sattva Pathology Laboratory",
    fit: "cover",
    position: "center",
  },
};

// Section assignments across the website
export const IMAGE_PLACEMENTS = {
  hero: "hero",
  about: "logo",
  why: "equipmentTwo",
  gallery: ["labEntrance", "reception", "equipmentThree"],
  visit: "buildingExterior",
} as const satisfies {
  hero: ImageKey;
  about: ImageKey;
  why: ImageKey;
  gallery: readonly ImageKey[];
  visit: ImageKey;
};

/* ---------------- Dynamic Bundler Asset Discovery ---------------- */
const localImages = import.meta.glob<string>("/src/assets/**/*.{jpg,jpeg,png,webp,avif,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

const pointers = import.meta.glob<{ url: string }>("/src/assets/**/*.asset.json", {
  eager: true,
  import: "default",
});

export function resolveImagePath(path: string | undefined): string | undefined {
  if (!path) return undefined;
  const value = path.trim();
  if (!value) return undefined;
  if (/^(?:https?:)?\/\//.test(value) || value.startsWith("data:") || value.startsWith("blob:"))
    return value;

  const cleanValue = value.split("?")[0] ?? value;
  const key = cleanValue.replace(/^@\//, "src/").replace(/^src\//, "/src/");

  if (localImages[key]) return localImages[key];
  if (pointers[key]?.url) return pointers[key].url;

  // Direct bundler-resolved paths (e.g. /src/assets/..., /assets/..., /@fs/...)
  if (value.startsWith("/")) return value;

  return undefined;
}

/* ---------------- 1. Package Cards Illustration Configurations ---------------- */
export type PackageIllustrationConfig = {
  packageId: string;
  path: string;
};

/**
 * Exact package illustration expected paths mapped to confirmed package IDs.
 * Place transparent PNG illustrations into src/assets/packages/
 */
export const PACKAGE_ILLUSTRATIONS: Record<string, PackageIllustrationConfig> = {
  "basic-body-profile": {
    packageId: "basic-body-profile",
    path: "src/assets/packages/basic-body-profile.png",
  },
  "advanced-body-profile": {
    packageId: "advanced-body-profile",
    path: "src/assets/packages/advanced-body-profile.png",
  },
  "advanced-diabetic-profile": {
    packageId: "advanced-diabetic-profile",
    path: "src/assets/packages/advanced-diabetic-profile.png",
  },
  "silver-body-profile": {
    packageId: "silver-body-profile",
    path: "src/assets/packages/silver-body-profile.png",
  },
  "gold-body-profile": {
    packageId: "gold-body-profile",
    path: "src/assets/packages/gold-body-profile.png",
  },
  "male-executive-profile": {
    packageId: "male-executive-profile",
    path: "src/assets/packages/male-executive-profile.png",
  },
  "female-executive-profile": {
    packageId: "female-executive-profile",
    path: "src/assets/packages/female-executive-profile.png",
  },
  "diabetic-profile": {
    packageId: "diabetic-profile",
    path: "src/assets/packages/diabetic-profile.png",
  },
};

export function getPackageIllustrationUrl(packageId: string): string | undefined {
  const config = PACKAGE_ILLUSTRATIONS[packageId];
  if (!config) return undefined;
  return resolveImagePath(config.path);
}

/* ---------------- 2. Health Needs Background Images Configurations ---------------- */
export type HealthNeedImageConfig = {
  id: string;
  title: string;
  path: string;
  /**
   * CSS object-position value to allow fine-tuning crops when photographs are added.
   * Modify this value (e.g. "center top", "center 40%") to adjust framing.
   */
  position: string;
};

/**
 * Expected background photograph paths for the 6 "What brings you here today?" cards.
 * Place PNG photographs into src/assets/health-needs/
 */
export const HEALTH_NEEDS_IMAGES: Record<string, HealthNeedImageConfig> = {
  "routine-blood-tests": {
    id: "routine-blood-tests",
    title: "Routine Blood Tests",
    path: "src/assets/health-needs/routine-health-check.png",
    position: "center",
  },
  "diabetes-monitoring": {
    id: "diabetes-monitoring",
    title: "Diabetes Monitoring",
    path: "src/assets/health-needs/diabetes-care.png",
    position: "center",
  },
  "thyroid-tests": {
    id: "thyroid-tests",
    title: "Thyroid Tests",
    path: "src/assets/health-needs/thyroid-tests.png",
    position: "center",
  },
  "fever-infection-tests": {
    id: "fever-infection-tests",
    title: "Fever & Infection Tests",
    path: "src/assets/health-needs/fever-infection.png",
    position: "center",
  },
  "vitamin-tests": {
    id: "vitamin-tests",
    title: "Vitamin Tests",
    path: "src/assets/health-needs/vitamin-tests.png",
    position: "center",
  },
  "full-body-checkups": {
    id: "full-body-checkups",
    title: "Full Body Checkups",
    path: "src/assets/health-needs/full-body-checkups.png",
    position: "center",
  },
};

export function getHealthNeedImageConfig(idOrTitle: string): {
  url: string | undefined;
  position: string;
  config: HealthNeedImageConfig | undefined;
} {
  const normalized = idOrTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const config =
    HEALTH_NEEDS_IMAGES[normalized] ||
    Object.values(HEALTH_NEEDS_IMAGES).find(
      (c) => c.title.toLowerCase() === idOrTitle.toLowerCase() || c.id === idOrTitle,
    );

  let url = config ? resolveImagePath(config.path) : undefined;
  if (config && !url) {
    const fallbacks = [
      config.path.replace(/\.png$/, ".jpg"),
      config.path.replace(/\.png$/, ".jpeg"),
      config.path.replace("thyroid-tests", "thyroid-test"),
      config.path.replace("thyroid-test", "thyroid-tests"),
    ];
    for (const fb of fallbacks) {
      url = resolveImagePath(fb);
      if (url) break;
    }
  }

  return {
    url,
    position: config?.position ?? "center",
    config,
  };
}
