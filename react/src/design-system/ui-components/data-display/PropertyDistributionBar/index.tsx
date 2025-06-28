import { useMemo } from "react";
import styles from "./styles.module.scss";

export interface PropertyDistributionSegment {
  value: string;
  count: number;
  percentage: number;
  color: string;
  name: string;
}

export interface PropertyDistributionMapping {
  [key: string]: {
    name: string;
    color: string;
  };
}

export interface PropertyDistributionBarProps {
  /** 数据项数组 */
  data: Array<Record<string, unknown>>;
  /** 要分析的字段名 */
  field: string;
  /** 字段值到显示名称和颜色的映射 */
  mapping: PropertyDistributionMapping;
  /** 可选的显示标签 */
  label?: string;
  /** 是否显示图例（带数量） */
  showLegend?: boolean;
  /** 分布条高度 */
  height?: number;
  /** 是否启用悬停效果 */
  enableHover?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 分布条圆角半径 */
  borderRadius?: number;
  /** 最小显示百分比（小于此值的segment将被合并为"其他"） */
  minPercentage?: number;
  /** 自定义排序函数 */
  sortBy?: 'count' | 'name' | 'value' | ((a: PropertyDistributionSegment, b: PropertyDistributionSegment) => number);
  /** 点击segment时的回调 */
  onSegmentClick?: (segment: PropertyDistributionSegment) => void;
}

export const PropertyDistributionBar: React.FC<PropertyDistributionBarProps> = ({
  data,
  field,
  mapping,
  label,
  showLegend = false,
  height = 4,
  enableHover = true,
  className,
  borderRadius = 2,
  minPercentage = 0,
  sortBy = 'count',
  onSegmentClick,
}) => {
  const distribution = useMemo(() => {
    // 统计各个属性值的分布
    const counts: Record<string, number> = {};
    const total = data.length;

    if (total === 0) return [];

    data.forEach(item => {
      const value = String(item[field] || 'Unknown');
      counts[value] = (counts[value] || 0) + 1;
    });

    // 转换为分布数据
    let distributionData: PropertyDistributionSegment[] = Object.entries(counts)
      .map(([value, count]) => ({
        value,
        count,
        percentage: (count / total) * 100,
        color: mapping[value]?.color || '#999999',
        name: mapping[value]?.name || value,
      }));

    // 处理小百分比合并
    if (minPercentage > 0) {
      const smallSegments = distributionData.filter(segment => segment.percentage < minPercentage);
      const largeSegments = distributionData.filter(segment => segment.percentage >= minPercentage);
      
      if (smallSegments.length > 0) {
        const otherCount = smallSegments.reduce((sum, segment) => sum + segment.count, 0);
        const otherPercentage = smallSegments.reduce((sum, segment) => sum + segment.percentage, 0);
        
        largeSegments.push({
          value: 'others',
          count: otherCount,
          percentage: otherPercentage,
          color: '#cccccc',
          name: 'Others',
        });
        
        distributionData = largeSegments;
      }
    }

    // 排序
    if (typeof sortBy === 'function') {
      distributionData.sort(sortBy);
    } else {
      switch (sortBy) {
        case 'count':
          distributionData.sort((a, b) => b.count - a.count);
          break;
        case 'name':
          distributionData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'value':
          distributionData.sort((a, b) => a.value.localeCompare(b.value));
          break;
      }
    }

    return distributionData;
  }, [data, field, mapping, minPercentage, sortBy]);

  if (distribution.length === 0) {
    return null;
  }

  const handleSegmentClick = (segment: PropertyDistributionSegment) => {
    if (onSegmentClick) {
      onSegmentClick(segment);
    }
  };

  return (
    <div className={`${styles["property-distribution"]} ${className || ''}`}>
      {label && (
        <div className={styles["property-distribution-label"]}>
          {label}
        </div>
      )}
      
      <div 
        className={styles["property-distribution-bar"]}
        style={{ 
          height: `${height}px`,
          borderRadius: `${borderRadius}px`
        }}
      >
        {distribution.map((segment) => {
          const colorValue = segment.color.startsWith('--') 
            ? `var(${segment.color})` 
            : segment.color;

          return (
            <div
              key={segment.value}
              className={`${styles["property-distribution-segment"]} ${
                enableHover ? styles["hoverable"] : ''
              } ${onSegmentClick ? styles["clickable"] : ''}`}
              style={{
                width: `${segment.percentage}%`,
                backgroundColor: colorValue,
              }}
              title={`${segment.name}: ${segment.count} (${segment.percentage.toFixed(1)}%)`}
              onClick={() => handleSegmentClick(segment)}
              role={onSegmentClick ? "button" : undefined}
              tabIndex={onSegmentClick ? 0 : undefined}
              onKeyDown={(e) => {
                if (onSegmentClick && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSegmentClick(segment);
                }
              }}
            />
          );
        })}
      </div>

      {showLegend && (
        <div className={styles["property-distribution-legend"]}>
          {distribution.map(segment => (
            <div key={segment.value} className={styles["property-distribution-legend-item"]}>
              <div
                className={styles["property-distribution-legend-color"]}
                style={{
                  backgroundColor: segment.color.startsWith('--') 
                    ? `var(${segment.color})` 
                    : segment.color,
                }}
              />
              <span className={styles["property-distribution-legend-text"]}>
                {segment.name} ({segment.count})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 