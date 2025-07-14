import React, {useState} from 'react'
import {Anchor, ClipboardCheck} from 'lucide-react'
import styles from './TagTitle.module.css'

export default function TagTitle({
  children,
  id,
  tagType = 'starting',
}: {
  children: React.ReactNode
  id?: string
  tagType?: 'starting' | 'closing'
}) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = window.location.href.split('#')[0] + '#' + id
    setIsCopied(true)
    navigator.clipboard.writeText(url)
    setTimeout(() => {
      setIsCopied(false)
    }, 1200)
  }

  return (
    <h3
      id={id}
      className={`${styles.header} ${styles.tagTitle}`}
    >
      <a
        href={`#${id}`}
        onClick={handleCopy}
      >
        <div className={styles.headerContainer}>
          <span>{'<'}</span>
          {tagType === 'closing' ? <span>{'/'}</span> : null}
          <span className="link">{children}</span>
          <span>{'>'}</span>

          {isCopied ? (
            <ClipboardCheck className={styles.clipboardIcon} />
          ) : (
            <Anchor className={styles.anchorIcon} />
          )}
        </div>
      </a>
    </h3>
  )
}
