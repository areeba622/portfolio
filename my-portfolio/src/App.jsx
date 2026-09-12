import { useState, useEffect } from 'react';
import { AtmosphereLayers } from './components/AtmosphereLayers';
import { BackgroundStarfield } from './components/BackgroundStarfield';
import { LoadingScreen } from './components/LoadingScreen';
import { Nav } from './components/Nav';
import { IdentityBlock } from './components/IdentityBlock';
import { ShipWindow } from './components/ShipWindow';
import { UserProfile } from './components/UserProfile';
import { SystemSpecs } from './components/SystemSpecs';
import { SystemActivity } from './components/SystemActivity';
import { EducationRecord } from './components/EducationRecord';
import { MissionLog } from './components/MissionLog';
import { OpenChannel } from './components/OpenChannel';
import { TerminalBar } from './components/TerminalBar';
import { NotFoundPage } from './components/NotFoundPage';


function isKnownPath(pathname) {
  return pathname === '/' || pathname === '/index.html';
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [is404, setIs404] = useState(false);


  useEffect(() => {
    const check = () => setIs404(!isKnownPath(window.location.pathname));
    check();
    window.addEventListener('popstate', check);
    return () => window.removeEventListener('popstate', check);
  }, []);

  if (is404) {
    return (
      <NotFoundPage
        onReturnToBase={() => {
          // Must actually navigate — flipping React state alone would
          // leave the browser's address bar still pointing at the bad
          // URL, so a page refresh would land back on this 404 again.
          window.history.pushState({}, '', '/');
          setIs404(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-void text-paper relative selection:bg-primary/30 selection:text-paper">
      <AtmosphereLayers />
      <BackgroundStarfield />
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <Nav />

      <main className="relative z-10 max-w-[1020px] mx-auto px-4 md:px-6 pt-32 pb-40 flex flex-col gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-5 items-stretch">
          <IdentityBlock />
          <ShipWindow />
        </div>
        <UserProfile />
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr] gap-5 items-stretch">
          <SystemSpecs />
          <SystemActivity username="areeba622" />
        </div>
        <EducationRecord />
        <MissionLog />
        <OpenChannel />
        <footer className="py-4 text-center font-data text-[10px] text-primary-dim/100 select-none">
          AREEBA_HASSAN - KARACHI, PK
        </footer>
      </main>

      <TerminalBar />
    </div>
  );
}