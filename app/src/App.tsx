import React, { useState } from 'react';
import { Button } from './components';
import ComponentShowcase from './pages/ComponentShowcase/ComponentShowcase';
import LibraryManagement from './demos/LibraryManagement/LibraryManagement';
import './App.scss';

type PageType = 'home' | 'showcase' | 'library-demo';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderHomePage = () => (
    <div className="home-page">
      <header className="hero-section">
        <h1>🎨 Tristan Design System</h1>
        <p>一个现代化的 React 组件库，专为优雅的用户界面而设计</p>
        <div className="hero-actions">
          <Button
            size="large"
            color="primary"
            onClick={() => setCurrentPage('showcase')}
          >
            查看组件
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setCurrentPage('library-demo')}
          >
            查看演示
          </Button>
        </div>
      </header>

      <section className="features">
        <h2>特性亮点</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧩</div>
            <h3>模块化组件</h3>
            <p>每个组件都经过精心设计，具有良好的可复用性和可定制性</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>一致的设计语言</h3>
            <p>统一的设计原则确保整个系统的视觉一致性</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>响应式设计</h3>
            <p>所有组件都支持移动端和桌面端的完美适配</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>高性能</h3>
            <p>基于现代 React 技术栈，确保最佳的渲染性能</p>
          </div>
        </div>
      </section>

      <section className="getting-started">
        <h2>快速开始</h2>
        <div className="install-section">
          <h3>安装</h3>
          <pre><code>npm install tristan-design-system</code></pre>
          <p>或者</p>
          <pre><code>yarn add tristan-design-system</code></pre>
        </div>
        <div className="usage-section">
          <h3>使用</h3>
          <pre><code>{`import { Button, Input, Card } from 'tristan-design-system';

function MyApp() {
  return (
    <div>
      <Button color="primary">Hello World</Button>
      <Input placeholder="输入内容..." />
      <Card>
        <h3>卡片标题</h3>
        <p>卡片内容...</p>
      </Card>
    </div>
  );
}`}</code></pre>
        </div>
      </section>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'showcase':
        return <ComponentShowcase />;
      case 'library-demo':
        return <LibraryManagement />;
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="lili-design-app">
      {currentPage !== 'home' && (
        <nav className="app-navigation">
          <div className="nav-content">
            <div className="nav-brand">
              <Button
                variant="text"
                onClick={() => setCurrentPage('home')}
              >
                🎨 Lili Design System
              </Button>
            </div>
            <div className="nav-links">
              <Button
                variant={currentPage === 'showcase' ? 'contained' : 'text'}
                size="small"
                onClick={() => setCurrentPage('showcase')}
              >
                组件展示
              </Button>
              <Button
                variant={currentPage === 'library-demo' ? 'contained' : 'text'}
                size="small"
                onClick={() => setCurrentPage('library-demo')}
              >
                图书馆演示
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setCurrentPage('home')}
              >
                返回首页
              </Button>
            </div>
          </div>
        </nav>
      )}
      
      <main className="app-main">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
