import { Anchor, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import styles from "./SectionTitle.module.css";

export default function SectionTitle({
	children,
	id,
	level = "title",
}: {
	children: React.ReactNode;
	id?: string;
	level?: "title" | "subtitle";
}) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = (_e: React.MouseEvent<HTMLAnchorElement>) => {
		const url = window.location.href.split("#")[0] + "#" + id;
		setIsCopied(true);
		navigator.clipboard.writeText(url);
		setTimeout(() => {
			setIsCopied(false);
		}, 1200);
	};

	const HeadingTag = level === "title" ? "h1" : "h2";

	return (
		<HeadingTag id={id || undefined}>
			<a href={`#${id || ""}`} onClick={handleCopy}>
				<div
					className={`${level === "title" ? styles.title : styles.subtitle}`}
				>
					<span className="link">{children}</span>
					{isCopied ? (
						<ClipboardCheck className={styles.clipboardIcon} />
					) : (
						<Anchor className={styles.anchorIcon} />
					)}
				</div>
			</a>
		</HeadingTag>
	);
}
