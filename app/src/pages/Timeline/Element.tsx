import React, { useState, useEffect } from "react";
import { Timeline } from "../../design-system/ui-demos/timeline";
import { IssueShapeKeys } from "../../design-system/ui-demos/timeline/data/types";
import type { IssueShape, SortedTimelineData } from "../../design-system/ui-demos/timeline/data/types";

// 模拟示例数据
const mockExampleIssues: IssueShape[] = [
  {
    [IssueShapeKeys.ID]: "1",
    [IssueShapeKeys.NAME]: "Interactive Calculus Workshop",
    [IssueShapeKeys.STATUS]: "High Risks",
    [IssueShapeKeys.DESCRIPTION]: "Develop and implement an interactive workshop series for advanced calculus concepts",
    [IssueShapeKeys.START_DATE]: new Date("2024-01-01"),
    [IssueShapeKeys.END_DATE]: new Date("2024-01-31"),
    [IssueShapeKeys.PROGRESS]: 50,
    [IssueShapeKeys.CATEGORY]: "Advance Solutions",
    [IssueShapeKeys.TEAM]: "Function",
    [IssueShapeKeys.PRIORITY]: "High"
  },
  {
    [IssueShapeKeys.ID]: "2",
    [IssueShapeKeys.NAME]: "Mobile App Development",
    [IssueShapeKeys.STATUS]: "Not Yet Started",
    [IssueShapeKeys.DESCRIPTION]: "Create a cross-platform mobile application for task management",
    [IssueShapeKeys.START_DATE]: new Date("2024-02-01"),
    [IssueShapeKeys.END_DATE]: new Date("2024-03-31"),
    [IssueShapeKeys.PROGRESS]: 100,
    [IssueShapeKeys.CATEGORY]: "Advance Solutions",
    [IssueShapeKeys.TEAM]: "Tech",
    [IssueShapeKeys.PRIORITY]: "Low"
  },
  {
    [IssueShapeKeys.ID]: "3",
    [IssueShapeKeys.NAME]: "Machine Learning Model Training",
    [IssueShapeKeys.STATUS]: "On Track",
    [IssueShapeKeys.DESCRIPTION]: "Train and deploy a neural network for image recognition",
    [IssueShapeKeys.START_DATE]: new Date("2024-03-01"),
    [IssueShapeKeys.END_DATE]: new Date("2024-03-31"),
    [IssueShapeKeys.PROGRESS]: 100,
    [IssueShapeKeys.CATEGORY]: "Advance Capabilities",
    [IssueShapeKeys.TEAM]: "Tech",
    [IssueShapeKeys.PRIORITY]: "Low"
  },
  {
    [IssueShapeKeys.ID]: "4",
    [IssueShapeKeys.NAME]: "Website Redesign Project",
    [IssueShapeKeys.STATUS]: "Manageable Risk",
    [IssueShapeKeys.DESCRIPTION]: "Complete overhaul of company website with modern UI/UX principles",
    [IssueShapeKeys.START_DATE]: new Date("2024-04-01"),
    [IssueShapeKeys.END_DATE]: new Date("2024-04-30"),
    [IssueShapeKeys.PROGRESS]: 75,
    [IssueShapeKeys.CATEGORY]: "Advance Solutions",
    [IssueShapeKeys.TEAM]: "E-com",
    [IssueShapeKeys.PRIORITY]: "High"
  },
  {
    [IssueShapeKeys.ID]: "5",
    [IssueShapeKeys.NAME]: "Customer Support Automation",
    [IssueShapeKeys.STATUS]: "On Track",
    [IssueShapeKeys.DESCRIPTION]: "Implement AI-powered chatbot to handle customer inquiries",
    [IssueShapeKeys.START_DATE]: new Date("2024-06-01"),
    [IssueShapeKeys.END_DATE]: new Date("2024-06-30"),
    [IssueShapeKeys.PROGRESS]: 60,
    [IssueShapeKeys.CATEGORY]: "Advance Capabilities",
    [IssueShapeKeys.TEAM]: "Retail",
    [IssueShapeKeys.PRIORITY]: "High"
  }
];

