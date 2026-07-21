import { Link } from "react-router-dom";
import { ArcanaLayout } from "../layouts/ArcanaLayout";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <ArcanaLayout
      eyebrow={eyebrow}
      title={title}
      subtitle={description}
    >
      <article className="arcana-card placeholder-card">
        <p>
          This chapter of The Phoenix Arcana is still being illuminated.
        </p>

        <Link className="arcana-link-button" to="/">
          Return to the Title Page
        </Link>
      </article>
    </ArcanaLayout>
  );
}