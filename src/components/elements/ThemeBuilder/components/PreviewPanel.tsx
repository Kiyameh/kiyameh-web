import React from "react";
import type { Theme } from "../types";
import styles from "./PreviewPanel.module.css";

/**
 * @version 1
 * @description Componente que muestra el panel de previsualización del tema.
 * @param {Theme} currentTheme - El tema actual.
 */

interface PreviewPanelProps {
	currentTheme: Theme;
}

export default function PreviewPanel({ currentTheme }: PreviewPanelProps) {
	return (
		<div
			className={styles.previewPanel}
			style={
				{
					"--surface-100": currentTheme.surface100,
					"--surface-200": currentTheme.surface200,
					"--surface-300": currentTheme.surface300,
					"--content": currentTheme.content,
					"--emphasis": currentTheme.emphasis,
					"--border": currentTheme.border,
					"--border-soft": currentTheme.borderSoft,
					"--focus": currentTheme.focus,
					"--primary": currentTheme.primary,
					"--primary-content": currentTheme.primaryContent,
					"--accent": currentTheme.accent,
					"--accent-content": currentTheme.accentContent,
					"--neutral": currentTheme.neutral,
					"--neutral-content": currentTheme.neutralContent,
					"--info": currentTheme.info,
					"--info-content": currentTheme.infoContent,
					"--success": currentTheme.success,
					"--success-content": currentTheme.successContent,
					"--warning": currentTheme.warning,
					"--warning-content": currentTheme.warningContent,
					"--error": currentTheme.error,
					"--error-content": currentTheme.errorContent,
					"--gradient-100": currentTheme.gradient100,
					"--gradient-200": currentTheme.gradient200,
					"--gradient-300": currentTheme.gradient300,
					"--gradient-content": currentTheme.gradientContent,
					"--radius-small": currentTheme.radiusSmall,
					"--radius-medium": currentTheme.radiusMedium,
					"--radius-large": currentTheme.radiusLarge,
					"--shadow-small": currentTheme.shadowSmall,
					"--shadow-medium": currentTheme.shadowMedium,
					"--shadow-large": currentTheme.shadowLarge,
				} as React.CSSProperties
			}
		>
			{/* Fake Dashboard */}

			{/* Dashboard Header */}
			<div className={styles.dashboardHeader}>
				<div className={styles.headerLeft}>
					<h1 className={styles.dashboardTitle}>Dashboard</h1>
					<div className={styles.breadcrumb}>
						<span>Home</span>
						<span>/</span>
						<span>Analytics</span>
					</div>
				</div>
				<div className={styles.headerRight}>
					<button className={styles.btnNeutral}>Borrar ✖</button>
					<button className={styles.btnPrimary}>Nuevo ✎</button>
					<div className={styles.userAvatar}>JD</div>
				</div>
			</div>

			{/* Dashboard Layout */}
			<div className={styles.dashboardLayout}>
				{/* Sidebar */}
				<div className={styles.dashboardSidebar}>
					<div className={styles.sidebarMenu}>
						<div className={styles.menuItemActive}>📊 Dashboard</div>
						<div className={styles.menuItem}>👥 Usuarios</div>
						<div className={styles.menuItem}>📈 Ventas</div>
						<div className={styles.menuItem}>📦 Productos</div>
						<div className={styles.menuItem}>⚙️ Configuración</div>
					</div>

					<div className={styles.sidebarCard}>
						<h4>Progreso del Mes</h4>
						<div className={styles.progressBar}>
							<div className={styles.progressFill}></div>
						</div>
						<p>75% completado</p>
					</div>

					<div className={styles.sidebarCardLoader}>
						<h4>Procesando Datos</h4>
						<div className={styles.loaderContainer}>
							<div className={styles.circularLoader}></div>
						</div>
						<p>Analizando métricas...</p>
					</div>
				</div>

				{/* Bento Grid Content */}
				<div className={styles.bentoGrid}>
					{/* Stats Cards */}
					<div className={styles.bentoItem + " " + styles.statsCard}>
						<h3>Ventas Totales</h3>
						<div className={styles.statNumber}>$24,580</div>
						<div className={styles.statChange}>+12.5% ↗</div>
					</div>

					<div className={styles.bentoItem + " " + styles.statsCard}>
						<h3>Usuarios Activos</h3>
						<div className={styles.statNumber}>1,247</div>
						<div className={styles.statChange}>+5.2% ↗</div>
					</div>

					<div className={styles.bentoItem + " " + styles.statsCard}>
						<h3>Conversiones</h3>
						<div className={styles.statNumber}>89.4%</div>
						<div className={styles.statChange}>-2.1% ↘</div>
					</div>

					{/* Profile Card - moved next to Conversiones */}
					<div className={styles.bentoItem + " " + styles.profileCard}>
						<div className={styles.profileLeft}>
							<div className={styles.profileAvatar}>
								<div className={styles.avatarPlaceholder}>👤</div>
							</div>
							<div className={styles.profileInfo}>
								<h4>Juan Pérez</h4>
								<p>Administrador</p>
							</div>
						</div>
						<div className={styles.profileBadges}>
							<div className={styles.profileBadge}>
								<strong>24</strong> Proyectos
							</div>
							<div className={styles.profileBadge}>
								<strong>156</strong> Tareas
							</div>
						</div>
					</div>

					{/* Chart Placeholder */}
					<div className={styles.bentoItem + " " + styles.chartCard}>
						<h3>Gráfico de Ventas</h3>
						<div className={styles.chartPlaceholder}>
							<div className={styles.chartBar} style={{ height: "60%" }}></div>
							<div className={styles.chartBar} style={{ height: "80%" }}></div>
							<div className={styles.chartBar} style={{ height: "45%" }}></div>
							<div className={styles.chartBar} style={{ height: "90%" }}></div>
							<div className={styles.chartBar} style={{ height: "70%" }}></div>
							<div className={styles.chartBar} style={{ height: "55%" }}></div>
						</div>
					</div>

					{/* Calendar */}
					<div className={styles.bentoItem + " " + styles.calendarCard}>
						<h3>Calendario</h3>
						<div className={styles.calendarGrid}>
							<div className={styles.calendarHeader}>
								<span>L</span>
								<span>M</span>
								<span>X</span>
								<span>J</span>
								<span>V</span>
								<span>S</span>
								<span>D</span>
							</div>
							<div className={styles.calendarDays}>
								<span>1</span>
								<span>2</span>
								<span>3</span>
								<span>4</span>
								<span>5</span>
								<span>6</span>
								<span>7</span>
								<span>8</span>
								<span>9</span>
								<span>10</span>
								<span>11</span>
								<span>12</span>
								<span>13</span>
								<span>14</span>
								<span className={styles.calendarToday}>15</span>
								<span>16</span>
								<span>17</span>
								<span>18</span>
								<span>19</span>
								<span>20</span>
								<span>21</span>
							</div>
						</div>
					</div>

					{/* Image Placeholder */}
					<div className={styles.bentoItem + " " + styles.imageCard}>
						<h3>Galería</h3>
						<div className={styles.imagePlaceholder}>
							<div className={styles.imageIcon}>❦</div>
							<p>Imagen de ejemplo</p>
						</div>
						<div className={styles.imageActions}>
							<button className={styles.btnPrimary}>Ver más</button>
							<button className={styles.btnNeutral}>Editar</button>
						</div>
					</div>

					{/* Activity Feed */}
					<div className={styles.bentoItem + " " + styles.activityCard}>
						<h3>Actividad Reciente</h3>
						<div className={styles.activityList}>
							<div className={styles.activityItem}>
								<div className={styles.activityDot}></div>
								<span>Usuario registrado</span>
								<span className={styles.activityTime}>2m</span>
							</div>
							<div className={styles.activityItem}>
								<div className={styles.activityDot}></div>
								<span>Venta completada</span>
								<span className={styles.activityTime}>5m</span>
							</div>
							<div className={styles.activityItem}>
								<div className={styles.activityDot}></div>
								<span>Producto actualizado</span>
								<span className={styles.activityTime}>12m</span>
							</div>
						</div>
					</div>

					{/* Text Card with Lorem Ipsum - moved to where Profile was, double width */}
					<div className={styles.bentoItem + " " + styles.textCardExpanded}>
						<h3>Contenido</h3>
						<p>
							Lorem ipsum dolor sit amet,{" "}
							<em className={styles.emphasizedText}>consectetur adipiscing</em>{" "}
							elit. Sed do eiusmod tempor incididunt ut{" "}
							<em className={styles.emphasizedText}>labore et dolore</em> magna
							aliqua. Ut enim ad minim veniam, quis{" "}
							<em className={styles.emphasizedText}>nostrud exercitation</em>{" "}
							ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							irure dolor in reprehenderit in{" "}
							<em className={styles.emphasizedText}>voluptate velit esse</em>{" "}
							cillum dolore. Excepteur sint occaecat cupidatat non proident,
							sunt in{" "}
							<em className={styles.emphasizedText}>culpa qui officia</em>
							deserunt mollit anim id est laborum.
						</p>
					</div>
				</div>
			</div>

			{/* Sonner Toasts - Floating at bottom right */}
			<div className={styles.toastContainer}>
				<div className={styles.toast + " " + styles.toastInfo}>
					<div className={styles.toastIcon}>ℹ️</div>
					<div className={styles.toastContent}>
						<div className={styles.toastTitle}>Información</div>
						<div className={styles.toastMessage}>
							Datos actualizados correctamente
						</div>
					</div>
				</div>

				<div className={styles.toast + " " + styles.toastSuccess}>
					<div className={styles.toastIcon}>✅</div>
					<div className={styles.toastContent}>
						<div className={styles.toastTitle}>Éxito</div>
						<div className={styles.toastMessage}>Operación completada</div>
					</div>
				</div>

				<div className={styles.toast + " " + styles.toastWarning}>
					<div className={styles.toastIcon}>⚠️</div>
					<div className={styles.toastContent}>
						<div className={styles.toastTitle}>Advertencia</div>
						<div className={styles.toastMessage}>Revisa la configuración</div>
					</div>
				</div>

				<div className={styles.toast + " " + styles.toastError}>
					<div className={styles.toastIcon}>❌</div>
					<div className={styles.toastContent}>
						<div className={styles.toastTitle}>Error</div>
						<div className={styles.toastMessage}>No se pudo conectar</div>
					</div>
				</div>
			</div>
		</div>
	);
}
