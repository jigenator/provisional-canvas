import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "running" | "attention" | "completed" | "error" | "idle";

interface StatusBadgeProps {
  status: Status;
  showDot?: boolean;
  children?: ReactNode;
}

const statusConfig: Record<Status, { label: string; classes: string }> = {
  running: {
    label: "Running",
    classes: "bg-status-running/15 text-status-running border-transparent",
  },
  attention: {
    label: "Needs Attention",
    classes: "bg-status-attention/15 text-status-attention border-transparent",
  },
  completed: {
    label: "Completed",
    classes: "bg-status-completed/15 text-status-completed border-transparent",
  },
  error: { label: "Error", classes: "bg-status-error/15 text-status-error border-transparent" },
  idle: { label: "Idle", classes: "bg-status-idle/15 text-status-idle border-transparent" },
};

function StatusBadge({ status, showDot = true, children }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn("gap-1.5", config.classes)}>
      {showDot && (
        <span
          data-testid="status-dot"
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full bg-current",
            status === "running" && "animate-pulse",
          )}
        />
      )}
      {children ?? config.label}
    </Badge>
  );
}

export { StatusBadge };
export type { StatusBadgeProps, Status };
