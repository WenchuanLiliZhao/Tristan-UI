import React from "react";
import styles from "./Item.module.scss";
import { type TimelineItem as TimelineItemType } from "../../data/types";
import { TimelineConst } from "../_constants";

interface TimelineItemProps {
  item: TimelineItemType;
  durationInDays: number;
  dayWidth: number;
  cellHeight: number;
  column: number;
  onIssueClick?: (issue: TimelineItemType) => void;
}


export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  durationInDays,
  dayWidth,
  cellHeight,
  column,
  onIssueClick,
}) => {

  return (
    <div className={styles["timeline-item"]}>
      <div
        className={styles["timeline-item-container"]}
        style={{
          height: cellHeight - TimelineConst.itemVPadding * 2,
          width: durationInDays * dayWidth - TimelineConst.itemHPadding * 2 - 1,
          position: "absolute",
          top: `${
            column * cellHeight +
            TimelineConst.groupGap / 2 +
            TimelineConst.itemVPadding
          }px`,
          left: `${TimelineConst.itemHPadding}px`,
          cursor: onIssueClick ? 'pointer' : 'default',
        }}
        onClick={() => onIssueClick?.(item)}
      >
        {item.name}
      </div>
    </div>
  );
};
