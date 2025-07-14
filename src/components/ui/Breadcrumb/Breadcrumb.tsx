import styles from './Breadcrumb.module.css'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({items}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={styles.breadcrumb}
    >
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li
            key={index}
            className={styles.item}
          >
            {item.href && index < items.length - 1 ? (
              <a
                href={item.href}
                className={styles.link}
              >
                {item.label}
              </a>
            ) : (
              <span
                className={styles.current}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span
                className={styles.separator}
                aria-hidden="true"
              >
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
