import { LayoutProvider } from "./layout-provider";
import { TopBar } from "./top-bar";
import { Panel } from "./panel";
import { Workspace } from "./workspace";

function AppShell() {
  return (
    <LayoutProvider>
      <div className="flex h-screen flex-col">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Panel
            id="left"
            title="Tools"
            resizeDirection="right"
            defaultSize={240}
            minSize={180}
            maxSize={400}
          >
            <p className="text-fg-secondary text-sm">Customizable blocks go here</p>
          </Panel>
          <Panel
            id="inbox"
            title="Inbox"
            resizeDirection="right"
            defaultSize={280}
            minSize={220}
            maxSize={448}
          >
            <p className="text-fg-secondary text-sm">Inbox items go here</p>
          </Panel>
          <Workspace
            bottomPanel={
              <Panel
                id="bottom"
                title="Terminal"
                resizeDirection="top"
                defaultSize={200}
                minSize={120}
                maxSize={400}
              >
                <p className="text-fg-secondary text-sm">Terminal / logs go here</p>
              </Panel>
            }
          >
            <p className="text-fg-secondary text-sm">Agent workspace content goes here</p>
          </Workspace>
        </div>
      </div>
    </LayoutProvider>
  );
}

export { AppShell };
