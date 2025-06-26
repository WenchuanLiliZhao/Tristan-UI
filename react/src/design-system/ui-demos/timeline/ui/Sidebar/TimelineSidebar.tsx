import React from "react";
import styles from "./TimelineSidebar.module.scss";
import { TimelineConst, TimelineConstCalc } from "../_constants";
import { type TimelineItemType } from "../../data/types";
import { type PlacementResult } from "../../data/utils";

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
}

export const SIDEBAR_WIDTH = 200;

export const TimelineSidebar: React.FC<TimelineSidebarProps> = ({
  groupPlacements,
  cellHeight,
  groupGap,
  isRulerMode = false,
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
        style={{ width: SIDEBAR_WIDTH }}
      >
        <div
          className={styles["timeline-sidebar-ruler-space"]}
          style={{
            height:
              TimelineConst.yearLabelHight +
              TimelineConst.monthLabelHight +
              TimelineConst.dayLabelHight,
          }}
        ></div>
      </div>
    );
  }

  return (
    <div
      className={styles["timeline-sidebar"]}
      style={{ width: SIDEBAR_WIDTH }}
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
                  <div className={styles["timeline-sidebar-group-title"]}>
                    {group.groupTitle}
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
