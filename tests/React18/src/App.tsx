import "tristan-ui/dist/tristan-ui.css";

// 导入 Timeline 相关组件和类型（现在从 tristan-ui 库导入）
import { Timeline } from "../../../app/src/design-system/ui-demos/timeline/ui/Timeline";
import { groupTimelineItemsByField } from "../../../app/src/design-system/ui-demos/timeline/data/utils";
import { ExampleData, type ProjectDataType } from "./example-data";

function App() {

  return (
    <div>
      <Timeline<ProjectDataType>
        inputData={groupTimelineItemsByField(ExampleData, "category")}
      />
    </div>
  );
}

export default App;