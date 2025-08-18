
import { createFieldConfig, createSidebarProperty, IssueDetailsConfigBuilder } from "../../../../design-system/ui-demos";
import type { ProjectDataType } from "./data-init";
import { CNInitiative, Function, Priority, RistLevel, Status } from "./data-types";

// 🎯 定义缩放级别配置
export const zoomLevels = [
  { label: "Months", dayWidth: 24, setAsDefault: true },
  { label: "Quarters", dayWidth: 8 },
  { label: "Years", dayWidth: 4.5 },
];

// 🎯 定义分组选项配置
export const groupByOptions = [
  { label: "Goal", field: "Goal" as const, setAsDefault: true },
  { label: "Type", field: "Type" as const },
  { label: "Function", field: "Function" as const },
  { label: "Status", field: "Status" as const },
];


// 🎯 定义项目卡片显示配置
export const itemDisplayConfigSimple = {
  graphicFields: [
    createFieldConfig.progress<ProjectDataType>("Progress", {
      inprogressColor: (item) => RistLevel[item["Risk Level"]].color,
    }),
    createFieldConfig.iconFromMap<ProjectDataType>("Priority", Priority),
  ],

  tagFields: [
    createFieldConfig.tagFromMap<ProjectDataType>("CN Initiative", CNInitiative),
    // createFieldConfig.tagFromMap<ProjectDataType>("Function", Function),
  ],

  // 🎨 配置边框颜色 - 基于团队 (Function) 字段
  borderColor: {
    field: "Function" as const,
    mapping: Function
  }
};


// 🎯 定义分组标题下的属性配置
export const groupTitleProperties = [
  createSidebarProperty.fromProgressField<ProjectDataType>("Progress", {
    label: "Progress",
    maxValueOfEachItem: 100,
  }),
]


// 🎯 详情 right sidebar 配置
export const issueDetailsConfig = IssueDetailsConfigBuilder.create()
  .setTitle("Initiative Details")
  .setPropertyOrder([
    { 
      property: "jiraLink", 
      label: "",
      displayType: "link",
      displayOptions: {
        linkText: "View in Jira",
        openInNewTab: true
      }
    },
    { property: "name", label: "Initivative", displayType: "text" },
    { property: "CN Initiative", label: "CN Initiative", displayType: "text" },
    
    { property: "Status", displayType: "tag", valueMapping: Status },
    { property: "Progress", displayType: "progress" },
    { property: "Risk Level", displayType: "tag", valueMapping: RistLevel },
    { property: "Function", label: "Team (Function)", displayType: "tag", valueMapping: Function },
    { property: "Goal", displayType: "text" },
    { property: "Type", label: "Initiative Type", displayType: "text" },
    { property: "Owner", displayType: "text" },
    { property: "Budget Owner", displayType: "text" },
    { property: "Intake", displayType: "text" },
    { property: "Priority", displayType: "tag", valueMapping: Priority },
    
  ]).build()