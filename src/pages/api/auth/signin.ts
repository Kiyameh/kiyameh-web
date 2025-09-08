export const prerender = false

import type {APIRoute} from 'astro'
import {supabase} from '@/lib/supabase'
import {setOAuthRedirectCookie, setSessionCookies} from '@/lib/authCookies'
import type {Provider} from '@supabase/supabase-js'

export const POST: APIRoute = async ({request, cookies, redirect}) => {
  const isProd = import.meta.env.PROD === true
  const getBaseUrl = () => request.url.split('/api')[0]
  const sanitizeToPath = (raw: string | null) => {
    try {
      if (!raw) return '/'
      const url = new URL(raw, getBaseUrl())
      // Solo permitir rutas internas
      return url.origin === getBaseUrl()
        ? url.pathname + url.search + url.hash || '/'
        : '/'
    } catch {
      return '/'
    }
  }
  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const provider = formData.get('provider')?.toString()
  const validProviders = ['google', 'github']

  if (provider && validProviders.includes(provider)) {
    // Obtener la URL de referencia para recordar de dónde vino el usuario
    const referer = sanitizeToPath(request.headers.get('referer'))

    // Guardar la URL original en una cookie antes de redirigir a OAuth
    setOAuthRedirectCookie(cookies, referer)

    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${getBaseUrl()}/api/auth/callback`,
      },
    })

    if (error) {
      console.error('OAuth error:', error)
      return new Response(
        JSON.stringify({
          error: 'No se pudo iniciar sesión. Inténtalo de nuevo.',
        }),
        {status: 500, headers: {'Content-Type': 'application/json'}}
      )
    }

    return redirect(data.url)
  }

  if (!email || !password) {
    return new Response(
      JSON.stringify({error: 'Correo electrónico y contraseña obligatorios'}),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Password sign-in error:', error)
    return new Response(JSON.stringify({error: 'Credenciales inválidas'}), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const {access_token, refresh_token} = data.session
  setSessionCookies(cookies, access_token, refresh_token)

  // Responder con éxito para que el cliente gestione la redirección/recarga
  return new Response(JSON.stringify({success: true}), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}
