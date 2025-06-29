import React, { useState } from "react";
import { RightSidebar, TristanLayoutContent } from "../../../ui-components";
import { Timeline } from "./Timeline";
import { IssueDetails } from "./IssueDetails";
import type { TimelineProps, TimelineItemType } from "../types";

// Reusable Timeline view with integrated right sidebar displaying issue details
export function TimelineView<T = Record<string, unknown>>(props: TimelineProps<T>): React.ReactElement {
  const [selectedItem, setSelectedItem] = useState<TimelineItemType<T> | null>(null);

  // When a timeline item is clicked, update local state and forward the event if provided
  const handleItemClick = (item: TimelineItemType<T>) => {
    props.onItemClick?.(item);
    
    // Only set selected item if issueDetailsConfig is provided
    if (props.issueDetailsConfig) {
      setSelectedItem(item);
    }
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
          isOpen={Boolean(selectedItem && props.issueDetailsConfig)}
          onClose={() => setSelectedItem(null)}
          width={400}
        >
          {selectedItem && props.issueDetailsConfig && (
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