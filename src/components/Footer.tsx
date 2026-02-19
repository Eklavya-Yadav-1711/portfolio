"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-[var(--glass-border)] px-4 sm:px-6 md:px-16 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <button
          type="button"
          onClick={scrollToTop}
          className="font-extrabold text-xl text-[var(--border)] hover:text-[var(--cyan)] transition-colors"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          EKU
        </button>
        <div className="text-center md:text-center">
          <p className="font-mono text-[0.65rem] text-[var(--text-muted)]">
            © 2025 Eklavya. Built with obsession.
          </p>
          <p className="font-mono text-[0.65rem] text-[var(--text-muted)] mt-1">
            Dreaming of the cosmos. Building for the world.
          </p>
        </div>
        <p className="font-mono text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">
          // FULL STACK DEVELOPER
        </p>
      </div>
    </footer>
  );
}
