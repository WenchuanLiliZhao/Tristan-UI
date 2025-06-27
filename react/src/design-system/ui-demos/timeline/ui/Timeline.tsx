/* eslint-disable react-refresh/only-export-components */
/**
 * 📅 Timeline时间线主组件
 * 
 * 这是设计系统中最重要的组件之一，用于展示项目或任务的时间线。
 * Timeline可以显示多个项目在时间轴上的分布，支持分组、缩放和响应式布局。
 * 
 * 🎯 主要特性：
 * - 智能布局：自动避免项目重叠，垂直分层显示
 * - 分组显示：可以按团队、状态等字段分组
 * - 时间缩放：支持年、月、日三种时间视图
 * - 响应式：自适应不同屏幕尺寸
 * 
 * 📊 数据要求：
 * 每个时间线项目必须包含：id（唯一标识）、name（名称）、startDate（开始日期）、endDate（结束日期）
 * 
 * 💡 使用示例：
 * const data = {
 *   meta: { sortBy: 'team' },
 *   data: [{
 *     groupTitle: "开发团队",
 *     groupItems: [{
 *       id: "1", name: "项目A", 
 *       startDate: new Date("2024-01-01"), 
 *       endDate: new Date("2024-02-01")
 *     }]
 *   }]
 * };
 * <Timeline inputData={data} />
 */

import React, { useRef, useCallback, useMemo, useState } from "react";
import {
  type TimelineProps,
  type TimelineItemType,
  type TimelineItemDisplayConfig,
  BaseTimelineItemKeys,
} from "../types";
import {
  TimelineItemInterval,
  sortTimelineItemsByStartDate,
  findPlacement,
  type PlacementResult
} from "../utils";
import { TimelineRuler } from "./OnLayout/TimelineRuler";
import { TimelineItems } from "./OnLayout/TimelineItems";
import { TimelineSidebar } from "./Sidebar/TimelineSidebar";
import type { GroupPlacement } from "./Sidebar/TimelineSidebar";
import { useCenterBasedZoom, useDisableBrowserGestures } from "../hooks";
import styles from "./Timeline.module.scss";
import { TimelineConst } from "./_constants";
import { Button } from "../../../ui-components/general/Button";

// 默认时间视图配置
const DEFAULT_TIME_VIEW_CONFIG = [
  { type: "year", dayWidth: 4.5, label: "Year", setAsDefault: false },
  { type: "month", dayWidth: 8, label: "Month", setAsDefault: true },
  { type: "day", dayWidth: 24, label: "Day", setAsDefault: false },
] as const;

// 内部zoom配置类型
interface InternalZoomConfig {
  type: string;
  dayWidth: number;
  label: string;
  setAsDefault: boolean;
}

// Hook 来管理 zoom 状态和配置
function useTimelineZoom(zoomLevels?: Array<{ label: string; dayWidth: number; setAsDefault?: boolean }>) {
  // 处理 zoom levels 转换为内部格式
  const timeViewConfig = useMemo((): InternalZoomConfig[] => {
    const levels = zoomLevels && zoomLevels.length > 0 ? zoomLevels : DEFAULT_TIME_VIEW_CONFIG;
    return levels.map((zl) => ({
      ...zl,
      type: zl.label.toLowerCase().replace(" ", "-"),
      setAsDefault: zl.setAsDefault ?? false,
    }));
  }, [zoomLevels]);

  // 管理当前 zoom 状态
  const [currentZoom, setCurrentZoom] = useState<string>(() => {
    const defaultView = timeViewConfig.find((view) => view.setAsDefault);
    return defaultView ? defaultView.type : timeViewConfig[0].type;
  });

  // 获取当前 zoom 配置
  const currentZoomConfig = timeViewConfig.find(config => config.type === currentZoom)!;

  return {
    timeViewConfig,
    currentZoom,
    setCurrentZoom,
    currentZoomConfig,
    dayWidth: currentZoomConfig.dayWidth,
  };
}

