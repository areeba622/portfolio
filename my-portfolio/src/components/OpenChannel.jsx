import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Panel } from './Panel';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Hardcoded resume content — exact text supplied by the user.
// Edit directly here to update the generated PDF.
const RESUME = {
  name: 'AREEBA HASSAN',
  contactLine:
    'Karachi, Pakistan | +92 330 3757263 | areeba.hassan524@gmail.com',
  linksLine: 'LinkedIn: Areeba Hassan | GitHub: areeba622',
  objective:
    'Motivated Software Engineering student seeking an internship opportunity to apply programming and web development skills in a professional environment. Eager to learn new technologies and contribute to real-world software projects.',
  education: [
    {
      title: 'BS Software Engineering',
      institution: 'Sir Syed University of Engineering & Technology',
      period: '2024-2028',
    },
  ],
  skills: [
    { category: 'LANGUAGE', items: 'Java · Python' },
    { category: 'FRAMEWORKS', items: 'Spring Boot · React' },
    { category: 'DATABASE', items: 'MongoDB · PostgreSQL' },
    { category: 'TOOLS', items: 'Figma · Git' },
  ],
  projects: [
    {
      title: 'Palette – Interior Design E-Commerce Platform',
      description:
        'A pattern-driven full-stack application engineered specifically to demonstrate software design principles and system architecture. Focused on Gang of Four (GoF) design pattern implementations (Creational & Structural) to ensure high cohesion, low coupling, dynamic object creation, and scalable REST API integration.',
      tech: 'React.js, Tailwind CSS, Java, Spring Boot, PostgreSQL',
    },
    {
      title: 'DOMLab — DOM Visualizer',
      description:
        'Built an interactive tool that renders a live, explorable tree view of any pasted HTML, helping developers visualize DOM structure and behavior instead of relying on static diagrams. It applies the Adapter Pattern to collect data from the browser\u2019s native DOM API and transform it into the application\u2019s internal format for consistent processing and visualization.',
      tech: 'React, CSS, TypeScript',
    },
    {
      title: 'Face Verification System',
      description:
        'Developed a facial verification application with a Spring Boot backend and React frontend. Face detection is handled through OpenCV Haar Cascade classifiers, while identity verification is performed using the LBPH (Local Binary Patterns Histograms) recognition model, with results served to the frontend via REST APIs.',
      tech: 'OpenCV (bytedeco), Spring Boot, React.js, Tailwind CSS',
    },
  ],
  certifications: [
    { title: 'Certified AI Software Engineering Professional', issuer: 'NED Academy', year: '2026' },
  ],
};

