import { ChevronRight, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsedStripProps {
  label: string;
  orientation: "vertical" | "horizontal";
  onExpand: () => void;
}

function CollapsedStrip({ label, orientation, onExpand }: CollapsedStripProps) {
  const isVertical = orientation === "vertical";
  return (
    <button
      onClick={onExpand}
      aria-label={`Expand ${label}`}
      className={cn(
        "bg-surface-1 border-border text-fg-secondary hover:bg-surface-2 flex shrink-0 cursor-pointer items-center transition-colors",
        "duration-[--duration-snappy]",
        isVertical ? "w-8 flex-col gap-2 border-r py-3" : "h-8 flex-row gap-2 border-t px-3",
      )}
    >
      {isVertical ? (
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <ChevronUp className="h-3.5 w-3.5 shrink-0" />
      )}
      <span
        className={cn(
          "font-ui text-[length:var(--text-caption)] whitespace-nowrap",
          isVertical && "rotate-180 [writing-mode:vertical-lr]",
        )}
      >
        {label}
      </span>
    </button>
  );
}

export { CollapsedStrip };
export type { CollapsedStripProps };
