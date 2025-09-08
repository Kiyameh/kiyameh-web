export const prerender = false

import type {APIRoute} from 'astro'
import {createClient} from '@supabase/supabase-js'
import {clearSessionCookies} from '@/lib/authCookies'

export const GET: APIRoute = async ({cookies, redirect, request}) => {
  const baseUrl = request.url.split('/api')[0]
  const sanitizeToPath = (raw: string | null) => {
    try {
      if (!raw) return '/'
      const u = new URL(raw, baseUrl)
      return u.origin === baseUrl ? u.pathname + u.search + u.hash || '/' : '/'
    } catch {
      return '/'
    }
  }
  // Intentar revocar la sesión en Supabase
  try {
    const accessToken = cookies.get('sb-access-token')?.value
    const refreshToken = cookies.get('sb-refresh-token')?.value
    if (accessToken && refreshToken) {
      // Crear un cliente temporal con la sesión actual
      const supabaseServer = createClient(
        import.meta.env.SUPABASE_URL,
        import.meta.env.SUPABASE_ANON_KEY
      )
      // Establecer la sesión para que signOut afecte a este usuario
      await supabaseServer.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
      await supabaseServer.auth.signOut()
    }
  } catch (e) {
    // Registrar y continuar con la limpieza de cookies
    console.error('Error revocando sesión en Supabase:', e)
  }

  clearSessionCookies(cookies)

  // Obtener la URL de referencia para redirigir de vuelta a la página actual
  const referer = sanitizeToPath(request.headers.get('referer'))
  return redirect(referer)
}
