import { useState, useEffect } from "react";
import type { Theme } from "../types";

export interface SavedTheme extends Theme {
	id: string;
	createdAt: string;
	updatedAt: string;
}

const THEME_LIBRARY_KEY = "theme-builder-library";

export function useThemeLibrary() {
	const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Load themes from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem(THEME_LIBRARY_KEY);
			if (stored) {
				const themes = JSON.parse(stored) as SavedTheme[];
				setSavedThemes(themes);
			}
		} catch (error) {
			console.error("Error loading themes from localStorage:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Save themes to localStorage whenever savedThemes changes
	useEffect(() => {
		if (!isLoading) {
			try {
				localStorage.setItem(THEME_LIBRARY_KEY, JSON.stringify(savedThemes));
			} catch (error) {
				console.error("Error saving themes to localStorage:", error);
			}
		}
	}, [savedThemes, isLoading]);

	const saveTheme = (theme: Theme): SavedTheme => {
		const now = new Date().toISOString();
		const savedTheme: SavedTheme = {
			...theme,
			id: crypto.randomUUID(),
			createdAt: now,
			updatedAt: now,
		};

		setSavedThemes(prev => [savedTheme, ...prev]);
		return savedTheme;
	};

	const updateTheme = (id: string, theme: Theme): SavedTheme | null => {
		const existingTheme = savedThemes.find(t => t.id === id);
		if (!existingTheme) return null;

		const updatedTheme: SavedTheme = {
			...theme,
			id,
			createdAt: existingTheme.createdAt,
			updatedAt: new Date().toISOString(),
		};

		setSavedThemes(prev => 
			prev.map(t => t.id === id ? updatedTheme : t)
		);

		return updatedTheme;
	};

	const deleteTheme = (id: string): boolean => {
		const exists = savedThemes.some(t => t.id === id);
		if (!exists) return false;

		setSavedThemes(prev => prev.filter(t => t.id !== id));
		return true;
	};

	const duplicateTheme = (id: string): SavedTheme | null => {
		const theme = savedThemes.find(t => t.id === id);
		if (!theme) return null;

		const duplicatedTheme = {
			...theme,
			name: `${theme.name} (Copia)`,
			description: `Copia de: ${theme.description}`,
		};

		return saveTheme(duplicatedTheme);
	};

	const exportTheme = (id: string): string | null => {
		const theme = savedThemes.find(t => t.id === id);
		if (!theme) return null;

		return JSON.stringify(theme, null, 2);
	};

	const importTheme = (themeJson: string): SavedTheme | null => {
		try {
			const theme = JSON.parse(themeJson) as SavedTheme;
			
			// Validate that it has the required Theme properties
			const requiredProps = ['name', 'description', 'colorModePreference', 'surface100', 'surface200'];
			const hasRequiredProps = requiredProps.every(prop => prop in theme);
			
			if (!hasRequiredProps) {
				throw new Error("Invalid theme format");
			}

			// Remove id and timestamps to create a new theme
			const { id, createdAt, updatedAt, ...themeData } = theme;
			return saveTheme({
				...themeData,
				name: `${themeData.name} (Importado)`,
			});
		} catch (error) {
			console.error("Error importing theme:", error);
			return null;
		}
	};

	const clearLibrary = (): void => {
		setSavedThemes([]);
	};

	return {
		savedThemes,
		isLoading,
		saveTheme,
		updateTheme,
		deleteTheme,
		duplicateTheme,
		exportTheme,
		importTheme,
		clearLibrary,
	};
}
