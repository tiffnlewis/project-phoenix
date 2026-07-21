export const colors = {
  parchment: "#F5EFE2",
  agedIvory: "#EDE2CC",
  ink: "#2B241C",
  antiqueGold: "#B58B2A",
  burgundy: "#7B2D3A",
  forest: "#566648",
  blueSteel: "#495C73",
} as const;

export type ColorToken = keyof typeof colors;