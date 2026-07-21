import { ArcanaLayout } from "./layouts/ArcanaLayout";

function App() {
  return (
    <ArcanaLayout>
      <article className="arcana-card">
        <h2 className="arcana-card-title">
          Today&apos;s Reading
        </h2>

        <p>
          The first page of The Phoenix Arcana has opened.
          Your Oracle, Quest, Grimoire, Ledger, and Archive
          will soon take their places within these borders.
        </p>
      </article>
    </ArcanaLayout>
  );
}

export default App;