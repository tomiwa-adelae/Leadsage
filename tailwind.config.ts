import type { Config } from "tailwindcss";

const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		animation: {
			bounce: "bounce 3s ease-in-out infinite",
			scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
		},
		keyframes: {
			scroll: {
				to: {
					transform: "translate(calc(-50% - 0.5rem))",
				},
			},
			bounce: {
				"0%, 100%": {
					transform: "translateY(-25%)",
					animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
				},
				"50%": {
					transform: "translateY(0)",
					animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
				},
			},
		},
		container: {
			center: true,
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				warning: "#E67324",
				gray: {
					"100": "#f3f3f3",
					"700": "#74767E",
				},
				green: {
					"400": "#59B778",
					"600": "#2F6F60",
					"700": "#204B41",
				},
				red: {
					"100": "#FBF7ED",
				},
				black: "#404145",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
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
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				spin: {
					to: {
						transform: "rotate(360deg)",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		addVariablesForColors,
		function ({ addComponents }: any) {
			addComponents({
				".container": {
					maxWidth: "89%",
					"@screen lg": {
						maxWidth: "1224px",
						width: "89%",
					},
				},
			});
		},
	],
};
function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}
export default config;
