import {
  PACKAGES_DATA,
  resolvePackageInclusions,
  type PackageData,
  type PackageInclusion,
} from "./packages-data";
import { TESTS_CATALOGUE, TEST_CATEGORIES, type TestCategory, type TestItem } from "./tests-data";

export {
  PACKAGES_DATA,
  resolvePackageInclusions,
  TESTS_CATALOGUE,
  TEST_CATEGORIES,
  type PackageData,
  type PackageInclusion,
  type TestCategory,
  type TestItem,
};

/* ---------------- Central Business & SEO Configuration ---------------- */

export interface BusinessLocation {
  readonly streetAddress: string;
  readonly landmark: string;
  readonly locality: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
  readonly countryCode: string;
  readonly formattedAddress: string;
}

export interface BusinessContact {
  readonly publicPhone: string;
  readonly publicPhoneTel: string;
  readonly whatsappNumber: string;
  readonly whatsappDisplay: string;
  readonly email: string | null;
}

export interface BusinessOnlinePresence {
  readonly origin: string;
  readonly logoUrl: string;
  readonly ogImageUrl: string;
  readonly mapsQuery: string;
  readonly googleListingUrl: string | null;
  readonly googleReviewUrl: string | null;
  readonly socialProfiles: readonly string[];
  readonly googleSearchConsoleVerification: string | null;
  readonly gaMeasurementId: string | null;
}

export interface BusinessOperations {
  readonly openingHoursDescription: string;
  readonly openingHoursSpecification: {
    readonly dayOfWeek: readonly string[];
    readonly opens: string;
    readonly closes: string;
  };
  readonly homeCollectionConfirmedAreas: readonly string[];
  readonly priceRange: string;
}

export interface BusinessConfig {
  readonly officialName: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly location: BusinessLocation;
  readonly contact: BusinessContact;
  readonly online: BusinessOnlinePresence;
  readonly operations: BusinessOperations;
}

export const BUSINESS_CONFIG: BusinessConfig = {
  officialName: "Sattva Pathology Laboratory",
  shortName: "Sattva Pathology",
  tagline: "Accurate Testing. Trusted Care.",
  location: {
    streetAddress: "204, Dream Square Complex",
    landmark: "Nirnay Nagar Sector-1",
    locality: "Nirnay Nagar",
    city: "Ahmedabad",
    state: "Gujarat",
    postalCode: "380013",
    country: "India",
    countryCode: "IN",
    formattedAddress: "204, Dream Square Complex, Nirnay Nagar, Ahmedabad, Gujarat 380013",
  },
  contact: {
    publicPhone: "076009 44188",
    publicPhoneTel: "tel:+917600944188",
    whatsappNumber: "917600944188",
    whatsappDisplay: "+91 76009 44188",
    /**
     * PENDING CLIENT CONFIRMATION (Deployment Blocker):
     * Official business email address has not yet been verified.
     * Do NOT publish unconfirmed personal or placeholder email addresses.
     */
    email: null,
  },
  online: {
    origin: "https://sattvapathology.in",
    logoUrl: "https://sattvapathology.in/favicon.png",
    ogImageUrl: "https://sattvapathology.in/og-image.png",
    mapsQuery: "Sattva Pathology Laboratory, Dream Square Complex, Ahmedabad 380013",
    /**
     * Verified Google Business Profile URL for reading reviews; falls back to Maps query if empty.
     * PENDING CLIENT CONFIRMATION of exact Google Place CID.
     */
    googleListingUrl: null,
    /**
     * Direct link to open Google review dialog (e.g. https://g.page/r/.../review); leave empty if unavailable.
     */
    googleReviewUrl: null,
    /**
     * PENDING CLIENT CONFIRMATION (Deployment Blocker):
     * Verified official social profiles (Facebook, Instagram, LinkedIn).
     */
    socialProfiles: [] as const,
    /**
     * Google Search Console HTML verification tag content.
     * Configured via environment variable VITE_GSC_VERIFICATION or deployment config.
     */
    googleSearchConsoleVerification: null,
    /**
     * Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX).
     * Configured via environment variable VITE_GA_MEASUREMENT_ID.
     */
    gaMeasurementId: null,
  },
  operations: {
    openingHoursDescription: "Open 24 Hours, 7 days a week",
    openingHoursSpecification: {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ] as const,
      opens: "00:00",
      closes: "23:59",
    },
    /**
     * Confirmed serviceable areas in Ahmedabad based on operational inquiry handling.
     * Home collection availability always depends on schedule and booking confirmation.
     */
    homeCollectionConfirmedAreas: [
      "Nirnay Nagar",
      "Akhbar Nagar",
      "Ranip",
      "Chandlodiya",
      "Naranpura",
      "Ghatlodia",
      "Ahmedabad",
    ] as const,
    priceRange: "₹₹",
  },
} as const;

