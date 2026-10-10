export const SITE = {
  name: "Sattva Pathology Laboratory",
  short: "Sattva Pathology",
  tagline: "Accurate Testing. Trusted Care.",
  address: "204, Dream Square Complex, Ahmedabad, Gujarat 380013",
  phoneDisplay: "076009 44188",
  phoneHref: "tel:+917600944188",
  whatsapp: "917600944188",
  email: "contact@sattvapathology.in",
  url: "https://sattvapathology.in",
  rating: 4.8,
  reviews: 186,
  mapsQuery: "Sattva Pathology Laboratory, Dream Square Complex, Ahmedabad 380013",
};

export const waLink = (text = "Hello Sattva Pathology, I would like to enquire about a test.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;
export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapsQuery)}`;
export const reviewsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

export const CATEGORIES = [
  "Blood Tests",
  "Diabetes Tests",
  "Thyroid Tests",
  "Full Body Checkups",
  "Liver Function Tests",
  "Kidney Function Tests",
  "Lipid Profile",
  "Vitamin Tests",
  "Fever Tests",
  "Urine Tests",
] as const;

export type Test = {
  slug: string;
  name: string;
  short?: string;
  category: (typeof CATEGORIES)[number];
  purpose: string;
  sample: string;
  preparation: string;
  turnaround: string;
};

export const TESTS: Test[] = [
  { slug: "cbc", name: "Complete Blood Count", short: "CBC", category: "Blood Tests", purpose: "Checks red cells, white cells, haemoglobin and platelets. Commonly advised for tiredness, infection, or a routine check.", sample: "Blood", preparation: "No fasting needed.", turnaround: "Same day" },
  { slug: "blood-sugar", name: "Blood Sugar (Fasting / PP / Random)", category: "Diabetes Tests", purpose: "Measures glucose in your blood to screen for or monitor diabetes.", sample: "Blood", preparation: "Fasting sugar: 8–10 hours without food. Water is allowed. PP sugar: 2 hours after a meal.", turnaround: "Same day" },
  { slug: "hba1c", name: "HbA1c", category: "Diabetes Tests", purpose: "Shows your average blood sugar over the last 2–3 months. Useful for diabetes monitoring.", sample: "Blood", preparation: "No fasting needed.", turnaround: "Same day" },
  { slug: "thyroid-profile", name: "Thyroid Profile (T3, T4, TSH)", category: "Thyroid Tests", purpose: "Checks how well your thyroid gland is working.", sample: "Blood", preparation: "No fasting usually needed. Early morning sample preferred. Tell us if you take thyroid medicine.", turnaround: "Same day / next day" },
  { slug: "lipid-profile", name: "Lipid Profile", category: "Lipid Profile", purpose: "Measures cholesterol and triglycerides to understand heart health.", sample: "Blood", preparation: "10–12 hours fasting. Water is allowed.", turnaround: "Same day" },
  { slug: "liver-function-test", name: "Liver Function Test", short: "LFT", category: "Liver Function Tests", purpose: "Checks liver enzymes, bilirubin and proteins to assess liver health.", sample: "Blood", preparation: "Fasting of 8–10 hours is preferred.", turnaround: "Same day" },
  { slug: "kidney-function-test", name: "Kidney Function Test", short: "KFT", category: "Kidney Function Tests", purpose: "Checks urea, creatinine and electrolytes to assess kidney health.", sample: "Blood", preparation: "No special preparation usually needed.", turnaround: "Same day" },
  { slug: "vitamin-d", name: "Vitamin D (25-OH)", category: "Vitamin Tests", purpose: "Measures vitamin D level. Low levels can affect bones, muscles and energy.", sample: "Blood", preparation: "No fasting needed.", turnaround: "Within 24–48 hours" },
  { slug: "vitamin-b12", name: "Vitamin B12", category: "Vitamin Tests", purpose: "Measures vitamin B12, important for nerves and red blood cells.", sample: "Blood", preparation: "Fasting of 6–8 hours is preferred.", turnaround: "Within 24–48 hours" },
  { slug: "urine-routine", name: "Urine Routine & Microscopy", category: "Urine Tests", purpose: "Screens for urinary infection, kidney issues and other conditions.", sample: "Urine (first morning sample preferred)", preparation: "Collect midstream urine in a clean, sterile container that we provide.", turnaround: "Same day" },
  { slug: "full-body-checkup", name: "Full Body Checkup", category: "Full Body Checkups", purpose: "A combined set of common tests for an overall view of your health.", sample: "Blood and urine", preparation: "10–12 hours fasting. Water is allowed.", turnaround: "Within 24–48 hours" },
  { slug: "widal", name: "Widal Test", category: "Fever Tests", purpose: "Helps in checking for typhoid fever.", sample: "Blood", preparation: "No fasting needed.", turnaround: "Same day" },
  { slug: "dengue-ns1", name: "Dengue NS1 Antigen", category: "Fever Tests", purpose: "Helps detect dengue in the early days of fever.", sample: "Blood", preparation: "No fasting needed.", turnaround: "Same day" },
  { slug: "malaria", name: "Malaria Parasite Test", category: "Fever Tests", purpose: "Checks for malaria parasites in the blood.", sample: "Blood", preparation: "No fasting needed.", turnaround: "Same day" },
  { slug: "esr", name: "ESR", category: "Blood Tests", purpose: "A general marker of inflammation in the body.", sample: "Blood", preparation: "No fasting needed.", turnaround: "Same day" },
];

export const POPULAR = ["cbc", "hba1c", "thyroid-profile", "lipid-profile", "vitamin-d", "full-body-checkup"];

export const PACKAGES = [
  { name: "Full Body Checkup", tests: ["CBC", "Blood Sugar (Fasting)", "Lipid Profile", "Liver Function Test", "Kidney Function Test", "Thyroid Profile", "Urine Routine"], benefit: "A broad overview of your general health in one visit.", sample: "Blood and urine", report: "24–48 hours" },
  { name: "Diabetes Checkup", tests: ["Blood Sugar (Fasting & PP)", "HbA1c", "Kidney Function Test", "Urine Routine"], benefit: "Helps screen for and keep track of diabetes.", sample: "Blood and urine", report: "Same day" },
  { name: "Thyroid Checkup", tests: ["T3", "T4", "TSH"], benefit: "Checks thyroid function for tiredness, weight changes and more.", sample: "Blood", report: "Same day / next day" },
  { name: "Fever Panel", tests: ["CBC", "ESR", "Widal", "Malaria Parasite", "Dengue NS1", "Urine Routine"], benefit: "Common tests advised when fever continues for a few days.", sample: "Blood and urine", report: "Same day" },
  { name: "Vitamin Deficiency Package", tests: ["Vitamin D", "Vitamin B12", "CBC"], benefit: "Checks common vitamin levels linked with low energy and body aches.", sample: "Blood", report: "24–48 hours" },
  { name: "Pre-Employment Health Checkup", tests: ["CBC", "Blood Sugar", "Blood Group", "Urine Routine", "Other tests as required by employer"], benefit: "Tests commonly requested by employers before joining.", sample: "Blood and urine", report: "24–48 hours" },
];

export const FAQS = [
  ["Is Sattva Pathology Laboratory open 24 hours?", "Yes. The laboratory is open 24 hours a day, 7 days a week for walk-in tests and enquiries."],
  ["Do you provide home sample collection in Ahmedabad?", "Yes. Our trained staff can collect your sample from your home in Ahmedabad. Book online, call us or message us on WhatsApp."],
  ["How can I book a blood test?", "Use the Book Home Collection form, call 076009 44188, or send us a WhatsApp message. You can also walk in at any time."],
  ["Do I need to fast before my test?", "Some tests such as fasting sugar and lipid profile need 8–12 hours of fasting. Each test page lists its preparation, or you can call us to confirm."],
  ["How will I receive my reports?", "Reports are shared on WhatsApp or email, and printed copies can be collected from the lab."],
  ["How can I check my report status?", "Use the Report Status Request form on the Reports page, or call or WhatsApp us with your name and registered mobile number."],
  ["Which areas do you serve for home collection?", "We serve Nirnaynagar and nearby areas of Ahmedabad. Call us to confirm availability for your location."],
  ["How can I contact the laboratory?", "Call 076009 44188, WhatsApp us, email contact@sattvapathology.in, or visit 204, Dream Square Complex, Ahmedabad 380013."],
] as const;

export const REVIEWS = [
  { name: "Patient review", text: "Very friendly staff and the sample collection was quick and painless. Reports came on time." },
  { name: "Patient review", text: "Booked home collection for my parents. The staff came on time and handled everything hygienically." },
  { name: "Patient review", text: "They explained my report clearly and patiently. Good to have a lab that is open 24 hours." },
];
