import { Panel } from './Panel';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  SiPython,
  SiSpring,
  SiReact,
  SiMongodb,
  SiPostgresql,
  SiGit,
} from 'react-icons/si';
import { DiJava } from 'react-icons/di'; // ← the actual coffee cup

// Generic (non-brand) icons stay hand-drawn — no official logo exists for these
function UmlIcon() {
  return (
    <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="8.5" y="14" width="7" height="7" />
      <path d="M6.5 10v2h11v-2M12 12v2" />
    </svg>
  );
}

function ArchitectureIcon() {
  return (
    <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01" />
    </svg>
  );
}

const ICON_MAP = {
  java: DiJava,        // ← swapped from SiOpenjdk
  python: SiPython,
  springboot: SiSpring,
  react: SiReact,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  git: SiGit,
  uml: UmlIcon,
  architecture: ArchitectureIcon,
};

function SpecIcon({ name }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className="w-4 h-4 text-primary shrink-0" />;
}

export function SystemSpecs() {
  return (
    <Panel id="skills" label="SYSTEM.SPECS" tag="SKILLS.IO">
      <div className="flex flex-col divide-y divide-line/60 font-mono text-xs">
        {PORTFOLIO_DATA.specs.map((item) => {
          const labels = item.items.split(',').map((s) => s.trim());

          return (
            <div key={item.category} className="py-2.5 flex items-center justify-between gap-4 first:pt-1 last:pb-1">
              <div className="flex items-center gap-2.5 text-primary-dim font-data tracking-widest min-w-[70px]">
                <span className="text-line">&gt;</span>
                <span>{item.category}</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap justify-end">
                {item.icons.map((iconKey, i) => (
                  <span key={iconKey} className="inline-flex items-center gap-1.5">
                    <SpecIcon name={iconKey} />
                    <span className="text-paper/90 font-medium tracking-wide">
                      {labels[i]}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}