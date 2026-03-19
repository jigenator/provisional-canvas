import type { Meta, StoryObj } from "@storybook/react-vite";

function ColorSwatch({
  name,
  cssVar,
  textColor,
}: {
  name: string;
  cssVar: string;
  textColor?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        marginBottom: "var(--space-2)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius)",
          backgroundColor: `var(${cssVar})`,
          border: "1px solid var(--border)",
          flexShrink: 0,
        }}
      />
      <div>
        <div
          style={{
            fontSize: "var(--text-body)",
            color: textColor ?? "var(--foreground)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "var(--text-caption)",
            color: "var(--fg-secondary)",
          }}
        >
          {cssVar}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "var(--space-8)" }}>
      <h2
        style={{
          fontSize: "var(--text-heading-2)",
          marginBottom: "var(--space-4)",
          color: "var(--foreground)",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function DesignTokens() {
  return (
    <div
      style={{
        padding: "var(--space-8)",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "var(--font-ui)",
      }}
    >
      <h1
        style={{
          fontSize: "var(--text-heading-1)",
          marginBottom: "var(--space-8)",
        }}
      >
        Design Tokens
      </h1>

      <Section title="Surfaces">
        <ColorSwatch name="Terminal" cssVar="--terminal" />
        <ColorSwatch name="Background" cssVar="--background" />
        <ColorSwatch name="Surface 1" cssVar="--surface-1" />
        <ColorSwatch name="Surface 2" cssVar="--surface-2" />
        <ColorSwatch name="Surface 3" cssVar="--surface-3" />
      </Section>

      <Section title="Foreground">
        <div
          style={{
            padding: "var(--space-4)",
            backgroundColor: "var(--surface-1)",
            borderRadius: "var(--radius)",
            marginBottom: "var(--space-4)",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--foreground)",
              margin: "0 0 var(--space-2) 0",
            }}
          >
            Primary text (--foreground)
          </p>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--fg-secondary)",
              margin: "0 0 var(--space-2) 0",
            }}
          >
            Secondary text (--fg-secondary)
          </p>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--fg-muted)",
              margin: 0,
            }}
          >
            Muted text (--fg-muted)
          </p>
        </div>
      </Section>

      <Section title="Status Colors">
        <ColorSwatch name="Running" cssVar="--status-running" />
        <ColorSwatch name="Attention" cssVar="--status-attention" />
        <ColorSwatch name="Completed" cssVar="--status-completed" />
        <ColorSwatch name="Error" cssVar="--status-error" />
        <ColorSwatch name="Idle" cssVar="--status-idle" />
      </Section>

      <Section title="Primary / Destructive">
        <div style={{ display: "flex", gap: "var(--space-4)" }}>
          <div
            style={{
              padding: "var(--space-3) var(--space-6)",
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius)",
              fontSize: "var(--text-body)",
            }}
          >
            Primary
          </div>
          <div
            style={{
              padding: "var(--space-3) var(--space-6)",
              backgroundColor: "var(--destructive)",
              color: "var(--destructive-foreground)",
              borderRadius: "var(--radius)",
              fontSize: "var(--text-body)",
            }}
          >
            Destructive
          </div>
        </div>
      </Section>

      <Section title="Typography">
        <div
          style={{
            fontFamily: "var(--font-ui)",
            marginBottom: "var(--space-4)",
          }}
        >
          <p style={{ fontSize: "var(--text-heading-1)", margin: "0 0 var(--space-2) 0" }}>
            Heading 1 — DM Sans (1.5rem)
          </p>
          <p style={{ fontSize: "var(--text-heading-2)", margin: "0 0 var(--space-2) 0" }}>
            Heading 2 — DM Sans (1.25rem)
          </p>
          <p style={{ fontSize: "var(--text-heading-3)", margin: "0 0 var(--space-2) 0" }}>
            Heading 3 — DM Sans (1rem)
          </p>
          <p style={{ fontSize: "var(--text-body)", margin: "0 0 var(--space-2) 0" }}>
            Body — DM Sans (0.875rem)
          </p>
          <p style={{ fontSize: "var(--text-caption)", margin: 0 }}>Caption — DM Sans (0.75rem)</p>
        </div>
        <div style={{ fontFamily: "var(--font-mono)" }}>
          <p style={{ fontSize: "var(--text-code)", margin: 0 }}>
            Code — JetBrains Mono (0.8125rem)
          </p>
        </div>
      </Section>

      <Section title="Spacing">
        {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((n) => (
          <div
            key={n}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              marginBottom: "var(--space-2)",
            }}
          >
            <div
              style={{
                width: `var(--space-${n})`,
                height: 16,
                backgroundColor: "var(--primary)",
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "var(--text-caption)",
                color: "var(--fg-secondary)",
              }}
            >
              --space-{n}
            </span>
          </div>
        ))}
      </Section>

      <Section title="Radius">
        {(
          [
            ["sm", "calc(var(--radius) * 0.6)"],
            ["md", "calc(var(--radius) * 0.8)"],
            ["lg", "var(--radius)"],
            ["xl", "calc(var(--radius) * 1.4)"],
          ] as const
        ).map(([name, value]) => (
          <div
            key={name}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              backgroundColor: "var(--surface-2)",
              borderRadius: value,
              marginRight: "var(--space-4)",
              fontSize: "var(--text-caption)",
              color: "var(--fg-secondary)",
            }}
          >
            {name}
          </div>
        ))}
      </Section>

      <Section title="Shadows">
        <div
          style={{
            width: 200,
            height: 100,
            backgroundColor: "var(--surface-2)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-float)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "var(--text-caption)",
            color: "var(--fg-secondary)",
          }}
        >
          --shadow-float
        </div>
      </Section>

      <Section title="Motion">
        <div
          style={{
            display: "flex",
            gap: "var(--space-6)",
            fontSize: "var(--text-caption)",
            color: "var(--fg-secondary)",
          }}
        >
          <div>
            <strong>Snappy:</strong> 125ms
          </div>
          <div>
            <strong>Gentle:</strong> 250ms
          </div>
          <div>
            <strong>Fade:</strong> 200ms
          </div>
        </div>
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: "Design System/Tokens",
  component: DesignTokens,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllTokens: Story = {};
