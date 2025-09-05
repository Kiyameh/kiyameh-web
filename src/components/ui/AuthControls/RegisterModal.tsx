import React from 'react'
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
  if (!isOpen) return null

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
            action="/api/auth/register"
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
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                required
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
            >
              Registrarse
            </button>
          </form>
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
