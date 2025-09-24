import { useEffect, useState, useRef, useCallback } from "react";
import type { Theme } from "../types";
import type { SavedTheme } from "./useThemeLibrary";

export type SaveStatus = "saved" | "unsaved" | "saving" | "not-tracked";

interface UseAutoSaveProps {
	currentTheme: Theme;
	savedThemes: SavedTheme[];
	updateTheme: (id: string, theme: Theme) => SavedTheme | null;
	isEnabled?: boolean;
	saveInterval?: number; // in milliseconds
}

export function useAutoSave({
	currentTheme,
	savedThemes,
	updateTheme,
	isEnabled = true,
	saveInterval = 2000,
}: UseAutoSaveProps) {
	const [saveStatus, setSaveStatus] = useState<SaveStatus>("not-tracked");
	const [lastSavedTheme, setLastSavedTheme] = useState<Theme | null>(null);
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isInitializedRef = useRef(false);

	// Find if current theme matches any saved theme by name
	const findMatchingTheme = useCallback((): SavedTheme | null => {
		return savedThemes.find(theme => 
			theme.name === currentTheme.name && 
			theme.name.trim() !== ""
		) || null;
	}, [savedThemes, currentTheme.name]);

	// Check if current theme has changes compared to saved version
	const hasChanges = useCallback((savedTheme: SavedTheme): boolean => {
		if (!savedTheme) return false;

		// Compare all theme properties except metadata
		const { id, createdAt, updatedAt, ...savedThemeData } = savedTheme;
		
		// Deep comparison of theme properties
		const currentKeys = Object.keys(currentTheme) as (keyof Theme)[];
		const savedKeys = Object.keys(savedThemeData) as (keyof Theme)[];

		if (currentKeys.length !== savedKeys.length) return true;

		return currentKeys.some(key => {
			return currentTheme[key] !== savedThemeData[key];
		});
	}, [currentTheme]);

	// Auto-save function
	const performAutoSave = useCallback(async () => {
		const matchingTheme = findMatchingTheme();
		
		if (!matchingTheme) {
			setSaveStatus("not-tracked");
			return;
		}

		if (!hasChanges(matchingTheme)) {
			setSaveStatus("saved");
			return;
		}

		setSaveStatus("saving");

		try {
			// Simulate async operation
			await new Promise(resolve => setTimeout(resolve, 300));
			
			const updatedTheme = updateTheme(matchingTheme.id, currentTheme);
			
			if (updatedTheme) {
				setLastSavedTheme({ ...currentTheme });
				setSaveStatus("saved");
			} else {
				setSaveStatus("unsaved");
			}
		} catch (error) {
			console.error("Auto-save failed:", error);
			setSaveStatus("unsaved");
		}
	}, [currentTheme, findMatchingTheme, hasChanges, updateTheme]);

	// Effect to handle theme changes and trigger auto-save
	useEffect(() => {
		if (!isEnabled) {
			setSaveStatus("not-tracked");
			return;
		}

		// Skip initial render
		if (!isInitializedRef.current) {
			isInitializedRef.current = true;
			const matchingTheme = findMatchingTheme();
			if (matchingTheme) {
				setSaveStatus(hasChanges(matchingTheme) ? "unsaved" : "saved");
			} else {
				setSaveStatus("not-tracked");
			}
			return;
		}

		const matchingTheme = findMatchingTheme();
		
		if (!matchingTheme) {
			setSaveStatus("not-tracked");
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
				saveTimeoutRef.current = null;
			}
			return;
		}

		// Check if there are changes
		if (hasChanges(matchingTheme)) {
			setSaveStatus("unsaved");
			
			// Clear existing timeout
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}

			// Set new timeout for auto-save
			saveTimeoutRef.current = setTimeout(() => {
				performAutoSave();
			}, saveInterval);
		} else {
			setSaveStatus("saved");
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
				saveTimeoutRef.current = null;
			}
		}

		// Cleanup timeout on unmount or dependency change
		return () => {
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
				saveTimeoutRef.current = null;
			}
		};
	}, [currentTheme, savedThemes, isEnabled, saveInterval, findMatchingTheme, hasChanges, performAutoSave]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}
		};
	}, []);

	// Manual save function
	const forceSave = useCallback(() => {
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current);
			saveTimeoutRef.current = null;
		}
		performAutoSave();
	}, [performAutoSave]);

	// Get current matching theme info
	const getCurrentThemeInfo = useCallback(() => {
		const matchingTheme = findMatchingTheme();
		return {
			matchingTheme,
			hasUnsavedChanges: matchingTheme ? hasChanges(matchingTheme) : false,
			isTracked: !!matchingTheme,
		};
	}, [findMatchingTheme, hasChanges]);

	return {
		saveStatus,
		forceSave,
		getCurrentThemeInfo,
		isAutoSaveEnabled: isEnabled,
	};
}
