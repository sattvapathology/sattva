/**
 * Curated routine/general pathology test catalogue for Sattva Pathology Laboratory.
 *
 * All entries follow Section 6 instructions:
 * - Authorized categories A through K
 * - Conservative, educational clinical descriptions
 * - No invented parameter counts, methods, fasting hours, or turnaround timelines
 * - Discreet operational note: "Contact our team for test preparation, availability, and booking guidance."
 */

export const TEST_CATEGORIES = [
  "Blood Counts & Inflammation",
  "Diabetes & Glucose",
  "Lipid Profile",
  "Liver Function",
  "Kidney Function & Electrolytes",
  "Thyroid",
  "Vitamins & Iron Studies",
  "Urine & Stool",
  "Fever & Infection",
  "Coagulation",
  "Selected Markers",
] as const;

export type TestCategory = (typeof TEST_CATEGORIES)[number];

export type TestItem = {
  slug: string;
  name: string;
  short?: string;
  category: TestCategory;
  aliases: string[];
  purpose: string;
  whatItMeasures: string;
  clinicalRole: string;
  components?: string[];
  sample?: string;
  clinicalNotice?: string;
};

export const TESTS_CATALOGUE: TestItem[] = [
  /* ---------------- A. BLOOD COUNTS AND INFLAMMATION ---------------- */
  {
    slug: "cbc",
    name: "Complete Blood Count",
    short: "CBC",
    category: "Blood Counts & Inflammation",
    aliases: ["cbc", "complete blood count", "hemogram", "full blood count", "blood count"],
    purpose:
      "Evaluates cellular blood elements including red cells, white cells, hemoglobin, and platelets.",
    whatItMeasures:
      "Assesses the major cellular components of circulating blood: red blood cells (erythrocytes), white blood cells (leukocytes), hemoglobin concentration, hematocrit, and platelets.",
    clinicalRole:
      "A primary baseline test ordered by treating doctors to screen for anemia, investigate infection or fatigue, and evaluate general hematological health.",
  },
  {
    slug: "esr",
    name: "Erythrocyte Sedimentation Rate",
    short: "ESR",
    category: "Blood Counts & Inflammation",
    aliases: ["esr", "erythrocyte sedimentation rate", "sed rate"],
    purpose: "Provides a non-specific indicator of systemic inflammation in the body.",
    whatItMeasures:
      "Measures the rate at which red blood cells sediment in an anticoagulated tube of blood over a specified time period.",
    clinicalRole:
      "Assists clinicians as a non-specific inflammatory marker to detect, evaluate, and monitor conditions associated with acute or chronic inflammation.",
  },
  {
    slug: "peripheral-blood-smear",
    name: "Peripheral Blood Smear",
    short: "PBS",
    category: "Blood Counts & Inflammation",
    aliases: [
      "peripheral blood smear",
      "pbs",
      "blood smear",
      "peripheral smear",
      "smear examination",
    ],
    purpose: "Microscopic evaluation of blood cell morphology, size, and structure.",
    whatItMeasures:
      "Visual examination of a stained thin blood film under a microscope to inspect the physical characteristics and maturity of red cells, white cells, and platelets.",
    clinicalRole:
      "Used by clinicians when investigating hematologic abnormalities, unexplained cytopenias, atypical lymphocytes, or suspected blood cell disorders.",
  },
  {
    slug: "reticulocyte-count",
    name: "Reticulocyte Count",
    short: "Retic Count",
    category: "Blood Counts & Inflammation",
    aliases: ["reticulocyte count", "reticulocytes", "retic", "retic count"],
    purpose: "Quantifies immature red blood cells to assess bone marrow erythrocyte production.",
    whatItMeasures:
      "Determines the percentage or absolute number of young, recently released red blood cells (reticulocytes) in circulating blood.",
    clinicalRole:
      "Helps healthcare professionals evaluate bone marrow responsiveness during investigations of anemia or recovery from blood loss.",
  },
  {
    slug: "crp",
    name: "C-Reactive Protein",
    short: "CRP",
    category: "Blood Counts & Inflammation",
    aliases: ["crp", "c-reactive protein", "c reactive protein", "crp test"],
    purpose:
      "Measures circulating C-reactive protein produced in response to systemic inflammation.",
    whatItMeasures:
      "Quantifies the concentration of C-reactive protein, an acute-phase reactant synthesized by hepatic tissue during inflammatory cascades.",
    clinicalRole:
      "Aids treating physicians in identifying acute inflammatory activity, monitoring treatment response in infections, and evaluating inflammatory conditions.",
  },

  /* ---------------- B. DIABETES AND GLUCOSE ---------------- */
  {
    slug: "fasting-blood-sugar",
    name: "Fasting Blood Sugar",
    short: "FBS",
    category: "Diabetes & Glucose",
    aliases: [
      "fbs",
      "fasting blood sugar",
      "fasting blood glucose",
      "blood-sugar",
      "fasting sugar",
    ],
    purpose: "Measures blood glucose concentration following an overnight fasting period.",
    whatItMeasures:
      "Determines circulating plasma glucose levels in the bloodstream in a post-absorptive fasting state.",
    clinicalRole:
      "Commonly requested by doctors to screen for prediabetes or diabetes, evaluate metabolic homeostasis, and monitor glucose regulation therapy.",
  },
  {
    slug: "postprandial-blood-sugar",
    name: "Postprandial Blood Sugar",
    short: "PPBS",
    category: "Diabetes & Glucose",
    aliases: [
      "ppbs",
      "postprandial blood sugar",
      "post prandial blood sugar",
      "pp glucose",
      "pp blood sugar",
    ],
    purpose: "Measures blood glucose concentration after meal consumption.",
    whatItMeasures:
      "Quantifies circulating blood glucose at a specified interval following food intake to assess post-meal glucose disposal.",
    clinicalRole:
      "Helps physicians evaluate how effectively insulin responds to carbohydrate digestion and monitor ongoing diabetes management.",
  },
  {
    slug: "random-blood-sugar",
    name: "Random Blood Sugar",
    short: "RBS",
    category: "Diabetes & Glucose",
    aliases: ["rbs", "random blood sugar", "random blood glucose", "random glucose"],
    purpose:
      "Measures circulating glucose at an unscheduled time of day regardless of meal timing.",
    whatItMeasures:
      "Provides an immediate measurement of circulating blood glucose without requiring adherence to fasting windows.",
    clinicalRole:
      "Utilized by clinicians during routine health reviews, pre-procedural checks, or initial assessments of unexpected symptoms.",
  },
  {
    slug: "hba1c",
    name: "HbA1c (Glycated Hemoglobin)",
    short: "HbA1c",
    category: "Diabetes & Glucose",
    aliases: ["hba1c", "glycated hemoglobin", "hemoglobin a1c", "a1c"],
    purpose: "Reflects average blood glucose concentrations over the preceding 2 to 3 months.",
    whatItMeasures:
      "Measures the percentage of hemoglobin molecules in circulating red blood cells that have bonded with glucose.",
    clinicalRole:
      "Key diagnostic and management test used by healthcare providers to monitor chronic glycemic control and guide long-term diabetes care.",
  },
  {
    slug: "fasting-urine-sugar",
    name: "Fasting Urine Sugar",
    short: "FUS",
    category: "Diabetes & Glucose",
    aliases: ["fus", "fasting urine sugar", "urine sugar fasting", "fasting urine glucose"],
    purpose: "Screens for the presence of glucose excreted in urine during a fasting state.",
    whatItMeasures:
      "Evaluates whether glucose is detected in urine when blood sugar levels exceed renal threshold filtration limits.",
    clinicalRole:
      "Included alongside blood glucose profiling as a supportive indicator during routine diabetic and metabolic assessments.",
  },
  {
    slug: "urine-microalbumin",
    name: "Urine Microalbumin",
    short: "Microalbumin",
    category: "Diabetes & Glucose",
    aliases: [
      "urine microalbumin",
      "microalbumin",
      "microalbuminuria",
      "urine albumin creatinine ratio",
    ],
    purpose: "Detects low levels of albumin in urine to screen for early signs of renal strain.",
    whatItMeasures:
      "Quantifies small concentrations of urinary albumin that may not be captured on standard routine dipstick tests.",
    clinicalRole:
      "Recommended by treating doctors for individuals with diabetes or hypertension to monitor early microvascular kidney changes.",
  },

  /* ---------------- C. LIPID PROFILE ---------------- */
  {
    slug: "lipid-profile",
    name: "Lipid Profile",
    short: "Lipid Panel",
    category: "Lipid Profile",
    aliases: ["lipid profile", "lipid panel", "cholesterol test", "lipid screen"],
    purpose:
      "Measures circulating cholesterol and triglyceride fractions to evaluate cardiovascular lipid status.",
    whatItMeasures:
      "Quantifies key lipid components in circulation, including total cholesterol, high-density lipoprotein (HDL), low-density lipoprotein (LDL), and triglycerides.",
    clinicalRole:
      "Ordered by physicians to assess baseline cardiovascular lipid balance, monitor dietary adjustments, and track lipid-lowering therapies.",
  },

  /* ---------------- D. LIVER FUNCTION ---------------- */
  {
    slug: "liver-function-test",
    name: "Liver Function Profile",
    short: "LFT",
    category: "Liver Function",
    aliases: [
      "lft",
      "liver function test",
      "liver function profile",
      "liver panel",
      "hepatic panel",
    ],
    purpose:
      "Comprehensive profile evaluating hepatic enzymes, bilirubin fractions, and liver proteins.",
    whatItMeasures:
      "Evaluates circulating liver enzymes and proteins that reflect hepatocyte integrity, synthetic capacity, and biliary clearance.",
    clinicalRole:
      "Helps healthcare professionals assess liver health, evaluate medication safety, and investigate symptoms such as fatigue or jaundice.",
  },
  {
    slug: "sgpt-alt",
    name: "SGPT / ALT (Alanine Aminotransferase)",
    short: "SGPT / ALT",
    category: "Liver Function",
    aliases: [
      "sgpt",
      "alt",
      "alanine aminotransferase",
      "sgpt alt",
      "serum glutamic pyruvic transaminase",
    ],
    purpose: "Measures alanine aminotransferase, an enzyme concentrated primarily in liver cells.",
    whatItMeasures:
      "Quantifies serum concentrations of the intracellular enzyme ALT released into the bloodstream upon hepatic cellular stress.",
    clinicalRole:
      "A sensitive marker used by clinicians to detect liver cell irritation, monitor therapeutic drugs, or evaluate liver wellness.",
  },
  {
    slug: "sgot-ast",
    name: "SGOT / AST (Aspartate Aminotransferase)",
    short: "SGOT / AST",
    category: "Liver Function",
    aliases: [
      "sgot",
      "ast",
      "aspartate aminotransferase",
      "sgot ast",
      "serum glutamic oxaloacetic transaminase",
    ],
    purpose:
      "Measures aspartate aminotransferase present in hepatic, cardiac, and muscular tissues.",
    whatItMeasures:
      "Determines serum levels of AST, an intracellular enzyme found in liver tissue as well as muscle and cardiac cells.",
    clinicalRole:
      "Evaluated alongside SGPT/ALT to assist clinicians in contextualizing hepatic and tissue enzyme variations.",
  },
  {
    slug: "bilirubin-testing",
    name: "Bilirubin Testing",
    short: "Bilirubin",
    category: "Liver Function",
    aliases: [
      "bilirubin",
      "serum bilirubin",
      "total direct bilirubin",
      "jaundice test",
      "bilirubin profile",
    ],
    purpose:
      "Measures bilirubin pigments to evaluate hemoglobin breakdown and hepatic excretory function.",
    whatItMeasures:
      "Quantifies circulating bilirubin fractions resulting from normal red blood cell turnover and liver clearance.",
    clinicalRole:
      "Used by doctors to investigate clinical jaundice, biliary tract obstruction, or hemolytic conditions.",
  },
  {
    slug: "alkaline-phosphatase",
    name: "Alkaline Phosphatase",
    short: "ALP",
    category: "Liver Function",
    aliases: ["alp", "alkaline phosphatase", "alk phos"],
    purpose:
      "Measures alkaline phosphatase enzyme associated with biliary drainage and bone turnover.",
    whatItMeasures:
      "Determines the activity of the ALP enzyme found throughout liver bile duct linings, bone osteoblasts, and intestinal mucosa.",
    clinicalRole:
      "Assists treating physicians when evaluating hepatobiliary clearance and bone metabolic processes.",
  },

  /* ---------------- E. KIDNEY FUNCTION AND ELECTROLYTES ---------------- */
  {
    slug: "kidney-function-test",
    name: "Renal Function Profile",
    short: "RFT / KFT",
    category: "Kidney Function & Electrolytes",
    aliases: ["rft", "kft", "renal function profile", "kidney function test", "renal panel"],
    purpose:
      "Comprehensive profile assessing renal waste clearance, filtration capacity, and metabolic markers.",
    whatItMeasures:
      "Measures circulating by-products of protein and muscle metabolism filtered by healthy functional kidneys.",
    clinicalRole:
      "Ordered by physicians to evaluate renal filtration efficiency, monitor chronic conditions like hypertension and diabetes, and review therapy.",
  },
  {
    slug: "creatinine",
    name: "Creatinine",
    short: "Creatinine",
    category: "Kidney Function & Electrolytes",
    aliases: ["creatinine", "serum creatinine", "sr creatinine", "blood creatinine"],
    purpose:
      "Quantifies serum creatinine, a muscular metabolic waste product filtered by the kidneys.",
    whatItMeasures:
      "Measures the concentration of creatinine in blood, providing a reliable baseline for estimating renal filtration capacity.",
    clinicalRole:
      "A primary laboratory parameter utilized by clinicians to evaluate glomerular filtration and monitor kidney health over time.",
  },
  {
    slug: "blood-urea",
    name: "Blood Urea",
    short: "Blood Urea",
    category: "Kidney Function & Electrolytes",
    aliases: ["blood urea", "urea", "bun", "blood urea nitrogen"],
    purpose:
      "Measures urea nitrogen in blood, reflecting dietary protein breakdown and renal excretion.",
    whatItMeasures:
      "Determines the amount of urea produced by the liver from protein metabolism and cleared by the kidneys.",
    clinicalRole:
      "Evaluated alongside creatinine by treating doctors to evaluate hydration status, renal clearance, and protein turnover.",
  },
  {
    slug: "uric-acid",
    name: "Uric Acid",
    short: "Uric Acid",
    category: "Kidney Function & Electrolytes",
    aliases: ["uric acid", "serum uric acid", "gout test"],
    purpose:
      "Measures uric acid produced during the natural breakdown of purines in body cells and food.",
    whatItMeasures:
      "Quantifies circulating levels of uric acid dissolved in blood before excretion by the kidneys.",
    clinicalRole:
      "Ordered by healthcare providers when evaluating joint discomfort, suspected gout, or renal stone risk factors.",
  },
  {
    slug: "calcium",
    name: "Calcium",
    short: "Calcium",
    category: "Kidney Function & Electrolytes",
    aliases: ["calcium", "serum calcium", "ca", "ca++"],
    purpose:
      "Quantifies total serum calcium to evaluate mineral balance, bone health, and neuromuscular stability.",
    whatItMeasures:
      "Measures circulating calcium bound to proteins as well as free ionized fractions in bloodstream.",
    clinicalRole:
      "Used by doctors in reviewing parathyroid function, bone health, kidney excretion, and general mineral equilibrium.",
  },
  {
    slug: "electrolytes",
    name: "Electrolytes",
    short: "Electrolytes",
    category: "Kidney Function & Electrolytes",
    aliases: ["electrolytes", "serum electrolytes", "na k cl", "sodium potassium chloride"],
    purpose:
      "Measures essential electrically charged minerals in blood to assess hydration and acid-base balance.",
    whatItMeasures:
      "Evaluates key circulating ions that maintain osmotic pressure, cell membrane electrical potential, and fluid equilibrium.",
    clinicalRole:
      "Advised by clinicians during acute illnesses, fluid balance evaluations, or while monitoring diuretic medications.",
  },

  /* ---------------- F. THYROID ---------------- */
  {
    slug: "tsh",
    name: "Thyroid Stimulating Hormone",
    short: "TSH",
    category: "Thyroid",
    aliases: ["tsh", "thyroid stimulating hormone", "ultrasensitive tsh"],
    purpose: "Measures pituitary hormone regulating thyroid gland hormone production.",
    whatItMeasures:
      "Determines blood levels of TSH synthesized by the pituitary gland in response to circulating thyroid hormone concentrations.",
    clinicalRole:
      "Primary first-line screening investigation ordered by doctors to evaluate thyroid activity and guide thyroid medication dosages.",
  },
  {
    slug: "t3",
    name: "T3 (Total Triiodothyronine)",
    short: "T3",
    category: "Thyroid",
    aliases: ["t3", "triiodothyronine", "total t3"],
    purpose: "Measures total circulating triiodothyronine to assess active thyroid hormone levels.",
    whatItMeasures:
      "Quantifies both bound and unbound forms of triiodothyronine present in the bloodstream.",
    clinicalRole:
      "Evaluated by clinicians in conjunction with TSH and T4 to investigate suspected thyroid overactivity or metabolic fluctuations.",
  },
  {
    slug: "t4",
    name: "T4 (Total Thyroxine)",
    short: "T4",
    category: "Thyroid",
    aliases: ["t4", "thyroxine", "total t4"],
    purpose: "Measures total circulating thyroxine produced by the thyroid gland.",
    whatItMeasures:
      "Determines total concentrations of thyroxine circulating in blood, reflecting thyroid gland production capacity.",
    clinicalRole:
      "Used by healthcare professionals to evaluate overall thyroid glandular output and response to hormone therapy.",
  },
  {
    slug: "free-t3",
    name: "Free T3",
    short: "FT3",
    category: "Thyroid",
    aliases: ["free t3", "ft3", "unbound t3"],
    purpose: "Measures unbound, metabolically active triiodothyronine circulating in blood.",
    whatItMeasures:
      "Quantifies the fraction of T3 that is not bound to carrier serum proteins and is directly available to body tissues.",
    clinicalRole:
      "Assists physicians when protein binding variations are suspected or for precise clinical evaluation of thyroid states.",
  },
  {
    slug: "free-t4",
    name: "Free T4",
    short: "FT4",
    category: "Thyroid",
    aliases: ["free t4", "ft4", "unbound t4"],
    purpose: "Measures unbound thyroxine available to body tissues.",
    whatItMeasures:
      "Determines the active, free fraction of thyroxine circulating independently of plasma transport proteins.",
    clinicalRole:
      "Frequently utilized alongside TSH for accurate assessment of thyroid gland status unaffected by protein level alterations.",
  },
  {
    slug: "thyroid-profile",
    name: "Thyroid Profile",
    short: "Thyroid Panel",
    category: "Thyroid",
    aliases: ["thyroid profile", "thyroid panel", "tft", "t3 t4 tsh profile"],
    purpose:
      "Laboratory panel evaluating circulating thyroid hormones and pituitary regulatory activity.",
    whatItMeasures:
      "Assesses coordinated markers of thyroid gland functioning and anterior pituitary hormone feedback regulation.",
    clinicalRole:
      "Ordered by treating doctors to evaluate metabolic changes, fatigue, weight shifts, and monitor thyroid replacement therapy.",
  },

  /* ---------------- G. VITAMINS AND IRON STUDIES ---------------- */
  {
    slug: "vitamin-b12",
    name: "Vitamin B12",
    short: "Vitamin B12",
    category: "Vitamins & Iron Studies",
    aliases: ["vitamin b12", "b12", "cobalamin", "serum b12"],
    purpose:
      "Measures circulating vitamin B12 essential for neurological health and red blood cell formation.",
    whatItMeasures:
      "Quantifies serum concentrations of cobalamin, a water-soluble vitamin required for DNA synthesis and myelin sheath integrity.",
    clinicalRole:
      "Ordered by physicians when investigating macrocytic anemia, peripheral tingling or numbness, persistent fatigue, or dietary insufficiency.",
  },
  {
    slug: "vitamin-d",
    name: "Vitamin D3",
    short: "Vitamin D3",
    category: "Vitamins & Iron Studies",
    aliases: ["vitamin d3", "vitamin d", "vit d3", "25-oh vitamin d", "cholecalciferol"],
    purpose: "Measures circulating Vitamin D3 to evaluate bone health and mineral metabolism.",
    whatItMeasures:
      "Determines serum levels of 25-hydroxyvitamin D3, reflecting total body vitamin D reserves from synthesis and nutrition.",
    clinicalRole:
      "Advised by doctors when evaluating musculoskeletal aches, bone mineral density, or monitoring vitamin D supplementation therapy.",
  },
  {
    slug: "ferritin",
    name: "Ferritin",
    short: "Ferritin",
    category: "Vitamins & Iron Studies",
    aliases: ["ferritin", "serum ferritin", "iron stores test"],
    purpose: "Measures ferritin protein, the primary storage depot of iron in body tissues.",
    whatItMeasures:
      "Quantifies circulating ferritin in blood, which directly correlates with total cellular iron stores in the body.",
    clinicalRole:
      "A valuable marker used by clinicians to distinguish iron-deficiency anemia from other causes of low hemoglobin.",
  },
  {
    slug: "iron-studies",
    name: "Iron Studies",
    short: "Iron Profile",
    category: "Vitamins & Iron Studies",
    aliases: ["iron studies", "iron profile", "serum iron tibc", "iron panel"],
    purpose: "Laboratory panel assessing circulating iron levels and iron-transport capacity.",
    whatItMeasures:
      "Evaluates parameters reflecting iron transport and availability across circulating blood and carrier proteins.",
    clinicalRole:
      "Ordered by treating clinicians to evaluate complex anemias, suspected iron overload, or iron absorption irregularities.",
  },
  {
    slug: "folate",
    name: "Folate (Folic Acid)",
    short: "Folate",
    category: "Vitamins & Iron Studies",
    aliases: ["folate", "folic acid", "serum folate", "vitamin b9"],
    purpose:
      "Measures serum folate concentration necessary for normal red cell development and cellular division.",
    whatItMeasures:
      "Quantifies circulating water-soluble vitamin B9 levels in bloodstream available for cellular synthesis pathways.",
    clinicalRole:
      "Used by doctors alongside vitamin B12 to evaluate megaloblastic anemia and nutritional status.",
  },

  /* ---------------- H. URINE AND STOOL ---------------- */
  {
    slug: "urine-analysis",
    name: "Urine Analysis",
    short: "Urinalysis",
    category: "Urine & Stool",
    aliases: ["urine analysis", "urine routine", "urine-routine", "urinalysis", "urine r/m"],
    purpose:
      "Physical, chemical, and microscopic examination of urine to screen for renal and urinary tract conditions.",
    whatItMeasures:
      "Evaluates macroscopic properties (color, clarity), dipstick chemistry (pH, protein, glucose, ketones), and microscopic sediment.",
    clinicalRole:
      "A routine baseline investigation ordered for general health checkups, urinary symptom reviews, and metabolic screening.",
  },
  {
    slug: "urine-culture",
    name: "Urine Culture and Sensitivity",
    short: "Urine C&S",
    category: "Urine & Stool",
    aliases: [
      "urine culture",
      "urine culture and sensitivity",
      "urine c&s",
      "urine bacterial culture",
    ],
    purpose:
      "Microbiological examination to identify bacterial growth in urine and evaluate antimicrobial sensitivity.",
    whatItMeasures:
      "Inoculates urine onto culture media to detect pathogenic bacterial colonies and test antibiotic susceptibility patterns.",
    clinicalRole:
      "Utilized by clinicians to confirm urinary tract infections and guide targeted antimicrobial therapy.",
  },
  {
    slug: "stool-routine",
    name: "Stool Routine Examination",
    short: "Stool Routine",
    category: "Urine & Stool",
    aliases: ["stool routine", "stool routine examination", "stool r/m", "stool test"],
    purpose:
      "Macroscopic and microscopic analysis of stool to evaluate gastrointestinal and digestive signs.",
    whatItMeasures:
      "Examines stool specimens for color, consistency, presence of occult blood, mucus, and microscopic cellular or parasitic elements.",
    clinicalRole:
      "Ordered by treating physicians when investigating gastrointestinal discomfort, altered bowel habits, or suspected parasitic exposure.",
  },

  /* ---------------- I. FEVER AND INFECTION ---------------- */
  {
    slug: "dengue-ns1",
    name: "Dengue NS1 Antigen",
    short: "Dengue NS1",
    category: "Fever & Infection",
    aliases: ["dengue ns1", "dengue ns1 antigen", "dengue antigen test"],
    purpose:
      "Detects non-structural protein 1 antigen during the early acute phase of suspected dengue virus infection.",
    whatItMeasures:
      "Identifies circulating NS1 protein secreted by dengue-infected cells during early febrile days.",
    clinicalRole:
      "Aids clinicians in early clinical evaluation of acute febrile illness when dengue viral exposure is suspected.",
  },
  {
    slug: "dengue-antibodies",
    name: "Dengue Antibody Tests",
    short: "Dengue IgG/IgM",
    category: "Fever & Infection",
    aliases: ["dengue antibody tests", "dengue antibody", "dengue igg igm", "dengue serology"],
    purpose:
      "Detects specific IgM and IgG antibodies generated in response to dengue viral exposure.",
    whatItMeasures:
      "Quantifies circulating immunoglobulins that mark the immune system's active or convalescent response to dengue virus.",
    clinicalRole:
      "Used by treating doctors during mid-to-late febrile illness to assess humoral response and disease stage.",
  },
  {
    slug: "malaria",
    name: "Malaria Testing",
    short: "Malaria Test",
    category: "Fever & Infection",
    aliases: ["malaria", "malaria testing", "malaria parasite", "mp test", "malaria blood test"],
    purpose:
      "Identifies presence of Plasmodium parasites in circulating blood during febrile illnesses.",
    whatItMeasures:
      "Evaluates whole blood specimens for malarial parasites via laboratory microscopic examination or diagnostic antigen methods.",
    clinicalRole:
      "Essential investigation ordered by clinicians when investigating acute chills, periodic fevers, or febrile illness paroxysms.",
  },

  /* ---------------- J. COAGULATION ---------------- */
  {
    slug: "pt-inr",
    name: "PT / INR (Prothrombin Time)",
    short: "PT / INR",
    category: "Coagulation",
    aliases: ["pt inr", "pt/inr", "prothrombin time", "inr test", "protime"],
    purpose: "Measures blood clotting velocity via the extrinsic coagulation pathway.",
    whatItMeasures:
      "Determines the time required for plasma clot formation and converts it into the standardized International Normalized Ratio (INR).",
    clinicalRole:
      "Routinely requested by doctors to monitor oral anticoagulant therapy, evaluate pre-surgical bleeding risk, and assess liver synthetic activity.",
  },

  /* ---------------- K. SELECTED MARKERS ---------------- */
  {
    slug: "psa",
    name: "PSA (Prostate-Specific Antigen)",
    short: "PSA",
    category: "Selected Markers",
    aliases: ["psa", "prostate-specific antigen", "prostate specific antigen", "psa total"],
    purpose: "Measures prostate-specific antigen concentration in circulating blood.",
    whatItMeasures: "Quantifies circulating glycoprotein produced by prostate epithelial cells.",
    clinicalRole:
      "Utilized by clinicians alongside physical examination and history as an auxiliary marker in prostate wellness evaluations.",
    clinicalNotice:
      "Clinical notice: PSA is a biological marker evaluated in conjunction with medical examination; it is not a standalone diagnostic or cancer-screening test.",
  },
  {
    slug: "ca-125",
    name: "CA-125",
    short: "CA-125",
    category: "Selected Markers",
    aliases: ["ca-125", "ca 125", "cancer antigen 125", "carbohydrate antigen 125"],
    purpose: "Measures circulating carbohydrate antigen 125 biomarker in blood.",
    whatItMeasures:
      "Quantifies circulating levels of the high-molecular-weight glycoprotein CA-125 in serum.",
    clinicalRole:
      "Utilized by clinicians as an auxiliary biomarker monitored in specific clinical scenarios under specialist direction.",
    clinicalNotice:
      "Clinical notice: CA-125 is an auxiliary biomarker evaluated under clinician guidance; it is not a standalone diagnostic or comprehensive cancer-screening test.",
  },
];

/**
 * Curated 6 tests for homepage popular selection.
 */
export const HOMEPAGE_POPULAR_TEST_SLUGS = [
  "cbc",
  "fasting-blood-sugar",
  "hba1c",
  "lipid-profile",
  "thyroid-profile",
  "vitamin-d",
];

export const HOMEPAGE_TESTS = TESTS_CATALOGUE.filter((t) =>
  HOMEPAGE_POPULAR_TEST_SLUGS.includes(t.slug),
);
