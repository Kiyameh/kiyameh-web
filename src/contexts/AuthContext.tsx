import { createContext, useContext, useEffect, useState } from "react";

interface AuthUser {
	id: string;
	name: string;
	email?: string;
}

interface AuthContextType {
	user: AuthUser | null;
	isLoading: boolean;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		const loadUser = async () => {
			try {
				const res = await fetch("/api/auth/me", { credentials: "include" });
				if (!isMounted) return;
				if (res.ok) {
					const data = await res.json();
					setUser(data.user);
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error("Error fetching auth user:", error);
				setUser(null);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};
		loadUser();
		return () => {
			isMounted = false;
		};
	}, []);

	const signOut = async () => {
		try {
			// Limpiar las cookies de autenticación
			// biome-ignore lint/suspicious/noDocumentCookie: <>
			document.cookie =
				"sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			// biome-ignore lint/suspicious/noDocumentCookie: <>
			document.cookie =
				"sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

			setUser(null);

			// Redirigir al endpoint de signout que limpiará las cookies del servidor
			window.location.href = "/api/auth/signout";
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth debe ser usado dentro de un AuthProvider");
	}
	return context;
}
