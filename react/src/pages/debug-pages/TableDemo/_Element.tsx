import React, { useState } from 'react';
import { Table } from '../../../design-system/ui-components/data-display';
import type { TableColumn } from '../../../design-system/ui-components/data-display';

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
}

const mockData: User[] = [
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', status: 'inactive' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', status: 'active' },
  { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com', status: 'active' },
  { id: 5, name: '钱七', age: 22, email: 'qianqi@example.com', status: 'inactive' },
];

export const TableDemoElement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<User[]>(mockData);

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
      sortable: true,
    },
    {
      key: 'age',
      title: '年龄',
      dataIndex: 'age',
      sortable: true,
      align: 'center',
      render: (age) => `${age}岁`,
    },
    {
      key: 'email',
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (status) => (
        <span style={{ 
          color: status === 'active' ? '#52c41a' : '#ff4d4f',
          fontWeight: 'bold' 
        }}>
          {status === 'active' ? '活跃' : '非活跃'}
        </span>
      ),
    },
    {
      key: 'action',
      title: '操作',
      align: 'center',
      render: (_, record) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`编辑用户: ${record.name}`);
          }}
          style={{
            padding: '4px 8px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          编辑
        </button>
      ),
    },
  ];

  const handleRowClick = (record: User, index: number) => {
    console.log('点击了行:', record, index);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleClearData = () => {
    setDataSource([]);
  };

  const handleRestoreData = () => {
    setDataSource(mockData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Table 表格组件示例</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleRefresh} style={{ marginRight: '10px' }}>
          {loading ? '加载中...' : '测试加载状态'}
        </button>
        <button onClick={handleClearData} style={{ marginRight: '10px' }}>
          清空数据
        </button>
        <button onClick={handleRestoreData}>
          恢复数据
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>基础表格</h3>
        <Table 
          dataSource={dataSource} 
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>带边框和斑马纹的小尺寸表格</h3>
        <Table 
          dataSource={dataSource.slice(0, 3)} 
          columns={columns}
          size="small"
          bordered
          striped
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>大尺寸表格</h3>
        <Table 
          dataSource={dataSource.slice(0, 2)} 
          columns={columns}
          size="large"
          bordered
        />
      </div>
    </div>
  );
}; 