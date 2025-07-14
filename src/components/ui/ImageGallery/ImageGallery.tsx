// components/ImageGallery.tsx
import {useState} from 'react'
import ModalViewer from '../ModalViewer/ModalViewer'
import ImageThumbnail from '../ImageThumbnail/ImageThumbnail'
import styles from './ImageGallery.module.css'

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    sources?: {srcSet: string; type: string}[]
  }[]
  className?: string
}

export default function ImageGallery({
  images,
  className = '',
}: ImageGalleryProps) {
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  const handleThumbnailClick = (index: number) => {
    setModalIndex(index)
  }

  const handleCloseModal = () => {
    setModalIndex(null)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <section className={`${styles.gallery} ${className}`}>
      {images.map((img, idx) => (
        <ImageThumbnail
          key={idx}
          src={img.src}
          alt={img.alt}
          sources={img.sources}
          style={{
            width: '150px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-small)',
            borderRadius: 'var(--radius-small)',
          }}
          onClick={() => handleThumbnailClick(idx)}
        />
      ))}

      {modalIndex !== null && (
        <ModalViewer
          images={images.map((i) => i.src)}
          initialIndex={modalIndex}
          onClose={handleCloseModal}
        />
      )}
    </section>
  )
}
