# Timeline Component System

A comprehensive React timeline component system designed for displaying chronological data with advanced features like grouping, zooming, and responsive layouts.

## 🎯 Core Features

- **Fully Independent**: No external data layer dependencies, ready to copy to other projects
- **Advanced Timeline**: Powerful timeline display component with grouping, zooming, and responsive layout
- **Data Management**: Built-in data layer with TypeScript support
- **Modular Architecture**: Import only what you need
- **Responsive Design**: Adapts to different screen sizes and orientations

## 📁 Project Structure

```
timeline/
├── data/                          # Data layer and utilities
│   ├── types.ts                   # TypeScript type definitions
│   ├── utils.ts                   # Utility functions for data processing
│   ├── hooks.ts                   # React hooks for timeline functionality
│   └── index.ts                   # Data layer exports
├── ui/                            # UI components
│   ├── Timeline.tsx               # Main timeline component
│   ├── Timeline.module.scss       # Main timeline styles
│   ├── _constants.ts              # Component constants
│   ├── OnLayout/                  # Layout-related components
│   │   ├── TimelineItems.tsx      # Timeline item layout
│   │   ├── TimelineRuler.tsx      # Timeline ruler/scale
│   │   └── *.module.scss          # Layout styles
│   ├── OnTimeline/                # Timeline item components
│   │   ├── Item.tsx               # Individual timeline item
│   │   ├── Group.tsx              # Timeline group container
│   │   └── *.module.scss          # Item styles
│   ├── Sidebar/                   # Sidebar components
│   │   ├── TimelineSidebar.tsx    # Main sidebar
│   │   ├── GroupProgressBar.tsx   # Progress visualization
│   │   ├── sidebarFunctions.ts    # Sidebar utilities
│   │   └── *.module.scss          # Sidebar styles
│   ├── Shared/                    # Shared components
│   │   ├── Column.tsx             # Column layout component
│   │   └── *.module.scss          # Shared styles
│   ├── README.md                  # UI components documentation
│   └── GENERIC_TIMELINE_USAGE.md  # Usage guide
└── index.ts                       # Main exports
```

## 🚀 Quick Start

### Installation

Copy the timeline directory to your project:

```bash
# Copy the entire timeline folder to your design system
cp -r /path/to/timeline ./src/design-system/ui-demos/
```

### Basic Usage

```tsx
import { Timeline } from './design-system/ui-demos/timeline';
import type { SortedTimelineData } from './design-system/ui-demos/timeline';

// Define your timeline data
const timelineData: SortedTimelineData = {
  meta: { sortBy: 'name' },
  data: [
    {
      groupTitle: "Development Team",
      groupItems: [
        {
          id: "1",
          name: "Project Alpha",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-02-01")
        }
      ]
    }
  ]
};

function App() {
  return (
    <div>
      <Timeline inputData={timelineData} />
    </div>
  );
}
```

## 📊 Timeline Component API

### Props

```tsx
interface TimelineProps<T = {}> {
  inputData: SortedTimelineData<T>;
  onItemClick?: (item: TimelineItem<T>) => void;
  onGroupClick?: (group: TimelineGroup<T>) => void;
  // Additional configuration options...
}
```

### Data Structure

The timeline requires data in the following format:

```tsx
interface BaseTimelineItem {
  id: string;        // Unique identifier
  name: string;      // Display name
  startDate: Date;   // Start date
  endDate: Date;     // End date
}

interface TimelineGroup<T = {}> {
  groupTitle: string;
  groupItems: Array<TimelineItem<T>>;
}

interface SortedTimelineData<T = {}> {
  meta: { sortBy: string };
  data: Array<TimelineGroup<T>>;
}
```

### Custom Data Types

You can extend the base timeline item with custom fields:

```tsx
interface ProjectData {
  priority: 'High' | 'Medium' | 'Low';
  team: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  budget?: number;
}

// Use with Timeline
<Timeline<ProjectData> inputData={customData} />
```

