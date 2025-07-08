import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: React.ReactNode
  primary?: boolean
  responsive?: boolean
  active?: boolean
}

export default function Button({
  text,
  icon,
  primary = false,
  responsive = true,
  active = false,
  className,
  ...props
}: ButtonProps) {
  const buttonStyles = `
    ${styles.button}
    ${primary ? styles.primary : ''}
    ${responsive ? styles.responsive : ''}
    ${active ? styles.active : ''}
    ${className || ''}
    `

  return (
    <button
      {...props}
      className={buttonStyles}
    >
      {icon && <div className={styles.buttonIcon}>{icon}</div>}
      <div className={styles.buttonText}>{text}</div>
    </button>
  )
}
