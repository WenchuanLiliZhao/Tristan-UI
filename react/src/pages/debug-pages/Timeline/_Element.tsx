import React from "react";
import {
  TimelineView,
  createFieldConfig,
  createSidebarProperty,
} from "../../../design-system/ui-demos/timeline";
import {
  ExampleData,
  priority,
  team,
  status,
  type ProjectDataType,
  riskLevel,
} from "./example-data";
import { getRainbowColor } from "../../../styles";
import {
  NavTitle,
  TopNav,
  TristanLayout,
  TristanLogo,
} from "../../../design-system/ui-components";
import { IssueDetailsConfigBuilder } from "../../../design-system/ui-demos/timeline/issueDetailsConfig";

export function Element(): React.ReactElement {
  // 🎯 定义缩放级别配置
  const zoomLevels = [
    // { label: "Days", dayWidth: 32 },
    { label: "Months", dayWidth: 24 },
    { label: "Quarters", dayWidth: 8, setAsDefault: true },
    { label: "Years", dayWidth: 4.5 },
  ];

  // 🎯 定义分组选项配置
  const groupByOptions = [
    { label: "Category", field: "category" as const, setAsDefault: true },
    { label: "Team", field: "team" as const },
    { label: "Priority", field: "priority" as const },
  ];

  // 🎯 Method 1: Use createFieldConfig to simplify configuration
  const itemDisplayConfigSimple = {
    graphicFields: [
      // 1. Progress: Default color behavior.
      // - If progress < 100, color is 'active'.
      // - If progress = 100, color is 'success'.
      // createFieldConfig.progress<ProjectDataType>("progress"),

      // 2. Progress (Custom Colors): Three ways to define custom colors.
      // You will need to import `getRainbowColor` from "../../../styles/color".
      //
      // Method A: Static colors
      //   inprogressColor: getRainbowColor("amber"),
      //   doneColor: getRainbowColor("emerald"),
      //
      // Method B: Dynamic colors based on item properties (current example)
      //   inprogressColor: (item) => riskLevel[item.riskLevel].color,
      //
      // Method C: Complex color ranges with multiple stops
      //   progressColors: [
      //     { upto: 30, color: getRainbowColor("amber") },
      //     { upto: 70, color: getRainbowColor("blue") },
      //     { upto: 100, color: getRainbowColor("emerald") },
      //   ]
      //
      createFieldConfig.progress<ProjectDataType>("progress", {
        inprogressColor: (item) => riskLevel[item.riskLevel].color,
        doneColor: getRainbowColor("emerald"),
      }),

      createFieldConfig.iconFromMap<ProjectDataType>("priority", priority),
    ],
    tagFields: [createFieldConfig.tagFromMap<ProjectDataType>("team", team)],
  };

  // 🎯 配置sidebar属性分布可视化
  const sidebarProperties = [
    createSidebarProperty.fromMap<ProjectDataType>("status", status, {
      label: "Status",
      showCount: false,
    }),
    createSidebarProperty.fromMap<ProjectDataType>("team", team, {
      label: "Teams",
      showCount: false,
    }),
    // createSidebarProperty.fromMap<ProjectDataType>("priority", priority, {
    //   label: "Priority",
    //   showCount: false,
    // }),
  ];


  {/* 🎯 IssueDetails 详情配置示例: */}
  const issueDetailsConfig = IssueDetailsConfigBuilder.create<ProjectDataType>()
    .setTitle("Project Details") // 自定义sidebar标题
    .setPropertyOrder([
      { property: "projectKey", displayType: "text" },
      { property: "name", displayType: "text" },
      { 
        property: "riskLevel", 
        displayType: "tag", 
        valueMapping: riskLevel,
        label: "Risk Level"
      },
      
      { 
        property: "status", 
        displayType: "tag", 
        valueMapping: status,
        label: "Status"
      },
      { 
        property: "priority", 
        displayType: "tag", 
        valueMapping: priority,
        label: "Priority"
      },
      { 
        property: "progress", 
        displayType: "progress",
        label: "Progress" 
      },
      { 
        property: "team", 
        displayType: "text", 
        displayOptions: { 
          color: "var(--color--semantic-active)",
          fontWeight: "medium" 
        }
      },
      { property: "category", displayType: "text" },
      { 
        property: "startDate", 
        displayType: "date",
        displayOptions: { dateFormat: "medium" }
      },
      { 
        property: "endDate", 
        displayType: "date",
        displayOptions: { dateFormat: "medium" }
      },
    ])
    .build();

  {/* 🎯 可选配置示例：注释掉上面的配置，取消注释下面这行，体验无 issue details 的效果 */}
  // const issueDetailsConfig = undefined;

  return (
    <TristanLayout
      top={
        <TopNav
          left={[
            <TristanLogo width={32} height={32} />,
            <NavTitle title="Roadmap of lululemon Initiatives" />,
          ]}
          right={[]}
        />
      }
      main={
        <TimelineView<ProjectDataType>
          // fetchByTimeInterval={[new Date("2025-01-01"), new Date("2025-12-30")]}
          init={itemDisplayConfigSimple}
          inputData={ExampleData}
          groupByOptions={groupByOptions}
          groupTitleProperties={sidebarProperties}
          defaultDayWidth={24} // 直接使用dayWidth状态
          zoomLevels={zoomLevels}
          issueDetailsConfig={issueDetailsConfig}
        />
      }
    />
  );
}
