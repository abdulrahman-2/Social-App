import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        border: "var(--border)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        btn: "var(--btn)",
        btnHover: "var(--btnHover)",
        shadow: "var(--shadow)",
      },
      screens: {
        lg: "892px",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  darkMode: "class",
  plugins: [flowbite.plugin()],
};
export default config;
