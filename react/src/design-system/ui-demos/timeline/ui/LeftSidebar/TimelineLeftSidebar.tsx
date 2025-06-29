import {} from "react";
import styles from "./TimelineLeftSidebar.module.scss";
import { TimelineConst, TimelineConstCalc } from "../_constants";
import { type TimelineItemType, type SidebarPropertyConfig } from "../../types";
import { type PlacementResult } from "../../utils/placement";
import {
  RichTooltip,
  RichTooltipItem,
  PropertyDistributionBar,
} from "../../../../ui-components";

export interface GroupPlacement<T = Record<string, unknown>> {
  groupTitle: string;
  groupItems: TimelineItemType<T>[];
  placements: PlacementResult[];
  isEndSpacer?: boolean; // 标识是否为最后的占位分组
}

interface TimelineSidebarProps<T = Record<string, unknown>> {
  groupPlacements: GroupPlacement<T>[];
  cellHeight: number;
  groupGap: number;
  isRulerMode?: boolean;
  sidebarProperties?: SidebarPropertyConfig<T>[];
}

export const TimelineSidebar = <T = Record<string, unknown>,>({
  groupPlacements,
  cellHeight,
  groupGap,
  isRulerMode = false,
  sidebarProperties = [],
}: TimelineSidebarProps<T>) => {
  // 计算每个组的高度和位置
  const getGroupHeight = (placements: PlacementResult[]) => {
    if (placements.length === 0) return cellHeight;
    const maxColumn = Math.max(...placements.map((p) => p.column));
    return (maxColumn + 1) * cellHeight;
  };

  // GroupBy 相关逻辑现在由独立的 GroupBySelector 组件处理

  // 如果是 ruler 模式，只返回空的占位区域（GroupBy 现在由独立组件处理）
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
          {/* GroupBy 选择器现在由独立的 GroupBySelector 组件处理 */}
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
                    <RichTooltip
                      trigger={
                        <span
                          className={styles["timeline-sidebar-group-title"]}
                        >
                          {group.groupTitle}
                        </span>
                      }
                      position="right-start"
                    >
                      {[
                        <RichTooltipItem
                          key="group-title"
                          label={group.groupTitle}
                        />,
                      ]}
                    </RichTooltip>
                  </div>

                  {/* 属性分布可视化 */}
                  {sidebarProperties.length > 0 && !group.isEndSpacer && (
                    <div
                      className={styles["timeline-sidebar-group-properties"]}
                    >
                      {sidebarProperties.map((propertyConfig) => (
                        <PropertyDistributionBar
                          key={String(propertyConfig.field)}
                          data={
                            group.groupItems as Array<Record<string, unknown>>
                          }
                          field={String(propertyConfig.field)}
                          mapping={propertyConfig.mapping}
                          label={propertyConfig.label}
                          showLegend={true}
                          legendMode="hover"
                          tooltipPosition="right-start"
                          percentageDecimalPlaces={0}
                          flexLabelSize={44}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
