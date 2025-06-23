import { useEffect, useState, useMemo } from "react";
import { Timeline, type SortedTimelineData } from "tristan-ui";

// 🎯 步骤1：定义自定义数据结构（基础字段 + 业务字段）
interface ProjectData {
  // 🔴 必需的基础字段（BaseTimelineItem）
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 🟢 自定义业务字段 - 项目管理场景
  status: 'Planning' | 'InProgress' | 'Testing' | 'Completed' | 'OnHold';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  team: 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'QA' | 'Design';
  department: 'Engineering' | 'Product' | 'Marketing' | 'Sales';
  manager: string;
  progress: number; // 0-100
  budget: number;
  technologies: string[];
  category: 'Development' | 'Research' | 'Marketing' | 'Infrastructure';
}

// 🎯 步骤2：创建符合接口的示例数据
const mockProjects: ProjectData[] = [
  {
    // 基础字段
    id: "proj-001",
    name: "E-commerce Platform Redesign",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-04-30"),
    
    // 自定义字段
    status: 'InProgress',
    priority: 'Critical',
    team: 'Frontend',
    department: 'Engineering',
    manager: 'Sarah Chen',
    progress: 65,
    budget: 150000,
    technologies: ['React', 'TypeScript', 'GraphQL'],
    category: 'Development'
  },
  {
    id: "proj-002",
    name: "Mobile App Development",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-07-15"),
    status: 'InProgress',
    priority: 'High',
    team: 'Mobile',
    department: 'Engineering',
    manager: 'Alex Rodriguez',
    progress: 45,
    budget: 200000,
    technologies: ['React Native', 'Firebase', 'Redux'],
    category: 'Development'
  },
  {
    id: "proj-003",
    name: "AI Recommendation Engine",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-08-30"),
    status: 'Planning',
    priority: 'High',
    team: 'Backend',
    department: 'Engineering',
    manager: 'David Kim',
    progress: 15,
    budget: 300000,
    technologies: ['Python', 'TensorFlow', 'AWS'],
    category: 'Research'
  },
  {
    id: "proj-004",
    name: "Brand Identity Refresh",
    startDate: new Date("2024-01-10"),
    endDate: new Date("2024-03-15"),
    status: 'Completed',
    priority: 'Medium',
    team: 'Design',
    department: 'Marketing',
    manager: 'Lisa Wang',
    progress: 100,
    budget: 75000,
    technologies: ['Figma', 'Adobe Creative Suite'],
    category: 'Marketing'
  },
  {
    id: "proj-005",
    name: "Cloud Infrastructure Migration",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-09-30"),
    status: 'Planning',
    priority: 'Critical',
    team: 'DevOps',
    department: 'Engineering',
    manager: 'Michael Brown',
    progress: 10,
    budget: 250000,
    technologies: ['AWS', 'Kubernetes', 'Terraform'],
    category: 'Infrastructure'
  },
  {
    id: "proj-006",
    name: "User Experience Research",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-05-15"),
    status: 'InProgress',
    priority: 'Medium',
    team: 'Design',
    department: 'Product',
    manager: 'Emily Davis',
    progress: 70,
    budget: 50000,
    technologies: ['Miro', 'UserTesting', 'Analytics'],
    category: 'Research'
  }
];

// 🎯 步骤3：实现分组函数（基于指南）
function groupTimelineItemsByField(
  items: ProjectData[], 
  groupBy: keyof ProjectData
): SortedTimelineData<ProjectData> {
  const groupMap: { [key: string]: ProjectData[] } = {};
  
  items.forEach(item => {
    const groupValue = String(item[groupBy]);
    if (!groupMap[groupValue]) {
      groupMap[groupValue] = [];
    }
    groupMap[groupValue].push(item);
  });

  const data = Object.entries(groupMap).map(([groupTitle, groupItems]) => ({
    groupTitle,
    groupItems
  }));

  return {
    meta: { sortBy: groupBy },
    data
  };
}

