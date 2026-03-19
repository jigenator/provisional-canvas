import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface ResizeHandleProps {
  orientation: "vertical" | "horizontal";
  onResize: (delta: number) => void;
  onResizeEnd?: () => void;
}

function ResizeHandle({ orientation, onResize, onResizeEnd }: ResizeHandleProps) {
  const isVertical = orientation === "vertical";
  const startPosRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      isDraggingRef.current = true;
      startPosRef.current = isVertical ? e.clientX : e.clientY;

      const handlePointerMove = (moveEvent: PointerEvent) => {
        if (!isDraggingRef.current) return;
        const currentPos = isVertical ? moveEvent.clientX : moveEvent.clientY;
        const delta = currentPos - startPosRef.current;
        if (delta !== 0) {
          onResize(delta);
          startPosRef.current = currentPos;
        }
      };

      const handlePointerUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
        onResizeEnd?.();
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [isVertical, onResize, onResizeEnd],
  );

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      onPointerDown={handlePointerDown}
      className={cn(
        "group shrink-0 touch-none select-none",
        isVertical ? "cursor-col-resize px-px" : "cursor-row-resize py-px",
      )}
    >
      <div
        className={cn(
          "group-hover:bg-border group-active:bg-primary bg-transparent transition-colors duration-[--duration-snappy]",
          isVertical ? "h-full w-px" : "h-px w-full",
        )}
      />
    </div>
  );
}

export { ResizeHandle };
export type { ResizeHandleProps };
