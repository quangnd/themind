import { Theme } from "./util/theme"

export const defaultTheme: Theme = {
  fontOrigin: "googleFonts",
  cdnCaching: true,
  typography: {
    header: "Schibsted Grotesk",
    body: "Source Sans Pro",
    code: "IBM Plex Mono",
  },
  colors: {
    lightMode: {
      light: "#faf8f8",
      lightgray: "#e5e5e5",
      gray: "#b8b8b8",
      darkgray: "#4e4e4e",
      dark: "#2b2b2b",
      secondary: "#284b63",
      tertiary: "#84a59d",
      highlight: "rgba(143, 159, 169, 0.15)",
      textHighlight: "#fff23688",
    },
    darkMode: {
      light: "#161618",
      lightgray: "#393639",
      gray: "#646464",
      darkgray: "#d4d4d4",
      dark: "#ebebec",
      secondary: "#7b97aa",
      tertiary: "#84a59d",
      highlight: "rgba(143, 159, 169, 0.15)",
      textHighlight: "#b3aa0288",
    },
  },
}

export const typewriterTheme: Theme = {
  fontOrigin: "local",
  cdnCaching: true,
  typography: {
    header: "iA Writer Quattro S",
    body: "iA Writer Quattro S",
    code: "JetBrains Mono",
  },
  colors: {
    lightMode: {
      light: "#fcf5e4",
      lightgray: "#e8e0d0",
      gray: "#9e9488",
      darkgray: "#262626",
      dark: "#1a1a1a",
      secondary: "#7b6cd9",
      tertiary: "#9589e0",
      highlight: "rgba(123, 108, 217, 0.12)",
      textHighlight: "#fff23688",
    },
    darkMode: {
      light: "#262626",
      lightgray: "#3a3a3a",
      gray: "#6b6560",
      darkgray: "#c5b8a1",
      dark: "#ddd2c1",
      secondary: "#a99bdb",
      tertiary: "#c4baec",
      highlight: "rgba(169, 155, 219, 0.15)",
      textHighlight: "#b3aa0288",
    },
  },
}
