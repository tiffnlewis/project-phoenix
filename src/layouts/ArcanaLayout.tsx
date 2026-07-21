import type { ReactNode } from "react";

type ArcanaLayoutProps = {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  subtitle?: string;
};

export function ArcanaLayout({
  children,
  title = "The Phoenix Arcana",
  eyebrow = "Chapter I · The Awakening",
  subtitle = "Rebuilding strength, one intentional step at a time.",
}: ArcanaLayoutProps) {
  return (
    <div className="arcana-app">
      <main className="arcana-page">
        <div className="arcana-inner-border" aria-hidden="true" />

        <header className="arcana-header">
          <p className="arcana-eyebrow">{eyebrow}</p>

          <h1 className="arcana-title">{title}</h1>

          {subtitle && (
            <p className="arcana-subtitle">{subtitle}</p>
          )}

          <div className="arcana-divider" aria-hidden="true">
            <span>❧</span>
          </div>
        </header>

        <section className="arcana-content">{children}</section>
      </main>
    </div>
  );
}