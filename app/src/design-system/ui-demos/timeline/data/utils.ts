/**
 * 🔧 Timeline组件的工具函数库
 * 
 * 这个文件包含了Timeline组件用到的各种实用函数，主要用于：
 * - 时间和日期处理
 * - 数据排序和布局计算
 * - 项目定位和重叠检测
 * 
 * 🎯 主要功能：
 * - findPlacement：智能布局算法，避免时间线项目重叠
 * - sortTimelineItemsByStartDate：按开始时间排序项目
 * - TimelineItemInterval：计算时间线显示的时间范围
 * - doDateRangesOverlap：检测两个时间段是否重叠
 * 
 * 💡 使用示例：
 * const sortedItems = sortTimelineItemsByStartDate(items);
 * const column = findPlacement(placements, item, startDate, endDate);
 * const { years, startMonth } = TimelineItemInterval({ inputData });
 */

import { type TimelineItem, BaseTimelineItemKeys } from "./types";

/**
 * Represents the result of placing a timeline item in a specific column
 */
export interface PlacementResult {
  column: number;
  item: TimelineItem;
  startDate: Date;
  endDate: Date;
}

/**
 * Month names mapping for timeline display
 */
export const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Calculate the number of days in a specific month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Calculate duration in days between two dates
 */
export const calculateDurationInDays = (startDate: Date, endDate: Date): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calculate maximum overlap cardinality for timeline items
 */
export const calculateMaxOverlapCardinality = (items: TimelineItem[]): number => {
  if (items.length === 0) return 1;
  
  // Create events array with start and end events
  const events: Array<{ date: Date; type: 'start' | 'end' }> = [];
  
  items.forEach(item => {
    events.push({ date: item.startDate, type: 'start' });
    events.push({ date: item.endDate, type: 'end' });
  });
  
  // Sort events by date, with end events before start events for same date
  events.sort((a, b) => {
    const dateCompare = a.date.getTime() - b.date.getTime();
    if (dateCompare === 0) {
      return a.type === 'end' ? -1 : 1;
    }
    return dateCompare;
  });
  
  let currentOverlap = 0;
  let maxOverlap = 0;
  
  events.forEach(event => {
    if (event.type === 'start') {
      currentOverlap++;
      maxOverlap = Math.max(maxOverlap, currentOverlap);
    } else {
      currentOverlap--;
    }
  });
  
  return Math.max(maxOverlap, 1);
};

/**
 * Get color for status
 */
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    "High Risks": "#dc3545",
    "Manageable Risk": "#ffc107", 
    "On Track": "#28a745",
    "Not Yet Started": "#6c757d",
  };
  return statusColors[status] || "#6c757d";
};

/**
 * Get color for team
 */
export const getTeamColor = (team: string): string => {
  const teamColors: Record<string, string> = {
    "Function": "#007bff",
    "Retail": "#28a745",
    "E-com": "#17a2b8",
    "Brand Marketing": "#ffc107",
    "Product": "#6f42c1",
    "Fulfillment": "#fd7e14",
    "Corporate": "#e83e8c",
    "Tech": "#20c997",
  };
  return teamColors[team] || "#6c757d";
};

/**
 * Check if two date ranges overlap
 */
export const doDateRangesOverlap = (
  start1: Date, 
  end1: Date, 
  start2: Date, 
  end2: Date
): boolean => {
  return !(end1 < start2 || start1 > end2);
};

/**
 * Find the appropriate column (vertical position) for a new timeline item
 */
export const findPlacement = (
  placements: PlacementResult[],
  _currentItem: TimelineItem,
  currentStartDate: Date,
  currentEndDate: Date
): number => {
  if (placements.length === 0) return 0;

  const maxColumn = Math.max(...placements.map(p => p.column));
  
  for (let col = 0; col <= maxColumn + 1; col++) {
    const itemsInColumn = placements.filter(p => p.column === col);
    
    const isColumnAvailable = itemsInColumn.every(placement => {
      return currentEndDate < placement.startDate || currentStartDate > placement.endDate;
    });

    if (isColumnAvailable) {
      return col;
    }
  }

  return maxColumn + 1;
};

/**
 * Sort timeline items by start date
 */
export const sortTimelineItemsByStartDate = <T = Record<string, unknown>>(
  items: TimelineItem<T>[]
): TimelineItem<T>[] => {
  return [...items].sort((a, b) => {
    const dateA = a.startDate || a[BaseTimelineItemKeys.START_DATE as keyof typeof a];
    const dateB = b.startDate || b[BaseTimelineItemKeys.START_DATE as keyof typeof b];
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });
};

/**
 * Timeline interval calculation
 */
interface TimelineItemIntervalProps {
  inputData: TimelineItem[];
}

export interface TimelineInterval {
  years: number[];
  startMonth: number;
}

export function TimelineItemInterval({ inputData }: TimelineItemIntervalProps): TimelineInterval {
  if (inputData.length === 0) {
    const currentYear = new Date().getFullYear();
    return {
      years: [currentYear],
      startMonth: 0
    };
  }

  const earliestStartDate = inputData.reduce((earliest, item) => {
    return item.startDate < earliest ? item.startDate : earliest;
  }, inputData[0].startDate);

  const latestEndDate = inputData.reduce((latest, item) => {
    return item.endDate > latest ? item.endDate : latest;
  }, inputData[0].endDate);

  const earliestYear = earliestStartDate.getFullYear();
  const startMonth = earliestStartDate.getMonth();
  const lastYear = latestEndDate.getFullYear();

  const years = [];
  for (let year = earliestYear; year <= lastYear; year++) {
    years.push(year);
  }

  return {
    years,
    startMonth
  };
} 