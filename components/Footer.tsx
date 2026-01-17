export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center border-t border-primary-light">
      <p className="text-muted text-sm font-[family-name:var(--font-body)]">
        Created by Joel{" "}
        <span className="mx-2 text-primary">·</span>
        <a
          href="https://joelmontano.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
        >
          joelmontano.com
        </a>
      </p>
    </footer>
  );
}
