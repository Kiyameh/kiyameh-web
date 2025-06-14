// components/ModalViewer.tsx
import styles from './ModalViewer.module.css'
import {useEffect, useRef, useCallback, useState} from 'react'
import {createPortal} from 'react-dom'
import {X, ChevronLeft, ChevronRight} from 'lucide-react'

interface ModalViewerProps {
  images: string[]
  initialIndex: number
  onClose: () => void
}

export default function ModalViewer({
  images,
  initialIndex,
  onClose,
}: ModalViewerProps) {
  const currentImageRef = useRef<HTMLImageElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const currentIndexRef = useRef(initialIndex)
  const [imageVisible, setImageVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setImageVisible(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  const showNext = useCallback(() => {
    currentIndexRef.current = (currentIndexRef.current + 1) % images.length
    updateImage()
  }, [images.length])

  const showPrev = useCallback(() => {
    currentIndexRef.current =
      (currentIndexRef.current - 1 + images.length) % images.length
    updateImage()
  }, [images.length])

  const updateImage = () => {
    if (currentImageRef.current) {
      currentImageRef.current.src = images[currentIndexRef.current]
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        showNext()
      } else if (e.key === 'ArrowLeft') {
        showPrev()
      }
    },
    [onClose, showNext, showPrev]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    currentImageRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return createPortal(
    <div
      className={`${styles.overlay} ${imageVisible && styles.visible}`}
      role="dialog"
      aria-modal="true"
      ref={dialogRef}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <img
          ref={currentImageRef}
          src={images[initialIndex]}
          alt=""
          className={`${styles.image} ${
            imageVisible ? styles.imageVisible : ''
          }`}
          tabIndex={-1}
        />

        <div className={styles.navButtonsContainer}>
          <button
            className={styles.navButton}
            onClick={showPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            className={styles.navButton}
            onClick={showNext}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}
