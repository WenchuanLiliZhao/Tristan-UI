import { groupTimelineItemsByField, Timeline } from "../../design-system/ui-demos";
import { ExampleData, type ProjectDataType } from "./example-data";


export const Element: React.FC = () => {
  // 使用工具函数按指定字段分组数据
  const groupedData = groupTimelineItemsByField(ExampleData, "category");

  return (
    <div>
      <Timeline<ProjectDataType>
        inputData={groupedData}
      />
    </div>
  );
}; 