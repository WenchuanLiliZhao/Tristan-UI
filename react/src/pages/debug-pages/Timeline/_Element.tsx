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

      // 2. Progress (Custom Colors): Uncomment the code below to see it in action.
      // You will need to import `getRainbowColor` from "../../../styles/color".
      //
      createFieldConfig.progress<ProjectDataType>("progress", {
        progressColors: [
          { upto: 30, color: getRainbowColor("amber") },
          { upto: 70, color: getRainbowColor("blue") },
          { upto: 100, color: getRainbowColor("emerald") },
        ],
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

  // 🎯 IssueDetails 详情配置示例
  const issueDetailsConfig = IssueDetailsConfigBuilder.create<ProjectDataType>()
    .setPropertyOrder([
      "name",
      "id",
      "riskLevel",
      "projectKey",
      "status",
      "priority",
      "progress",
      "team",
      "category",
      "startDate",
      "endDate",
    ])
    // 自定义 Tag 显示的映射与标签
    .addPropertyMapping("status", {
      label: "Status",
      displayType: "tag",
      // 复用前面定义的 status 映射（name、color、icon）
      valueMapping: status,
    })
    .addPropertyMapping("riskLevel", {
      label: "Risk Level",
      displayType: "tag",
      // 复用前面定义的 status 映射（name、color、icon）
      valueMapping: riskLevel,
    })
    // progress 字段显式指定为进度条
    .addPropertyMapping("progress", {
      label: "Progress",
      displayType: "progress",
    })

    
    .build();

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
          // fetchByTimeInterval={[new Date("2023-12-01"), new Date("2024-12-30")]}
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
