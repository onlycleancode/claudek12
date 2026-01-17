export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-primary-light"
    >
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-text font-[family-name:var(--font-heading)] mb-6 leading-tight">
          Claude for K-12
        </h1>
        <p className="text-xl md:text-2xl text-muted font-[family-name:var(--font-heading)] font-semibold mb-8">
          Reimagining AI in Education
        </p>
        <div className="text-lg text-text/80 font-[family-name:var(--font-body)] max-w-xl mx-auto leading-relaxed">
          <p className="mb-4 font-semibold">TLDR;</p>
          <ol className="list-decimal list-inside space-y-2 text-left">
            <li>
              Build a lightweight browser wrapper to fully integrate Claude for
              even the lowest end devices.
            </li>
            <li>
              Continue to innovate alongside educators, students, and parents.
            </li>
          </ol>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-primary"
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
