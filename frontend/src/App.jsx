import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import './styles/global.css';
import './styles/dashboard.css';

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth pages don't show the sidebar/navbar layout
  const authPages = ['/', '/register'];
  const isAuthPage = authPages.includes(location.pathname);

  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div style={{ flex: 1 }}>
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="main-content">
          <AppRoutes />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
