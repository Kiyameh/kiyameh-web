import {AuthProvider} from '@/contexts/AuthContext'
import styles from './AuthLayout.module.css'
import AuthControls from '../components/ui/AuthControls/AuthControls'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <AuthProvider>
      <nav className={styles.navbar}>
        <a
          href="/"
          className="link"
        >
          Volver a Kiyameh.com
        </a>

        <AuthControls />
      </nav>
      {children}
    </AuthProvider>
  )
}
