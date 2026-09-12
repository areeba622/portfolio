import { useState } from 'react';
import { Panel } from './Panel';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ProjectDetail } from './ProjectDetail';

export function MissionLog() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <Panel id="work" label="MISSION.LOG" tag="EXEC.DIR">
        <div className="flex flex-col divide-y divide-line/70 -mt-3">
          {PORTFOLIO_DATA.projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="
                targeting-lock group cursor-pointer py-3.5 px-3 -mx-3 rounded-sm
                transition-colors duration-300 hover:bg-primary/[0.04] min-h-[50px]

                grid grid-cols-1 gap-2.5

                sm:grid-cols-[36px_1fr_auto_auto]
                sm:items-center sm:gap-4
              "
            >
          
              {/* ── COLUMN 1: ID — fixed 36px, always aligns vertically ── */}
              <span className="font-data text-xs text-primary-dim tracking-widest">
                {project.id}
              </span>

              {/* ── COLUMN 2: Name — 1fr, takes remaining space, truncates if long ── */}
              <span className="font-mono text-xs sm:text-[13px] text-paper font-medium group-hover:text-primary transition-colors min-w-0 truncate">
                {project.name}
              </span>

              {/* ── COLUMN 3: Tech tags — fixed content width, right-aligned as a block ──
                  w-[180px] gives every row's tag group the SAME column width
                  regardless of how many tags or how long they are, so column 4
                  (the button) always starts at the same x-position across rows. */}
              <div className="hidden md:flex justify-end gap-1.5 w-[180px]">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-data text-primary-dim/105 whitespace-nowrap"
                  >
                    •{t}
                  </span>
                ))}
              </div>

              {/* ── COLUMN 4: Button — fixed width so all three buttons match exactly ── */}
              <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    setSelectedProject(project);
  }}
  className="relative inline-flex items-center justify-center px-3 py-1.5 font-mono text-xs text-primary font-semibold bg-transparent rounded-full border border-primary/30 hover:border-transparent hover:shadow-[0_0_0_4px_rgba(95,201,240,0.2)] active:scale-95 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group cursor-pointer select-none min-h-[36px]"
>
  {/* Text Label - Transitions to dark void color on hover for readability against light cyan */}
  <span className="relative z-10 transition-colors duration-300 group-hover:text-void">
    view info →
  </span>

  {/* Light Ripple Expansion Circle using primary.dim blending into primary */}
  <span 
    aria-hidden="true" 
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary/25 group-hover:bg-primary rounded-full opacity-0 group-hover:w-36 group-hover:h-36 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none" 
  />
</button>
            </div>
          ))}
        </div>
      </Panel>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}