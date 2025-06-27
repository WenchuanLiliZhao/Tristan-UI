import React from "react";
import styles from "./TimelineSidebar.module.scss";
import { TimelineConst, TimelineConstCalc } from "../_constants";
import { type TimelineItemType } from "../../types";
import { type PlacementResult } from "../../utils/placement";
// 移除RichTooltip依赖，使用简单的title属性替代

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
}

export const TimelineSidebar: React.FC<TimelineSidebarProps> = ({
  groupPlacements,
  cellHeight,
  groupGap,
  isRulerMode = false,
  groupBy,
}) => {
  // 计算每个组的高度和位置
  const getGroupHeight = (placements: PlacementResult[]) => {
    if (placements.length === 0) return cellHeight;
    const maxColumn = Math.max(...placements.map((p) => p.column));
    return (maxColumn + 1) * cellHeight;
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
          Group by: {groupBy}
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
                    <span 
                      className={styles["timeline-sidebar-group-title"]}
                      title={group.groupTitle}
                    >
                      {group.groupTitle}
                    </span>
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
