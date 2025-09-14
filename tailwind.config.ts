import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./helpers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      colors: {
        base100: "oklch(var(--color-base-100) / <alpha-value>)",
        base200: "oklch(var(--color-base-200) / <alpha-value>)",
        base300: "oklch(var(--color-base-300) / <alpha-value>)",
        baseContent: "oklch(var(--color-base-content) / <alpha-value>)",

        primary: "oklch(var(--color-primary) / <alpha-value>)",
        primaryContent: "oklch(var(--color-primary-content) / <alpha-value>)",

        secondary: "oklch(var(--color-secondary) / <alpha-value>)",
        secondaryContent: "oklch(var(--color-secondary-content) / <alpha-value>)",

        accent: "oklch(var(--color-accent) / <alpha-value>)",
        accentContent: "oklch(var(--color-accent-content) / <alpha-value>)",

        neutral: "oklch(var(--color-neutral) / <alpha-value>)",
        neutralContent: "oklch(var(--color-neutral-content) / <alpha-value>)",

        info: "oklch(var(--color-info) / <alpha-value>)",
        success: "oklch(var(--color-success) / <alpha-value>)",
        warning: "oklch(var(--color-warning) / <alpha-value>)",
        error: "oklch(var(--color-error) / <alpha-value>)",
      },
      borderRadius: {
        selector: "var(--radius-selector)",
        field: "var(--radius-field)",
        box: "var(--radius-box)",
      },
      spacing: {
        selector: "var(--size-selector)",
        field: "var(--size-field)",
      },
      borderWidth: {
        DEFAULT: "var(--border)",
      },
      boxShadow: {
        depth: "var(--depth)",
      },
    },
  },
  plugins: [],
} satisfies Config;
