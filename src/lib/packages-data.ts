/**
 * Central typed package dataset for Sattva Pathology Laboratory.
 *
 * CLIENT CONFIRMATIONS & CONSTRAINTS:
 * - 8 actual packages confirmed by client.
 * - Advanced Body Profile includes LFT and RFT.
 * - Raw source for Advanced: "CBC, FBS, FUS, LIPID PROFILE, LFT (SGPT, SGOT, T.Bilirubin, D. Bil.Inirect B ALP), RFT (Creat, BI.Urea, U.A., Ca+2) TSH, Vit. B12, Urine Analysis"
 *   LFT and RFT are displayed as confirmed profiles. Garbled text is NOT expanded with guessed subcomponents.
 * - In Diabetic Profile, "Ur" is retained exactly as supplied without expansion or modification.
 * - Prices, parameter counts, turnaround times, and fixed fasting rules are omitted per client guidelines.
 */

export type PackageInclusion = {
  name: string;
  subComponents?: string[];
  note?: string;
};

export type PackageData = {
  id: string;
  name: string;
  category: string;
  summary: string;
  inheritsFrom?: string;
  additionalTests?: string[];
  directInclusions?: PackageInclusion[];
  // Parameter count kept optional for future lab values, hidden when undefined
  parameterCount?: number;
  // Clinical / operational note if applicable
  clinicalNotice?: string;
};

export const RAW_SOURCE_ADVANCED_TEXT =
  "CBC, FBS, FUS, LIPID PROFILE, LFT (SGPT, SGOT, T.Bilirubin, D. Bil.Inirect B ALP), RFT (Creat, BI.Urea, U.A., Ca+2) TSH, Vit. B12, Urine Analysis";

export const PACKAGES_DATA: PackageData[] = [
  {
    id: "basic-body-profile",
    name: "Basic Body Profile",
    category: "Body Profile",
    summary:
      "Routine diagnostic profile screening blood counts, glucose, lipids, basic liver and kidney markers, thyroid, and urine.",
    directInclusions: [
      { name: "CBC (Complete Blood Count)" },
      { name: "FBS (Fasting Blood Sugar)" },
      { name: "FUS (Fasting Urine Sugar)" },
      { name: "Lipid Profile" },
      { name: "RFT", subComponents: ["Creatinine", "Blood Urea"] },
      { name: "LFT", subComponents: ["Serum Bilirubin", "SGPT"] },
      { name: "TSH (Thyroid Stimulating Hormone)" },
      { name: "Urine Analysis" },
    ],
  },
  {
    id: "advanced-body-profile",
    name: "Advanced Body Profile",
    category: "Body Profile",
    summary:
      "Comprehensive baseline diagnostic profile with full liver and renal function panels, vitamin B12, and systemic markers.",
    directInclusions: [
      { name: "CBC (Complete Blood Count)" },
      { name: "FBS (Fasting Blood Sugar)" },
      { name: "FUS (Fasting Urine Sugar)" },
      { name: "Lipid Profile" },
      { name: "LFT (Liver Function Profile)" },
      { name: "RFT (Renal Function Profile)" },
      { name: "TSH (Thyroid Stimulating Hormone)" },
      { name: "Vitamin B12" },
      { name: "Urine Analysis" },
    ],
  },
  {
    id: "advanced-diabetic-profile",
    name: "Advanced + Diabetic Profile",
    category: "Body Profile + Diabetes Tests",
    summary:
      "Combines the full Advanced Body Profile with glycated hemoglobin (HbA1c) for comprehensive glycemic evaluation.",
    inheritsFrom: "advanced-body-profile",
    additionalTests: ["HbA1c"],
  },
  {
    id: "silver-body-profile",
    name: "Silver Body Profile",
    category: "Body Profile + Vitamin D3",
    summary:
      "Extends the Advanced Body Profile with essential Vitamin D3 evaluation for bone and musculoskeletal health.",
    inheritsFrom: "advanced-body-profile",
    additionalTests: ["Vitamin D3"],
  },
  {
    id: "gold-body-profile",
    name: "Gold Body Profile",
    category: "Body Profile + Vitamin D3",
    summary:
      "Complete preventive assessment combining the Advanced Body Profile with Vitamin D3 and HbA1c.",
    inheritsFrom: "advanced-body-profile",
    additionalTests: ["Vitamin D3", "HbA1c"],
  },
  {
    id: "male-executive-profile",
    name: "Male Executive Profile",
    category: "Executive Profile",
    summary:
      "Executive wellness evaluation combining the Advanced Body Profile with Vitamin D3 and Prostate-Specific Antigen (PSA).",
    inheritsFrom: "advanced-body-profile",
    additionalTests: ["Vitamin D3", "PSA"],
    clinicalNotice:
      "PSA is a biological prostate marker evaluated under clinical direction; it is not a standalone diagnostic or cancer-screening test.",
  },
  {
    id: "female-executive-profile",
    name: "Female Executive Profile",
    category: "Executive Profile",
    summary:
      "Executive wellness evaluation combining the Advanced Body Profile with Vitamin D3 and CA-125 biomarker.",
    inheritsFrom: "advanced-body-profile",
    additionalTests: ["Vitamin D3", "CA-125"],
    clinicalNotice:
      "CA-125 is an auxiliary gynecological biomarker evaluated under clinical direction; it is not a standalone diagnostic or cancer-screening test.",
  },
  {
    id: "diabetic-profile",
    name: "Diabetic Profile",
    category: "Diabetes Profile",
    summary:
      "Targeted glycemic and renal investigation for diabetes screening and ongoing glucose monitoring.",
    directInclusions: [
      { name: "FBS (Fasting Blood Sugar)" },
      { name: "FUS (Fasting Urine Sugar)" },
      { name: "PPBS (Postprandial Blood Sugar)" },
      { name: "HbA1c" },
      { name: "Ur" }, // Confirmed: kept exactly as written, do not expand or modify
      { name: "Urine Microalbumin" },
      { name: "Creatinine" },
    ],
  },
];

/**
 * Resolves all inclusions for a package, including inherited ones.
 */
export function resolvePackageInclusions(pkg: PackageData): PackageInclusion[] {
  if (pkg.directInclusions) {
    return pkg.directInclusions;
  }
  if (pkg.inheritsFrom) {
    const parent = PACKAGES_DATA.find((p) => p.id === pkg.inheritsFrom);
    const parentInclusions = parent ? resolvePackageInclusions(parent) : [];
    const addedInclusions: PackageInclusion[] = (pkg.additionalTests || []).map((test) => ({
      name: test,
    }));
    return [...parentInclusions, ...addedInclusions];
  }
  return [];
}

/**
 * Curated 4-package selection for the homepage.
 */
export const HOMEPAGE_PACKAGE_IDS = [
  "basic-body-profile",
  "advanced-body-profile",
  "gold-body-profile",
  "diabetic-profile",
];

export const HOMEPAGE_PACKAGES = PACKAGES_DATA.filter((p) => HOMEPAGE_PACKAGE_IDS.includes(p.id));
