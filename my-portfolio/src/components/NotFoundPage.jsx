import { Panel } from './Panel';
import { AtmosphereLayers } from './AtmosphereLayers';

export function NotFoundPage({ onReturnToBase }) {
  return (
    <div className="min-h-screen bg-void text-paper flex items-center justify-center p-4 relative overflow-hidden">
      <AtmosphereLayers />

      <div className="w-full max-w-md relative z-10">
        <Panel label="TRANSMISSION ERROR" tag="ERR.404" isAmberLabel={true}>
          <div className="flex flex-col items-center text-center gap-4 py-6">
            <div className="font-display text-4xl sm:text-4xl font-extrabold text-secondary tracking-widest text-glow-amber">
              SIGNAL LOST 
            </div>

            <div className="font-data text-xs text-primary-dim tracking-wider">
              COORDINATES UNRESOLVED // SECTOR 404
            </div>

            <p className="font-mono text-xs sm:text-[13px] text-paper/80 max-w-xs leading-relaxed">
              The designated terminal buffer does not exist or has drifted out of communication range.
            </p>

            <div className="pt-3">
              <button
                type="button"
                onClick={onReturnToBase}
                className="targeting-lock font-data text-xs tracking-wider px-5 py-2.5 border border-primary text-primary hover:text-paper hover:bg-primary/20 transition-all flex items-center gap-2 min-h-[44px]"
              >
                <span className="lock-corner lock-corner-tl" />
                <span className="lock-corner lock-corner-tr" />
                <span className="lock-corner lock-corner-bl" />
                <span className="lock-corner lock-corner-br" />
                <span>[ RETURN TO BASE STATION ]</span>
              </button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
