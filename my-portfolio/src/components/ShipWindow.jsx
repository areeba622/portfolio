import { useState } from 'react';
import { Panel } from './Panel';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useHoverOrTap } from '../hooks/useHoverOrTap';

export function ShipWindow() {
  const [showHud, setShowHud] = useState(false);
  const [isThrustReversed, setIsThrustReversed] = useState(false);
  const { canHover } = useHoverOrTap();

  const handlePointerEnter = () => {
    if (canHover) {
      setIsThrustReversed(true);
      window.dispatchEvent(
        new CustomEvent('starfield:thrust', { detail: { reverse: true } })
      );
    }
  };

  const handlePointerLeave = () => {
    if (canHover) {
      setIsThrustReversed(false);
      window.dispatchEvent(
        new CustomEvent('starfield:thrust', { detail: { reverse: false } })
      );
    }
  };

  // Mobile tap fallback for ambient thrust reversal (§5.3b)
  const handleWindowTap = (e) => {
    // If click was on the DEGREE.LOG button, don't toggle thrust
    if (e.target.closest('button')) return;

    if (!canHover) {
      const nextState = !isThrustReversed;
      setIsThrustReversed(nextState);
      window.dispatchEvent(
        new CustomEvent('starfield:thrust', { detail: { reverse: nextState } })
      );
    }
  };

  const toggleHud = (e) => {
    e.stopPropagation();
    setShowHud((prev) => !prev);
  };

  return (
    <Panel
      isTransparent={true}
      label="SHIP.WINDOW"
      tag="TRANSIT"
      headerExtra={
        <span className="font-data text-[10px] text-primary-dim tracking-wider">
          {PORTFOLIO_DATA.hud.label}
        </span>
      }
      className="h-full min-h-[220px] flex flex-col justify-between select-none cursor-pointer overflow-hidden group"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleWindowTap}
    >
      {/* Reticle grid guides inside the viewport pane */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-16 h-16 border border-primary-dim/40 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
        </div>
        <div className="absolute w-full h-[1px] bg-line/40" />
        <div className="absolute h-full w-[1px] bg-line/40" />
      </div>

      {/* Thrust indicator feedback badge */}
      <div className="absolute top-2 left-2 z-20 font-data text-[10px] px-1.5 py-0.5 border border-primary-dim/30 bg-void/70 text-primary-dim">
        THRUST: <span className={isThrustReversed ? 'text-secondary font-bold' : 'text-primary'}>
          {isThrustReversed ? 'REVERSE' : 'FORWARD'}
        </span>
      </div>

{/* DEGREE.LOG Button - Always visible & tappable (§5.3b) */}
<div className="absolute top-2 right-2 z-30">
  <button
    type="button"
    onClick={toggleHud}
    title="Toggle academic progress"
    className={`degree-btn font-data text-[11px] min-h-[36px] ${showHud ? 'is-active' : ''}`}
  >
    <span className="degree-lg">
      <span className="degree-sl" />
      <span className="degree-dot" />
      <span className="degree-text">DEGREE.LOG</span>
    </span>
  </button>
</div>


     {/* Main HUD overlay when toggled */}
<div
  className={`relative z-20 my-auto flex flex-col items-center justify-center p-4 transition-all duration-300 ${
    showHud
      ? 'opacity-100 scale-95'
      : 'opacity-0 scale-95 pointer-events-none'
  }`}
>
  <div className="bg-void/85 border border-secondary/60 p-4 rounded-none text-center shadow-[0_0_20px_rgba(255,138,61,0.2)] backdrop-blur-sm max-w-[200px] scale-[0.75] origin-center">
          <div className="font-data text-[10px] tracking-widest text-secondary mb-1">
            ACADEMIC PROGRESS MONITOR
          </div>
          {/* Big number in Orbitron per §3 & §5.3 */}
          <div className="font-display text-4xl md:text-2xl font-extrabold text-secondary tracking-tight mb-2 text-glow-amber">
            {PORTFOLIO_DATA.hud.degreeProgress}
          </div>
          <div className="font-data text-xs text-paper tracking-wider border-t border-secondary-dim/40 pt-2">
            {PORTFOLIO_DATA.hud.degreeMeta}
          </div>
          <div className="font-data text-[10px] text-primary-dim mt-2">
            SSUET
          </div>
        </div>
      </div>

      {/* Bottom status strip */}
      <div className="relative z-20 flex justify-between items-center text-[10px] font-data text-primary-dim/80 pt-4 mt-auto">
        <span>Z-TRANSIT: 0.8 AU/s</span>
        <span className="text-[9px]">
          {canHover ? '[ HOVER: REVERSE THRUST ]' : '[ TAP: TOGGLE THRUST ]'}
        </span>
      </div>
    </Panel>
  );
}
