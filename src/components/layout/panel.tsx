import type { ReactNode } from "react";
import { useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoneHeader } from "./zone-header";
import { CollapsedStrip } from "./collapsed-strip";
import { ResizeHandle } from "./resize-handle";
import { useLayout } from "./layout-provider";
import type { PanelId } from "./layout-provider";
import { cn } from "@/lib/utils";

interface PanelProps {
  id: PanelId;
  title: string;
  headerActions?: ReactNode;
  children: ReactNode;
  defaultSize: number;
  minSize: number;
  maxSize: number;
  resizeDirection: "right" | "left" | "top";
}

const PANEL_STATE_KEYS: Record<PanelId, "leftPanel" | "inbox" | "bottomPanel"> = {
  left: "leftPanel",
  inbox: "inbox",
  bottom: "bottomPanel",
};

function Panel({
  id,
  title,
  headerActions,
  children,
  minSize,
  maxSize,
  resizeDirection,
}: PanelProps) {
  const layout = useLayout();
  const stateKey = PANEL_STATE_KEYS[id];
  const panelState = layout[stateKey];
  const isBottom = id === "bottom";
  const isVertical = !isBottom;

  const handleCollapse = useCallback(() => {
    layout.togglePanel(id);
  }, [layout, id]);

  const handleResize = useCallback(
    (delta: number) => {
      const multiplier = resizeDirection === "top" ? -1 : 1;
      layout.resizePanel(id, panelState.size + delta * multiplier);
    },
    [layout, id, panelState.size, resizeDirection],
  );

  if (panelState.collapsed) {
    return (
      <CollapsedStrip
        label={title}
        orientation={isVertical ? "vertical" : "horizontal"}
        onExpand={handleCollapse}
      />
    );
  }

  const resizeHandleOrientation = isVertical ? "vertical" : "horizontal";
  const showResizeBefore = resizeDirection === "left" || resizeDirection === "top";
  const showResizeAfter = resizeDirection === "right";

  const sizeStyle = isVertical
    ? { width: panelState.size, minWidth: minSize, maxWidth: maxSize }
    : { height: panelState.size, minHeight: minSize, maxHeight: maxSize };

  return (
    <>
      {showResizeBefore && (
        <ResizeHandle orientation={resizeHandleOrientation} onResize={handleResize} />
      )}
      <div className={cn("bg-surface-1 flex shrink-0 flex-col overflow-hidden")} style={sizeStyle}>
        <ZoneHeader title={title} onCollapse={handleCollapse} actions={headerActions} />
        <ScrollArea className="flex-1">
          <div className="p-3">{children}</div>
        </ScrollArea>
      </div>
      {showResizeAfter && (
        <ResizeHandle orientation={resizeHandleOrientation} onResize={handleResize} />
      )}
    </>
  );
}

export { Panel };
export type { PanelProps };
