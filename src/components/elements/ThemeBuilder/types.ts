export interface Theme {
	// Theme metadata
	name: string;
	description: string;
	colorModePreference: "light" | "dark" | "auto";

	// Surface colors
	surface100: string;
	surface200: string;
	surface300: string;
	content: string;
	emphasis: string;
	border: string;
	borderSoft: string;
	focus: string;

	// Gradient colors
	gradient100: string;
	gradient200: string;
	gradient300: string;
	gradientContent: string;

	// Main colors
	primary: string;
	primaryContent: string;
	accent: string;
	accentContent: string;
	neutral: string;
	neutralContent: string;

	// Feedback colors
	info: string;
	infoContent: string;
	success: string;
	successContent: string;
	warning: string;
	warningContent: string;
	error: string;
	errorContent: string;

	// Border radius
	radiusSmall: string;
	radiusMedium: string;
	radiusLarge: string;

	// Shadows
	shadowSmall: string;
	shadowMedium: string;
	shadowLarge: string;
}
