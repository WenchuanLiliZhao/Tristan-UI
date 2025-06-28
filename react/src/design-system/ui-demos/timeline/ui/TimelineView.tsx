import React, { useState } from "react";
import { RightSidebar, TristanLayoutContent } from "../../../ui-components";
import { Timeline } from "./Timeline";
import { IssueDetails } from "./IssueDetails";
import type { TimelineProps, TimelineItemType } from "../types";
import type { IssueDetailsConfig } from "../issueDetailsConfig";

interface TimelineViewProps<T = Record<string, unknown>> extends TimelineProps<T> {
  /** Configuration for the IssueDetails component */
  issueDetailsConfig?: IssueDetailsConfig<T>;
}

// Reusable Timeline view with integrated right sidebar displaying issue details
export function TimelineView<T = Record<string, unknown>>(props: TimelineViewProps<T>): React.ReactElement {
  const [selectedItem, setSelectedItem] = useState<TimelineItemType<T> | null>(null);

  // When a timeline item is clicked, update local state and forward the event if provided
  const handleItemClick = (item: TimelineItemType<T>) => {
    props.onItemClick?.(item);
    setSelectedItem(item);
  };

  return (
    <TristanLayoutContent
      main={
        <Timeline<T>
          {...props}
          onItemClick={handleItemClick}
        />
      }
      right={
        <RightSidebar
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          width={400}
        >
          {selectedItem && (
            <IssueDetails<T>
              item={selectedItem}
              config={props.issueDetailsConfig}
            />
          )}
        </RightSidebar>
      }
    />
  );
}