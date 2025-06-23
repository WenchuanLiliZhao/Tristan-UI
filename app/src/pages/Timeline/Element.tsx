import React, { useState, useEffect, useMemo } from "react";
import { Timeline } from "../../design-system/ui-demos";
import type { TimelineItem, SortedTimelineData } from "../../design-system/ui-demos/timeline/data/types";

// 定义项目数据接口 - 遵循指南要求：基础4字段 + 自定义字段
interface ProjectData {
  // 🔴 必需的基础字段（不能省略）
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 🟢 自定义业务字段
  status: 'InProgress' | 'Completed' | 'OnHold' | 'NotStarted';
  priority: 'High' | 'Medium' | 'Low';
  team: string;
  department: string;
  manager: string;
  progress: number; // 0-100
  budget: number;
  technologies: string[];
  category: 'Development' | 'Design' | 'Marketing' | 'Research';
}

// 通用分组函数 - 现代化实现
function groupTimelineItemsByField<T = Record<string, unknown>>(
  items: TimelineItem<T>[],
  groupBy: keyof (TimelineItem<T>)
): SortedTimelineData<T> {
  const groups = new Map<string, TimelineItem<T>[]>();
  
  items.forEach(item => {
    const groupValue = String(item[groupBy] || 'Ungrouped');
    if (!groups.has(groupValue)) {
      groups.set(groupValue, []);
    }
    groups.get(groupValue)!.push(item);
  });
  
  const data = Array.from(groups.entries()).map(([groupTitle, groupItems]) => ({
    groupTitle,
    groupItems: groupItems.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
  }));
  
  return {
    meta: { sortBy: groupBy },
    data
  };
}

// 现代化的项目数据 - 完全自定义的业务数据
const projectData: TimelineItem<ProjectData>[] = [
  {
    id: "proj-001",
    name: "电商平台重构",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-04-30"),
    status: 'InProgress',
    priority: 'High',
    team: '前端开发团队',
    department: '技术部',
    manager: '张技术经理',
    progress: 65,
    budget: 500000,
    technologies: ['React', 'TypeScript', 'Node.js'],
    category: 'Development'
  },
  {
    id: "proj-002",
    name: "移动应用开发",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-07-15"),
    status: 'InProgress',
    priority: 'High',
    team: '移动端团队',
    department: '技术部',
    manager: '李移动经理',
    progress: 40,
    budget: 800000,
    technologies: ['React Native', 'Firebase'],
    category: 'Development'
  },
  {
    id: "proj-003",
    name: "UI/UX设计系统",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-05-30"),
    status: 'InProgress',
    priority: 'Medium',
    team: '设计团队',
    department: '产品部',
    manager: '王设计总监',
    progress: 80,
    budget: 300000,
    technologies: ['Figma', 'Design Tokens'],
    category: 'Design'
  },
  {
    id: "proj-004",
    name: "品牌推广活动",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-06-30"),
    status: 'InProgress',
    priority: 'Medium',
    team: '营销团队',
    department: '市场部',
    manager: '陈市场经理',
    progress: 55,
    budget: 1200000,
    technologies: ['Social Media', 'Analytics'],
    category: 'Marketing'
  },
  {
    id: "proj-005",
    name: "AI智能客服系统",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-08-31"),
    status: 'InProgress',
    priority: 'High',
    team: 'AI研发团队',
    department: '技术部',
    manager: '刘AI专家',
    progress: 30,
    budget: 1500000,
    technologies: ['Python', 'TensorFlow', 'NLP'],
    category: 'Research'
  },
  {
    id: "proj-006",
    name: "数据分析平台",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-31"),
    status: 'Completed',
    priority: 'Medium',
    team: '数据团队',
    department: '技术部',
    manager: '赵数据分析师',
    progress: 100,
    budget: 600000,
    technologies: ['Python', 'Pandas', 'D3.js'],
    category: 'Development'
  }
];

