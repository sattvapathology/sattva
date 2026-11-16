import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { IMAGES, resolveImagePath, type ImageKey } from "@/lib/images";

export function SattvaImage({
  image,
  className = "",
  eager = false,
  tone = "soft",
}: {
  image: ImageKey;
  className?: string;
  eager?: boolean;
  tone?: "soft" | "navy";
}) {
  const config = IMAGES[image];
  const src =
    resolveImagePath(config.src) ||
    (typeof config.src === "string" && config.src.trim().length > 0
      ? config.src.trim()
      : undefined);
  const [failedSrc, setFailedSrc] = useState<string>();
  const available = Boolean(src && src !== failedSrc);
  return (
    <figure
      data-image={image}
      data-image-state={available ? "photo" : "placeholder"}
      aria-label={available ? config.alt : `Photo placeholder: ${config.label}`}
      className={`relative isolate overflow-hidden rounded-[10px] border ${tone === "navy" ? "border-navy-foreground/20 bg-navy text-navy-foreground" : "bg-soft text-navy"} ${className}`}
    >
      {available ? (
        <img
          src={src}
          alt={config.alt}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailedSrc(src)}
          className={`absolute inset-0 h-full w-full ${config.padding ?? ""}`}
          style={{ objectFit: config.fit, objectPosition: config.position }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col gap-8 p-6 md:p-8">
          <div className="flex items-center justify-between gap-3 border-b border-current/15 pb-4">
            <span className="text-xs font-semibold opacity-60">Sattva · Ahmedabad</span>
            <ImageIcon className="h-5 w-5 shrink-0 opacity-40" aria-hidden="true" />
          </div>
          <figcaption className="border-l-2 border-primary pl-4">
            <span className="block break-words font-display text-xl font-bold">{config.label}</span>
            <span className="mt-2 block text-xs opacity-60">Photo placeholder · {image}</span>
          </figcaption>
        </div>
      )}
    </figure>
  );
}
