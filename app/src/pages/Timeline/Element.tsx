import React, { useState, useEffect } from "react";
import { type GroupableFieldValue, GroupableFields, groupIssuesByField } from "../../demos/Timeline/data-layer";
import { Timeline } from "../../demos/Timeline/design-system";
import { AllExampleIssues } from "../../demos/Timeline/example-data";
// 使用新的示例数据入口


// 创建时间线内容组件
export const Element: React.FC = () => {
  const [groupBy, setGroupBy] = useState<GroupableFieldValue>(GroupableFields.CATEGORY);

  // 禁用 body 滚动和浏览器左滑右滑手势
  useEffect(() => {
    // 保存原始样式
    const originalOverflow = document.body.style.overflow;
    const originalOverscrollBehaviorX = document.body.style.overscrollBehaviorX;
    const originalHtmlOverscrollBehaviorX = document.documentElement.style.overscrollBehaviorX;
    
    // 禁用滚动和滑动手势
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehaviorX = 'none';
    document.documentElement.style.overscrollBehaviorX = 'none';
    
    // 清理函数：组件卸载时恢复所有样式
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehaviorX = originalOverscrollBehaviorX;
      document.documentElement.style.overscrollBehaviorX = originalHtmlOverscrollBehaviorX;
    };
  }, []);

  const handleGroupByChange = (newGroupBy: GroupableFieldValue) => {
    setGroupBy(newGroupBy);
  };

  return (
    <Timeline 
      inputData={groupIssuesByField(AllExampleIssues, groupBy)} 
      onGroupByChange={handleGroupByChange}
    />
  );
};