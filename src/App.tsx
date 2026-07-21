import { HashRouter, Route, Routes } from "react-router-dom";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { TitlePage } from "./pages/TitlePage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<TitlePage />} />

        <Route
          path="/profile"
          element={
            <PlaceholderPage
              eyebrow="The Self"
              title="Your Profile"
              description="Your preferences, progress, and personal path."
            />
          }
        />

        <Route
          path="/oracle"
          element={
            <PlaceholderPage
              eyebrow="The Oracle"
              title="Today's Reading"
              description="Record how your body feels and shape today's path."
            />
          }
        />

        <Route
          path="/quest"
          element={
            <PlaceholderPage
              eyebrow="The Quest"
              title="Today's Trial"
              description="Your guided movement and strengthening practice."
            />
          }
        />

        <Route
          path="/grimoire"
          element={
            <PlaceholderPage
              eyebrow="The Grimoire"
              title="The Exercise Library"
              description="Movements, modifications, stretches, and instructions."
            />
          }
        />

        <Route
          path="/ledger"
          element={
            <PlaceholderPage
              eyebrow="The Ledger"
              title="Your Progress"
              description="Measurements, history, symptoms, and victories."
            />
          }
        />

        <Route
          path="/archive"
          element={
            <PlaceholderPage
              eyebrow="The Archive"
              title="Preferences and Records"
              description="Settings, backups, accessibility, and stored records."
            />
          }
        />

        <Route path="*" element={<TitlePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;