export const SITE = {
  name: BUSINESS_CONFIG.officialName,
  short: BUSINESS_CONFIG.shortName,
  tagline: BUSINESS_CONFIG.tagline,
  address: BUSINESS_CONFIG.location.formattedAddress,
  phoneDisplay: BUSINESS_CONFIG.contact.publicPhone,
  phoneHref: BUSINESS_CONFIG.contact.publicPhoneTel,
  whatsapp: BUSINESS_CONFIG.contact.whatsappNumber,
  /** Leave empty until confirmed by the client; unconfirmed email addresses are omitted from display. */
  email: BUSINESS_CONFIG.contact.email ?? "",
  url: BUSINESS_CONFIG.online.origin,
  rating: 4.8,
  reviews: 186,
  googleListingUrl: BUSINESS_CONFIG.online.googleListingUrl ?? "",
  googleReviewUrl: BUSINESS_CONFIG.online.googleReviewUrl ?? "",
  mapsQuery: BUSINESS_CONFIG.online.mapsQuery,
};

export const PRIVACY_POLICY_REVISION_DATE = "November 2026";
export const TERMS_REVISION_DATE = "November 2026";

export const getGoogleListingUrl = () =>
  SITE.googleListingUrl.trim() ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

export const getGoogleReviewUrl = () => SITE.googleReviewUrl.trim() || undefined;

