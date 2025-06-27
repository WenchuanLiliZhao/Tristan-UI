import React from "react";
import { Button } from "../../../ui-components/general/Button";
import type { ZoomLevelType } from "../types";

interface ZoomControlsProps {
  zoomLevels: (ZoomLevelType & { type: string })[];
  currentZoom: string;
  onZoomChange: (zoomType: string) => void;
}

/**
 * ZoomControls Component (for backward compatibility)
 * Renders zoom control buttons directly
 */
export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevels,
  currentZoom,
  onZoomChange,
}) => {
  return (
    <React.Fragment>
      {zoomLevels.map((level) => (
        <Button
          key={level.type}
          variant={currentZoom === level.type ? "filled" : "ghost"}
          onClick={() => onZoomChange(level.type)}
        >
          {level.label}
        </Button>
      ))}
    </React.Fragment>
  );
}; 