import { useEffect, useRef } from 'react';

export function ProjectDetail({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
    
    // Prevent body scrolling while modal is active
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, [project]);

  if (!project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="modal-project-title"
      className="backdrop:bg-void/85 backdrop:backdrop-blur-md bg-transparent p-0 m-auto w-full max-w-2xl open:flex flex-col overflow-visible"
    >
      <div className="relative w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto glass-panel p-5 sm:p-6 border border-line shadow-2xl flex flex-col gap-4 in-view m-4 sm:m-auto">
        {/* Reticle Brackets */}
        <span className="bracket bracket-tl !opacity-100 !transform-none" />
        <span className="bracket bracket-tr !opacity-100 !transform-none" />
        <span className="bracket bracket-bl !opacity-100 !transform-none" />
        <span className="bracket bracket-br !opacity-100 !transform-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-line pb-3">
          <div className="flex flex-col gap-1">
            <span className="font-data text-[11px] text-primary tracking-widest">
              TRANSMISSION - LOG # {project.id}
            </span>
            <h2
              id="modal-project-title"
              className="font-display text-lg sm:text-xl font-bold text-paper"
            >
              {project.name}
            </h2>
            <p className="font-mono text-xs text-paper">{project.tagline}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close transmission"
            className="font-data text-xs text-primary-dim hover:text-secondary px-2 py-1 border border-line hover:border-secondary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            ✕
          </button>
        </div>
{/*}
        {/* Transmission Visual Simulator / Schematic Frame 
        <div className="w-full h-44 sm:h-52 bg-void border border-primary-dim/40 relative overflow-hidden flex flex-col items-center justify-center select-none group">
          <div className="absolute top-2 left-2 font-data text-[10px] text-primary-dim">
            RADAR_RENDER // VECTOR SIMULATION
          </div>

          {/* Animated wireframe grid visualization 
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#5fc9f0_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="text-center z-10 px-4">
            <div className="font-display text-base sm:text-lg text-primary tracking-widest mb-1 animate-pulse">
              [ {project.name.toUpperCase()} ]
            </div>
            <div className="font-data text-[11px] text-paper-dim">
              STANDBY TELEMETRY &bull; ARCHITECTURE VERIFIED
            </div>
          </div>

          <div className="absolute bottom-2 right-2 font-data text-[9px] text-primary-dim">
            CH: 0{project.id} // SECURE
          </div>
        </div>
*/}
        {/* Problem → Approach → Learned Write-up (§5.8) */}
        <div className="flex flex-col gap-3 font-mono text-xs text-paper/90 divide-y divide-line/40">
          <div className="pt-2">
            <div className="font-data text-[10px] text-secondary tracking-widest mb-1 uppercase">
              01. The Problem
            </div>
            <p className="leading-relaxed text-paper/85">{project.writeup.problem}</p>
          </div>

          <div className="pt-2">
            <div className="font-data text-[10px] text-primary tracking-widest mb-1 uppercase">
              02. Technical Approach
            </div>
            <p className="leading-relaxed text-paper/85">{project.writeup.approach}</p>
          </div>

          <div className="pt-2">
            <div className="font-data text-[10px] text-primary tracking-widest mb-1 uppercase">
              03. What Was Learned
            </div>
            <p className="leading-relaxed text-paper/85">{project.writeup.learned}</p>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-line">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-data text-[10px] px-2 py-0.5 border border-primary-dim/50 text-primary bg-void/50"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between pt-2 border-t border-line">
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="targeting-lock font-mono text-xs text-paper hover:text-primary transition-colors py-2 px-3 border border-line hover:border-primary-dim min-h-[44px] flex items-center"
              >
                <span className="lock-corner lock-corner-tl" />
                <span className="lock-corner lock-corner-tr" />
                <span className="lock-corner lock-corner-bl" />
                <span className="lock-corner lock-corner-br" />
                → GITHUB REPO
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-secondary hover:text-paper transition-colors py-2 px-3 border border-secondary-dim hover:border-secondary min-h-[44px] flex items-center"
              >
                LIVE TRANSMISSION
              </a>
            )}
          </div>

          
        </div>
      </div>
    </dialog>
  );
}