// 通用的Timeline组件 - 支持泛型，现在作为主要接口
export function Timeline<T = Record<string, unknown>>({
  // init 参数为未来扩展保留，暂时不使用
  inputData,
  init,
  zoomLevels,
  fetchByTimeInterval,
  currentZoom: externalCurrentZoom,
}: TimelineProps<T>) {
  // 如果没有提供 zoomLevels，使用默认的 dayWidth
  const defaultDayWidth = 8; // 默认 dayWidth，相当于 "Month" 视图
  
  // 始终调用 useTimelineZoom hook（React Hook 规则）
  const zoomManagement = useTimelineZoom(zoomLevels);
  
  // 确定最终使用的 dayWidth
  const dayWidth = (() => {
    if (externalCurrentZoom && zoomLevels) {
      // 如果提供了外部 currentZoom 和 zoomLevels，查找对应的 dayWidth
      const zoomConfig = zoomLevels.find(zl => 
        zl.label.toLowerCase().replace(" ", "-") === externalCurrentZoom
      );
      return zoomConfig?.dayWidth || defaultDayWidth;
    } else if (zoomLevels && zoomManagement) {
      // 如果提供了 zoomLevels 且使用内部 zoom 管理
      return zoomManagement.dayWidth;
    } else {
      // 如果没有 zoom 功能，使用默认值
      return defaultDayWidth;
    }
  })();

  // Constants for layout calculations
  const cellHeight = TimelineConst.cellHeight; // Height of each item row in pixels
  const groupGapForTesting = TimelineConst.groupGap;

  // Filter data based on fetchByTimeInterval
  const filteredData = useMemo(() => {
    if (!fetchByTimeInterval) {
      return inputData;
    }
    const [start, end] = fetchByTimeInterval;
    const filteredGroups = inputData.data
      .map((group) => {
        const filteredItems = group.groupItems.filter((item) => {
          const itemStart = new Date(item.startDate);
          return itemStart >= start && itemStart <= end;
        });
        return { ...group, groupItems: filteredItems };
      })
      .filter((group) => group.groupItems.length > 0);

    return { ...inputData, data: filteredGroups };
  }, [inputData, fetchByTimeInterval]);

  // 添加主滚动容器的引用 - 现在只需要一个
  const mainScrollRef = useRef<HTMLDivElement>(null);

  // 使用自定义hook实现中心缩放功能，针对主内容容器
  const { containerRef: zoomContainerRef } = useCenterBasedZoom(dayWidth);
  
  // 使用自定义hook禁用浏览器左右滑动手势
  const gestureDisableRef = useDisableBrowserGestures();

  // Flatten all items from all groups for timeline calculations
  const allItems = filteredData.data.flatMap((group) => group.groupItems);

  // Sort items by start date to ensure consistent placement
  const sortedItems = sortTimelineItemsByStartDate(allItems as TimelineItemType<T>[]);
  
  // 构建用于计算时间间隔的数据，使用基础字段键
  const timelineIntervalData = sortedItems.map(item => ({
    id: item.id || '',
    name: item.name || '',
    startDate: item.startDate || item[BaseTimelineItemKeys.START_DATE as keyof typeof item],
    endDate: item.endDate || item[BaseTimelineItemKeys.END_DATE as keyof typeof item],
  }));

  // Get list of years and start month that need to be displayed
  const { years: yearList, startMonth } = TimelineItemInterval({
    inputData: timelineIntervalData,
  });

  // 计算 Timeline 的总宽度
  const calculateTimelineWidth = useCallback(() => {
    let totalDays = 0;
    
    yearList.forEach((year, yearIndex) => {
      // 第一年从 startMonth 开始，其他年份从1月开始
      const monthStart = yearIndex === 0 ? startMonth : 0;
      const monthEnd = 11; // 12月结束
      
      for (let month = monthStart; month <= monthEnd; month++) {
        // 计算当前月份的天数
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        totalDays += daysInMonth;
      }
    });
    
    // 加上左侧边栏的宽度
    return totalDays * dayWidth + TimelineConst.sidebarWidth;
  }, [yearList, startMonth, dayWidth]);

  // 获取计算出的 Timeline 总宽度
  const timelineWidth = calculateTimelineWidth();

  // Early return if no items to display
  if (allItems.length === 0) {
    return (
      <div className={styles["timeline-ruler-container"]}>
        <div>No timeline items to display</div>
      </div>
    );
  }

  // Pre-calculate placements for each group separately
  const groupPlacements: GroupPlacement[] = filteredData.data.map((group) => {
    const sortedGroupItems = sortTimelineItemsByStartDate(group.groupItems as TimelineItemType<T>[]);
    const placements: PlacementResult[] = [];

    sortedGroupItems.forEach((item) => {
      const startDate = new Date(item.startDate || item[BaseTimelineItemKeys.START_DATE as keyof typeof item]);
      const endDate = new Date(item.endDate || item[BaseTimelineItemKeys.END_DATE as keyof typeof item]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const column = findPlacement(placements, item as any, startDate, endDate);

      placements.push({
        column,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item: item as any,
        startDate,
        endDate,
      });
    });

    return {
      groupTitle: group.groupTitle,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      groupItems: group.groupItems as any,
      placements,
    };
  });

  // 添加一个空的占位分组，确保垂直滚动到底部时有足够的空白区域
  groupPlacements.push({
    groupTitle: "", // 空标题
    groupItems: [], // 空项目列表
    placements: [], // 空放置结果
    isEndSpacer: true, // 标识这是最后的占位分组
  });

  return (
    <div 
      className={styles["timeline-container"]}
    >
      <div className={styles["timeline-body"]}>
        {/* 主滚动容器 - 处理横向滚动，ruler 和 content 都在其中 */}
        <div
          ref={(el) => {
            mainScrollRef.current = el;
            zoomContainerRef.current = el;
            gestureDisableRef.current = el;
          }}
          className={styles["timeline-main-scroll"]}
        >
          {/* 时间线尺子组件 - sticky 定位在顶部 */}
          <div 
            className={styles["timeline-ruler-sticky"]}
            style={{ width: `${timelineWidth}px` }}
          >
            {/* 左侧边栏的尺子占位区域 */}
            <div className={styles["timeline-sidebar-ruler-placeholder"]}>
              <TimelineSidebar
                groupPlacements={groupPlacements}
                cellHeight={cellHeight}
                groupGap={groupGapForTesting}
                isRulerMode={true}
              />
            </div>

            {/* 右侧时间线尺子 */}
            <div className={styles["timeline-ruler-content"]}>
              <TimelineRuler
                yearList={yearList}
                startMonth={startMonth}
                dayWidth={dayWidth}
              />
            </div>
          </div>

          {/* 时间线内容区域 */}
          <div 
            className={styles["timeline-content-inner"]}
            style={{ width: `${timelineWidth}px` }}
          >
            {/* 左侧可调整大小的侧边栏 */}
            <div className={styles["timeline-sidebar"]}>
              <TimelineSidebar
                groupPlacements={groupPlacements}
                cellHeight={cellHeight}
                groupGap={groupGapForTesting}
              />
            </div>

            {/* 时间线项目容器 */}
            <div className={styles["timeline-items-container"]}>
              <TimelineItems
                yearList={yearList}
                startMonth={startMonth}
                dayWidth={dayWidth}
                cellHeight={cellHeight}
                groupGap={groupGapForTesting}
                groupPlacements={groupPlacements}
                displayConfig={init?.itemDisplayConfig as TimelineItemDisplayConfig}
                onIssueClick={() => {
                  // Issue 点击事件，不再同步到URL
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 导出 useTimelineZoom hook 供外部使用
export { useTimelineZoom };

// 创建一个独立的 ZoomControls 生成函数
export function createZoomControls(
  timeViewConfig: InternalZoomConfig[],
  currentZoom: string,
  onZoomChange: (zoom: string) => void
): React.ReactElement {
  return (
    <React.Fragment>
      {timeViewConfig.map((level) => (
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
}

// 默认导出Timeline组件
export { Timeline as default };
