import { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// --- 5x5 pixel-block ASCII font (only letters used in "AREEBA HASSAN") ---



// --- Skill bar renderer ---
// Edit these name/level pairs to match your real skills.
const SKILL_LEVELS = PORTFOLIO_DATA.skillLevels || [
  { name: 'Java', level: 80 },
  { name: 'TypeScript', level: 10 },
  { name: 'Python', level: 30 },
  { name: 'JavaScript', level: 50 },
  { name: 'Software Design', level: 40 },
];

function skillBar(name, level) {
  const width = 20;
  const filled = Math.round((level / 100) * width);
  const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
  return `${name.padEnd(16)} [${bar}] ${level}%`;
}

export function TerminalBar() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([]);
  const [typingItem, setTypingItem] = useState(null); // { text, type, revealed }
  const [easterEggActive, setEasterEggActive] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const queueRef = useRef([]);
  const typingActiveRef = useRef(false);
  const intervalRef = useRef(null);

  const commandShortcuts = [
    'help',
    'whoami',
    'ls projects',
    'cat about.txt',
    'techstack',
    'cat skills.txt',
    'cat education.txt',
    'contact',
    'clear',
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // --- Typing engine: types each queued line char-by-char, then moves to history ---
  const processQueue = () => {
    if (typingActiveRef.current) return;
    const next = queueRef.current.shift();
    if (!next) return;

    typingActiveRef.current = true;
    setTypingItem({ text: next.text, type: next.type, revealed: '' });

    let i = 0;
    const speed = next.type === 'echo' ? 6 : next.type === 'ascii' ? 3 : 10;

    intervalRef.current = setInterval(() => {
      i += 1;
      setTypingItem((prev) =>
        prev ? { ...prev, revealed: next.text.slice(0, i) } : prev
      );
      if (i >= next.text.length) {
        clearInterval(intervalRef.current);
        setHistory((prev) => [...prev, { text: next.text, type: next.type }]);
        setTypingItem(null);
        typingActiveRef.current = false;
        processQueue();
      }
    }, speed);
  };

  const enqueueLines = (lines) => {
    queueRef.current.push(...lines);
    processQueue();
  };

  const handleCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;
    const trimmed = raw.toLowerCase();

    if (trimmed === 'clear') {
      clearInterval(intervalRef.current);
      queueRef.current = [];
      typingActiveRef.current = false;
      setTypingItem(null);
      setHistory([]);
      return;
    }

    let lines = [];

    if (trimmed === 'help') {
      lines = [
        'AVAILABLE COMMANDS:',
        '  help               show this list',
        '  whoami             engineer identification',
        '  ls projects        list mission log entries',
        '  cat about.txt      print profile',
        '  techstack          print tech stack',
        '  cat skills.txt     print skill levels',
        '  cat education.txt  print academic record',
        '  contact            open channel info',
        '  clear              clear output',
      ].map((text) => ({ text, type: 'normal' }));
    }  else if (trimmed === 'whoami') {

  lines = [
    { text: `${PORTFOLIO_DATA.name} — ${PORTFOLIO_DATA.role}`, type: 'amber' },
    {
      text: `BASE: ${PORTFOLIO_DATA.contact.base} · OPEN TO: ${PORTFOLIO_DATA.contact.openTo}`,
      type: 'normal',
    },
  ];
  scrollToSection('about');
  
} else if (trimmed === 'ls projects' || trimmed === 'projects' || trimmed === 'ls') {
      lines = PORTFOLIO_DATA.projects.map((p) => ({
        text: `${p.id}  ${p.name} — ${p.tagline}`,
        type: 'normal',
      }));
      scrollToSection('work');
    } else if (trimmed === 'cat about.txt') {
      lines = [{ text: PORTFOLIO_DATA.bio, type: 'normal' }];
      scrollToSection('about');
    } else if (trimmed === 'techstack' || trimmed === 'stack') {
      lines = PORTFOLIO_DATA.specs.map((s) => ({
        text: `${s.category.padEnd(8)}${s.items}`,
        type: 'normal',
      }));
      scrollToSection('skills');
    } else if (trimmed === 'cat skills.txt') {
      lines = SKILL_LEVELS.map((s) => ({
        text: skillBar(s.name, s.level),
        type: 'normal',
      }));
      scrollToSection('skills');
    } else if (trimmed === 'cat education.txt') {
      lines = PORTFOLIO_DATA.education.map((e) => ({
        text: `${e.type}  ${e.title} — ${e.institution} (${e.period}, ${e.status})`,
        type: 'normal',
      }));
      scrollToSection('skills');
    } else if (trimmed === 'contact') {
      lines = [
        { text: `OPEN.CHANNEL: ${PORTFOLIO_DATA.contact.email}`, type: 'normal' },
        { text: `GITHUB: ${PORTFOLIO_DATA.links.github}`, type: 'normal' },
        { text: `LINKEDIN: ${PORTFOLIO_DATA.links.linkedin}`, type: 'normal' },
      ];
      scrollToSection('signal');
    } else if (trimmed === 'sudo hire areeba') {
      enqueueLines([
        { text: `areeba@sys:~$ ${raw}`, type: 'echo' },
        { text: 'AUTHENTICATING...', type: 'amber' },
      ]);
      setTimeout(() => {
        enqueueLines([
          { text: 'ACCESS GRANTED', type: 'amber' },
          { text: '> candidate flagged for immediate consideration.', type: 'normal' },
          { text: '> resume + portfolio transmission ready on request.', type: 'normal' },
        ]);
        setEasterEggActive(true);
        setTimeout(() => setEasterEggActive(false), 1600);
      }, 500);
      return;
    } else {
      lines = [{ text: `command not found: ${raw} — type 'help'`, type: 'normal' }];
    }

    enqueueLines([{ text: `areeba@sys:~$ ${raw}`, type: 'echo' }, ...lines]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
    setInputVal('');
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [history, typingItem]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const lineClass = (type) =>
    type === 'echo'
      ? 'text-primary'
      : type === 'amber'
      ? 'text-secondary'
      : type === 'ascii'
      ? 'text-secondary font-bold'
      : '';

  return (
    <>
      {easterEggActive && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-secondary/[0.15] pointer-events-none">
          <div className="font-display text-[4vw] font-bold tracking-wide text-secondary opacity-90 [text-shadow:0_0_40px_theme(colors.secondary.DEFAULT)]">
            ACCESS GRANTED
          </div>
        </div>
      )}

      <aside
        aria-label="Command Terminal"
        className="fixed bottom-0 left-0 right-0 z-[60] bg-[rgba(8,11,15,0.96)] border-t border-primary-dim backdrop-blur-[6px]"
      >
        <div className="hidden max-[760px]:!hidden flex flex-wrap gap-x-3.5 gap-y-1 px-5 pt-2 font-data text-[10px] tracking-[0.02em] text-primary-dim">
          {commandShortcuts.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleCommand(cmd)}
              className="font-bold text-primary hover:text-paper transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        <div className="max-h-[110px] overflow-y-auto px-5 pt-1.5 text-xs leading-[1.6] text-paper font-mono">
          {history.map((item, idx) => (
            <div key={idx} className={`whitespace-pre-wrap ${lineClass(item.type)}`}>
              {item.text}
            </div>
          ))}
          {typingItem && (
            <div className={`whitespace-pre-wrap ${lineClass(typingItem.type)}`}>
              {typingItem.revealed}
              <span className="term-cursor">▌</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-5 pt-2 pb-3 text-[13px] font-mono">
          <span className="text-primary flex-shrink-0">areeba@sys:~$</span>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help' to see available commands"
            className="flex-1 bg-transparent border-none outline-none text-paper placeholder-primary-dim/60 font-mono text-[13px]"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </aside>
    </>
  );
}