import React from "react";
import { Button } from "../../../ui-components/general/Button";
import type { ZoomLevelType } from "../types";
import styles from "./Timeline.module.scss";

interface ZoomControlsProps {
  zoomLevels: (ZoomLevelType & { type: string })[];
  currentZoom: string;
  onZoomChange: (zoomType: string) => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevels,
  currentZoom,
  onZoomChange,
}) => {
  return (
    <div className={styles["zoom-controls"]}>
      {zoomLevels.map((level) => (
        <Button
          key={level.type}
          variant={currentZoom === level.type ? "filled" : "ghost"}
          onClick={() => onZoomChange(level.type)}
        >
          {level.label}
        </Button>
      ))}
    </div>
  );
}; 