## 🎨 Styling and Theming

The timeline uses CSS modules for styling. You can customize the appearance by:

1. **CSS Variables**: Override CSS custom properties
2. **SCSS Modules**: Modify the `.module.scss` files
3. **Component Props**: Use built-in styling props

```scss
/* Custom styling example */
:root {
  --timeline-primary-color: #007bff;
  --timeline-background: #ffffff;
  --timeline-border-color: #e0e0e0;
  --timeline-text-color: #333333;
}
```

## 📋 Component Architecture

### Core Components

- **`Timeline`** - Main container component that orchestrates all other components
- **`TimelineItems`** - Handles the layout and positioning of timeline items
- **`TimelineRuler`** - Displays the time scale and navigation controls
- **`TimelineSidebar`** - Shows group information and progress indicators

### Sub-components

- **`Item`** - Individual timeline item representation
- **`Group`** - Groups related timeline items together
- **`GroupProgressBar`** - Visual progress indicator for groups
- **`Column`** - Shared layout component for consistent spacing

## 🔧 Data Utilities

### Available Hooks

```tsx
import { useCenterBasedZoom, useTimelineData } from './timeline';

// Zoom functionality
const { zoomLevel, zoomIn, zoomOut, resetZoom } = useCenterBasedZoom();

// Data processing
const processedData = useTimelineData(rawData);
```

### Utility Functions

```tsx
import { 
  sortTimelineItemsByStartDate,
  findPlacement,
  TimelineItemInterval 
} from './timeline';

// Sort items by date
const sortedItems = sortTimelineItemsByStartDate(items);

// Calculate time intervals
const interval = new TimelineItemInterval(startDate, endDate);

// Find optimal placement
const placement = findPlacement(items, constraints);
```

## 📚 Documentation

- **`ui/README.md`** - Detailed UI component documentation
- **`ui/GENERIC_TIMELINE_USAGE.md`** - Comprehensive usage guide with examples

## 🛠 Development Requirements

- React 18+
- TypeScript 4.5+
- SCSS support
- CSS Modules support

## 🎯 Use Cases

Perfect for:
- Project timeline visualization
- Gantt chart-style displays
- Event chronology
- Resource scheduling
- Progress tracking
- Timeline-based data visualization

## 🤝 Contributing

This timeline system is designed to be self-contained and easily customizable. Feel free to modify and extend it according to your project needs.

## 📄 License

Use according to your project's license requirements.

## 🔧 核心功能特性

### 禁用浏览器滑动手势 🚫👆
Timeline 组件现在自动禁用浏览器的左右滑动导航手势，避免在横向滚动时意外触发：
- 右滑返回上一页
- 左滑前进到下一页
- 触摸板横向滑动导航
- 鼠标滚轮横向滚动导航

这个功能通过多重防护机制实现：
- **CSS 防护**：使用 `overscroll-behavior: none` 禁用浏览器原生滑动行为
- **JavaScript 防护**：`useDisableBrowserGestures` hook 拦截各种滑动事件
- **智能检测**：只在鼠标进入 Timeline 区域时激活，避免影响其他页面元素

```typescript
// Hook 自动集成在 Timeline 组件中，无需额外配置
import { Timeline } from '@/design-system/ui-demos/timeline';

// 使用时会自动禁用浏览器手势
<Timeline inputData={data} />
```

如果需要在其他组件中使用这个功能：

```typescript
import { useDisableBrowserGestures } from '@/design-system/ui-demos/timeline/data';

function MyComponent() {
  const containerRef = useDisableBrowserGestures();
  
  return (
    <div ref={containerRef}>
      {/* 当鼠标进入此区域时，浏览器滑动手势被禁用 */}
      <div style={{ overflowX: 'scroll' }}>
        横向滚动内容...
      </div>
    </div>
  );
}
``` 