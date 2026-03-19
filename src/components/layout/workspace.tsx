import type { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoneHeader } from "./zone-header";

interface WorkspaceProps {
  children: ReactNode;
  bottomPanel?: ReactNode;
}

function Workspace({ children, bottomPanel }: WorkspaceProps) {
  return (
    <div className="bg-background flex min-w-0 flex-1 flex-col overflow-hidden">
      <ZoneHeader title="Agent Workspace" />
      <ScrollArea className="flex-1">
        <div className="p-3">{children}</div>
      </ScrollArea>
      {bottomPanel}
    </div>
  );
}

export { Workspace };
export type { WorkspaceProps };
