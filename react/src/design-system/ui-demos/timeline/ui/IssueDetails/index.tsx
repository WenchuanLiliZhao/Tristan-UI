import React from "react";
import type { TimelineItemType } from "../../types";
import type {
  IssueDetailsConfig,
  PropertyMappingConfig,
} from "../../issueDetailsConfig";
import {
  TextField,
  DateField,
  ProgressField,
  TagField,
  LinkField,
  PropertyFieldsTable,
  Button,
} from "../../../../ui-components";


interface IssueDetailsProps<T = Record<string, unknown>> {
  /** The issue/item to display */
  item: TimelineItemType<T>;
  /** Configuration object controlling how properties are displayed */
  config?: IssueDetailsConfig<T>;
  /** Callback function to scroll to a specific date on the timeline */
  onScrollToDate?: (date: Date) => void;
}

// Default property order for timeline items
const DEFAULT_PROPERTY_ORDER = [
  "id",
  "name",
  "startDate",
  "endDate",
  "status",
  "priority",
  "team",
  "progress",
  "category",
  "riskLevel",
  "projectKey",
];

// Default property labels
const DEFAULT_PROPERTY_LABELS: Record<string, string> = {
  id: "ID",
  name: "Name",
  startDate: "Start Date",
  endDate: "End Date",
  status: "Status",
  priority: "Priority",
  team: "Team",
  progress: "Progress",
  category: "Category",
  riskLevel: "Risk Level",
  projectKey: "Project Key",
};

// Helper function to check if a value is empty or meaningless
const isEmptyValue = (value: unknown): boolean => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) return true;
  return false;
};

export function IssueDetails<T = Record<string, unknown>>({
  item,
  config = {},
  onScrollToDate,
}: IssueDetailsProps<T>): React.ReactElement {
  // Determine the final property order
  const finalOrder =
    config.propertyOrder && config.propertyOrder.length > 0
      ? (config.propertyOrder as string[])
      : DEFAULT_PROPERTY_ORDER;

  // Filter only non-empty properties
  const availableProperties = finalOrder.filter(
    (key) =>
      key in item &&
      !isEmptyValue(item[key as keyof typeof item])
  );

  // Decide which specialized field component to render
  const renderField = (key: string, value: unknown): React.ReactNode => {
    const mappingConfig = config.propertyMappings?.[key as keyof T | string] as
      | PropertyMappingConfig
      | undefined;
    const displayOptions = mappingConfig?.displayOptions || {};
    const displayType = mappingConfig?.displayType;

    if (
      displayType === "tag" ||
      (mappingConfig?.valueMapping && typeof value === "string")
    ) {
      // Tag mapping
      const mapping = mappingConfig?.valueMapping;
      if (mapping && typeof value === "string" && mapping[value]) {
        const mapped = mapping[value];
        return (
          <TagField
            key={key}
            label={getLabel(key)}
            name={mapped.name}
            color={mapped.color}
            icon={mapped.icon}
            variant={displayOptions.tagVariant}
            size={"medium"}
          />
        );
      } else if (displayType === "tag") {
        // Fallback for tag displayType without mapping
        return (
          <TagField
            key={key}
            label={getLabel(key)}
            name={String(value)}
            color={displayOptions.color || "primary"}
            variant={displayOptions.tagVariant}
            size={"medium"}
          />
        );
      }
    }

    if (displayType === "progress" && typeof value === "number") {
      return (
        <ProgressField
          key={key}
          label={getLabel(key)}
          value={Number(value)}
          color={displayOptions.progressColor}
        />
      );
    }

    if (
      displayType === "date" &&
      (value instanceof Date || typeof value === "string")
    ) {
      const dateValue = value instanceof Date ? value : new Date(value);
      return (
        <DateField
          key={key}
          label={getLabel(key)}
          value={dateValue}
          format={displayOptions.dateFormat}
          locale={displayOptions.locale}
          color={displayOptions.color}
        />
      );
    }

    if (displayType === "text") {
      return (
        <TextField
          key={key}
          label={getLabel(key)}
          value={String(value)}
          color={displayOptions.color}
        />
      );
    }

    if (displayType === "link" && typeof value === "string") {
      // Handle link template if provided
      let url = value;
      if (displayOptions.linkTemplate) {
        url = displayOptions.linkTemplate.replace("{value}", value);
      }

      return (
        <LinkField
          key={key}
          label={getLabel(key)}
          url={url}
          text={displayOptions.linkText}
          icon={displayOptions.linkIcon}
          openInNewTab={displayOptions.openInNewTab}
          semantic={displayOptions.linkSemantic}
        />
      );
    }

    // Auto-detect based on value type
    if (value instanceof Date) {
      return (
        <DateField
          key={key}
          label={getLabel(key)}
          value={value}
          format={displayOptions.dateFormat}
          locale={displayOptions.locale}
          color={displayOptions.color}
        />
      );
    }

    // default text
    return (
      <TextField
        key={key}
        label={getLabel(key)}
        value={String(value)}
        color={displayOptions.color}
      />
    );
  };

  const getLabel = (key: string): string => {
    const mappingConfig = config.propertyMappings?.[key as keyof T | string] as
      | PropertyMappingConfig
      | undefined;
    // If label is explicitly set to empty string, return empty string
    if (mappingConfig?.label === "") {
      return "";
    }
    return mappingConfig?.label || DEFAULT_PROPERTY_LABELS[key] || key;
  };

  const handleScrollToStartDate = () => {
    if (onScrollToDate && item.startDate) {
      const startDate = item.startDate instanceof Date ? item.startDate : new Date(item.startDate);
      onScrollToDate(startDate);
    }
  };

  return (
    <PropertyFieldsTable>

      {/* 滚动到这个 issue 的开始日期的按钮 - 只有当 startDate 存在时才显示 */}
      {item.startDate && (
        <Button onClick={handleScrollToStartDate}>Find on Timeline</Button>
      )}
      
      {availableProperties.map((key) => {
        const value = item[key as keyof typeof item];
        return renderField(key, value);
      })}
    </PropertyFieldsTable>
  );
}
