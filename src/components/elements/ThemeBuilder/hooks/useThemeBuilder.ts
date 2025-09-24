import { useEffect, useState, useRef } from "react";
import type { Theme } from "../types";
import { defaultTheme } from "../examples";
import { themeObjectToCss } from "../utils";

export function useThemeBuilder() {
	const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
	const [css, setCss] = useState<string>(themeObjectToCss(defaultTheme));
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
	const [mobileActiveTab, setMobileActiveTab] = useState<
		"colors" | "preview" | "code"
	>("colors");
	const [copied, setCopied] = useState(false);
	const [isLibraryOpen, setIsLibraryOpen] = useState(false);
	const codeRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const css = themeObjectToCss(currentTheme);
		setCss(css);
	}, [currentTheme]);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(css);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	// Sync mobile tab with desktop tab when needed
	const handleMobileTabChange = (tab: "colors" | "preview" | "code") => {
		setMobileActiveTab(tab);
		if (tab === "preview") {
			setActiveTab("preview");
		} else if (tab === "code") {
			setActiveTab("code");
		}
	};

	// Library functions
	const openLibrary = () => setIsLibraryOpen(true);
	const closeLibrary = () => setIsLibraryOpen(false);

	const loadTheme = (theme: Theme) => {
		setCurrentTheme(theme);
	};

	return {
		// State
		currentTheme,
		css,
		activeTab,
		mobileActiveTab,
		copied,
		isLibraryOpen,
		codeRef,
		// Actions
		setCurrentTheme,
		setActiveTab,
		handleMobileTabChange,
		copyToClipboard,
		// Library actions
		openLibrary,
		closeLibrary,
		loadTheme,
	};
}
