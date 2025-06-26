import React from "react";
import { calculateDurationInDays, calculateMaxOverlapCardinality, type PlacementResult } from "../../data/utils";
import { type TimelineItemType as TimelineItemType, type TimelineItemDisplayConfig } from "../../data/types";
import { TimelineItem } from "./Item";
import styles from "./Group.module.scss";
import { TimelineConstCalc } from "../_constants";

interface TimelineGroupProps {
  groupData: {
    groupTitle: string;
    groupItems: TimelineItemType[];
    placements: PlacementResult[];
    isEndSpacer?: boolean;
  };
  year: number;
  monthIndex: number;
  dayIndex: number;
  dayWidth: number;
  cellHeight: number;
  groupGap: number;
  displayConfig?: TimelineItemDisplayConfig;
  onIssueClick?: (issue: TimelineItemType) => void;
}

export const TimelineGroup: React.FC<TimelineGroupProps> = ({
  groupData,
  year,
  monthIndex,
  dayIndex,
  dayWidth,
  cellHeight,
  groupGap,
  displayConfig,
  onIssueClick,
}) => {
  // 如果是最后的占位分组，使用 groupsEndHeight
  const finalHeight = groupData.isEndSpacer 
    ? TimelineConstCalc.groupsEndHeight 
    : `${calculateMaxOverlapCardinality(groupData.groupItems) * cellHeight + groupGap}px`;
  const finalMinHeight = groupData.isEndSpacer 
    ? TimelineConstCalc.groupsEndHeight 
    : TimelineConstCalc.groupMinHeight;

  return (
    <div
      className={styles["timeline-group"]}
      style={{
        height: finalHeight,
        minHeight: finalMinHeight,
      }}
    >
      {groupData.placements.map((placement) => {
        const itemStartDate = placement.startDate;
        const itemStartYear = itemStartDate.getFullYear();
        const itemStartMonth = itemStartDate.getMonth();
        const itemStartDay = itemStartDate.getDate();

        // Only render item if it starts on this exact day
        if (
          itemStartYear === year &&
          itemStartMonth === monthIndex &&
          itemStartDay === dayIndex + 1
        ) {
          const durationInDays = calculateDurationInDays(
            itemStartDate,
            placement.endDate
          );

          return (
            <TimelineItem
              key={placement.item.id}
              item={placement.item}
              durationInDays={durationInDays}
              dayWidth={dayWidth}
              cellHeight={cellHeight}
              column={placement.column}
              displayConfig={displayConfig}
              onIssueClick={onIssueClick}
            />
          );
        }
        return null;
      })}
    </div>
  );
}; 