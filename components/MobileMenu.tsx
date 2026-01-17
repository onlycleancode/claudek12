"use client";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className="absolute top-4 right-4 bg-white rounded-3xl shadow-2xl p-6 min-w-[280px] animate-in fade-in slide-in-from-top-2 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-primary-light transition-colors"
          aria-label="Close menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-text"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Menu header */}
        <div className="mb-6 pr-8">
          <h2 className="text-lg font-bold text-text font-[family-name:var(--font-heading)]">
            Claude for K-12
          </h2>
          <p className="text-sm text-muted font-[family-name:var(--font-body)]">
            Navigate
          </p>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => onNavigate("hero")}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-primary-light transition-colors text-left group"
          >
            <span className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="font-medium text-text font-[family-name:var(--font-body)]">Home</span>
          </button>

          <button
            onClick={() => onNavigate("prototype")}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-primary-light transition-colors text-left group"
          >
            <span className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="font-medium text-text font-[family-name:var(--font-body)]">Prototype</span>
          </button>

          <button
            onClick={() => onNavigate("philosophy")}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-primary-light transition-colors text-left group"
          >
            <span className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="font-medium text-text font-[family-name:var(--font-body)]">My Philosophy</span>
          </button>

          <button
            onClick={() => onNavigate("about")}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-primary-light transition-colors text-left group"
          >
            <span className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="font-medium text-text font-[family-name:var(--font-body)]">Who Am I</span>
          </button>
        </nav>

        {/* Decorative footer */}
        <div className="mt-6 pt-4 border-t border-primary-light">
          <p className="text-xs text-muted text-center font-[family-name:var(--font-body)]">
            A vision for AI in education
          </p>
        </div>
      </div>
    </div>
  );
}
