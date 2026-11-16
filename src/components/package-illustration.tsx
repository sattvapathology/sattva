import { useState } from "react";
import { getPackageIllustrationUrl } from "@/lib/images";

/**
 * Renders a dedicated top-right package illustration slot.
 *
 * Sizing:
 * - Desktop: ~88-112px (lg:w-[104px] lg:h-[104px], md:w-24 md:h-24)
 * - Mobile: ~64-80px (w-16 h-16, sm:w-20 sm:h-20)
 *
 * Behavior:
 * - Transparent background, object-fit: contain.
 * - Empty alt text (decorative).
 * - When image is missing: preserves the reserved space with an unobtrusive empty box,
 *   never displaying a broken-image icon, filename, or generic icon.
 */
export function PackageIllustration({
  packageId,
  className = "",
}: {
  packageId: string;
  className?: string;
}) {
  const url = getPackageIllustrationUrl(packageId);
  const [loadError, setLoadError] = useState(false);

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center bg-transparent w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[104px] lg:h-[104px] ${className}`}
      aria-hidden="true"
    >
      {url && !loadError ? (
        <img
          src={url}
          alt=""
          loading="lazy"
          onError={() => setLoadError(true)}
          className="h-full w-full object-contain pointer-events-none select-none"
        />
      ) : (
        <div className="h-full w-full pointer-events-none" />
      )}
    </div>
  );
}
