import { useState } from 'react';
import ComponentShowcase from './pages/ComponentShowcase/ComponentShowcase';
import LibraryManagement from './demos/LibraryManagement/LibraryManagement';
import './App.scss';
import { Button } from './components/Button/Button';

type PageType = 'home' | 'showcase' | 'library-demo';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderHomePage = () => (
    <ComponentShowcase />
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
