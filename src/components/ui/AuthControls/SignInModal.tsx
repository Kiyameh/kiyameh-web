import React, {useState} from 'react'
import styles from './SignInModal.module.css'
import {X} from 'lucide-react'
import {SiGithub, SiGoogle} from '@icons-pack/react-simple-icons'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

export default function SignInModal({
  isOpen,
  onClose,
  onSwitchToRegister,
}: SignInModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        // Si el login es exitoso, recargar la página para actualizar el estado de autenticación
        window.location.reload()
      } else {
        // Si hay error, mostrar el mensaje en el modal
        try {
          const errorData = await response.json()
          setError(errorData.error || 'Error desconocido')
        } catch {
          const errorMessage = await response.text()
          setError(errorMessage)
        }
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProviderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    // El formulario se enviará normalmente
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Iniciar sesión</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulario de email */}
        <div className={styles.formSection}>
          <form
            onSubmit={handleEmailSubmit}
            className={styles.emailForm}
          >
            {error && <div className={styles.errorMessage}>{error}</div>}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                disabled={isLoading}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

        <div className={styles.divider}>
          <span>o</span>
        </div>

        {/* Formularios de proveedores */}
        <div className={styles.providerSection}>
          <div className={styles.providerButtons}>
            <form
              action="/api/auth/signin"
              method="post"
              onSubmit={handleProviderSubmit}
            >
              <input
                type="hidden"
                name="provider"
                defaultValue="github"
              />
              <button
                type="submit"
                className={styles.providerButton}
                disabled={isLoading}
              >
                <SiGithub />
                GitHub
              </button>
            </form>

            <form
              action="/api/auth/signin"
              method="post"
              onSubmit={handleProviderSubmit}
            >
              <input
                type="hidden"
                name="provider"
                defaultValue="google"
              />
              <button
                type="submit"
                className={styles.providerButton}
                disabled={isLoading}
              >
                <SiGoogle />
                Google
              </button>
            </form>
          </div>
        </div>

        <div className={styles.footer}>
          <p>
            ¿Nuevo aquí?{' '}
            <button
              className={styles.linkButton}
              onClick={onSwitchToRegister}
            >
              Crea una cuenta
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
