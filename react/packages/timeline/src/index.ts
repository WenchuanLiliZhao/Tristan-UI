// Timeline Component Export
export { Timeline, useTimelineZoom } from './ui/Timeline';

// Timeline Types Export
export type {
  TimelineProps,
  TimelineItemType,
  TimelineItemDisplayConfig,
  SortedTimelineDataType,
  BaseTimelineItemType
} from './types';

// Timeline Configuration Helper
export { createFieldConfig } from './types';

// Timeline Utilities Export
export {
  sortTimelineItemsByStartDate,
  groupTimelineItemsByField,
  TimelineItemInterval,
  findPlacement,
  calculateMaxOverlapCardinality,
  calculateDurationInDays,
  monthNames
} from './utils';

// Timeline Hooks Export
export {
  useCenterBasedZoom,
  useDisableBrowserGestures,
  useVirtualizedTimeline,
  useZoomLevelMonitor,
  useTodayButtonZoomResponse
} from './hooks';

// Export styles
import '../styles/_app.scss';

// Version info
export const version = '0.4.8';