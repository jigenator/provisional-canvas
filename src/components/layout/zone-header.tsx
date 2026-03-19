import type { ReactNode } from "react";
import { ChevronsLeft } from "lucide-react";
import { IconButton } from "@/components/common/icon-button";

interface ZoneHeaderProps {
  title: string;
  onCollapse?: () => void;
  actions?: ReactNode;
}

function ZoneHeader({ title, onCollapse, actions }: ZoneHeaderProps) {
  return (
    <div className="border-border flex h-9 shrink-0 items-center justify-between border-b px-3">
      <span className="font-ui text-foreground truncate text-[length:var(--text-heading-3)] font-medium">
        {title}
      </span>
      <div className="flex items-center gap-0.5">
        {actions}
        {onCollapse && (
          <IconButton
            icon={ChevronsLeft}
            label="Collapse panel"
            onClick={onCollapse}
            tooltipSide="bottom"
          />
        )}
      </div>
    </div>
  );
}

export { ZoneHeader };
export type { ZoneHeaderProps };
