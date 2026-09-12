import { Panel } from './Panel';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function EducationRecord() {
  return (
    <Panel label="EDUCATION.RECORD" tag="ARCHIVE.ACAD">
      <div className="flex flex-col divide-y divide-line/60 font-mono text-xs sm:text-[13px]">
        {PORTFOLIO_DATA.education.map((item) => (
          <div key={item.title} className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2 first:pt-1 last:pb-1">
            <div className="flex items-start gap-4">
              <span className="font-data text-xs text-primary-dim tracking-widest min-w-[60px] pt-0.5">
                {item.type}
              </span>
              <div className="flex flex-col">
                <span className="text-paper font-semibold tracking-wide">
                  {item.title}
                </span>
                <span className="text-primary-dim text-xs mt-0.5">
                  {item.institution}
                </span>
                {item.details && (
                  <span className="text-[11px] text-paper-dim/80 mt-1 max-w-xl">
                    {item.details}
                  </span>
                )}
              </div>
            </div>

            <div className="font-data text-xs sm:text-right flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0.5 pl-[76px] sm:pl-0">
              <span className="text-paper">{item.period}</span>
              <span className={`text-[10px] tracking-wider px-1.5 py-0.5 border ${
                item.status === 'IN PROGRESS'
                  ? 'border-secondary/50 text-secondary bg-secondary/10'
                  : 'border-primary/50 text-primary bg-primary/10'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
