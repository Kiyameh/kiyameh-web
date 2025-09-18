import {
	Blocks,
	CalendarClock,
	CircleCheckBig,
	CircleFadingArrowUp,
	Component,
} from "lucide-react";
import styles from "./ProjectStateBadge.module.css";

export default function ProjectStateBadge({
	state,
}: {
	state: "development" | "designing" | "planned" | "completed" | "upgrading";
}) {
	if (state === "development") {
		return (
			<span className={styles.badge} data-state="development">
				<Blocks size={18} />
				Building
			</span>
		);
	}
	if (state === "designing") {
		return (
			<span className={styles.badge} data-state="designing">
				<Component size={18} />
				Designing
			</span>
		);
	}
	if (state === "planned") {
		return (
			<span className={styles.badge} data-state="planned">
				<CalendarClock size={18} />
				Planned
			</span>
		);
	}
	if (state === "completed") {
		return (
			<span className={styles.badge} data-state="completed">
				<CircleCheckBig size={18} />
				Completed
			</span>
		);
	}
	if (state === "upgrading") {
		return (
			<span className={styles.badge} data-state="upgrading">
				<CircleFadingArrowUp size={18} />
				Upgrading
			</span>
		);
	}
}
