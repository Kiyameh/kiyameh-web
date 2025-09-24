import type { Theme } from "./types";

export const defaultTheme: Theme = {
	// Theme metadata
	name: "Colorful rainbow",
	description: "Nice to make gradients",
	colorModePreference: "light",

	// Surface colors
	surface100: "oklch(100% 0 0)",
	surface200: "oklch(97.466% 0.011 259.822)",
	surface300: "oklch(93.268% 0.016 262.751)",
	content: "oklch(41.886% 0.053 255.824)",
	emphasis: "oklch(0.63 0.1998 252)",
	border: "oklch(0.5575 0.053 255.824)",
	borderSoft: "oklch(82.901% 0.031 222.959)",
	focus: "oklch(0.64 0.2491 8.47)",

	// Gradient colors
	gradient100: "oklch(0.64 0.2491 8.47)",
	gradient200: "oklch(0.66 0.3123 321.88)",
	gradient300: "oklch(0.63 0.1998 252)",
	gradientContent: "oklch(100% 0 0)",

	// Main colors
	primary: "oklch(0.63 0.1998 252)",
	primaryContent: "oklch(91.372% 0.051 257.57)",
	accent: "oklch(0.64 0.2491 8.47)",
	accentContent: "oklch(14.845% 0.026 311.379)",
	neutral: "oklch(0.72 0 289)",
	neutralContent: "oklch(83.923% 0.012 257.651)",

	// Feedback colors
	info: "oklch(88.127% 0.085 214.515)",
	infoContent: "oklch(17.625% 0.017 214.515)",
	success: "oklch(80.494% 0.077 197.823)",
	successContent: "oklch(16.098% 0.015 197.823)",
	warning: "oklch(89.172% 0.045 71.47)",
	warningContent: "oklch(17.834% 0.009 71.47)",
	error: "oklch(73.092% 0.11 20.076)",
	errorContent: "oklch(14.618% 0.022 20.076)",

	// Border radius
	radiusSmall: "0.25rem",
	radiusMedium: "0.5rem",
	radiusLarge: "1rem",

	// Shadows
	shadowSmall: "0 1px 2px rgba(0, 0, 0, 0.05)",
	shadowMedium: "0 4px 6px rgba(0, 0, 0, 0.1)",
	shadowLarge: "0 10px 15px rgba(0, 0, 0, 0.1)",
};