// 🎯 步骤4：主组件实现
const TimelineContent: React.FC = () => {
  // 分组字段状态管理
  const [groupBy, setGroupBy] = useState<keyof ProjectData>('team');

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

  // 🎯 步骤5：使用性能优化的分组处理
  const groupedData: SortedTimelineData<ProjectData> = useMemo(() => {
    return groupTimelineItemsByField(mockProjects, groupBy);
  }, [groupBy]);

  // 分组选项配置
  const groupingOptions: Array<{
    key: keyof ProjectData;
    label: string;
    description: string;
  }> = [
    { key: 'team', label: '团队', description: '按开发团队分组' },
    { key: 'status', label: '状态', description: '按项目状态分组' },
    { key: 'priority', label: '优先级', description: '按优先级分组' },
    { key: 'department', label: '部门', description: '按部门分组' },
    { key: 'manager', label: '负责人', description: '按项目经理分组' },
    { key: 'category', label: '类别', description: '按项目类别分组' }
  ];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 控制面板 */}
      <div
        style={{
          padding: "24px",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #e9ecef",
          flexShrink: 0,
        }}
      >
        <h1 style={{ 
          margin: "0 0 8px 0", 
          color: "#2c3e50", 
          fontSize: "28px", 
          fontWeight: "700" 
        }}>
          🚀 项目时间线管理系统
        </h1>
        
        <p style={{ 
          margin: "0 0 20px 0", 
          color: "#6c757d", 
          fontSize: "16px",
          lineHeight: "1.5"
        }}>
          现代化的项目管理时间线，支持多维度分组和实时数据展示
        </p>

        <div style={{ 
          display: "flex", 
          flexWrap: "wrap",
          gap: "12px", 
          alignItems: "center",
          marginBottom: "16px"
        }}>
          <span style={{ 
            fontWeight: "600", 
            color: "#495057",
            fontSize: "15px"
          }}>
            📊 分组方式：
          </span>

          {groupingOptions.map(option => (
            <button
              key={option.key}
              onClick={() => setGroupBy(option.key)}
              style={{
                padding: "10px 18px",
                backgroundColor: groupBy === option.key ? "#007bff" : "#ffffff",
                color: groupBy === option.key ? "#ffffff" : "#495057",
                border: groupBy === option.key ? "none" : "2px solid #e9ecef",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                boxShadow: groupBy === option.key ? "0 2px 8px rgba(0,123,255,0.3)" : "0 1px 3px rgba(0,0,0,0.1)"
              }}
              title={option.description}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* 数据统计 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
          marginTop: "16px"
        }}>
          <div style={{ 
            backgroundColor: "#ffffff", 
            padding: "12px 16px", 
            borderRadius: "8px",
            border: "1px solid #e9ecef"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#007bff" }}>
              {mockProjects.length}
            </div>
            <div style={{ fontSize: "13px", color: "#6c757d", marginTop: "2px" }}>
              总项目数
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: "#ffffff", 
            padding: "12px 16px", 
            borderRadius: "8px",
            border: "1px solid #e9ecef"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#28a745" }}>
              {mockProjects.filter(p => p.status === 'InProgress').length}
            </div>
            <div style={{ fontSize: "13px", color: "#6c757d", marginTop: "2px" }}>
              进行中
            </div>
          </div>

          <div style={{ 
            backgroundColor: "#ffffff", 
            padding: "12px 16px", 
            borderRadius: "8px",
            border: "1px solid #e9ecef"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#ffc107" }}>
              {groupedData.data.length}
            </div>
            <div style={{ fontSize: "13px", color: "#6c757d", marginTop: "2px" }}>
              当前分组数
            </div>
          </div>

          <div style={{ 
            backgroundColor: "#ffffff", 
            padding: "12px 16px", 
            borderRadius: "8px",
            border: "1px solid #e9ecef"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#17a2b8" }}>
              {Math.round(mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length)}%
            </div>
            <div style={{ fontSize: "13px", color: "#6c757d", marginTop: "2px" }}>
              平均进度
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 步骤6：Timeline 组件使用 */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Timeline<ProjectData>
          inputData={groupedData}
          onGroupByChange={setGroupBy}
        />
      </div>
    </div>
  );
};

// 🎯 导出组件
export const TestTimeline: React.FC = () => {
  return <TimelineContent />;
}; 