import {useAuth} from '@/contexts/AuthContext'
import {useState} from 'react'
import SignInModal from '@/components/ui/AuthControls/SignInModal'
import RegisterModal from '@/components/ui/AuthControls/RegisterModal'
import styles from './AuthControls.module.css'

type ModalType = 'signin' | 'register' | null

export default function AuthControls() {
  const {user, isLoading, signOut} = useAuth()
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (!user) {
    return (
      <>
        <button
          className={styles.signInButton}
          onClick={() => setActiveModal('signin')}
        >
          Iniciar sesión
        </button>
        <SignInModal
          isOpen={activeModal === 'signin'}
          onClose={() => setActiveModal(null)}
          onSwitchToRegister={() => setActiveModal('register')}
        />
        <RegisterModal
          isOpen={activeModal === 'register'}
          onClose={() => setActiveModal(null)}
          onSwitchToSignIn={() => setActiveModal('signin')}
        />
      </>
    )
  }

  return (
    <div className={styles.userControls}>
      <span>Hola {user.name}</span>
      <button
        className={styles.button}
        onClick={signOut}
      >
        Cerrar sesión
      </button>
    </div>
  )
}
