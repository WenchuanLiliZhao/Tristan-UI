import React, { useState, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import { RightSidebar, TristanLayoutContent, Button } from "../../../ui-components";
import { Timeline, type TimelineRef } from "./Timeline";
import { IssueDetails } from "./IssueDetails";
import type { TimelineProps, TimelineItemType } from "../types";
import { useTimelineUrlParams } from "../hooks/useTimelineUrlParams";
import { TimelineConst } from "./_constants";

// TimelineView 组件的公共方法接口
export interface TimelineViewRef {
  scrollToDate: (date: Date) => void;
}

// Reusable Timeline view with integrated right sidebar displaying issue details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TimelineView = forwardRef<TimelineViewRef, TimelineProps<any>>(function TimelineView<T = Record<string, unknown>>(props: TimelineProps<T>, ref: React.Ref<TimelineViewRef>) {
  const [selectedItem, setSelectedItem] = useState<TimelineItemType<T> | null>(null);
  const timelineRef = useRef<TimelineRef>(null);
  
  // 内部 cellHeight 状态管理（仅在显示控件时使用）
  const [internalCellHeight, setInternalCellHeight] = useState<number | undefined>(props.cellHeight);
  
  // URL 参数管理
  const urlParamsHook = useTimelineUrlParams(props.urlParams);
  
  // 滚动到日期的回调函数
  const handleScrollToDate = useCallback((date: Date) => {
    timelineRef.current?.scrollToDate(date);
  }, []);

  // 暴露组件的公共方法
  useImperativeHandle(ref, () => ({
    scrollToDate: handleScrollToDate,
  }), [handleScrollToDate]);

  // When a timeline item is clicked, update local state and forward the event if provided
  const handleItemClick = (item: TimelineItemType<T>) => {
    props.onItemClick?.(item);
    
    // Only set selected item if issueDetailsConfig is provided
    if (props.issueDetailsConfig) {
      setSelectedItem(item);
    }
  };

  // 从 URL 参数中获取初始 groupBy（如果配置了且 URL 中有值）
  const effectiveGroupBy = (() => {
    if (props.urlParams?.recordGroupby && urlParamsHook.urlGroupBy) {
      // 验证 URL 中的 groupBy 是否在 groupByOptions 中
      if (props.groupByOptions) {
        const validOption = props.groupByOptions.find(
          option => String(option.field) === urlParamsHook.urlGroupBy
        );
        if (validOption) {
          return validOption.field;
        }
      }
    }
    return props.groupBy;
  })();

  // 确定最终使用的 cellHeight
  const finalCellHeight = props.showCellHeightControls ? internalCellHeight : props.cellHeight;

  // 渲染 cellHeight 控制条
  const renderCellHeightControls = () => {
    if (!props.showCellHeightControls) return null;

    const defaultHeight = TimelineConst.cellHeight;
    
    return (
      <div style={{ 
        padding: '12px 16px', 
        display: 'flex', 
        gap: '12px', 
        alignItems: 'center', 
        backgroundColor: '#f8f9fa', 
        borderBottom: '1px solid #e9ecef',
        borderRadius: '4px 4px 0 0'
      }}>
        <span style={{ fontWeight: '600', color: '#495057' }}>Cell Height:</span>
        <Button 
          variant={internalCellHeight === undefined ? "filled" : "outlined"}
          onClick={() => setInternalCellHeight(undefined)}
          size="small"
        >
          Default ({defaultHeight}px)
        </Button>
        <Button 
          variant={internalCellHeight === 60 ? "filled" : "outlined"}
          onClick={() => setInternalCellHeight(60)}
          size="small"
        >
          Compact (60px)
        </Button>
        <Button 
          variant={internalCellHeight === 96 ? "filled" : "outlined"}
          onClick={() => setInternalCellHeight(96)}
          size="small"
        >
          Large (96px)
        </Button>
        <span style={{ marginLeft: '8px', color: '#6c757d', fontSize: '14px' }}>
          Current: {internalCellHeight ?? defaultHeight}px
        </span>
      </div>
    );
  };

  return (
    <TristanLayoutContent
      main={
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {renderCellHeightControls()}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Timeline
              ref={timelineRef}
              {...props}
              groupBy={effectiveGroupBy}
              onItemClick={handleItemClick}
              cellHeight={finalCellHeight}
            />
          </div>
        </div>
      }
      right={
        <RightSidebar
          isOpen={Boolean(selectedItem && props.issueDetailsConfig)}
          onClose={() => setSelectedItem(null)}
          width={400}
          title={props.issueDetailsConfig?.title}
        >
          {selectedItem && props.issueDetailsConfig && (
            <IssueDetails<T>
              item={selectedItem}
              config={props.issueDetailsConfig}
              onScrollToDate={handleScrollToDate}
            />
          )}
        </RightSidebar>
      }
    />
  );
});