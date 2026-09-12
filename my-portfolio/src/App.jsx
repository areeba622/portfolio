import { useState } from 'react';
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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [is404, setIs404] = useState(false);

  // Allow testing 404 route via query or manual state
  if (is404) {
    return <NotFoundPage onReturnToBase={() => setIs404(false)} />;
  }

  return (
    <div className="min-h-screen bg-void text-paper relative selection:bg-primary/30 selection:text-paper">
      {/* 1. Atmosphere Layers (Scanlines, vignette, chroma, grain) */}
      <AtmosphereLayers />

      {/* 2. Full-page live WebGL starfield behind all panels */}
      <BackgroundStarfield />

      {/* 3. Fast non-blocking system initialization boot screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* 4. Fixed Top Nav & Live PKT Telemetry Bar */}
      <Nav />

      {/* 5. Main Cockpit Console Grid */}
      <main className="relative z-10 max-w-[1020px] mx-auto px-4 md:px-6 pt-32 pb-40 flex flex-col gap-5">
        
        {/* ROW 1: IDENTITY (wide) | SHIP.WINDOW glass viewport (narrow) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-5 items-stretch">
          <IdentityBlock />
          <ShipWindow />
        </div>

        {/* USER.PROFILE (full width) */}
        <UserProfile />

        {/* ROW 2: SYSTEM.SPECS (narrow) | SYSTEM.ACTIVITY — live GitHub (wide) */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr] gap-5 items-stretch">
          <SystemSpecs />
          <SystemActivity username="areeba622" />
        </div>

        {/* EDUCATION.RECORD (full width) */}
        <EducationRecord />

        {/* MISSION.LOG (full width — priority content) */}
        <MissionLog />

        {/* OPEN CHANNEL / CONTACT + resume download */}
        <OpenChannel />

        {/* Subtle footer credit */}
        <footer className="py-4 text-center font-data text-[10px] text-primary-dim/100 select-none">
          AREEBA_HASSAN - KARACHI, PK
        </footer>
      </main>

      {/* 6. Pinned Persistent Command Terminal Bar */}
      <TerminalBar />
    </div>
  );
}