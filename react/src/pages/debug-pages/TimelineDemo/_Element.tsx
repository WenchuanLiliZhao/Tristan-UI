import { useRef } from "react";

import { jiraData } from "./data/jira-data";
import {
  TimelineView,
  type TimelineViewRef,
} from "../../../design-system/ui-demos";
import {
  groupByOptions,
  groupTitleProperties,
  issueDetailsConfig,
  itemDisplayConfigSimple,
  zoomLevels,
} from "./data/ui-init";
import { Layout } from "./Layout";

export const Element = () => {
  const timelineRef = useRef<TimelineViewRef>(null);

  return (
    <Layout>
      <TimelineView
        fetchByTimeInterval={[new Date("2025-05-01"), new Date("2025-07-31")]}
        ref={timelineRef}
        inputData={jiraData}
        groupByOptions={groupByOptions}
        zoomLevels={zoomLevels}
        init={itemDisplayConfigSimple}
        groupTitleProperties={groupTitleProperties}
        issueDetailsConfig={issueDetailsConfig}
        urlParams={{
          defaultToday: true,
          recordGroupby: true,
          recordCurrentDate: true,
        }}
      />
    </Layout>
  );
};
