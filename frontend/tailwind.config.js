/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "hsl(var(--primary))",
          "primary-foreground": "hsl(var(--primary-foreground))",
          secondary: "hsl(var(--secondary))",
          "secondary-foreground": "hsl(var(--secondary-foreground))",
          muted: "hsl(var(--muted))",
          "muted-foreground": "hsl(var(--muted-foreground))",
          accent: "hsl(var(--accent))",
          "accent-foreground": "hsl(var(--accent-foreground))",
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
        },
      },
    },
    plugins: [],
  };