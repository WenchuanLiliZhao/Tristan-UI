import React from "react";
import { Timeline, groupTimelineItemsByField } from "../../design-system/ui-demos";
import { 
  type TimelineConfigType, 
  type TimelineItemDisplayConfig 
} from "../../design-system/ui-demos/timeline/data/types";
import { ExampleData, type ProjectDataType, status, team, priority, riskLevel } from "./example-data";

export function Element(): React.ReactElement {
  // 创建字段显示配置
  const itemDisplayConfig: TimelineItemDisplayConfig<ProjectDataType> = {
    // 图形信息区域配置 - 显示 progress 和 priority icon
    graphicFields: [
      {
        field: 'progress',
        displayType: 'progress',
        mapping: (value: unknown) => ({
          value: Math.max(0, Math.min(100, Number(value) || 0)),
          showText: true,
        }),
        visible: true,
      },
      {
        field: 'priority',
        displayType: 'icon',
        mapping: (value: unknown) => {
          const strValue = String(value);
          const priorityData = priority[strValue as keyof typeof priority];
          return {
            iconName: priorityData?.icon === 'icon-a' ? 'priority_high' :
                     priorityData?.icon === 'icon-b' ? 'low_priority' : 'flag',
            color: priorityData?.color || 'gray',
          };
        },
        visible: true,
      },
    ],
    
    // 标签区域配置 - 显示 status, team, riskLevel
    tagFields: [
      {
        field: 'status',
        displayType: 'tag',
        mapping: (value: unknown) => {
          const strValue = String(value);
          const statusData = status[strValue as keyof typeof status];
          return {
            text: statusData?.name || strValue,
            color: statusData?.color || 'gray',
          };
        },
        visible: true,
      },
      {
        field: 'team',
        displayType: 'tag',
        mapping: (value: unknown) => {
          const strValue = String(value);
          const teamData = team[strValue as keyof typeof team];
          return {
            text: teamData?.name || strValue,
            color: teamData?.color || 'gray',
          };
        },
        visible: true,
      },
      {
        field: 'riskLevel',
        displayType: 'tag',
        mapping: (value: unknown) => {
          const strValue = String(value);
          const riskData = riskLevel[strValue as keyof typeof riskLevel];
          return {
            text: riskData?.name || strValue,
            color: riskData?.color || 'gray',
            variant: 'outlined',
          };
        },
        visible: (item: unknown) => {
          const projectItem = item as ProjectDataType;
          return projectItem.riskLevel !== 'low'; // 只显示高风险和中风险
        },
      },
    ],
  };

  // Timeline 配置
  const timelineConfig: TimelineConfigType<ProjectDataType> = {
    groupBy: 'category',
    itemDisplayConfig: itemDisplayConfig,
  };

  // 按分类分组数据
  const sortedData = groupTimelineItemsByField(ExampleData, 'category');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Timeline 自定义字段显示示例</h1>
      <p>
        本示例演示了如何配置 Timeline 组件中项目字段的显示方式：
      </p>
      <ul>
        <li><strong>图形区域</strong>: 显示进度条 (progress) 和优先级图标 (priority)</li>
        <li><strong>标签区域</strong>: 显示状态 (status)、团队 (team) 和风险等级 (riskLevel) 标签</li>
        <li><strong>条件显示</strong>: 低风险项目不显示风险等级标签</li>
      </ul>
      
      <div style={{ marginTop: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <Timeline<ProjectDataType>
          init={timelineConfig}
          inputData={sortedData}
        />
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h3>配置说明：</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '4px', 
          overflow: 'auto',
          fontSize: '12px'
        }}>
{`const itemDisplayConfig: TimelineItemDisplayConfig = {
  graphicFields: [
    {
      field: 'progress',
      displayType: 'progress',
      mapping: (value) => ({ value: Number(value), showText: true }),
    },
    {
      field: 'priority', 
      displayType: 'icon',
      mapping: (value) => ({ iconName: '...', color: '...' }),
    }
  ],
  tagFields: [
    {
      field: 'status',
      displayType: 'tag', 
      mapping: (value) => ({ text: '...', color: '...' }),
    },
    {
      field: 'riskLevel',
      displayType: 'tag',
      visible: (item) => item.riskLevel !== 'low', // 条件显示
    }
  ]
};`}
        </pre>
      </div>
    </div>
  );
} 