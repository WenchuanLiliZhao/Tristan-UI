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
export interface BaseTimelineItemType {
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
export type TimelineItemType<T = Record<string, unknown>> = BaseTimelineItemType & T;

// 字段显示类型枚举
export type FieldDisplayType = 'icon' | 'progress' | 'tag';

// 字段显示配置接口
export interface FieldDisplayConfig<T = Record<string, unknown>> {
  /** 数据字段名 */
  field: keyof T;
  /** 显示类型 */
  displayType: FieldDisplayType;
  /** 
   * 字段值到显示属性的映射函数或对象
   * - 对于 icon: 返回 { iconName: string, color?: string }
   * - 对于 progress: 返回 { value: number, color?: string }
   * - 对于 tag: 返回 { text: string, color?: string, variant?: 'contained' | 'outlined' }
   */
  mapping?: 
    | ((value: unknown) => Record<string, unknown>)
    | Record<string, Record<string, unknown>>;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否显示（可以是函数动态判断） */
  visible?: boolean | ((item: TimelineItemType<T>) => boolean);
}

// Timeline 项目显示配置
export interface TimelineItemDisplayConfig<T = Record<string, unknown>> {
  /** 图形信息区域的字段配置 */
  graphicFields?: FieldDisplayConfig<T>[];
  /** 标签区域的字段配置 */
  tagFields?: FieldDisplayConfig<T>[];
}

// Timeline 配置接口
export interface TimelineConfigType<TExtended = Record<string, unknown>> {
  dataType?: TExtended;
  groupBy?: keyof (BaseTimelineItemType & TExtended);
  /** 项目显示配置 */
  itemDisplayConfig?: TimelineItemDisplayConfig<TExtended>;
}

// 分组数据结构 - 通用化
export interface TimelineGroupType<T = Record<string, unknown>> {
  groupTitle: string;
  groupItems: TimelineItemType<T>[];
}

// 排序后的时间线数据结构 - 通用化
export interface SortedTimelineDataType<T = Record<string, unknown>> {
  meta: {
    sortBy: keyof (BaseTimelineItemType & T);
  };
  data: TimelineGroupType<T>[];
}

// Timeline 组件 Props 接口
export interface TimelineProps<T = Record<string, unknown>> {
  init?: TimelineConfigType<T>;
  inputData: SortedTimelineDataType<T>;
  onGroupByChange?: (groupBy: keyof (BaseTimelineItemType & T)) => void;
  onItemClick?: (item: TimelineItemType<T>) => void;
}

// 预定义的常用映射函数
export const CommonFieldMappings = {
  /** 进度值映射 (0-100) */
  progress: (value: number) => ({
    value: Math.max(0, Math.min(100, value)),
    showText: true,
  }),
  
  /** 状态到颜色的映射 */
  statusColor: (colorMap: Record<string, { name: string; color: string; icon?: string }>) => 
    (value: string) => colorMap[value] || { name: value, color: 'gray' },
    
  /** 简单的文本标签映射 */
  textTag: (value: unknown) => ({
    text: String(value),
    variant: 'contained' as const,
  }),
};

 