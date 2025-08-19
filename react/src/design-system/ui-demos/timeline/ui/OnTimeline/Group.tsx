import React, { useMemo } from "react";
import { calculateDurationInDays } from "../../utils/time";
import { calculateMaxOverlapCardinality, type PlacementResult } from "../../utils/placement";
import { type TimelineItemType as TimelineItemType, type TimelineItemDisplayConfig } from "../../types";
import { TimelineItem } from "./Item";
import styles from "./Group.module.scss";
import { TimelineConstCalc } from "../_constants";
import { getCSSVar } from "../../../../../styles";

interface TimelineGroupProps {
  groupData: {
    groupTitle: string;
    groupItems: TimelineItemType[];
    placements: PlacementResult[];
    isEndSpacer?: boolean;
  };
  groupIndex: number;
  year: number;
  monthIndex: number;
  dayIndex: number;
  dayWidth: number;
  cellHeight: number;
  groupGap: number;
  displayConfig?: TimelineItemDisplayConfig;
  onIssueClick?: (issue: TimelineItemType) => void;
  selectedItemId?: string | null;
  hasItemsOnThisDay?: boolean;
}

export const TimelineGroup: React.FC<TimelineGroupProps> = React.memo(({
  groupData,
  groupIndex,
  year,
  monthIndex,
  dayIndex,
  dayWidth,
  cellHeight,
  groupGap,
  displayConfig,
  onIssueClick,
  selectedItemId,
  hasItemsOnThisDay = true, // 默认为true以保持向后兼容
}) => {
  // 🚀 性能优化：缓存高度计算
  const finalHeight = useMemo(() => {
    return groupData.isEndSpacer 
      ? TimelineConstCalc.groupsEndHeight 
      : `${calculateMaxOverlapCardinality(groupData.groupItems) * cellHeight + groupGap}px`;
  }, [groupData.isEndSpacer, groupData.groupItems, cellHeight, groupGap]);

  const finalMinHeight = useMemo(() => {
    return groupData.isEndSpacer 
      ? TimelineConstCalc.groupsEndHeight 
      : cellHeight; // Use configurable cellHeight instead of static constant
  }, [groupData.isEndSpacer, cellHeight]);

  // 🚀 性能优化：缓存渲染项目列表 - 只在有items的日期才渲染实际内容
  const renderedItems = useMemo(() => {
    // 如果这一天没有items，直接返回空数组以提高性能
    if (!hasItemsOnThisDay) {
      return [];
    }

    return groupData.placements.map((placement) => {
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
            isFocused={selectedItemId === placement.item.id}
          />
        );
      }
      return null;
    }).filter(Boolean);
  }, [hasItemsOnThisDay, groupData.placements, year, monthIndex, dayIndex, dayWidth, cellHeight, displayConfig, onIssueClick, selectedItemId]);

  return (
    <div
      className={styles["timeline-group"]}
      style={{
        height: finalHeight,
        minHeight: finalMinHeight,
      }}
    >
      {/* 斑马纹背景 - 与整个timeline等宽，与当前group等高 */}
      <div
        className={`${styles["zebra-background"]} ${
          groupIndex % 2 === 0 ? styles["zebra-even"] : styles["zebra-odd"]
        }`}
        style={{
          height: finalHeight,
          backgroundColor: groupIndex % 2 === 0 ? getCSSVar("--color--bg-hover") : "transparent",
          width: "100%",
        }}
      />
      {renderedItems}
    </div>
  );
}, (prevProps, nextProps) => {
  // 🚀 自定义比较函数：只有关键属性变化时才重新渲染
  return (
    prevProps.groupIndex === nextProps.groupIndex &&
    prevProps.year === nextProps.year &&
    prevProps.monthIndex === nextProps.monthIndex &&
    prevProps.dayIndex === nextProps.dayIndex &&
    prevProps.dayWidth === nextProps.dayWidth &&
    prevProps.cellHeight === nextProps.cellHeight &&
    prevProps.groupGap === nextProps.groupGap &&
    prevProps.groupData === nextProps.groupData &&
    prevProps.displayConfig === nextProps.displayConfig &&
    prevProps.onIssueClick === nextProps.onIssueClick &&
    prevProps.selectedItemId === nextProps.selectedItemId &&
    prevProps.hasItemsOnThisDay === nextProps.hasItemsOnThisDay
  );
}); 