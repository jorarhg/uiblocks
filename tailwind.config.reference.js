/**
 * @file tailwind.config.reference.js
 * @description Configuración de Tailwind CSS de REFERENCIA para proyectos que consumen @teribit/ui-blocks
 * 
 * IMPORTANTE: Este archivo es una PLANTILLA/EJEMPLO personalizable.
 * Los valores aquí son los que usa el proyecto demo, pero DEBES adaptarlos
 * a tu sistema de diseño y marca.
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo a tu proyecto como `tailwind.config.js`
 * 2. Ajusta los valores de colores según tu diseño
 * 3. Modifica los `content` paths según tu estructura
 * 4. Extiende con tus propias utilidades si lo necesitas
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  
  // AJUSTAR: Configura los paths donde Tailwind debe buscar clases
  content: [
    // Tu código
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    
    // Si instalaste vía npm:
    "./node_modules/@teribit/ui-blocks/dist/**/*.{js,mjs}",
    
    // Si usas git subtree en libs/ui-blocks:
    // "./libs/ui-blocks/src/**/*.{ts,tsx}",
    
    // Si usas git subtree en vendor/uiblocks/packages/ui-blocks:
    // "./vendor/uiblocks/packages/ui-blocks/src/**/*.{ts,tsx}",
  ],
  
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // PERSONALIZAR: Estos colores son EJEMPLOS basados en variables CSS
      // Usa hsl(var(--tu-variable)) para permitir theming dinámico
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Variables para charts (Recharts)
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // Requerido para animaciones de Radix UI
    require("tailwindcss-animate"),
  ],
}
