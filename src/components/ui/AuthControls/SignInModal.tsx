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

  if (!isOpen) return null

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
            action="/api/auth/signin"
            method="post"
            className={styles.emailForm}
          >
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
                type="text"
                name="provider"
                value="github"
                hidden
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
                type="text"
                name="provider"
                value="google"
                hidden
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
