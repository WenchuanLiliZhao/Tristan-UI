import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { mockBooks, mockUsers } from '../../data/mockData';
import type { Book, User } from '../../data/mockData';
import './LibraryManagement.scss';

const LibraryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'users' | 'dashboard'>('dashboard');
  const [books] = useState<Book[]>(mockBooks);
  const [users] = useState<User[]>(mockUsers);

  const stats = {
    totalBooks: books.length,
    availableBooks: books.filter(book => book.status === 'available').length,
    borrowedBooks: books.filter(book => book.status === 'borrowed').length,
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active').length,
  };

  const renderDashboard = () => (
    <div className="dashboard">
      <h2>图书馆仪表板</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>总图书数</h3>
          <div className="stat-number">{stats.totalBooks}</div>
        </div>
        <div className="stat-card">
          <h3>可借阅</h3>
          <div className="stat-number">{stats.availableBooks}</div>
        </div>
        <div className="stat-card">
          <h3>已借出</h3>
          <div className="stat-number">{stats.borrowedBooks}</div>
        </div>
        <div className="stat-card">
          <h3>注册用户</h3>
          <div className="stat-number">{stats.totalUsers}</div>
        </div>
      </div>
      
      <div className="recent-activities">
        <h3>最近活动</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-type">借阅</span>
            <span className="activity-description">张三借阅了《JavaScript高级程序设计》</span>
            <span className="activity-time">2小时前</span>
          </div>
          <div className="activity-item">
            <span className="activity-type">归还</span>
            <span className="activity-description">李四归还了《React实战》</span>
            <span className="activity-time">4小时前</span>
          </div>
          <div className="activity-item">
            <span className="activity-type">新增</span>
            <span className="activity-description">新增图书《Vue.js设计与实现》</span>
            <span className="activity-time">1天前</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className="books-section">
      <div className="section-header">
        <h2>图书管理</h2>
        <Button color="primary">添加新书</Button>
      </div>
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-info">
              <h4>{book.title}</h4>
              <p className="book-author">作者: {book.author}</p>
              <p className="book-isbn">ISBN: {book.isbn}</p>
              <div className={`book-status ${book.status}`}>
                {book.status === 'available' ? '可借阅' : '已借出'}
              </div>
            </div>
            <div className="book-actions">
              <Button size="small" variant="outlined">编辑</Button>
              <Button size="small" variant="text" color="error">删除</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="users-section">
      <div className="section-header">
        <h2>用户管理</h2>
        <Button color="primary">添加用户</Button>
      </div>
      <div className="users-table">
        <div className="table-header">
          <div>用户ID</div>
          <div>姓名</div>
          <div>邮箱</div>
          <div>状态</div>
          <div>借阅数量</div>
          <div>操作</div>
        </div>
        {users.map(user => (
          <div key={user.id} className="table-row">
            <div>{user.id}</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>
              <span className={`user-status ${user.status}`}>
                {user.status === 'active' ? '活跃' : '停用'}
              </span>
            </div>
            <div>{user.borrowedBooks}</div>
            <div className="row-actions">
              <Button size="small" variant="text">查看</Button>
              <Button size="small" variant="text" color="warning">编辑</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="library-management">
      <header className="app-header">
        <h1>📚 图书馆管理系统</h1>
        <p>基于 Lili Design System 构建</p>
      </header>

      <nav className="app-nav">
        <Button
          variant={activeTab === 'dashboard' ? 'contained' : 'text'}
          onClick={() => setActiveTab('dashboard')}
        >
          仪表板
        </Button>
        <Button
          variant={activeTab === 'books' ? 'contained' : 'text'}
          onClick={() => setActiveTab('books')}
        >
          图书管理
        </Button>
        <Button
          variant={activeTab === 'users' ? 'contained' : 'text'}
          onClick={() => setActiveTab('users')}
        >
          用户管理
        </Button>
      </nav>

      <main className="app-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'books' && renderBooks()}
        {activeTab === 'users' && renderUsers()}
      </main>
    </div>
  );
};

export default LibraryManagement; 