# Genuine Sattva photographs

Only add genuine building exterior/signboard, lab entrance, reception and equipment photographs. Do not add generated, sourced, staff, patient or home-visit imagery.

All image settings live in **`src/lib/images.ts`**. Add your photos to this assets folder, then set each `IMAGES` entry's `src` to its project path, for example `src/assets/reception.jpg`. Leave entries blank when no photo is available. Missing local files and failed image loads retain the styled placeholder.

Keys: `buildingExterior`, `labEntrance`, `reception`, `equipmentOne`, `equipmentTwo`, `equipmentThree`.

Adjust `fit` (`contain` or `cover`) and `position` (for example `center`, `50% 30%`) in the same entry. Signage photos default to `contain` to display the full image. These settings do not change the reserved frame size. `IMAGE_PLACEMENTS` chooses which named photo appears in each section; the hero can use reception or equipment and About can use reception or entrance.

Local JPG, JPEG, PNG, WebP, AVIF and SVG files are supported, as are CDN URLs and asset-pointer paths such as `src/assets/reception.jpg.asset.json`. Uploaded/downloaded media managed by Lovable should use the asset-pointer flow.