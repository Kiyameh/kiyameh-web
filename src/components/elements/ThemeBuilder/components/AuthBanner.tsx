import React, { useState } from "react";
import { Cloud, HardDrive, User, LogIn, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SignInModal from "@/components/ui/AuthControls/SignInModal";
import RegisterModal from "@/components/ui/AuthControls/RegisterModal";
import styles from "./AuthBanner.module.css";
import AuthControls from "@/components/ui/AuthControls/AuthControls";

/**
 * @version 1
 * @description Banner que muestra el estado de autenticación en la biblioteca de temas.
 * Indica si los datos están guardados localmente o en la nube.
 */

type ModalType = "signin" | "register" | null;

export default function AuthBanner() {
	const { user, isLoading, signOut } = useAuth();
	const [activeModal, setActiveModal] = useState<ModalType>(null);

	if (isLoading) {
		return (
			<div className={`${styles.banner} ${styles.loading}`}>
				<div className={styles.content}>
					<div className={styles.iconContainer}>
						<div className={styles.spinner}></div>
					</div>
					<div className={styles.textContent}>
						<span className={styles.status}>Verificando autenticación...</span>
					</div>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<>
				<div className={`${styles.banner} ${styles.unauthenticated}`}>
					<div className={styles.content}>
						<div className={styles.iconContainer}>
							<HardDrive size={20} className={styles.icon} />
						</div>
						<div className={styles.textContent}>
							<div className={styles.mainText}>
								<span className={styles.status}>Guardado localmente</span>
								<Info size={14} className={styles.infoIcon} />
							</div>
							<p className={styles.description}>
								Tus temas se guardan en tu navegador.
								<button
									className={styles.linkButton}
									onClick={() => setActiveModal("signin")}
								>
									Inicia sesión
								</button>
								para sincronizar en la nube.
							</p>
						</div>
					</div>
				</div>

				{/* Auth Modals */}
				<SignInModal
					isOpen={activeModal === "signin"}
					onClose={() => setActiveModal(null)}
					onSwitchToRegister={() => setActiveModal("register")}
				/>
				<RegisterModal
					isOpen={activeModal === "register"}
					onClose={() => setActiveModal(null)}
					onSwitchToSignIn={() => setActiveModal("signin")}
				/>
			</>
		);
	}

	return (
		<div className={`${styles.banner} ${styles.authenticated}`}>
			<div className={styles.content}>
				<div className={styles.iconContainer}>
					<Cloud size={20} className={styles.icon} />
				</div>
				<div className={styles.textContent}>
					<div className={styles.mainText}>
						<span className={styles.status}>Conectado como {user.name}</span>
						<div className={styles.userBadge}>
							<User size={12} />
						</div>
					</div>
					<p className={styles.description}>
						Tus temas se sincronizan automáticamente en la nube.
						<button 
							className={styles.linkButton}
							onClick={signOut}
						>
							Cerrar sesión
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