export const waLink = (text = "Hello Sattva Pathology, I would like to enquire about a test.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

/**
 * Client confirmed WhatsApp enquiry message formats:
 * - Package message: "Hello Sattva Pathology Laboratory, I would like to enquire about the [Package Name]. Please share preparation instructions, availability, and booking details."
 * - Test message: "Hello Sattva Pathology Laboratory, I would like to enquire about [Test Name]. Please share preparation instructions, availability, and booking details."
 * No prices or unconfirmed report times are included in messages.
 */
export const packageEnquiryText = (packageName: string) =>
  `Hello Sattva Pathology Laboratory, I would like to enquire about the ${packageName}. Please share preparation instructions, availability, and booking details.`;

export const testEnquiryText = (testName: string) =>
  `Hello Sattva Pathology Laboratory, I would like to enquire about ${testName}. Please share preparation instructions, availability, and booking details.`;

export const waPackageLink = (packageName: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(packageEnquiryText(packageName))}`;

export const waTestLink = (testName: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(testEnquiryText(testName))}`;

/**
 * Universal service enquiry helper: automatically selects package vs test wording.
 */
export const serviceEnquiryText = (serviceName: string) => {
  const isPackage =
    PACKAGES_DATA.some(
      (p) =>
        p.name.toLowerCase() === serviceName.toLowerCase() || p.id === serviceName.toLowerCase(),
    ) ||
    serviceName.toLowerCase().includes("profile") ||
    serviceName.toLowerCase().includes("package") ||
    serviceName.toLowerCase().includes("checkup");
  return isPackage ? packageEnquiryText(serviceName) : testEnquiryText(serviceName);
};

export const waServiceLink = (serviceName: string) => waLink(serviceEnquiryText(serviceName));

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;
export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapsQuery)}`;
export const mapsDirectionsUrl = mapsDirections;
export const reviewsLink = getGoogleListingUrl();

/* ---------------- Categories ---------------- */
export const CATEGORIES = TEST_CATEGORIES;
export type Category = TestCategory;

export type CategoryInfo = {
  name: Category;
  shortDesc: string;
  overview: string;
  whatItCovers: string;
  faqs: readonly (readonly [string, string])[];
};

export const CATEGORIES_INFO: Record<Category, CategoryInfo> = {
  "Blood Counts & Inflammation": {
    name: "Blood Counts & Inflammation",
    shortDesc:
      "Essential hematology and inflammatory markers evaluating circulating blood cells and immune activity.",
    overview:
      "Blood count and inflammatory investigations evaluate circulating red blood cells, white blood cells, platelets, and acute-phase proteins. Clinicians utilize these tests to screen for anemia, investigate infection or fatigue, and monitor systemic inflammatory responses.",
    whatItCovers:
      "Complete Blood Count (CBC), Erythrocyte Sedimentation Rate (ESR), Peripheral Blood Smear, Reticulocyte Count, and C-Reactive Protein (CRP).",
    faqs: [
      [
        "What do blood count tests evaluate?",
        "Blood counts examine circulating red cells, white cells, platelets, and hemoglobin to provide treating physicians with baseline hematologic insights.",
      ],
      [
        "Do routine blood counts require overnight fasting?",
        "Fasting requirements depend on your doctor's specific prescription and co-ordered tests. Complete Blood Count (CBC) typically does not require fasting. Contact our team to confirm preparation guidance.",
      ],
      [
        "Can blood samples be collected at home?",
        "Yes, eligible blood samples can be arranged for home collection across confirmed areas in Ahmedabad, subject to appointment confirmation.",
      ],
      [
        "How should I review my results?",
        "Always share your laboratory report with your treating physician for medical interpretation and contextual clinical guidance.",
      ],
    ],
  },
  "Diabetes & Glucose": {
    name: "Diabetes & Glucose",
    shortDesc: "Screening and ongoing glucose monitoring assessments.",
    overview:
      "Glucose and diabetes testing assesses blood glucose concentrations and glycated hemoglobin to help clinicians evaluate carbohydrate metabolism, screen for impaired tolerance, and monitor glycemic regulation over time.",
    whatItCovers:
      "Fasting Blood Sugar (FBS), Postprandial Blood Sugar (PPBS), Random Blood Sugar (RBS), HbA1c, Fasting Urine Sugar (FUS), and Urine Microalbumin.",
    faqs: [
      [
        "What is the difference between Fasting Blood Sugar and HbA1c?",
        "Fasting blood sugar measures circulating glucose at an isolated point in time after fasting, while HbA1c reflects average blood sugar exposure bound to red blood cells over the preceding 2 to 3 months.",
      ],
      [
        "How should I prepare for fasting blood glucose?",
        "Fasting protocols should follow your physician's advice. Contact our laboratory team to confirm preparation instructions for your specific tests.",
      ],
      [
        "Can diabetes monitoring tests be collected at home?",
        "Yes, home sample collection can be scheduled for routine diabetes profiles across confirmed Ahmedabad neighbourhoods.",
      ],
      [
        "Does one test reading diagnose diabetes?",
        "No. Clinical diagnosis requires comprehensive medical assessment and confirmation by your treating doctor in accordance with clinical guidelines.",
      ],
    ],
  },
  "Lipid Profile": {
    name: "Lipid Profile",
    shortDesc: "Cardiovascular lipid fractions, cholesterol, and triglycerides.",
    overview:
      "Lipid profiling quantifies circulating cholesterol and triglyceride fractions to assist treating clinicians in evaluating cardiovascular lipid status and monitoring response to dietary or medical interventions.",
    whatItCovers:
      "Total cholesterol, high-density lipoprotein (HDL), low-density lipoprotein (LDL), very-low-density lipoprotein (VLDL), and triglycerides.",
    faqs: [
      [
        "Why is lipid profile testing recommended?",
        "Physicians utilize lipid testing to assess cardiovascular lipid markers and track metabolic health indicators over time.",
      ],
      [
        "Do I need to fast before a lipid profile?",
        "Lipid profiling traditionally involves an overnight fasting period to evaluate baseline triglycerides accurately. Ask our team about preparation before your visit.",
      ],
      [
        "Is home collection available for lipid tests?",
        "Yes, morning doorstep sample collection can be requested in confirmed Ahmedabad service areas.",
      ],
      [
        "Can recent meals affect lipid results?",
        "Yes, dietary intake, hydration, and lifestyle factors can influence circulating lipid markers. Discuss results with your doctor.",
      ],
    ],
  },
  "Liver Function": {
    name: "Liver Function",
    shortDesc: "Hepatic enzyme, bilirubin, and cellular metabolic evaluation.",
    overview:
      "Liver function assessments measure circulating hepatic enzymes, bilirubin fractions, and liver-synthesized proteins. Treating physicians utilize these markers to evaluate liver health, investigate symptoms like jaundice, and assess medication effects.",
    whatItCovers:
      "Liver Function Profile (LFT), SGPT / ALT, SGOT / AST, Bilirubin testing, and Alkaline Phosphatase (ALP).",
    faqs: [
      [
        "What do liver enzyme measurements reflect?",
        "Liver enzymes reflect hepatocyte integrity and biliary flow. Enzyme fluctuations can arise from medications, diet, infections, or hepatic changes.",
      ],
      [
        "How do I prepare for a Liver Function Test?",
        "Ask our team about preparation when booking. Please inform the laboratory of any ongoing prescription medications.",
      ],
      [
        "Can liver function samples be drawn at home?",
        "Yes, blood collection for liver function tests is available via home collection in confirmed Ahmedabad service areas.",
      ],
      [
        "What should I do after receiving my LFT report?",
        "Review your laboratory report directly with your treating healthcare provider for contextual guidance.",
      ],
    ],
  },
  "Kidney Function & Electrolytes": {
    name: "Kidney Function & Electrolytes",
    shortDesc: "Renal filtration, waste excretion, and electrolyte equilibrium.",
    overview:
      "Kidney function and electrolyte investigations evaluate metabolic waste filtration (creatinine, blood urea, uric acid) and circulating mineral ions (calcium, electrolytes) cleared by healthy renal tissue.",
    whatItCovers:
      "Renal Function Profile (RFT), Creatinine, Blood Urea, Uric Acid, Calcium, and Electrolytes.",
    faqs: [
      [
        "Why are creatinine and blood urea measured?",
        "Creatinine and blood urea are metabolic by-products filtered by the kidneys, helping clinicians estimate filtration clearance and renal health.",
      ],
      [
        "Is fasting mandatory for a Kidney Function Test?",
        "Fasting requirements depend on whether concurrent metabolic tests are prescribed. Contact our team to confirm preparation guidance.",
      ],
      [
        "Can kidney function tests be scheduled for home collection?",
        "Yes, eligible patients can request home collection for renal profile tests across confirmed Ahmedabad areas.",
      ],
      [
        "What is the next step after receiving results?",
        "Always review your laboratory findings with your family physician or treating specialist.",
      ],
    ],
  },
  Thyroid: {
    name: "Thyroid",
    shortDesc:
      "Endocrine investigations evaluating thyroid hormone output and pituitary regulation.",
    overview:
      "Thyroid tests evaluate circulating levels of thyroid hormones (T3, T4, Free T3, Free T4) and the pituitary regulator (TSH). Clinicians utilize these tests to assess metabolic regulation, investigate energy or weight changes, and monitor thyroid therapy.",
    whatItCovers: "TSH, T3, T4, Free T3, Free T4, and Thyroid Profile.",
    faqs: [
      [
        "What do T3, T4, and TSH hormones regulate?",
        "Thyroid hormones regulate baseline metabolic rate, body temperature, energy expenditure, and heart rate throughout the body.",
      ],
      [
        "Should I take thyroid medication before the test?",
        "Consult your prescribing physician regarding whether to take your morning thyroid medication prior to sample collection. Ask our team if you have questions.",
      ],
      [
        "Are thyroid tests available for doorstep collection?",
        "Yes, thyroid blood draws can be arranged via our home sample collection service in supported Ahmedabad areas.",
      ],
      [
        "Why might a doctor order repeat thyroid tests?",
        "Clinicians often monitor thyroid hormone levels periodically to assess therapy response or verify previous laboratory findings.",
      ],
    ],
  },
  "Vitamins & Iron Studies": {
    name: "Vitamins & Iron Studies",
    shortDesc: "Essential micronutrient and iron reserve assessments.",
    overview:
      "Micronutrient tests measure circulating concentrations of critical vitamins and minerals—including Vitamin B12, Vitamin D3, ferritin, iron studies, and folate—essential for red cell formation, bone mineral density, and neurological health.",
    whatItCovers: "Vitamin B12, Vitamin D3, Ferritin, Iron Studies, and Folate.",
    faqs: [
      [
        "Why are Vitamin D3 and B12 tests frequently advised?",
        "Both nutrients support vital physiological functions—Vitamin D3 assists calcium absorption and bone health, while Vitamin B12 supports red blood cell production and nerve health.",
      ],
      [
        "What preparation is needed for vitamin testing?",
        "Preparation instructions depend on whether you are taking vitamin supplements. Ask our team about preparation before scheduling.",
      ],
      [
        "Can vitamin blood tests be taken at home?",
        "Yes, vitamin blood tests are eligible for home collection in supported Ahmedabad neighbourhoods.",
      ],
      [
        "Should I start supplements based on my test results?",
        "Do not self-prescribe high-dose supplements. Always consult your treating doctor for appropriate therapeutic guidance and dosage.",
      ],
    ],
  },
  "Urine & Stool": {
    name: "Urine & Stool",
    shortDesc: "Physical, chemical, and microscopic excretory evaluations.",
    overview:
      "Excretory laboratory evaluations provide valuable clinical insights into renal function, urinary tract health, and gastrointestinal status. Investigations include routine urinalysis, microbiological culture, and stool routine examinations.",
    whatItCovers: "Urine Analysis, Urine Culture and Sensitivity, and Stool Routine Examination.",
    faqs: [
      [
        "What is a clean-catch midstream urine sample?",
        "A midstream sample involves collecting the middle portion of urination into a clean sterile container, discarding the initial stream to reduce external skin contamination.",
      ],
      [
        "Does the lab supply collection containers?",
        "Yes, sterile collection containers are provided by the laboratory to ensure reliable and clean specimen handling.",
      ],
      [
        "Can urine samples be handed over during home collection?",
        "Yes, urine samples can be handed over to our phlebotomist during a confirmed home collection visit.",
      ],
      [
        "Why might both blood and urine tests be co-ordered?",
        "Combining blood and urine evaluations provides clinicians with a more complete understanding of kidney filtration and metabolic processing.",
      ],
    ],
  },
  "Fever & Infection": {
    name: "Fever & Infection",
    shortDesc:
      "Diagnostic investigations for acute febrile illnesses and suspected infectious pathogens.",
    overview:
      "Fever and infection investigations assist healthcare providers in identifying infectious pathogens during febrile episodes. Tests evaluate acute viral antigens, antibodies, and parasitic blood infections under clinician guidance.",
    whatItCovers: "Dengue NS1 Antigen, Dengue Antibody Tests, and Malaria Testing.",
    faqs: [
      [
        "Which fever test is appropriate for my symptoms?",
        "Your treating doctor will determine which tests to order based on symptom duration, clinical findings, and seasonal patterns.",
      ],
      [
        "Can fever tests be completed without fasting?",
        "Most fever-related blood tests do not require fasting, but please ask our team about preparation for your specific order.",
      ],
      [
        "Is doorstep collection available for fever patients recovering at home?",
        "Yes, home sample collection can be requested for patients recovering at home in confirmed Ahmedabad locations.",
      ],
      [
        "When should I seek immediate medical care?",
        "If you experience high fever with severe warning signs (such as breathing difficulty, extreme lethargy, or persistent vomiting), seek immediate emergency medical attention.",
      ],
    ],
  },
  Coagulation: {
    name: "Coagulation",
    shortDesc: "Hemostatic clotting assessments including prothrombin time and INR.",
    overview:
      "Coagulation testing evaluates the body's physiological blood clotting cascade. Clinicians utilize prothrombin time and INR to monitor anticoagulant therapies and evaluate hemostatic competence prior to surgical procedures.",
    whatItCovers: "PT/INR (Prothrombin Time / International Normalized Ratio).",
    faqs: [
      [
        "What does PT/INR measure?",
        "PT/INR measures the time required for plasma to clot via the extrinsic coagulation pathway, standardized into an International Normalized Ratio.",
      ],
      [
        "Why is regular INR monitoring recommended for patients on blood thinners?",
        "Monitoring ensures blood-thinning medications remain within the therapeutic target range established by your treating physician.",
      ],
      [
        "Can PT/INR samples be collected at home?",
        "Yes, PT/INR blood collection can be arranged via home collection in confirmed Ahmedabad locations.",
      ],
      [
        "Should I take my anticoagulant medication before sample collection?",
        "Always follow your prescribing doctor's exact instructions regarding medication timing on the morning of a coagulation blood draw.",
      ],
    ],
  },
  "Selected Markers": {
    name: "Selected Markers",
    shortDesc:
      "Auxiliary biological markers evaluated alongside comprehensive clinical examination.",
    overview:
      "Selected biological markers provide auxiliary physiological data to treating specialists. These markers are evaluated exclusively within comprehensive medical consultations and are not standalone diagnostic or screening tests.",
    whatItCovers: "PSA (Prostate-Specific Antigen) and CA-125 biomarker.",
    faqs: [
      [
        "Are PSA and CA-125 standalone diagnostic tests for cancer?",
        "No. Neither PSA nor CA-125 is a standalone diagnostic or cancer-screening test. Both are auxiliary biological markers that must be interpreted by your treating physician in conjunction with clinical examination and imaging.",
      ],
      [
        "What clinical factors can influence biomarker levels?",
        "Benign conditions, physiological fluctuations, medications, and minor inflammations can influence marker levels. Only a qualified medical specialist can contextualize your results.",
      ],
      [
        "How do I prepare for biological marker tests?",
        "Contact our laboratory team to confirm any specific preparation instructions prescribed by your clinician.",
      ],
      [
        "Can marker blood samples be drawn via home collection?",
        "Yes, doorstep blood collection is available for eligible marker tests across confirmed Ahmedabad areas.",
      ],
    ],
  },
};

/* ---------------- Tests Dataset ---------------- */
export type Test = {
  slug: string;
  name: string;
  short?: string | undefined;
  category: Category;
  aliases: string[];
  purpose: string;
  whatItMeasures: string;
  clinicalRole: string;
  components?: string[] | undefined;
  sample: string;
  preparation: string;
  turnaround: string;
  clinicalNotice?: string | undefined;
};

export const TESTS: Test[] = TESTS_CATALOGUE.map((t) => ({
  slug: t.slug,
  name: t.name,
  short: t.short,
  category: t.category,
  aliases: t.aliases,
  purpose: t.purpose,
  whatItMeasures: t.whatItMeasures,
  clinicalRole: t.clinicalRole,
  components: t.components,
  sample: t.category === "Urine & Stool" ? (t.slug.includes("stool") ? "Stool" : "Urine") : "Blood",
  preparation: "Ask our team about preparation",
  turnaround: "Contact the laboratory for report availability",
  clinicalNotice: t.clinicalNotice,
}));

export const POPULAR = [
  "cbc",
  "fasting-blood-sugar",
  "hba1c",
  "lipid-profile",
  "thyroid-profile",
  "vitamin-d",
];

/* ---------------- Packages Dataset ---------------- */
export type Package = {
  id: string;
  name: string;
  category: string;
  summary: string;
  benefit: string; // for backward compatibility
  inheritsFrom?: string | undefined;
  additionalTests?: string[] | undefined;
  directInclusions?: PackageInclusion[] | undefined;
  tests: string[]; // resolved array of test names
  sample: string;
  preparation: string;
  report: string;
  parameterCount?: number | undefined;
  clinicalNotice?: string | undefined;
};

export const PACKAGES: Package[] = PACKAGES_DATA.map((pkg) => {
  const resolved = resolvePackageInclusions(pkg);
  return {
    id: pkg.id,
    name: pkg.name,
    category: pkg.category,
    summary: pkg.summary,
    benefit: pkg.summary,
    inheritsFrom: pkg.inheritsFrom,
    additionalTests: pkg.additionalTests,
    directInclusions: pkg.directInclusions,
    tests: resolved.map((item) => item.name),
    sample: "Blood and urine",
    preparation: "Ask our team about preparation",
    report: "Contact the laboratory for report availability",
    parameterCount: pkg.parameterCount,
    clinicalNotice: pkg.clinicalNotice,
  };
});

/* ---------------- FAQs & Reviews ---------------- */
export const FAQS = [
  [
    "Is Sattva Pathology Laboratory open 24 hours?",
    "Yes. Sattva Pathology Laboratory is open 24 hours, every day.",
  ],
  [
    "Is home sample collection available?",
    "Yes. Home sample collection is available in Ahmedabad, subject to test eligibility, area, and appointment confirmation. Call or WhatsApp us to check availability in your area.",
  ],
  [
    "How can I book a test or package?",
    "Call 076009 44188, send us a WhatsApp message, or use the home collection request form. You can also visit our laboratory at any time.",
  ],
  [
    "What should I do before a fasting test?",
    "Preparation instructions depend on the specific test. Our laboratory team will guide you on preparation requirements when you contact us, so please ask before your visit.",
  ],
  ["How can I contact the laboratory?", "Call 076009 44188 or message us on WhatsApp at any time."],
  ["Where is Sattva Pathology located?", "204, Dream Square Complex, Ahmedabad, Gujarat 380013."],
  [
    "How will I receive my report?",
    "Our team can guide you on report availability timelines and collection options when you contact the laboratory.",
  ],
] as const;

export const REVIEWS = [
  {
    name: "Bhagirath Chavda",
    text: "Good hygiene, minimal waiting, and reports delivered on time.",
  },
  { name: "Khushboo Rathod", text: "Friendly, professional staff and smooth sample collection." },
  {
    name: "Rajneesh Aacharya",
    text: "Reliable results with fast turnaround and excellent customer service.",
  },
  { name: "Arpit Kansar", text: "Convenient home collection and reports delivered as promised." },
];
