import { useInView } from '../hooks/useInView';

export function Panel({
  id,
  label,
  tag,
  children,
  className = '',
  isAmberLabel = false,
  isTransparent = false,
  headerExtra = null,
  noHeader = false,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative p-4 md:p-5 transition-all duration-300 ${
        inView ? 'in-view' : ''
      } ${
        isTransparent ? 'bg-transparent border border-line/90' : 'glass-panel'
      } ${className}`}
      {...rest}
    >
      {/* Four Cyan Corner Reticle Brackets (§8.3) */}
      <span className="bracket bracket-tl" aria-hidden="true" />
      <span className="bracket bracket-tr" aria-hidden="true" />
      <span className="bracket bracket-bl" aria-hidden="true" />
      <span className="bracket bracket-br" aria-hidden="true" />

      {/* Panel Header */}
      {!noHeader && (label || tag || headerExtra) && (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-line select-none">
          {label ? (
            <div
              className={`panel-reveal-label font-display text-[11px] md:text-xs font-semibold tracking-wider ${
                isAmberLabel ? 'text-secondary' : 'text-primary'
              }`}
            >
              {label}
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            {headerExtra}
            {tag && (
              <span className="panel-tag font-data text-[10px] md:text-[11px] text-primary-dim tracking-widest px-1.5 py-0.5 border border-primary-dim/40">
                {tag}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Panel Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
