import {} from "react";
import styles from "./TimelineLeftSidebar.module.scss";
import { TimelineConst, TimelineConstCalc } from "../_constants";
import { type TimelineItemType, type SidebarPropertyConfig } from "../../types";
import { type PlacementResult } from "../../utils/placement";
import {
  RichTooltip,
  RichTooltipItem,
  Dropdown,
  type CascaderGroupProps,
  PropertyDistributionBar,
  Icon,
  Button,
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
  groupBy?: string;
  groupByOptions?: { key: string; label: string; value: string }[];
  onGroupByChange?: (value: string) => void;
  sidebarProperties?: SidebarPropertyConfig<T>[];
}

export const TimelineSidebar = <T = Record<string, unknown>,>({
  groupPlacements,
  cellHeight,
  groupGap,
  isRulerMode = false,
  groupBy,
  groupByOptions = [],
  onGroupByChange,
  sidebarProperties = [],
}: TimelineSidebarProps<T>) => {
  // 计算每个组的高度和位置
  const getGroupHeight = (placements: PlacementResult[]) => {
    if (placements.length === 0) return cellHeight;
    const maxColumn = Math.max(...placements.map((p) => p.column));
    return (maxColumn + 1) * cellHeight;
  };

  // 创建 groupBy 选项的 cascader 数据
  const createGroupByOptions = (): CascaderGroupProps[] => {
    if (groupByOptions.length === 0) return [];

    return [
      {
        items: groupByOptions.map((option) => ({
          key: option.key,
          content: (
            <Button
              size="medium"
              widthMode="full width"
              decoIcon={option.label === groupBy ? "check" : undefined}
              variant={option.label === groupBy ? "filled" : "ghost"}
              semantic={option.label === groupBy ? "active" : "default"}
            >
              {option.label}
            </Button>
          ),
          value: option.value,
        })),
      },
    ];
  };

  const handleGroupByChange = (value: string | number | object | undefined) => {
    if (typeof value === "string" && onGroupByChange) {
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
          <div className={styles["group-by-container"]}>
            <div className={styles["group-by-label"]}>Group By</div>

            {groupByOptions.length > 0 ? (
              <Dropdown
                className={styles["group-by-dropdown"]}
                trigger={
                  <div className={styles["group-by-value-container"]}>
                    <div className={styles["group-by-value"]}>{groupBy}</div>
                    <Icon
                      className={styles["group-by-value-icon"]}
                      name="chevron_right"
                    />
                  </div>
                }
                groups={createGroupByOptions()}
                position="right-start"
                onItemClick={handleGroupByChange}
                width={160}
              />
            ) : null}
          </div>
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
