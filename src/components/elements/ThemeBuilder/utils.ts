import type { Theme } from "./types";

export function themeObjectToCss(theme: Theme): string {
	const css = `/* Theme: ${theme.name} */
/* Description: ${theme.description} */
/* Theme design for: ${theme.colorModePreference} */

/* Surfaces */
--surface-100: ${theme.surface100};
--surface-200: ${theme.surface200};
--surface-300: ${theme.surface300};

/* Content */
--content: ${theme.content};
--emphasis: ${theme.emphasis};

/* Borders */
--border: ${theme.border};
--border-soft: ${theme.borderSoft};
--focus: ${theme.focus};


/* Gradients */
--gradient-100: ${theme.gradient100};
--gradient-200: ${theme.gradient200};
--gradient-300: ${theme.gradient300};
--gradient-content: ${theme.gradientContent};


/* Main colors */
--primary: ${theme.primary};
--primary-content: ${theme.primaryContent};
--accent: ${theme.accent};
--accent-content: ${theme.accentContent};
--neutral: ${theme.neutral};
--neutral-content: ${theme.neutralContent};


/* Feedback colors */
--info: ${theme.info};
--info-content: ${theme.infoContent};
--success: ${theme.success};
--success-content: ${theme.successContent};
--warning: ${theme.warning};
--warning-content: ${theme.warningContent};
--error: ${theme.error};
--error-content: ${theme.errorContent};


/* Radius */
--radius-small: ${theme.radiusSmall};
--radius-medium: ${theme.radiusMedium};
--radius-large: ${theme.radiusLarge};


/* Shadows */
--shadow-small: ${theme.shadowSmall};
--shadow-medium: ${theme.shadowMedium};
--shadow-large: ${theme.shadowLarge};`;

	return css;
}
