/**
 * 🏷️ Timeline组件的数据类型定义
 * 
 * 这个文件定义了Timeline组件使用的所有数据类型和接口。
 * 使用TypeScript类型可以确保数据的正确性，避免运行时错误。
 * 
 * 🎯 核心概念：
 * - BaseTimelineItem：最基本的时间线项目，只需要4个字段
 * - TimelineItem<T>：可扩展的时间线项目，支持自定义字段
 * - SortedTimelineData：分组后的时间线数据结构
 * 
 * 💡 使用示例：
 * interface MyProject extends BaseTimelineItem {
 *   priority: 'High' | 'Medium' | 'Low';
 *   team: string;
 * }
 * 
 * const project: MyProject = {
 *   id: "1",
 *   name: "网站重构", 
 *   startDate: new Date("2024-01-01"),
 *   endDate: new Date("2024-03-01"),
 *   priority: "High",
 *   team: "前端团队"
 * };
 */

// 基础时间线项目接口 - 只包含四个必需字段
export interface BaseTimelineItem {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

// 基础字段键
export const BaseTimelineItemKeys = {
  ID: 'id',
  NAME: 'name',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
} as const;

// 通用时间线项目类型 - 支持泛型扩展
export type TimelineItem<T = Record<string, unknown>> = BaseTimelineItem & T;

// Timeline 配置接口
export interface TimelineConfig<TExtended = Record<string, unknown>> {
  dataType?: TExtended;
  groupBy?: keyof (BaseTimelineItem & TExtended);
}

// 分组数据结构 - 通用化
export interface TimelineGroup<T = Record<string, unknown>> {
  groupTitle: string;
  groupItems: TimelineItem<T>[];
}

// 排序后的时间线数据结构 - 通用化
export interface SortedTimelineData<T = Record<string, unknown>> {
  meta: {
    sortBy: keyof (BaseTimelineItem & T);
  };
  data: TimelineGroup<T>[];
}

// Timeline 组件 Props 接口
export interface TimelineProps<T = Record<string, unknown>> {
  init?: TimelineConfig<T>;
  inputData: SortedTimelineData<T>;
  onGroupByChange?: (groupBy: keyof (BaseTimelineItem & T)) => void;
}

 