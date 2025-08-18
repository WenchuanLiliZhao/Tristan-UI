import React from "react";
import { Button, Icon } from "../../../general";
import styles from "./styles.module.scss";

export interface LinkFieldProps {
  /** Label for the link field */
  label: string;
  /** URL to navigate to */
  url: string;
  /** Display text for the link (optional, defaults to URL) */
  text?: string;
  /** Icon for the link button (optional) */
  icon?: string;
  /** Whether to open link in new tab */
  openInNewTab?: boolean;
  /** Variant of the link button */
  variant?: "filled" | "outlined" | "ghost";
  /** Semantic color of the button */
  semantic?: "default" | "success" | "active" | "warning" | "error";
}

export function LinkField({
  label,
  url,
  text,
  icon,
  openInNewTab = true,
  variant = "filled",
  semantic = "active",
}: LinkFieldProps): React.ReactElement {
  const handleClick = () => {
    if (openInNewTab) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  const displayText = text || url;

  return (
    <div className={styles["tristan-link-field"]}>
      {label && (
        <div className={styles["tristan-link-field__label"]}>{label}</div>
      )}
      <div className={styles["tristan-link-field__content"]}>
        <Button
          onClick={handleClick}
          size="medium"
          variant={variant}
          semantic={semantic}
          className={styles["tristan-link-field__button"]}
        >
          {icon && <Icon name={icon} size={16} />}
          <span className={styles["tristan-link-field__text"]}>
            {displayText}
          </span>
        </Button>
      </div>
    </div>
  );
} 