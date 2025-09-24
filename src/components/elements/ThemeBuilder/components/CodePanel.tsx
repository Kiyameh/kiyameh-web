import { Copy, Check } from "lucide-react";
import styles from "./CodePanel.module.css";

/**
 * @version 1
 * @description Componente que muestra el código CSS del tema actual.
 * @param {string} css - El código CSS del tema actual.
 * @param {boolean} copied - Indica si el código ha sido copiado.
 * @param {function} copyToClipboard - Función para copiar el código al portapapeles.
 * @param {React.RefObject<HTMLElement | null>} codeRef - Referencia al elemento del código.
 */

interface CodePanelProps {
	css: string;
	copied: boolean;
	copyToClipboard: () => void;
	codeRef: React.RefObject<HTMLElement | null>;
}

export default function CodePanel({
	css,
	copied,
	copyToClipboard,
	codeRef,
}: CodePanelProps) {
	return (
		<div className={styles.codeBox}>
			<div className={styles.codeHeader}>
				<h3>theme.css</h3>
				<button
					className={styles.copyButton}
					onClick={copyToClipboard}
					disabled={copied}
				>
					{copied ? (
						<>
							<Check size={16} />
							Copiado
						</>
					) : (
						<>
							<Copy size={16} />
							Copiar
						</>
					)}
				</button>
			</div>
			<pre>
				<code className={styles.code} ref={codeRef}>
					{css}
				</code>
			</pre>
		</div>
	);
}
