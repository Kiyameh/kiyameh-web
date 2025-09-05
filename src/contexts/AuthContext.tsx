import React, {createContext, useContext, useEffect, useState} from 'react'

interface AuthUser {
  id: string
  name: string
  email?: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Función simple para verificar cookies del navegador
    const checkAuthCookies = () => {
      try {
        // Obtener cookies del navegador
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=')
          acc[key] = value
          return acc
        }, {} as Record<string, string>)

        const accessToken = cookies['sb-access-token']
        const refreshToken = cookies['sb-refresh-token']

        if (accessToken && refreshToken) {
          // Intentar obtener información del usuario del token JWT
          try {
            // Decodificar el JWT (solo la parte del payload, sin verificar la firma)
            const payload = JSON.parse(atob(accessToken.split('.')[1]))

            const userName =
              payload.user_metadata?.name ||
              payload.user_metadata?.full_name ||
              payload.email?.split('@')[0] ||
              'Usuario'

            setUser({
              id: payload.sub || 'unknown-id',
              name: userName,
              email: payload.email,
            })
          } catch (tokenError) {
            console.error('Error decoding token:', tokenError)
            // Fallback si no se puede decodificar el token
            setUser({
              id: 'user-from-token',
              name: 'Usuario Autenticado',
              email: 'user@example.com',
            })
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error checking auth cookies:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    // Ejecutar la verificación inmediatamente
    checkAuthCookies()

    // También verificar cada 5 segundos por si las cookies cambian
    const interval = setInterval(checkAuthCookies, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const checkSession = async () => {
    // Esta función ya no es necesaria con el nuevo enfoque
  }

  const signOut = async () => {
    try {
      // Limpiar las cookies de autenticación
      document.cookie =
        'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie =
        'sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

      setUser(null)

      // Redirigir al endpoint de signout que limpiará las cookies del servidor
      window.location.href = '/api/auth/signout'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{user, isLoading, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
