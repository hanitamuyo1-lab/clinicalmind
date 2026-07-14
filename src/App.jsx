import { useState } from 'react';
import { ProgressProvider } from './context/ProgressProvider.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { Header } from './components/Header.jsx';
import { Dashboard } from './views/Dashboard.jsx';
import { Library } from './views/Library.jsx';
import { DetailView } from './views/detail/index.jsx';
import { Progress } from './views/Progress.jsx';
import { About } from './views/About.jsx';
import { Faq } from './views/Faq.jsx';
import { Privacy } from './views/Privacy.jsx';
import { Terms } from './views/Terms.jsx';

function Shell() {
  const [view, setView] = useState('dashboard');
  const [tab, setTab] = useState('map');
  const [conditionId, setConditionId] = useState('Heart failure');

  function go(v) { setView(v); }
  function goTab(t) { setView('detail'); setTab(t); }
  function openCond(name) { setView('detail'); setTab('map'); setConditionId(name); }

  return (
    <div style={{
      display: 'flex', minHeight: '100vh', width: '100%', fontFamily: 'var(--sans)', fontWeight: 300,
      color: 'var(--white)', backgroundColor: '#0a0e0d',
      backgroundImage: 'radial-gradient(circle at 88% -10%,rgba(15,107,94,0.22) 0%,transparent 42%),linear-gradient(rgba(37,196,168,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,196,168,0.04) 1px,transparent 1px)',
      backgroundSize: 'auto,48px 48px,48px 48px',
    }}>
      <Sidebar view={view} tab={tab} onGo={go} onGoTab={goTab} />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onOpenCondition={(name) => openCond(name)} onGoTab={goTab} />
        <div style={{ flex: 1, padding: 30 }}>
          {view === 'dashboard' && <Dashboard onOpenCond={openCond} onGoTab={goTab} />}
          {view === 'library' && <Library onOpenCond={openCond} />}
          {view === 'detail' && (
            <DetailView conditionId={conditionId} tab={tab} onGoTab={goTab} onGoLibrary={() => go('library')} onOpenCond={openCond} />
          )}
          {view === 'progress' && <Progress />}
          {view === 'about' && <About />}
          {view === 'faq' && <Faq />}
          {view === 'privacy' && <Privacy />}
          {view === 'terms' && <Terms />}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ProgressProvider>
      <Shell />
    </ProgressProvider>
  );
}

export default App;
