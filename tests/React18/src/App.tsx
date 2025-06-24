import { useState, useMemo } from 'react';
import "tristan-ui/dist/tristan-ui.css"

// 导入 Timeline 相关组件和类型
// 注意：这里需要根据实际的模块路径调整导入
import { Timeline } from '../../../app/src/design-system/ui-demos/timeline/ui/Timeline';
import type { TimelineItem, SortedTimelineData } from '../../../app/src/design-system/ui-demos/timeline/data/types';

// 步骤1：定义包含基础字段 + 自定义字段的接口
interface ProjectData {
  // 🔴 必需的基础字段（继承自 BaseTimelineItem）
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 🟢 您的自定义字段 - 根据指南建议添加
  priority: 'High' | 'Medium' | 'Low';
  department: string;
  status: 'Planning' | 'InProgress' | 'Testing' | 'Completed';
  manager: string;
  budget: number;
  progress: number; // 0-100
}

// 通用分组函数 - 来自 Timeline/_Element.tsx 的实现
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

// 步骤2：创建符合接口的示例数据
const projectData: ProjectData[] = [
  {
    // 基础字段
    id: "proj-001",
    name: "网站重构项目",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-31"),
    
    // 自定义字段
    priority: 'High',
    department: '前端团队',
    status: 'InProgress',
    manager: '张三',
    budget: 50000,
    progress: 65
  },
  {
    id: "proj-002",
    name: "移动应用开发",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-06-30"),
    priority: 'High',
    department: '移动团队',
    status: 'Planning',
    manager: '李四',
    budget: 80000,
    progress: 25
  },
  {
    id: "proj-003",
    name: "数据库优化",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-04-15"),
    priority: 'Medium',
    department: '后端团队',
    status: 'Testing',
    manager: '王五',
    budget: 30000,
    progress: 80
  },
  {
    id: "proj-004",
    name: "用户体验研究",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-05-31"),
    priority: 'Medium',
    department: '设计团队',
    status: 'InProgress',
    manager: '赵六',
    budget: 25000,
    progress: 40
  },
  {
    id: "proj-005",
    name: "安全审计",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-15"),
    priority: 'High',
    department: '安全团队',
    status: 'Planning',
    manager: '孙七',
    budget: 35000,
    progress: 10
  },
  {
    id: "proj-006",
    name: "性能测试",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-04-30"),
    priority: 'Low',
    department: '测试团队',
    status: 'Completed',
    manager: '周八',
    budget: 20000,
    progress: 100
  }
];

function App() {
  // 步骤3：支持动态分组切换
  const [groupBy, setGroupBy] = useState<keyof ProjectData>('department');

  // 步骤4：使用 useMemo 缓存分组结果，提升性能
  const groupedData = useMemo(() => {
    return groupTimelineItemsByField(projectData, groupBy);
  }, [groupBy]);

  // 计算统计信息
  const stats = useMemo(() => {
    const totalProjects = projectData.length;
    const inProgress = projectData.filter(p => p.status === 'InProgress').length;
    const completed = projectData.filter(p => p.status === 'Completed').length;
    const totalBudget = projectData.reduce((sum, p) => sum + p.budget, 0);
    const avgProgress = Math.round(projectData.reduce((sum, p) => sum + p.progress, 0) / totalProjects);

    return { totalProjects, inProgress, completed, totalBudget, avgProgress };
  }, []);

  const handleGroupByChange = (newGroupBy: keyof ProjectData) => {
    setGroupBy(newGroupBy);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📅 Timeline 组件示例</h1>
      <p>根据 Timeline 自定义数据结构指南创建的示例</p>

      {/* 项目统计信息 */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div><strong>总项目数:</strong> {stats.totalProjects}</div>
        <div><strong>进行中:</strong> {stats.inProgress}</div>
        <div><strong>已完成:</strong> {stats.completed}</div>
        <div><strong>总预算:</strong> ¥{stats.totalBudget.toLocaleString()}</div>
        <div><strong>平均进度:</strong> {stats.avgProgress}%</div>
      </div>

      {/* 分组切换按钮 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🏷️ 分组方式：</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { key: 'department', label: '按部门' },
            { key: 'priority', label: '按优先级' },
            { key: 'status', label: '按状态' },
            { key: 'manager', label: '按负责人' },
            { key: 'name', label: '按项目名称' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleGroupByChange(key as keyof ProjectData)}
              style={{
                padding: '8px 16px',
                border: groupBy === key ? '2px solid #007bff' : '1px solid #ccc',
                backgroundColor: groupBy === key ? '#007bff' : 'white',
                color: groupBy === key ? 'white' : 'black',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
          当前分组: <strong>{groupBy}</strong> (共 {groupedData.data.length} 个分组)
        </p>
      </div>

      {/* Timeline 组件 */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        overflow: 'hidden',
        height: '600px' // 固定高度以便查看滚动效果
      }}>
        <Timeline<ProjectData>
          inputData={groupedData}
          onGroupByChange={handleGroupByChange}
        />
      </div>

      {/* 使用说明 */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
        <h3>💡 使用说明：</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li><strong>基础要求：</strong> 每个项目只需包含 4 个基础字段：id、name、startDate、endDate</li>
          <li><strong>自定义扩展：</strong> 可以添加任意自定义字段（如 priority、department、status 等）</li>
          <li><strong>智能分组：</strong> 可以按任意字段进行分组显示</li>
          <li><strong>类型安全：</strong> 完整的 TypeScript 支持，确保编译时安全</li>
          <li><strong>交互式操作：</strong> 点击上方按钮切换不同的分组方式</li>
        </ul>
      </div>
    </div>
  );
}

export default App