// 数据分组工具函数
function groupTimelineItemsByField(
  items: IssueShape[], 
  groupBy: keyof IssueShape
): SortedTimelineData<IssueShape> {
  const groupMap: { [key: string]: IssueShape[] } = {};
  
  items.forEach(item => {
    const groupValue = String(item[groupBy]);
    if (!groupMap[groupValue]) {
      groupMap[groupValue] = [];
    }
    groupMap[groupValue].push(item);
  });

  const data = Object.entries(groupMap).map(([groupTitle, groupItems]) => ({
    groupTitle,
    groupItems
  }));

  return {
    meta: { sortBy: groupBy },
    data
  };
}

const TimelineContent: React.FC = () => {
  // 可分组的字段类型
  type GroupableField = keyof IssueShape;

  // 设置默认分组字段
  const [groupBy, setGroupBy] = useState<GroupableField>(IssueShapeKeys.TEAM);

  // 禁用 body 滚动和浏览器左滑右滑手势
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalOverscrollBehaviorX = document.body.style.overscrollBehaviorX;
    const originalHtmlOverscrollBehaviorX =
      document.documentElement.style.overscrollBehaviorX;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehaviorX = "none";
    document.documentElement.style.overscrollBehaviorX = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehaviorX = originalOverscrollBehaviorX;
      document.documentElement.style.overscrollBehaviorX =
        originalHtmlOverscrollBehaviorX;
    };
  }, []);

  const handleGroupByChange = (newGroupBy: GroupableField) => {
    setGroupBy(newGroupBy);
  };

  // 准备Timeline数据
  const timelineData = groupTimelineItemsByField(mockExampleIssues, groupBy);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 顶部控制面板 */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
          flexShrink: 0,
        }}
      >
        <h2 style={{ margin: "0 0 16px 0", color: "#333" }}>
          Timeline 演示 - 示例数据
        </h2>
        <p style={{ margin: "0 0 16px 0", color: "#666", fontSize: "14px" }}>
          这个示例展示了Timeline组件使用示例数据的时间线展示。
        </p>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <label style={{ fontWeight: "bold", color: "#333" }}>
            分组方式：
          </label>

          <button
            onClick={() => handleGroupByChange(IssueShapeKeys.TEAM)}
            style={{
              padding: "8px 16px",
              backgroundColor: groupBy === IssueShapeKeys.TEAM ? "#007bff" : "#e9ecef",
              color: groupBy === IssueShapeKeys.TEAM ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            团队
          </button>

          <button
            onClick={() => handleGroupByChange(IssueShapeKeys.STATUS)}
            style={{
              padding: "8px 16px",
              backgroundColor: groupBy === IssueShapeKeys.STATUS ? "#007bff" : "#e9ecef",
              color: groupBy === IssueShapeKeys.STATUS ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            状态
          </button>

          <button
            onClick={() => handleGroupByChange(IssueShapeKeys.CATEGORY)}
            style={{
              padding: "8px 16px",
              backgroundColor: groupBy === IssueShapeKeys.CATEGORY ? "#007bff" : "#e9ecef",
              color: groupBy === IssueShapeKeys.CATEGORY ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            类别
          </button>

          <button
            onClick={() => handleGroupByChange(IssueShapeKeys.PRIORITY)}
            style={{
              padding: "8px 16px",
              backgroundColor: groupBy === IssueShapeKeys.PRIORITY ? "#007bff" : "#e9ecef",
              color: groupBy === IssueShapeKeys.PRIORITY ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            优先级
          </button>

          <button
            onClick={() => handleGroupByChange(IssueShapeKeys.NAME)}
            style={{
              padding: "8px 16px",
              backgroundColor: groupBy === IssueShapeKeys.NAME ? "#007bff" : "#e9ecef",
              color: groupBy === IssueShapeKeys.NAME ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            项目名称
          </button>
        </div>
      </div>

      {/* Timeline 组件 */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Timeline<IssueShape>
          inputData={timelineData}
        />
      </div>
    </div>
  );
};

export const Element: React.FC = () => {
  return <TimelineContent />;
}; 