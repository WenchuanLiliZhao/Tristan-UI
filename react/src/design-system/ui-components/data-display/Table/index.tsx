import React, { useState, useMemo } from 'react';
import styles from './styles.module.scss';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableProps<T = Record<string, unknown>> {
  /** 表格数据源 */
  dataSource: T[];
  /** 表格列的配置 */
  columns: TableColumn<T>[];
  /** 表格行的唯一标识符 */
  rowKey?: keyof T | ((record: T) => string | number);
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 空数据时的展示内容 */
  emptyText?: React.ReactNode;
  /** 表格大小 */
  size?: 'small' | 'middle' | 'large';
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示斑马纹 */
  striped?: boolean;
  /** 行点击事件 */
  onRowClick?: (record: T, index: number) => void;
  /** 表格容器的className */
  className?: string;
  /** 表格容器的style */
  style?: React.CSSProperties;
}

type SortDirection = 'asc' | 'desc' | null;

export const Table = <T extends Record<string, unknown> = Record<string, unknown>>({
  dataSource,
  columns,
  rowKey = 'id',
  loading = false,
  emptyText = '暂无数据',
  size = 'middle',
  bordered = false,
  striped = false,
  onRowClick,
  className,
  style,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({ key: '', direction: null });

  // 获取行的唯一标识
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    const value = record[rowKey];
    return (value as string | number) || index;
  };

  // 排序逻辑
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return dataSource;
    }

    const column = columns.find(col => col.key === sortConfig.key);
    if (!column) return dataSource;

    return [...dataSource].sort((a, b) => {
      const dataIndex = column.dataIndex || column.key;
      const aValue = a[dataIndex];
      const bValue = b[dataIndex];

      if (aValue === bValue) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [dataSource, sortConfig, columns]);

  // 处理排序点击
  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    setSortConfig(prev => {
      if (prev.key !== columnKey) {
        return { key: columnKey, direction: 'asc' };
      }
      
      switch (prev.direction) {
        case null:
          return { key: columnKey, direction: 'asc' };
        case 'asc':
          return { key: columnKey, direction: 'desc' };
        case 'desc':
          return { key: '', direction: null };
        default:
          return { key: '', direction: null };
      }
    });
  };

  // 渲染单元格内容
  const renderCell = (column: TableColumn<T>, record: T, index: number): React.ReactNode => {
    if (column.render) {
      const dataIndex = column.dataIndex || column.key;
      return column.render(record[dataIndex], record, index);
    }
    
    const dataIndex = column.dataIndex || column.key;
    const value = record[dataIndex];
    
    // 确保返回值是可渲染的
    if (value === null || value === undefined) {
      return '';
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  };

  // 构建表格类名
  const tableClasses = [
    styles.table,
    styles[`table-${size}`],
    bordered && styles['table-bordered'],
    striped && styles['table-striped'],
    className,
  ].filter(Boolean).join(' ');

  // 渲染排序图标
  const renderSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <span className={styles['sort-icon']}>⇅</span>;
    }
    
    if (sortConfig.direction === 'asc') {
      return <span className={styles['sort-icon-active']}>↑</span>;
    } else if (sortConfig.direction === 'desc') {
      return <span className={styles['sort-icon-active']}>↓</span>;
    }
    
    return <span className={styles['sort-icon']}>⇅</span>;
  };

  if (loading) {
    return (
      <div className={styles['table-container']} style={style}>
        <div className={styles['loading-wrapper']}>
          <div className={styles['loading-spinner']}></div>
          <span>加载中...</span>
        </div>
      </div>
    );
  }

  if (!dataSource?.length) {
    return (
      <div className={styles['table-container']} style={style}>
        <div className={styles['empty-wrapper']}>
          {emptyText}
        </div>
      </div>
    );
  }

  return (
    <div className={styles['table-container']} style={style}>
      <table className={tableClasses}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={[
                  styles['table-header'],
                  column.sortable && styles['sortable'],
                  column.className,
                ].filter(Boolean).join(' ')}
                style={{
                  width: column.width,
                  textAlign: column.align || 'left',
                }}
                onClick={() => handleSort(column.key)}
              >
                <div className={styles['header-content']}>
                  <span>{column.title}</span>
                  {column.sortable && renderSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((record, index) => (
            <tr
              key={getRowKey(record, index)}
              className={[
                styles['table-row'],
                onRowClick && styles['table-row-clickable'],
              ].filter(Boolean).join(' ')}
              onClick={() => onRowClick?.(record, index)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={[
                    styles['table-cell'],
                    column.className,
                  ].filter(Boolean).join(' ')}
                  style={{
                    textAlign: column.align || 'left',
                  }}
                >
                  {renderCell(column, record, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 