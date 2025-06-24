import React from "react";
import {
  Timeline,
  groupTimelineItemsByField,
} from "../../design-system/ui-demos";
import {
  type TimelineConfigType,
  createFieldConfig,
} from "../../design-system/ui-demos/timeline/data/types";
import {
  ExampleData,
  type ProjectDataType,
  status,
  team,
  priority,
  riskLevel,
} from "./example-data";

export function Element(): React.ReactElement {
  // 🎯 方式 1: 使用 createFieldConfig 简化配置
  const itemDisplayConfigSimple = {
    graphicFields: [
      createFieldConfig.progress<ProjectDataType>("progress"),
      createFieldConfig.iconFromMap<ProjectDataType>("priority", priority),
    ],
    tagFields: [
      createFieldConfig.tagFromMap<ProjectDataType>("status", status),
      createFieldConfig.tagFromMap<ProjectDataType>("team", team),
      createFieldConfig.tagFromMap<ProjectDataType>("riskLevel", riskLevel, {
        // variant: "outlined",
        hideValue: "low", // 自动隐藏低风险项目
      }),
    ],
  };

  // 🎯 方式 2 和 3 的示例代码在下方注释中展示

  // Timeline 配置 - 这里使用方式 1
  const timelineConfig: TimelineConfigType<ProjectDataType> = {
    groupBy: "category",
    itemDisplayConfig: itemDisplayConfigSimple,
  };

  // 按分类分组数据
  const sortedData = groupTimelineItemsByField(ExampleData, "category");

  return (
    <Timeline<ProjectDataType> init={timelineConfig} inputData={sortedData} />
  );
}
