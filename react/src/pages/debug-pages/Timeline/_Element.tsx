import React from "react";
import {
  Timeline,
  createFieldConfig,
} from "../../../design-system/ui-demos/timeline";
import {
  ExampleData,
  priority,
  team,
  type ProjectDataType,
} from "./example-data";
import { getRainbowColor } from "../../../styles";

export function Element(): React.ReactElement {
  // 🎯 统一的dayWidth状态管理
  const [dayWidth] = React.useState<number>(8); // 默认为Quarters

  // 🎯 定义缩放级别配置
  const zoomLevels = [
    // { label: "Days", dayWidth: 32 },
    { label: "Months", dayWidth: 24 },
    { label: "Quarters", dayWidth: 8, setAsDefault: true },
    { label: "Years", dayWidth: 4.5 },
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

  return (
    <div style={{ height: "100vh" }}>
      {/* 🎉 Timeline使用统一的dayWidth状态 */}
      <Timeline<ProjectDataType>
        // fetchByTimeInterval={[new Date("2023-12-01"), new Date("2024-12-30")]}
        init={itemDisplayConfigSimple}
        inputData={ExampleData}
        groupBy="category"
        defaultDayWidth={dayWidth} // 直接使用dayWidth状态
        zoomLevels={zoomLevels} // 暂时注释掉，使用slider控制
      />
    </div>
  );
}
