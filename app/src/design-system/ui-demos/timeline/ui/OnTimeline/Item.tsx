import React from "react";
import styles from "./Item.module.scss";
import { type TimelineItemType as TimelineItemType } from "../../data/types";
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
        <div className={styles["timeline-item-graphic-info"]}>
          {/* 映射所有显示为 icon 或 progress bar 的属性 */}
        </div>
        <div className={styles["timeline-item-text-info"]}>
          <div className={styles["timeline-item-name"]}>{item.name}</div>
          <div className={styles["timeline-item-tags"]}>
            {/* 映射出所有显示为 tag 的属性 */}
          </div>
        </div>
      </div>
    </div>
  );
};
