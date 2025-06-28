import React, { useState, useMemo } from "react";
import { RightSidebar, TristanLayoutContent } from "../../../ui-components";
import { Timeline } from "./Timeline";
import { IssueDetails } from "./IssueDetails";
import type { TimelineProps, TimelineItemType } from "../types";

interface TimelineViewProps<T = Record<string, unknown>> extends TimelineProps<T> {
  /** Custom mappings for displaying property values consistently in the sidebar */
  propertyMappings?: Record<string, Record<string, { name: string; color: string; icon?: string }>>;
}

// Reusable Timeline view with integrated right sidebar displaying issue details
export function TimelineView<T = Record<string, unknown>>(props: TimelineViewProps<T>): React.ReactElement {
  const [selectedItem, setSelectedItem] = useState<TimelineItemType<T> | null>(null);

  // Derive property mappings from sidebarProperties when not explicitly provided
  const effectivePropertyMappings = useMemo(() => {
    if (props.propertyMappings) return props.propertyMappings;

    const mappings: Record<string, Record<string, { name: string; color: string; icon?: string }>> = {};

    props.sidebarProperties?.forEach((prop) => {
      mappings[String(prop.field)] = prop.mapping as Record<string, { name: string; color: string; icon?: string }>;
    });

    // Attempt to extract mappings from init config (graphicFields and tagFields)
    const fields = [
      ...(props.init?.graphicFields ?? []),
      ...(props.init?.tagFields ?? []),
    ];

    fields.forEach((fieldConfig) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const sourceMap = fieldConfig.mapping?._sourceMap as Record<string, { name?: string; color: string; icon?: string }> | undefined;
      if (sourceMap) {
        const key = String(fieldConfig.field);
        // Only add if not already present
        if (!mappings[key]) {
          mappings[key] = sourceMap as Record<string, { name: string; color: string; icon?: string }>;
        }
      }
    });

    return mappings;
  }, [props.propertyMappings, props.sidebarProperties, props.init]);

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
              propertyOrder={props.propertyOrder}
              propertyMappings={effectivePropertyMappings}
            />
          )}
        </RightSidebar>
      }
    />
  );
}