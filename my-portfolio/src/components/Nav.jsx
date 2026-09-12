import { useState, useEffect } from 'react';

function BatteryIndicator({ level = 84 }) {
  const fillColor =
    level > 50 ? 'bg-primary' : level > 20 ? 'bg-amber' : 'bg-coral';

  return (
    <div className="flex items-center gap-1.5" aria-label={`Power ${level}%`}>
      <span className="hidden sm:inline font-data text-[10px] text-primary-dim">
        PWR
      </span>
      <div className="flex items-center">
        <div className="w-6 h-3 border border-primary-dim/60 rounded-[2px] p-[1.5px] flex items-center">
          <div
            className={`h-full ${fillColor} rounded-[1px] transition-all duration-500`}
            style={{ width: `${level}%` }}
          />
        </div>
        <div className="w-[2px] h-1.5 bg-primary-dim/60 rounded-r-sm -ml-px" />
      </div>
      <span className="text-paper font-data text-[10px]">{level}%</span>
    </div>
  );
}

export function Nav() {
  const [pktTime, setPktTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setPktTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close the mobile menu automatically if the viewport grows back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'WORK', href: '#work' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'SIGNAL', href: '#signal' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-void/90 backdrop-blur-md border-b border-line">
      {/* 1. Telemetry strip */}
      <div className="w-full border-b border-line/60 px-4 md:px-8 py-1.5 flex justify-between items-center text-[11px] font-data text-primary-dim select-none overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1.5 text-paper">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>
              SYS.TIME: <span className="text-primary">{pktTime || '12:00:00'} PKT</span>
            </span>
          </span>
          <span className="text-line">|</span>
          <span className="flex items-center gap-1">
            <span>SIGNAL</span>
            <span className="text-primary tracking-tighter">●●●●</span>
            <span className="text-primary-dim">○</span>
          </span>
          <span className="hidden sm:inline text-line">|</span>
          <span className="hidden sm:inline">AVG.REPLY &lt;24H</span>
        </div>

        <div className="flex items-center gap-3">
          <BatteryIndicator level={84} />
          <span className="hidden xs:inline text-[10px] text-paper-dim border border-primary-dim/30 px-1 py-0.5">
            STABLE
          </span>
        </div>
      </div>

      {/* 2. Main Nav bar */}
      <div className="max-w-[1020px] mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="font-display text-xs md:text-sm tracking-wider font-bold text-paper hover:text-primary transition-colors py-2"
        >
          AREEBA_HASSAN<span className="text-primary">.SYS</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-4">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs tracking-wider text-primary hover:text-paper hover:border-b-2 hover:border-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center px-2"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden flex items-center justify-center w-11 h-11 border border-line text-primary hover:border-primary transition-colors"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="w-4 flex flex-col gap-[3px] items-center">
            <span
              className={`block h-[2px] w-4 bg-current transition-transform duration-200 ${
                menuOpen ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-4 bg-current transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-[2px] w-4 bg-current transition-transform duration-200 ${
                menuOpen ? '-translate-y-[5px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu panel */}
      <nav
        className={`md:hidden overflow-hidden border-t border-line bg-void/95 transition-[max-height] duration-300 ease-in-out ${
          menuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-4 py-1">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-xs tracking-wider text-primary hover:text-paper transition-colors min-h-[44px] flex items-center border-b border-line/40 last:border-b-0"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}