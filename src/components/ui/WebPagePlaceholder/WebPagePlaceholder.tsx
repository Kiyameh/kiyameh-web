import styles from './WebPagePlaceholder.module.css'

interface WebPagePlaceholderProps {
  text?: string
}

export default function WebPagePlaceholder({ text = "I'm a placeholder :)" }: WebPagePlaceholderProps) {
  return (
    <div className={styles.screenshotPlaceholder}>
      <div className={styles.placeholderContent}>
        <div className={styles.placeholderHeader}>
          <div className={styles.placeholderDots}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        </div>
        <div className={styles.placeholderBody}>
          <div className={styles.placeholderText}>
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}
