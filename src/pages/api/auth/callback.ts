export const prerender = false

import type {APIRoute} from 'astro'
import {supabase} from '@/lib/supabase'
import {
  setSessionCookies,
  getOAuthRedirectCookie,
  deleteOAuthRedirectCookie,
} from '@/lib/authCookies'

export const GET: APIRoute = async ({url, cookies, redirect}) => {
  const isProd = import.meta.env.PROD === true
  const getBaseUrl = () => url.origin
  const sanitizeToPath = (raw: string | null) => {
    try {
      if (!raw) return '/'
      const u = new URL(raw, getBaseUrl())
      return u.origin === getBaseUrl()
        ? u.pathname + u.search + u.hash || '/'
        : '/'
    } catch {
      return '/'
    }
  }
  const authCode = url.searchParams.get('code')

  if (!authCode) {
    return new Response('No se proporcionó ningún código', {status: 400})
  }

  const {data, error} = await supabase.auth.exchangeCodeForSession(authCode)

  if (error) {
    console.error('OAuth callback error:', error)
    return new Response(
      JSON.stringify({error: 'No se pudo completar la autenticación'}),
      {status: 500, headers: {'Content-Type': 'application/json'}}
    )
  }

  const {access_token, refresh_token} = data.session

  setSessionCookies(cookies, access_token, refresh_token)

  // Obtener la URL original de la cookie y limpiarla
  const redirectUrl = sanitizeToPath(getOAuthRedirectCookie(cookies))
  deleteOAuthRedirectCookie(cookies)

  return redirect(redirectUrl)
}
