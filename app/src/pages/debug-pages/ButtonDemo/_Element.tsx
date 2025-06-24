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
      <div>
        <h2>Outlined</h2>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="default"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="success"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="active"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="warning"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="error"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Filled</h2>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="default"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="success"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="active"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="warning"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="error"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Ghost</h2>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="default"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="success"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="active"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="warning"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="error"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
