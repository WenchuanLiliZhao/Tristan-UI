// 📦 导出所有类型定义
export * from './types';

// 🔧 导出所有工具函数
export * from './utils';

// ⚡ 导出所有 Hooks
export * from './hooks';

// 🎨 导出主组件
export { Timeline } from './ui/Timeline';

// 🎯 便利导出：常用的具体函数（避免深层导入）
export { groupTimelineItemsByField, sortTimelineItemsByStartDate } from './utils/sorting';
export { findPlacement, calculateMaxOverlapCardinality } from './utils/placement';
export { TimelineItemInterval, calculateDurationInDays, monthNames } from './utils/time';