import React from "react";
import styles from "./TimelineSidebar.module.scss";
import { TimelineConst, TimelineConstCalc } from "../_constants";
import { type TimelineItemType } from "../../types";
import { type PlacementResult } from "../../utils/placement";
import { RichTooltip, RichTooltipItem, Dropdown, type CascaderGroupProps } from "../../../../ui-components";

export interface GroupPlacement {
  groupTitle: string;
  groupItems: TimelineItemType[];
  placements: PlacementResult[];
  isEndSpacer?: boolean; // 标识是否为最后的占位分组
}

interface TimelineSidebarProps {
  groupPlacements: GroupPlacement[];
  cellHeight: number;
  groupGap: number;
  isRulerMode?: boolean;
  groupBy?: string;
  groupByOptions?: { key: string; label: string; value: string }[];
  onGroupByChange?: (value: string) => void;
}

export const TimelineSidebar: React.FC<TimelineSidebarProps> = ({
  groupPlacements,
  cellHeight,
  groupGap,
  isRulerMode = false,
  groupBy,
  groupByOptions = [],
  onGroupByChange,
}) => {
  // 计算每个组的高度和位置
  const getGroupHeight = (placements: PlacementResult[]) => {
    if (placements.length === 0) return cellHeight;
    const maxColumn = Math.max(...placements.map((p) => p.column));
    return (maxColumn + 1) * cellHeight;
  };

  // 创建 groupBy 选项的 cascader 数据
  const createGroupByOptions = (): CascaderGroupProps[] => {
    if (groupByOptions.length === 0) return [];
    
    return [{
      groupTitle: "Group By Options",
      items: groupByOptions.map(option => ({
        key: option.key,
        content: <span>{option.label}</span>,
        value: option.value,
      }))
    }];
  };

  const handleGroupByChange = (value: string | number | object | undefined) => {
    if (typeof value === 'string' && onGroupByChange) {
      onGroupByChange(value);
    }
  };

  // 如果是 ruler 模式，只返回占位区域
  if (isRulerMode) {
    return (
      <div
        className={styles["timeline-sidebar"]}
        style={{ width: TimelineConst.sidebarWidth }}
      >
        <div
          className={styles["timeline-sidebar-ruler-space"]}
          style={{
            height:
              TimelineConst.yearLabelHeight +
              TimelineConst.monthLabelHeight +
              TimelineConst.dayLabelHeight,
          }}
        >
          {groupByOptions.length > 0 ? (
            <Dropdown
              trigger={
                <div className={styles["timeline-sidebar-ruler-space-group-by"]}>
                  Group by: {groupBy}
                </div>
              }
              groups={createGroupByOptions()}
              position="right-start"
              onItemClick={handleGroupByChange}
              width={160}
            />
          ) : (
            <div className={styles["timeline-sidebar-ruler-space-group-by"]}>
              Group by: {groupBy}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles["timeline-sidebar"]}
      style={{ width: TimelineConst.sidebarWidth }}
    >
      <div className={styles["timeline-sidebar-content"]}>
        {/* 与时间线尺子对齐的占位区域 */}

        {/* 组标题列表 */}
        <div className={styles["timeline-sidebar-groups"]}>
          {groupPlacements.map((group, index) => {
            const groupHeight = getGroupHeight(group.placements);
            const marginBottom =
              index < groupPlacements.length - 1 ? groupGap : 0;

            // 如果是最后的占位分组，使用 groupsEndHeight
            const finalHeight = group.isEndSpacer
              ? TimelineConstCalc.groupsEndHeight
              : groupHeight;
            const finalMinHeight = group.isEndSpacer
              ? TimelineConstCalc.groupsEndHeight
              : TimelineConstCalc.groupMinHeight;

            return (
              <div
                key={group.groupTitle || `spacer-${index}`}
                className={styles["timeline-sidebar-group"]}
                style={{
                  height: finalHeight,
                  minHeight: finalMinHeight,
                  marginBottom: marginBottom,
                }}
              >
                <div
                  className={styles["timeline-sidebar-group-title-container"]}
                  style={{
                    position: "sticky",
                    top: TimelineConstCalc.rulerHeight,
                    bottom: 0,
                  }}
                >
                  <div>
                    <RichTooltip trigger={<span className={styles["timeline-sidebar-group-title"]}>{group.groupTitle}</span>} position="right-start">
                      {[<RichTooltipItem label={group.groupTitle} />]}
                    </RichTooltip>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
