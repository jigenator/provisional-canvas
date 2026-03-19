import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface PanelState {
  collapsed: boolean;
  size: number;
}

type PanelId = "left" | "inbox" | "bottom";

interface LayoutContextValue {
  leftPanel: PanelState;
  inbox: PanelState;
  bottomPanel: PanelState;
  togglePanel: (panel: PanelId) => void;
  resizePanel: (panel: PanelId, size: number) => void;
  resizePanelBy: (panel: PanelId, delta: number) => void;
}

const STORAGE_KEY = "provisional-canvas-layout";

const PANEL_CONSTRAINTS: Record<PanelId, { default: number; min: number; max: number }> = {
  left: { default: 240, min: 180, max: 400 },
  inbox: { default: 280, min: 220, max: 448 },
  bottom: { default: 200, min: 120, max: 400 },
};

const PANEL_STATE_KEYS: Record<
  PanelId,
  keyof Pick<LayoutState, "leftPanel" | "inbox" | "bottomPanel">
> = {
  left: "leftPanel",
  inbox: "inbox",
  bottom: "bottomPanel",
};

interface LayoutState {
  leftPanel: PanelState;
  inbox: PanelState;
  bottomPanel: PanelState;
}

function getDefaultState(): LayoutState {
  return {
    leftPanel: { collapsed: false, size: PANEL_CONSTRAINTS.left.default },
    inbox: { collapsed: false, size: PANEL_CONSTRAINTS.inbox.default },
    bottomPanel: { collapsed: false, size: PANEL_CONSTRAINTS.bottom.default },
  };
}

function loadState(): LayoutState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as LayoutState;
      return {
        leftPanel: { ...getDefaultState().leftPanel, ...parsed.leftPanel },
        inbox: { ...getDefaultState().inbox, ...parsed.inbox },
        bottomPanel: { ...getDefaultState().bottomPanel, ...parsed.bottomPanel },
      };
    }
  } catch {
    // Ignore invalid stored data
  }
  return getDefaultState();
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LayoutState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const togglePanel = useCallback((panel: PanelId) => {
    const key = PANEL_STATE_KEYS[panel];
    setState((prev) => ({
      ...prev,
      [key]: { ...prev[key], collapsed: !prev[key].collapsed },
    }));
  }, []);

  const resizePanel = useCallback((panel: PanelId, size: number) => {
    const key = PANEL_STATE_KEYS[panel];
    const constraints = PANEL_CONSTRAINTS[panel];
    const clamped = Math.max(constraints.min, Math.min(constraints.max, size));
    setState((prev) => ({
      ...prev,
      [key]: { ...prev[key], size: clamped },
    }));
  }, []);

  const resizePanelBy = useCallback((panel: PanelId, delta: number) => {
    const key = PANEL_STATE_KEYS[panel];
    const constraints = PANEL_CONSTRAINTS[panel];
    setState((prev) => {
      const newSize = Math.max(constraints.min, Math.min(constraints.max, prev[key].size + delta));
      return {
        ...prev,
        [key]: { ...prev[key], size: newSize },
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      leftPanel: state.leftPanel,
      inbox: state.inbox,
      bottomPanel: state.bottomPanel,
      togglePanel,
      resizePanel,
      resizePanelBy,
    }),
    [state.leftPanel, state.inbox, state.bottomPanel, togglePanel, resizePanel, resizePanelBy],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

function useLayout(): LayoutContextValue {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayout, PANEL_CONSTRAINTS, PANEL_STATE_KEYS };
export type { PanelState, PanelId, LayoutContextValue };