export function OpenChannel() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadResume = () => {
    setDownloading(true);

    setTimeout(() => {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginX = 48;
      const maxWidth = pageWidth - marginX * 2;
      let y = 56;

      const primary = [20, 30, 45];
      const accent = [42, 90, 114];
      const muted = [90, 100, 110];

      const ensureSpace = (needed) => {
        if (y + needed > 800) {
          doc.addPage();
          y = 56;
        }
      };

      const addSectionTitle = (title) => {
        ensureSpace(30);
        y += 6;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...accent);
        doc.text(title.toUpperCase(), marginX, y);
        y += 4;
        doc.setDrawColor(...accent);
        doc.setLineWidth(0.75);
        doc.line(marginX, y, pageWidth - marginX, y);
        y += 16;
      };

      const addWrappedText = (text, fontSize = 10, color = primary, lineGap = 13) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSize);
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line) => {
          ensureSpace(lineGap);
          doc.text(line, marginX, y);
          y += lineGap;
        });
      };

      // --- Header ---
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(...primary);
      doc.text(RESUME.name, marginX, y);
      y += 20;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...muted);
      doc.text(RESUME.contactLine, marginX, y);
      y += 13;
      doc.text(RESUME.linksLine, marginX, y);
      y += 14;

      doc.setDrawColor(...primary);
      doc.setLineWidth(1);
      doc.line(marginX, y, pageWidth - marginX, y);
      y += 22;

      // --- Career Objective ---
      addSectionTitle('Career Objective');
      addWrappedText(RESUME.objective, 10, primary, 14);
      y += 8;

      // --- Education ---
      addSectionTitle('Education');
      RESUME.education.forEach((e) => {
        ensureSpace(28);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(...primary);
        doc.text(e.title, marginX, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(...muted);
        doc.text(e.period, pageWidth - marginX - doc.getTextWidth(e.period), y);
        y += 14;

        doc.setFontSize(10);
        doc.setTextColor(...accent);
        doc.text(e.institution, marginX, y);
        y += 18;
      });
      y += 4;

      // --- Technical Skills ---
      addSectionTitle('Technical Skills');
      RESUME.skills.forEach((s) => {
        ensureSpace(16);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...primary);
        doc.text(`${s.category}:`, marginX, y);
        const labelWidth = doc.getTextWidth(`${s.category}: `);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...muted);
        doc.text(s.items, marginX + labelWidth, y);
        y += 15;
      });
      y += 8;

      // --- Projects ---
      addSectionTitle('Projects');
      RESUME.projects.forEach((p) => {
        ensureSpace(40);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(...primary);
        doc.text(p.title, marginX, y);
        y += 15;

        addWrappedText(p.description, 9.5, muted, 13);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(...accent);
        const techLines = doc.splitTextToSize(`Techstack: ${p.tech}`, maxWidth);
        techLines.forEach((line) => {
          ensureSpace(13);
          doc.text(line, marginX, y);
          y += 13;
        });
        y += 10;
      });

      // --- Certifications ---
      addSectionTitle('Certifications');
      RESUME.certifications.forEach((c) => {
        ensureSpace(16);
        const line = `${c.title} \u2013 ${c.issuer} (${c.year})`;
        addWrappedText(line, 10, primary, 14);
      });

      doc.save('Areeba_Hassan_Resume.pdf');
      setDownloading(false);
    }, 400);
  };

  return (
    <Panel id="signal" label="CONTACT.LOG" tag="SIG.24" isAmberLabel={true}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-2 font-mono text-xs sm:text-[13px]">
        <div className="flex flex-col gap-2">
          {/* Pulsing amber status dot (§2, §5.9) */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px_#FF8A3D] animate-pulse" />
            <a
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              className="text-paper hover:text-secondary font-medium tracking-wide transition-colors py-1 min-h-[44px] flex items-center"
            >
              {PORTFOLIO_DATA.contact.email}
            </a>
          </div>

          <div className="font-data text-[11px] text-primary-dim tracking-wider pl-5">
            BASE: <span className="text-paper">{PORTFOLIO_DATA.contact.base}</span> · OPEN TO:{' '}
            <span className="text-secondary">{PORTFOLIO_DATA.contact.openTo}</span>
          </div>
        </div>

        {/* DOWNLOAD.RESUME button styled as console export action */}
        <div>
          <button
            type="button"
            onClick={handleDownloadResume}
            disabled={downloading}
            className="group relative inline-block border-0 bg-transparent cursor-pointer z-10 select-none min-h-[44px] focus:outline-none"
          >
            {/* Top Main Face Plate */}
            <div className="relative z-10 flex items-center justify-center gap-2.5 min-h-[44px] px-4 font-data text-xs tracking-wider bg-panel border border-secondary/60 text-secondary group-hover:border-secondary transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] rounded-sm">
              {/* Document Icon */}
              <svg
                viewBox="0 0 24 24"
                width={16}
                height={16}
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-secondary"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1={16} y1={13} x2={8} y2={13} />
                <line x1={16} y1={17} x2={8} y2={17} />
              </svg>

              {/* Label Text */}
              <span>{downloading ? 'EXPORTING...' : 'DOWNLOAD RESUME'}</span>
            </div>

            {/* Sliding Drawer / Bottom Tray (Slides down on hover) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-0 flex items-center justify-center max-w-[90%] mx-auto bg-primary border border-primary/40 text-void rounded-sm translate-y-0 group-hover:translate-y-full group-active:translate-y-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            >
              {/* Animated Arrow Icon */}
              <svg
                viewBox="0 0 24 24"
                width={18}
                height={18}
                stroke="currentColor"
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1={12} y1={15} x2={12} y2={3} />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </Panel>
  );
}