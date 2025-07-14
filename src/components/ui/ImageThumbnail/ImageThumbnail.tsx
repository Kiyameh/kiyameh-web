// components/ImageThumbnail.tsx
import {useState} from 'react'
import styles from './ImageThumbnail.module.css'
import {X} from 'lucide-react'
import {createPortal} from 'react-dom'

interface ImageThumbnailProps {
  src: string
  alt: string
  sources?: {srcSet: string; type: string}[]
  style?: React.CSSProperties
  onClick?: () => void
}

export default function ImageThumbnail({
  src,
  alt,
  sources = [],
  onClick,
  style,
}: ImageThumbnailProps) {
  const [showModal, setShowModal] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      setShowModal(true)
      setTimeout(() => setImageVisible(true), 100)
    }
  }

  const handleCloseModal = () => {
    setImageVisible(false)
    setTimeout(() => setShowModal(false), 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }

  return (
    <>
      <figure className={styles.thumbnailContainer}>
        <picture
          onClick={handleClick}
          className={styles.picture}
          tabIndex={0}
          role="button"
          onKeyDown={handleKeyDown}
        >
          {sources.map((source, idx) => (
            <source
              key={idx}
              srcSet={source.srcSet}
              type={source.type}
            />
          ))}
          <img
            src={src}
            alt={alt}
            className={styles.thumbnailImage}
            style={style}
          />
        </picture>
      </figure>

      {showModal &&
        createPortal(
          <div
            className={`${styles.overlay} ${imageVisible && styles.visible}`}
            role="dialog"
            aria-modal="true"
            onClick={handleCloseModal}
          >
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <X size={24} />
              </button>

              <img
                src={src}
                alt={alt}
                className={`${styles.image} ${
                  imageVisible ? styles.imageVisible : ''
                }`}
                tabIndex={-1}
              />
            </div>
          </div>,
          document.getElementById('modal-root')!
        )}
    </>
  )
}
