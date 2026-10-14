/**
 * Editable homepage card data. Leave a field undefined until the laboratory approves it —
 * the UI then shows safe enquiry wording instead. Never compute parameterCount from tests.
 */
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
  price?: string;
  previousPrice?: string;
  homeCollection?: boolean;
  /** Set true only when all details are approved — switches CTA to "Book". */
  approved?: boolean;
};

export const HOME_PACKAGES: CardInfo[] = [
  { slug: "basic-health-check", name: "Basic Health Check", description: "A proposed package for a routine look at general health." },
  { slug: "complete-health-check", name: "Complete Health Check", description: "A proposed broader package for a more detailed health review." },
  { slug: "diabetes-profile", name: "Diabetes Profile", description: "A proposed package for blood sugar screening and monitoring." },
  { slug: "thyroid-profile", name: "Thyroid Profile", description: "A proposed package for checking thyroid function." },
];

export const HOME_TESTS: CardInfo[] = [
  { slug: "cbc", name: "Complete Blood Count (CBC)", category: "Blood Tests", description: "Checks red cells, white cells, haemoglobin and platelets." },
  { slug: "hba1c", name: "HbA1c", category: "Diabetes Tests", description: "Reflects average blood sugar over recent months." },
  { slug: "thyroid-profile", name: "Thyroid Profile", category: "Thyroid Tests", description: "Checks how well the thyroid gland is working." },
  { slug: "lipid-profile", name: "Lipid Profile", category: "Lipid Profile", description: "Measures cholesterol and triglycerides." },
  { slug: "vitamin-d", name: "Vitamin D", category: "Vitamin Tests", description: "Measures the level of vitamin D in the blood." },
  { slug: "full-body-checkup", name: "Full Body Checkup", category: "Full Body Checkups", description: "A combined set of common tests for an overall view." },
];

export const enquiryText = (name: string) =>
  `Hello Sattva Pathology Laboratory, I would like details about ${name}. Please share the included tests, price, preparation instructions, and home collection availability.`;
