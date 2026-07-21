import { Link } from "react-router-dom";

type HotspotProps = {
  to: string;
  label: string;
  className: string;
};

function Hotspot({ to, label, className }: HotspotProps) {
  return (
    <Link
      to={to}
      className={`title-hotspot ${className}`}
      aria-label={label}
      title={label}
    >
      <span className="visually-hidden">{label}</span>
    </Link>
  );
}

export function TitlePage() {
  return (
    <main className="title-page">
      <section
        className="title-cover"
        aria-label="The Phoenix Arcana title page"
      >
        <img
          className="title-cover-image"
          src={`${import.meta.env.BASE_URL}assets/illustrations/phoenix-arcana-title.png`}
          alt="An ornate illuminated-manuscript cover for The Phoenix Arcana"
        />

        {/* Large crested phoenix */}
        <Hotspot
          to="/profile"
          label="Open your profile"
          className="hotspot-phoenix"
        />

        {/* Corner medallions */}
        <Hotspot
          to="/quest"
          label="Open today's quest"
          className="hotspot-sun"
        />

        <Hotspot
          to="/oracle"
          label="Consult the Oracle"
          className="hotspot-moon"
        />

        <Hotspot
          to="/grimoire"
          label="Open the Grimoire"
          className="hotspot-compass"
        />

        <Hotspot
          to="/ledger"
          label="Open the Ledger"
          className="hotspot-tree"
        />

        {/* Main call to action */}
        <Hotspot
          to="/oracle"
          label="Begin today's reading"
          className="hotspot-reading"
        />

        {/* Bottom wax seal */}
        <Hotspot
          to="/"
          label="Return to the title page"
          className="hotspot-seal"
        />
      </section>
    </main>
  );
}