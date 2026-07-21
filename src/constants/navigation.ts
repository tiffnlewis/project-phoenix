export type NavigationItem = {
  id: "oracle" | "quest" | "grimoire" | "ledger" | "archive";
  label: string;
  path: string;
  symbol: string;
};

export const navigationItems: NavigationItem[] = [
  {
    id: "oracle",
    label: "Oracle",
    path: "/oracle",
    symbol: "◉",
  },
  {
    id: "quest",
    label: "Quest",
    path: "/quest",
    symbol: "✦",
  },
  {
    id: "grimoire",
    label: "Grimoire",
    path: "/grimoire",
    symbol: "▤",
  },
  {
    id: "ledger",
    label: "Ledger",
    path: "/ledger",
    symbol: "⚖",
  },
  {
    id: "archive",
    label: "Archive",
    path: "/archive",
    symbol: "⌂",
  },
];