const TimelineContent: React.FC = () => {
  // 支持的分组字段类型
  type GroupableField = keyof ProjectData;

  // 默认按团队分组
  const [groupBy, setGroupBy] = useState<GroupableField>('team');

  // 禁用 body 滚动和浏览器手势
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalOverscrollBehaviorX = document.body.style.overscrollBehaviorX;
    const originalHtmlOverscrollBehaviorX = document.documentElement.style.overscrollBehaviorX;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehaviorX = "none";
    document.documentElement.style.overscrollBehaviorX = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehaviorX = originalOverscrollBehaviorX;
      document.documentElement.style.overscrollBehaviorX = originalHtmlOverscrollBehaviorX;
    };
  }, []);

  // 使用 useMemo 缓存分组结果，提升性能
  const groupedData = useMemo(() => {
    return groupTimelineItemsByField(projectData, groupBy);
  }, [groupBy]);

  // 计算项目统计信息
  const projectStats = useMemo(() => {
    const totalProjects = projectData.length;
    const inProgress = projectData.filter(p => p.status === 'InProgress').length;
    const completed = projectData.filter(p => p.status === 'Completed').length;
    const totalBudget = projectData.reduce((sum, p) => sum + p.budget, 0);
    const avgProgress = Math.round(projectData.reduce((sum, p) => sum + p.progress, 0) / totalProjects);

    return { totalProjects, inProgress, completed, totalBudget, avgProgress };
  }, []);

  const handleGroupByChange = (newGroupBy: GroupableField) => {
    setGroupBy(newGroupBy);
  };

  // 分组选项配置
  const groupingOptions = [
    { key: 'team' as const, label: '按团队', description: '显示各团队的项目分布' },
    { key: 'department' as const, label: '按部门', description: '按部门查看项目' },
    { key: 'priority' as const, label: '按优先级', description: '高/中/低优先级分组' },
    { key: 'status' as const, label: '按状态', description: '项目进行状态分组' },
    { key: 'category' as const, label: '按类别', description: '开发/设计/营销/研究' },
    { key: 'manager' as const, label: '按负责人', description: '各负责人的项目' }
  ];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 顶部控制面板 */}
      <div
        style={{
          padding: "24px",
          backgroundColor: "var(--color-bg-main, #ffffff)",
          borderBottom: "1px solid var(--color-border-main, #e1e5e9)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          flexShrink: 0,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ 
            margin: "0 0 8px 0", 
            color: "var(--color-text-main, #333)",
            fontSize: "28px",
            fontWeight: "600"
          }}>
            项目时间线管理系统
          </h1>
          <p style={{ 
            margin: "0 0 24px 0", 
            color: "var(--color-text-sec, #666)", 
            fontSize: "16px",
            lineHeight: "1.5"
          }}>
            基于现代化Timeline组件的项目管理演示，支持多维度动态分组和实时数据展示
          </p>

          {/* 项目统计面板 */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "16px", 
            marginBottom: "24px" 
          }}>
            <div style={{
              padding: "16px",
              backgroundColor: "var(--color-bg-sec, #f8f9fa)",
              borderRadius: "8px",
              border: "1px solid var(--color-border-main, #e1e5e9)"
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "var(--color-semantic-info, #0066cc)" }}>
                {projectStats.totalProjects}
              </div>
              <div style={{ fontSize: "14px", color: "var(--color-text-sec, #666)" }}>总项目数</div>
            </div>
            <div style={{
              padding: "16px",
              backgroundColor: "var(--color-bg-sec, #f8f9fa)",
              borderRadius: "8px",
              border: "1px solid var(--color-border-main, #e1e5e9)"
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "var(--color-semantic-active, #28a745)" }}>
                {projectStats.inProgress}
              </div>
              <div style={{ fontSize: "14px", color: "var(--color-text-sec, #666)" }}>进行中</div>
            </div>
            <div style={{
              padding: "16px",
              backgroundColor: "var(--color-bg-sec, #f8f9fa)",
              borderRadius: "8px",
              border: "1px solid var(--color-border-main, #e1e5e9)"
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "var(--color-semantic-success, #17a2b8)" }}>
                {projectStats.completed}
              </div>
              <div style={{ fontSize: "14px", color: "var(--color-text-sec, #666)" }}>已完成</div>
            </div>
            <div style={{
              padding: "16px",
              backgroundColor: "var(--color-bg-sec, #f8f9fa)",
              borderRadius: "8px",
              border: "1px solid var(--color-border-main, #e1e5e9)"
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "var(--color-semantic-warning, #ffc107)" }}>
                ¥{(projectStats.totalBudget / 10000).toFixed(0)}万
              </div>
              <div style={{ fontSize: "14px", color: "var(--color-text-sec, #666)" }}>总预算</div>
            </div>
            <div style={{
              padding: "16px",
              backgroundColor: "var(--color-bg-sec, #f8f9fa)",
              borderRadius: "8px",
              border: "1px solid var(--color-border-main, #e1e5e9)"
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "var(--color-semantic-primary, #6f42c1)" }}>
                {projectStats.avgProgress}%
              </div>
              <div style={{ fontSize: "14px", color: "var(--color-text-sec, #666)" }}>平均进度</div>
            </div>
          </div>

          {/* 分组控制器 */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "16px"
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "16px",
              flexWrap: "wrap"
            }}>
              <label style={{ 
                fontWeight: "600", 
                color: "var(--color-text-main, #333)",
                fontSize: "16px",
                minWidth: "80px"
              }}>
                分组方式：
              </label>
              
              <div style={{ 
                display: "flex", 
                gap: "8px", 
                flexWrap: "wrap"
              }}>
                {groupingOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleGroupByChange(option.key)}
                    title={option.description}
                    style={{
                      padding: "10px 16px",
                      backgroundColor: groupBy === option.key 
                        ? "var(--color-semantic-active, #007bff)" 
                        : "var(--color-bg-sec, #e9ecef)",
                      color: groupBy === option.key 
                        ? "var(--color-text-contrast-main, white)" 
                        : "var(--color-text-main, #495057)",
                      border: "1px solid " + (groupBy === option.key 
                        ? "var(--color-semantic-active, #007bff)" 
                        : "var(--color-border-main, #ced4da)"),
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                      boxShadow: groupBy === option.key 
                        ? "0 2px 4px rgba(0,123,255,0.25)" 
                        : "none"
                    }}
                    onMouseEnter={(e) => {
                      if (groupBy !== option.key) {
                        e.currentTarget.style.backgroundColor = "var(--color-border-main, #dee2e6)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (groupBy !== option.key) {
                        e.currentTarget.style.backgroundColor = "var(--color-bg-sec, #e9ecef)";
                      }
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ 
              fontSize: "14px", 
              color: "var(--color-text-sec, #666)",
              fontStyle: "italic"
            }}>
              当前分组：{groupingOptions.find(opt => opt.key === groupBy)?.description}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline 组件 */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Timeline<ProjectData>
          inputData={groupedData}
          onGroupByChange={handleGroupByChange}
        />
      </div>
    </div>
  );
};

export const Element: React.FC = () => {
  return <TimelineContent />;
}; 