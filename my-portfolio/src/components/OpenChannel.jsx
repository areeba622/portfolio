import { useState } from 'react';
import { Panel } from './Panel';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function OpenChannel() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadResume = () => {
    setDownloading(true);
    // Create console download / export action
    setTimeout(() => {
      // Create a programmatic resume file blob or link to real resume
      const resumeContent = `AREEBA HASSAN — FULL-STACK ENGINEER (BACKEND-LEANING)
Email: ${PORTFOLIO_DATA.contact.email}
Base: ${PORTFOLIO_DATA.contact.base}
GitHub: ${PORTFOLIO_DATA.links.github}
LinkedIn: ${PORTFOLIO_DATA.links.linkedin}

ACADEMIC RECORD:
- BS Software Engineering, Sir Syed University of Engineering & Technology (2024 - 2028, In Progress)
- Certified AI Software Engineering Professional, NED Academy (2026, 1.0 CPD)

TECHNICAL SPECS:
- Languages: Java, Python
- Frameworks: Spring Boot, React
- Databases: MongoDB, PostgreSQL
- Architecture: UML, System Design, REST APIs, Microservices
- Tools: Git, Docker, Linux, CLI utilities

PROJECT TRANSMISSIONS:
1. DOMLab — DOM visualizer (JS, DOM API, vector node graph)
2. task-tracker-cli — Terminal task manager (Python, CLI, JSON integrity engine)
3. Personality Quiz — Psychometric quiz platform (Python, Flask, SQLite)
`;

      const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Areeba_Hassan_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 600);
  };

  return (
    <Panel id="signal" label="CONTACT & COMMS" tag="SIG.24" isAmberLabel={true}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-2 font-mono text-xs sm:text-[13px]">
        <div className="flex flex-col gap-2">
          {/* Pulsing amber status dot (§2, §5.9) */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px_#FF8A3D] animate-pulse" />
            <a
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              className="text-paper hover:text-secondary font-medium tracking-wide transition-colors py-1 min-h-[44px] flex items-center"
            >
              {PORTFOLIO_DATA.contact.email}
            </a>
          </div>

          <div className="font-data text-[11px] text-primary-dim tracking-wider pl-5">
            BASE: <span className="text-paper">{PORTFOLIO_DATA.contact.base}</span> · OPEN TO:{' '}
            <span className="text-secondary">{PORTFOLIO_DATA.contact.openTo}</span>
          </div>
        </div>

        {/* DOWNLOAD.RESUME button styled as console export action */}
        <div><button
  type="button"
  onClick={handleDownloadResume}
  disabled={downloading}
  className="group relative inline-block border-0 bg-transparent cursor-pointer z-10 select-none min-h-[44px] focus:outline-none"
>
  {/* Top Main Face Plate */}
  <div className="relative z-10 flex items-center justify-center gap-2.5 min-h-[44px] px-4 font-data text-xs tracking-wider bg-panel border border-secondary/60 text-secondary group-hover:border-secondary transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] rounded-sm">
    
 

    {/* Document Icon */}
    <svg 
      viewBox="0 0 24 24" 
      width={16} 
      height={16} 
      stroke="currentColor" 
      strokeWidth={2} 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="text-secondary"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1={16} y1={13} x2={8} y2={13} />
      <line x1={16} y1={17} x2={8} y2={17} />
    </svg>

    {/* Label Text */}
    <span>{downloading ? 'EXPORTING...' : 'DOWNLOAD RESUME'}</span>
  </div>

  {/* Sliding Drawer / Bottom Tray (Slides down on hover) */}
  <div 
    aria-hidden="true" 
    className="absolute inset-0 z-0 flex items-center justify-center max-w-[90%] mx-auto bg-primary border border-primary/40 text-void rounded-sm translate-y-0 group-hover:translate-y-full group-active:translate-y-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
  >
    {/* Animated Arrow Icon */}
    <svg 
      viewBox="0 0 24 24" 
      width={18} 
      height={18} 
      stroke="currentColor" 
      strokeWidth={2.5} 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="animate-bounce"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1={12} y1={15} x2={12} y2={3} />
    </svg>
  </div>
</button>
        </div>
      </div>
    </Panel>
  );
}
