# Sattva Pathology Laboratory — Clinical Data & Inclusions Documentation

This internal document records raw client source text, clinical decisions, and verification records for developer and clinical reference.

---

## 1. Packages: Raw Source & Clarifications

### Advanced Body Profile

- **Raw Client Source Text**:
  > `"CBC, FBS, FUS, LIPID PROFILE, LFT (SGPT, SGOT, T.Bilirubin, D. Bil.Inirect B ALP), RFT (Creat, BI.Urea, U.A., Ca+2) TSH, Vit. B12, Urine Analysis"`
- **Client Confirmation**:
  - The client confirmed that Advanced Body Profile includes **LFT** (Liver Function Profile) and **RFT** (Renal Function Profile).
- **Implementation Decision**:
  - Display LFT and RFT as confirmed profiles.
  - Do NOT publish guessed expansions of garbled subcomponent text (`D. Bil.Inirect B ALP`, `Creat, BI.Urea, U.A., Ca+2`).
  - The raw source is preserved here for future clinical sign-off when the laboratory supplies verified component breakdowns.

### Diabetic Profile

- **Raw Client Source Text**:
  > `"FBS, FUS, PPBS, HbA1c, Ur, Urine Microalbumin, Creatinine"`
- **Client Confirmation**:
  - Keep **“Ur”** exactly as written.
  - Do not expand, correct, or guess its meaning.
  - Do not create a standalone “Ur” test page or assign it an unsupported medical explanation.

### Package Inheritance Hierarchy

1. `Basic Body Profile`: Standalone routine baseline (CBC, FBS, FUS, Lipid Profile, RFT [Creatinine, Blood Urea], LFT [Serum Bilirubin, SGPT], TSH, Urine Analysis).
2. `Advanced Body Profile`: Base profile for derived packages (CBC, FBS, FUS, Lipid Profile, LFT, RFT, TSH, Vitamin B12, Urine Analysis).
3. `Advanced + Diabetic Profile`: Inherits Advanced Body Profile + `HbA1c`.
4. `Silver Body Profile`: Inherits Advanced Body Profile + `Vitamin D3`.
5. `Gold Body Profile`: Inherits Advanced Body Profile + `Vitamin D3` + `HbA1c`.
6. `Male Executive Profile`: Inherits Advanced Body Profile + `Vitamin D3` + `PSA`.
   - _Clinical Notice_: PSA is a biological marker evaluated alongside clinical examination; not a standalone diagnostic or cancer-screening test.
7. `Female Executive Profile`: Inherits Advanced Body Profile + `Vitamin D3` + `CA-125`.
   - _Clinical Notice_: CA-125 is an auxiliary biological marker; not a standalone diagnostic or cancer-screening test.
8. `Diabetic Profile`: Standalone targeted profile (FBS, FUS, PPBS, HbA1c, Ur, Urine Microalbumin, Creatinine).

---

## 2. General Test Catalogue (43 Approved Routine Tests)

Curated strictly from client-authorized routine and general pathology categories:

- **Blood Counts & Inflammation**: Complete Blood Count (CBC), Erythrocyte Sedimentation Rate (ESR), Peripheral Blood Smear (PBS), Reticulocyte Count, C-Reactive Protein (CRP).
- **Diabetes & Glucose**: Fasting Blood Sugar (FBS), Postprandial Blood Sugar (PPBS), Random Blood Sugar (RBS), HbA1c, Fasting Urine Sugar (FUS), Urine Microalbumin.
- **Lipid Profile**: Lipid Profile.
- **Liver Function**: Liver Function Profile (LFT), SGPT / ALT, SGOT / AST, Bilirubin Testing, Alkaline Phosphatase (ALP).
- **Kidney Function & Electrolytes**: Renal Function Profile (RFT), Creatinine, Blood Urea, Uric Acid, Calcium, Electrolytes.
- **Thyroid**: TSH, T3, T4, Free T3, Free T4, Thyroid Profile.
- **Vitamins & Iron Studies**: Vitamin B12, Vitamin D3, Ferritin, Iron Studies, Folate.
- **Urine & Stool**: Urine Analysis, Urine Culture and Sensitivity, Stool Routine Examination.
- **Fever & Infection**: Dengue NS1 Antigen, Dengue Antibody Tests (IgG/IgM), Malaria Testing.
- **Coagulation**: PT/INR.
- **Selected Markers**: PSA, CA-125.

---

## 3. Operational & Clinical Safety Constraints

1. **No Public Pricing**:
   - Zero currency values, struck-through prices, or discount badges.
   - Price row completely removed across homepage, catalogue, package cards, details modals, and test pages.
   - WhatsApp message text excludes price references.
2. **Conservative Operational Defaults**:
   - Parameter counts are omitted until verified values are provided by the lab.
   - Fasting durations, exact sample types, report turnaround times, home collection eligibility for every test, and test methodologies are not guessed.
   - Section-level discreet guidance is displayed:
     > _“Contact our team for test preparation, availability, and booking guidance.”_
3. **Medical Disclaimer**:
   - Educational content does not prescribe tests, interpret results, or promise clinical outcomes.
   - Visitors are consistently directed to review findings with their treating healthcare provider.
