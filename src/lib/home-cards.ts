import {
  PACKAGES_DATA,
  resolvePackageInclusions,
  type PackageData,
  type PackageInclusion,
} from "./packages-data";
import { HOMEPAGE_TESTS, type TestItem } from "./tests-data";
import { packageEnquiryText, testEnquiryText } from "./site";

export type HomePackageCard = {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  inheritsFrom?: string | undefined;
  additionalTests?: string[] | undefined;
  inclusions: PackageInclusion[];
  clinicalNotice?: string | undefined;
};

export type HomeTestCard = {
  slug: string;
  name: string;
  short?: string | undefined;
  category: string;
  description: string;
  purpose: string;
};

// Curated 4 packages for the homepage
export const HOME_PACKAGES: HomePackageCard[] = [
  "basic-body-profile",
  "advanced-body-profile",
  "gold-body-profile",
  "diabetic-profile",
].map((id) => {
  const p = PACKAGES_DATA.find((item) => item.id === id)!;
  return {
    id: p.id,
    slug: p.id,
    name: p.name,
    category: p.category,
    summary: p.summary,
    inheritsFrom: p.inheritsFrom,
    additionalTests: p.additionalTests,
    inclusions: resolvePackageInclusions(p),
    clinicalNotice: p.clinicalNotice,
  };
});

// Curated 6 tests for the homepage
export const HOME_TESTS: HomeTestCard[] = HOMEPAGE_TESTS.map((t) => ({
  slug: t.slug,
  name: t.name,
  short: t.short,
  category: t.category,
  description: t.purpose,
  purpose: t.purpose,
}));

// Backwards-compatible CardInfo type if needed
export type CardInfo = {
  name: string;
  slug: string;
  description: string;
  category?: string;
  parameterCount?: number;
  testCount?: number;
  sample?: string;
  preparation?: string;
  report?: string;
  tests?: string[];
  inclusions?: PackageInclusion[];
  inheritsFrom?: string;
  additionalTests?: string[];
  clinicalNotice?: string;
  approved?: boolean;
};

export const enquiryText = (name: string, isPackage = false) =>
  isPackage ? packageEnquiryText(name) : testEnquiryText(name);
