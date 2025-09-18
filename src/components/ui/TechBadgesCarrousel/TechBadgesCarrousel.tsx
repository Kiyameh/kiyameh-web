import TechBadge from "@/components/ui/TechBadge/TechBadge";
import styles from "./TechBadgesCarrousel.module.css";

export default function TechBadgesCarrousel({
	technologies,
	reverse = false,
}: {
	technologies: { name: string; disabled: boolean }[];
	reverse?: boolean;
}) {
	return (
		<div className={styles.carouselContainer}>
			<div className={`${styles.carouselTrack} ${reverse && styles.reverse}`}>
				{technologies.map((tech, index) => (
					<TechBadge
						key={`${tech.name}-${index}`}
						tech={tech.name}
						disabled={tech.disabled}
					/>
				))}
				{/* Duplicado de los elementos para el efecto infinito */}
				{technologies.map((tech) => (
					<TechBadge
						key={`duplicate-${tech.name}`}
						tech={tech.name}
						disabled={tech.disabled}
					/>
				))}
			</div>
		</div>
	);
}
