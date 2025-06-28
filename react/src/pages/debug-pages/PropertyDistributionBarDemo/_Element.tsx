import React, { useState } from "react";
import { PropertyDistributionBar, type PropertyDistributionSegment } from "../../../design-system/ui-components";
import { getRainbowColor } from "../../../styles";

// 模拟数据
const projectData = [
  { status: 'active', team: 'engineering', priority: 'high' },
  { status: 'active', team: 'design', priority: 'medium' },
  { status: 'pending', team: 'engineering', priority: 'high' },
  { status: 'active', team: 'product', priority: 'low' },
  { status: 'inactive', team: 'engineering', priority: 'medium' },
  { status: 'pending', team: 'design', priority: 'high' },
  { status: 'active', team: 'engineering', priority: 'low' },
  { status: 'inactive', team: 'product', priority: 'medium' },
  { status: 'active', team: 'design', priority: 'high' },
  { status: 'pending', team: 'engineering', priority: 'low' },
];

// 状态映射
const statusMapping = {
  active: { name: 'Active', color: getRainbowColor('emerald') },
  pending: { name: 'Pending', color: getRainbowColor('amber') },
  inactive: { name: 'Inactive', color: getRainbowColor('rose') }
};

// 团队映射
const teamMapping = {
  engineering: { name: 'Engineering', color: getRainbowColor('purple') },
  design: { name: 'Design', color: getRainbowColor('orange') },
  product: { name: 'Product', color: getRainbowColor('pink') }
};

// 优先级映射
const priorityMapping = {
  high: { name: 'High Priority', color: getRainbowColor('rose') },
  medium: { name: 'Medium Priority', color: getRainbowColor('amber') },
  low: { name: 'Low Priority', color: getRainbowColor('emerald') }
};

export function Element(): React.ReactElement {
  const [selectedSegment, setSelectedSegment] = useState<PropertyDistributionSegment | null>(null);

  const handleSegmentClick = (segment: PropertyDistributionSegment) => {
    setSelectedSegment(segment);
    console.log('Selected segment:', segment);
  };

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ marginBottom: '40px', color: '#1f2937' }}>
        PropertyDistributionBar Demo
      </h1>

      {/* 基础示例 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#374151' }}>Basic Usage</h2>
        <PropertyDistributionBar
          data={projectData}
          field="status"
          mapping={statusMapping}
          label="Project Status Distribution"
        />
      </section>

      {/* 带图例的示例 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#374151' }}>With Legend</h2>
        <PropertyDistributionBar
          data={projectData}
          field="team"
          mapping={teamMapping}
          label="Team Distribution"
          showLegend={true}
        />
      </section>

      {/* 可点击的示例 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#374151' }}>Interactive (Click segments)</h2>
        <PropertyDistributionBar
          data={projectData}
          field="priority"
          mapping={priorityMapping}
          label="Priority Distribution"
          showLegend={true}
          onSegmentClick={handleSegmentClick}
        />
        {selectedSegment && (
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            background: '#f3f4f6', 
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            Selected: <strong>{selectedSegment.name}</strong> ({selectedSegment.count} items, {selectedSegment.percentage.toFixed(1)}%)
          </div>
        )}
      </section>

      {/* 自定义样式示例 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#374151' }}>Custom Styling</h2>
        <PropertyDistributionBar
          data={projectData}
          field="status"
          mapping={statusMapping}
          label="Large Status Bar"
          height={8}
          borderRadius={4}
          enableHover={true}
        />
      </section>

      {/* 排序示例 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#374151' }}>Custom Sorting (by name)</h2>
        <PropertyDistributionBar
          data={projectData}
          field="team"
          mapping={teamMapping}
          label="Teams Sorted by Name"
          showLegend={true}
          sortBy="name"
        />
      </section>

      {/* 小百分比合并示例 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#374151' }}>With Minimum Percentage (15%)</h2>
        <PropertyDistributionBar
          data={projectData}
          field="priority"
          mapping={priorityMapping}
          label="Priority Distribution (small segments grouped)"
          showLegend={true}
          minPercentage={15}
        />
      </section>

      {/* 数据概览 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#374151' }}>Data Overview</h2>
        <div style={{ 
          background: '#f9fafb', 
          padding: '20px', 
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <p><strong>Total Projects:</strong> {projectData.length}</p>
          <p><strong>Status Distribution:</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li>Active: {projectData.filter(p => p.status === 'active').length}</li>
            <li>Pending: {projectData.filter(p => p.status === 'pending').length}</li>
            <li>Inactive: {projectData.filter(p => p.status === 'inactive').length}</li>
          </ul>
        </div>
      </section>
    </div>
  );
} 