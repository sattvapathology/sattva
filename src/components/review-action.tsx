import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { getGoogleListingUrl, getGoogleReviewUrl } from "@/lib/site";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function RateUsButton({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const directReviewUrl = getGoogleReviewUrl();

  const handleClick = (e: React.MouseEvent) => {
    if (directReviewUrl) {
      // Direct review URL is configured; allow normal anchor link navigation
      return;
    }
    // Direct review URL unconfigured; open accessible explanatory dialog
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a
        href={directReviewUrl || getGoogleListingUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
      >
        {children || "Rate Us on Google"}
      </a>

      {!directReviewUrl && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-navy">
                Rate Sattva Pathology on Google
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                To leave a review, open our Google business listing and select &ldquo;Write a
                review&rdquo;.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-sm text-foreground/85">
              <p>
                Your honest feedback helps us understand what went well and where we can improve.
              </p>
              <div className="rounded-[8px] border border-navy/12 bg-soft p-3.5 text-xs text-muted-foreground">
                <p className="font-semibold text-navy">How to leave a review:</p>
                <ol className="mt-1.5 list-decimal pl-4 space-y-1">
                  <li>Click &ldquo;Open Google Listing&rdquo; below.</li>
                  <li>In Google Search or Maps, find the &ldquo;Reviews&rdquo; tab.</li>
                  <li>
                    Click the &ldquo;Write a review&rdquo; button to post your rating and comments.
                  </li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn btn-outline text-xs"
              >
                Close
              </button>
              <a
                href={getGoogleListingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn btn-primary text-xs"
              >
                Open Google Listing <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
