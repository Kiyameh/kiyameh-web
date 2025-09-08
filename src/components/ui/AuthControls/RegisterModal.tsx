import React, {useState} from 'react'
import {SiGithub, SiGoogle} from '@icons-pack/react-simple-icons'
import styles from './RegisterModal.module.css'
import {X} from 'lucide-react'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignIn: () => void
}

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToSignIn,
}: RegisterModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  if (!isOpen) return null

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {Accept: 'application/json'},
      })

      if (res.ok) {
        try {
          const data = await res.json()
          if (data?.requiresEmailConfirm) {
            setSuccess(
              'Hemos enviado un email de verificación. Revisa tu bandeja de entrada.'
            )
          } else {
            // Caso en el que el usuario queda logueado inmediatamente
            window.location.reload()
          }
        } catch {
          // Fallback: recarga si no se puede parsear
          window.location.reload()
        }
      } else {
        try {
          const data = await res.json()
          setError(data.error || 'No se pudo completar el registro')
        } catch {
          const text = await res.text()
          setError(text || 'No se pudo completar el registro')
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
    // Dejar que el formulario haga submit normal hacia /api/auth/signin
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
          <h2>Registrarse</h2>
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
            onSubmit={handleRegisterSubmit}
            className={styles.emailForm}
          >
            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && <div className={styles.successMessage}>{success}</div>}
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
              {isLoading ? 'Registrando...' : 'Registrarse'}
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
            ¿Ya tienes una cuenta?{' '}
            <button
              className={styles.linkButton}
              onClick={onSwitchToSignIn}
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
