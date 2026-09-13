import { useState, useRef, useEffect, useCallback } from 'react';
import { Panel } from './Panel';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useHoverOrTap } from '../hooks/useHoverOrTap';

const OBJECT_TYPES = ['asteroid', 'ship', 'comet', 'station'];
const DURATION_RANGES = {
  asteroid: [14, 24],
  ship: [20, 32],
  comet: [10, 16],
  station: [26, 40],
};

const randBetween = (min, max) => Math.random() * (max - min) + min;

export function ShipWindow() {
  const [showHud, setShowHud] = useState(false);
  const [isThrustReversed, setIsThrustReversed] = useState(false);
  const { canHover } = useHoverOrTap();

  // --- Dynamic passing-object spawner ---
  const [passers, setPassers] = useState([]);
  const spawnTimeoutRef = useRef(null);
  const idCounterRef = useRef(0);
const MIN_TOP_GAP = 22; // minimum vertical % separation between concurrent objects

const pickSpacedTop = (activeTops) => {
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = randBetween(12, 85);
    const tooClose = activeTops.some((t) => Math.abs(t - candidate) < MIN_TOP_GAP);
    if (!tooClose) return candidate;
  }
  // fallback: no free slot found after 8 tries, just space it from the nearest one
  return activeTops.length ? (activeTops[0] + MIN_TOP_GAP) % 90 + 5 : randBetween(12, 85);
};

const spawnPasser = useCallback(() => {
  const type = OBJECT_TYPES[Math.floor(Math.random() * OBJECT_TYPES.length)];
  const [minD, maxD] = DURATION_RANGES[type];
  const id = idCounterRef.current++;

  setPassers((prev) => {
    // cap concurrent objects so it never feels crowded
    if (prev.length >= 3) return prev;

    const activeTops = prev.map((p) => p.top);
    const top = pickSpacedTop(activeTops);

    return [
      ...prev,
      {
        id,
        type,
        top,
        duration: randBetween(minD, maxD),
        side: Math.random() < 0.5 ? 'ltr' : 'rtl',
      },
    ];
  });

  spawnTimeoutRef.current = setTimeout(spawnPasser, randBetween(3500, 11000));
}, []);
  useEffect(() => {
    spawnTimeoutRef.current = setTimeout(spawnPasser, randBetween(1500, 4000));
    return () => clearTimeout(spawnTimeoutRef.current);
  }, [spawnPasser]);

  const removePasser = (id) => {
    setPassers((prev) => prev.filter((p) => p.id !== id));
  };

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
      {/* Parallax depth layers — distinct from page background */}
      <div className="ship-parallax">
        <div className="ship-star-layer ship-star-far" />
        <div className="ship-star-layer ship-star-mid" />
        

        {passers.map((p) => {
          const phase = isThrustReversed ? 'recede' : 'approach';
          const animName = `ship-pass-${p.side}-${phase}`;
          const isStation = p.type === 'station';

          return (
            <span
              key={p.id}
              className={`ship-passer-dynamic ship-obj-${p.type}`}
              style={{
                top: `${p.top}%`,
                animationName: isStation ? `${animName}, ship-blink` : animName,
                animationDuration: isStation ? `${p.duration}s, 0.9s` : `${p.duration}s`,
                animationTimingFunction: isStation ? 'linear, steps(1)' : 'linear',
                animationIterationCount: isStation ? '1, infinite' : '1',
                animationFillMode: 'forwards',
              }}
              onAnimationEnd={() => removePasser(p.id)}
            />
          );
        })}
      </div>

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