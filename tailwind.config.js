module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { ink: "#0a0a0a", neon: "#ff003c", violet: "#8a2be2" },
      fontFamily: { display: ["var(--font-display)", "Impact", "sans-serif"], mono: ["var(--font-mono)", "ui-monospace", "monospace"] },
    },
  },
  plugins: [],
};
