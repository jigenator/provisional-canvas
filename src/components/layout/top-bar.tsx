import { Layers, Settings } from "lucide-react";
import { IconButton } from "@/components/common/icon-button";
import { ThemeToggle } from "@/components/common/theme-toggle";

interface TopBarProps {
  canvasName?: string;
}

function TopBar({ canvasName = "Provisional Canvas" }: TopBarProps) {
  return (
    <div className="bg-surface-1 border-border flex h-10 shrink-0 items-center justify-between border-b px-3">
      <div className="flex items-center gap-2">
        <Layers className="text-primary h-4 w-4" />
        <span className="font-ui text-foreground text-sm font-medium">{canvasName}</span>
      </div>
      <div className="flex items-center gap-0.5">
        <IconButton icon={Settings} label="Settings" tooltipSide="bottom" />
        <ThemeToggle />
      </div>
    </div>
  );
}

export { TopBar };
export type { TopBarProps };
