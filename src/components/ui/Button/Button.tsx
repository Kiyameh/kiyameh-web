import React from 'react'
import styles from './Button.module.css'

interface BaseButtonProps {
  primary?: boolean
  active?: boolean
  className?: string
}

interface ButtonProps extends BaseButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode
  href?: never
}

interface LinkButtonProps extends BaseButtonProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> {
  children: React.ReactNode
  href: string
}

type ButtonComponentProps = ButtonProps | LinkButtonProps

export default function Button({
  children,
  primary = false,
  active = false,
  href,
  className = '',
  ...props
}: ButtonComponentProps) {
  const buttonClasses = `${styles.button} ${primary ? styles.primary : ''} ${active ? styles.active : ''} ${className}`

  if (href) {
    const { target, rel, ...anchorProps } = props as LinkButtonProps
    return (
      <a
        target={target}
        rel={rel}
        className={buttonClasses}
        {...anchorProps}
        href={href}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={buttonClasses} {...(props as ButtonProps)}>
      {children}
    </button>
  )
}
