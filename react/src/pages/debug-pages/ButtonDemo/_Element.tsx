import React from "react";
import { Button } from "../../../design-system/ui-components/general";

export const Element: React.FC = () => {
  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        color: "var(--color--text-prime)",
      }}
    >
      {/* Size Variants */}
      <div>
        <h2>Size Variants</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          All available sizes: tiny, small, medium, large
        </p>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="filled" size="tiny" semantic="default">
            Tiny
          </Button>
          <Button variant="filled" size="small" semantic="default">
            Small
          </Button>
          <Button variant="filled" size="medium" semantic="default">
            Medium
          </Button>
          <Button variant="filled" size="large" semantic="default">
            Large
          </Button>
        </div>
      </div>

      {/* Variant + Semantic Combinations */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Variant + Semantic Combinations</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          All combinations of variant (filled, outlined, ghost) and semantic (default, success, active, warning, error)
        </p>
        <br />
        
        {/* Outlined Variants */}
        <div style={{ marginBottom: "2rem" }}>
          <h3>Outlined Variants</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button variant="outlined" size="medium" semantic="default">
              Default
            </Button>
            <Button variant="outlined" size="medium" semantic="success">
              Success
            </Button>
            <Button variant="outlined" size="medium" semantic="active">
              Active
            </Button>
            <Button variant="outlined" size="medium" semantic="warning">
              Warning
            </Button>
            <Button variant="outlined" size="medium" semantic="error">
              Error
            </Button>
          </div>
        </div>

        {/* Filled Variants */}
        <div style={{ marginBottom: "2rem" }}>
          <h3>Filled Variants</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button variant="filled" size="medium" semantic="default">
              Default
            </Button>
            <Button variant="filled" size="medium" semantic="success">
              Success
            </Button>
            <Button variant="filled" size="medium" semantic="active">
              Active
            </Button>
            <Button variant="filled" size="medium" semantic="warning">
              Warning
            </Button>
            <Button variant="filled" size="medium" semantic="error">
              Error
            </Button>
          </div>
        </div>

        {/* Ghost Variants */}
        <div style={{ marginBottom: "2rem" }}>
          <h3>Ghost Variants</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button variant="ghost" size="medium" semantic="default">
              Default
            </Button>
            <Button variant="ghost" size="medium" semantic="success">
              Success
            </Button>
            <Button variant="ghost" size="medium" semantic="active">
              Active
            </Button>
            <Button variant="ghost" size="medium" semantic="warning">
              Warning
            </Button>
            <Button variant="ghost" size="medium" semantic="error">
              Error
            </Button>
          </div>
        </div>
      </div>

      {/* Icon Combinations */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Icon Combinations</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          Different icon configurations: icon only, prefixIcon only, both icons, no icons
        </p>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button variant="filled" size="medium" semantic="default" icon="add">
            Icon Only
          </Button>
          <Button variant="filled" size="medium" semantic="default" prefixIcon="arrow_drop_down">
            Prefix Icon Only
          </Button>
          <Button variant="filled" size="medium" semantic="default" icon="add" prefixIcon="arrow_drop_down">
            Both Icons
          </Button>
          <Button variant="filled" size="medium" semantic="default">
            No Icons
          </Button>
        </div>
      </div>

      {/* Disabled States */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Disabled States</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          All variants in disabled state
        </p>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button variant="outlined" size="medium" semantic="default" disabled>
            Outlined Disabled
          </Button>
          <Button variant="filled" size="medium" semantic="default" disabled>
            Filled Disabled
          </Button>
          <Button variant="ghost" size="medium" semantic="default" disabled>
            Ghost Disabled
          </Button>
        </div>
      </div>

      {/* Focusable States */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Focusable States</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          Buttons with focusable=true (can be focused via keyboard)
        </p>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button variant="outlined" size="medium" semantic="default" focusable>
            Outlined Focusable
          </Button>
          <Button variant="filled" size="medium" semantic="default" focusable>
            Filled Focusable
          </Button>
          <Button variant="ghost" size="medium" semantic="default" focusable>
            Ghost Focusable
          </Button>
        </div>
      </div>

      {/* Width Modes */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Width Modes</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          auto width (default) vs full width modes
        </p>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "300px",
          }}
        >
          <Button
            variant="outlined"
            size="medium"
            semantic="default"
            widthMode="auto width"
            icon="add"
            prefixIcon="arrow_drop_down"
          >
            Auto Width
          </Button>
          <Button
            variant="filled"
            size="medium"
            semantic="success"
            widthMode="full width"
            icon="add"
            prefixIcon="arrow_drop_down"
          >
            Full Width
          </Button>
          <Button
            variant="ghost"
            size="medium"
            semantic="active"
            widthMode="full width"
            icon="add"
            prefixIcon="arrow_drop_down"
          >
            Full Width Ghost
          </Button>
        </div>
      </div>

      {/* Button Types */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Button Types</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          Different button types: button, submit, reset
        </p>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button variant="filled" size="medium" semantic="default" type="button">
            Type: Button
          </Button>
          <Button variant="filled" size="medium" semantic="success" type="submit">
            Type: Submit
          </Button>
          <Button variant="filled" size="medium" semantic="warning" type="reset">
            Type: Reset
          </Button>
        </div>
      </div>

      {/* Complex Examples */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Complex Examples</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          Real-world usage examples with multiple properties
        </p>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            variant="filled"
            size="large"
            semantic="success"
            icon="check"
            prefixIcon="arrow_forward"
            focusable
          >
            Complete Action
          </Button>
          <Button
            variant="outlined"
            size="small"
            semantic="warning"
            icon="warning"
            disabled
          >
            Disabled Warning
          </Button>
          <Button
            variant="ghost"
            size="medium"
            semantic="active"
            icon="settings"
            widthMode="full width"
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Interactive Examples */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Interactive Examples</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          Buttons with click handlers (check console for logs)
        </p>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            variant="filled"
            size="medium"
            semantic="default"
            icon="add"
            onClick={() => console.log("Add button clicked")}
          >
            Add Item
          </Button>
          <Button
            variant="outlined"
            size="medium"
            semantic="error"
            icon="delete"
            onClick={() => console.log("Delete button clicked")}
          >
            Delete
          </Button>
          <Button
            variant="ghost"
            size="medium"
            semantic="active"
            icon="edit"
            onClick={() => console.log("Edit button clicked")}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
