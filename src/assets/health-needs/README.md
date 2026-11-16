# Health Needs Background Images

Place background photography PNG files for the “What brings you here today?” cards in this directory using these exact filenames:

- `routine-health-check.png` (Routine Blood Tests)
- `diabetes-care.png` (Diabetes Monitoring)
- `thyroid-tests.png` (Thyroid Tests, also accepts `thyroid-test.png`)
- `fever-infection.png` (Fever & Infection Tests)
- `vitamin-tests.png` (Vitamin Tests)
- `full-body-checkups.png` (Full Body Checkups)

## Technical Specifications

- **Format**: PNG (landscape or balanced aspect ratio).
- **Rendering**: Full-card background cover (`object-fit: cover`) behind a uniform solid translucent navy overlay (`bg-navy/70`–`bg-navy/75`).
- **Adjusting Crops**: Object positions can be configured per card in `src/lib/images.ts` under `HEALTH_NEEDS_IMAGES`.
- **Fallback**: When an image file is absent, an intentional solid navy background fallback is displayed without any broken image icons or empty loading states.
