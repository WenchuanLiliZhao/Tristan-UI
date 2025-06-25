import React from "react";
import styles from "./Item.module.scss";
import {
  type TimelineItemType,
  type TimelineItemDisplayConfig,
  type FieldDisplayConfig,
} from "../../data/types";
import { TimelineConst } from "../_constants";
import { Icon, ProgressCircle, Tag } from "../../../../ui-components";
import type { Color } from "../../../../ui-components/types";
import type { RainbowColorName } from "../../../../../styles/color";
import { getRainbowColor, rainbowColorNames } from "../../../../../styles/color";

interface TimelineItemProps {
  item: TimelineItemType;
  durationInDays: number;
  dayWidth: number;
  cellHeight: number;
  column: number;
  onIssueClick?: (issue: TimelineItemType) => void;
  displayConfig?: TimelineItemDisplayConfig;
}

// 渲染图形信息区域的字段
const renderGraphicField = (
  item: TimelineItemType,
  config: FieldDisplayConfig,
  index: number
) => {
  if (
    config.visible === false ||
    (typeof config.visible === "function" && !config.visible(item))
  ) {
    return null;
  }

  const fieldValue = item[config.field as keyof typeof item];
  let displayProps: Record<string, unknown> = {};

  if (config.mapping) {
    if (typeof config.mapping === "function") {
      displayProps = config.mapping(fieldValue);
    } else if (typeof fieldValue === "string" && config.mapping[fieldValue]) {
      displayProps = config.mapping[fieldValue];
    }
  }

  const key = `${item.id}-${String(config.field)}-${index}`;

  switch (config.displayType) {
    case "icon": {
      // 处理颜色：如果是RainbowColorName，转换为CSS变量
      const iconColor = displayProps.color;
      const iconStyle: React.CSSProperties = {};
      
      if (iconColor) {
        if (typeof iconColor === 'string') {
          // 如果是rainbowColorName，转换为CSS变量
          if (Object.values(rainbowColorNames).includes(iconColor as RainbowColorName)) {
            iconStyle.color = `var(${getRainbowColor(iconColor as RainbowColorName)})`;
          } else {
            // 其他颜色直接使用
            iconStyle.color = iconColor;
          }
        }
      }
      
      return (
        <div key={key} className={styles["timeline-item-icon"]}>
          <Icon
            name={
              (displayProps.iconName as string) ||
              (displayProps.icon as string) ||
              "help"
            }
            style={iconStyle}
          />
        </div>
      );
    }
    case "progress":
      return (
        <ProgressCircle
          key={key}
          progress={
            (displayProps.value as number) || (fieldValue as number) || 0
          }
          size={"small"}
          color={displayProps.color as Color}
          // showText={displayProps.showText as boolean}
        />
      );
    default:
      return null;
  }
};

// 渲染标签区域的字段
const renderTagField = (
  item: TimelineItemType,
  config: FieldDisplayConfig,
  index: number
) => {
  if (
    config.visible === false ||
    (typeof config.visible === "function" && !config.visible(item))
  ) {
    return null;
  }

  const fieldValue = item[config.field as keyof typeof item];
  let displayProps: Record<string, unknown> = {};

  if (config.mapping) {
    if (typeof config.mapping === "function") {
      displayProps = config.mapping(fieldValue);
    } else if (typeof fieldValue === "string" && config.mapping[fieldValue]) {
      displayProps = config.mapping[fieldValue];
    }
  }

  const tagText =
    (displayProps.text as string) ||
    (displayProps.name as string) ||
    String(fieldValue);
  const key = `${item.id}-${String(config.field)}-${index}`;

  return (
    <Tag
      key={key}
      variant={
        (displayProps.variant as "contained" | "outlined") || "contained"
      }
      size="small"
      color={displayProps.color as Color | RainbowColorName}
    >
      {tagText}
    </Tag>
  );
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  durationInDays,
  dayWidth,
  cellHeight,
  column,
  onIssueClick,
  displayConfig,
}) => {
  return (
    <div className={styles["timeline-item"]}>
      <div
        className={styles["timeline-item-container"]}
        style={{
          height: cellHeight - TimelineConst.itemVPadding * 2,
          width: durationInDays * dayWidth - TimelineConst.itemHPadding * 2 - 1,
          position: "absolute",
          top: `${
            column * cellHeight +
            TimelineConst.groupGap / 2 +
            TimelineConst.itemVPadding
          }px`,
          left: `${TimelineConst.itemHPadding}px`,
          cursor: onIssueClick ? "pointer" : "default",
        }}
        onClick={() => onIssueClick?.(item)}
      >
        <div className={styles["timeline-item-graphic-info"]}>
          {displayConfig?.graphicFields?.map((config, index) =>
            renderGraphicField(item, config, index)
          )}
        </div>
        <div className={styles["timeline-item-text-info"]}>
          <div className={styles["timeline-item-name"]}>{item.name}</div>
          <div className={styles["timeline-item-tags"]}>
            {displayConfig?.tagFields?.map((config, index) =>
              renderTagField(item, config, index)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
