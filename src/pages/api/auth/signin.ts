export const prerender = false

import type {APIRoute} from 'astro'
import {supabase} from '@/lib/supabase'
import type {Provider} from '@supabase/supabase-js'

export const POST: APIRoute = async ({request, cookies, redirect}) => {
  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const provider = formData.get('provider')?.toString()
  const validProviders = ['google', 'github']

  if (provider && validProviders.includes(provider)) {
    // Obtener la URL de referencia para recordar de dónde vino el usuario
    const referer = request.headers.get('referer') || '/'

    // Guardar la URL original en una cookie antes de redirigir a OAuth
    cookies.set('oauth-redirect-url', referer, {
      path: '/',
      httpOnly: true,
      secure: false, // Cambiar a true en producción
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutos
    })

    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: 'http://localhost:4321/api/auth/callback',
      },
    })

    if (error) {
      return new Response(error.message, {status: 500})
    }

    return redirect(data.url)
  }

  if (!email || !password) {
    return new Response('Correo electrónico y contraseña obligatorios', {
      status: 400,
    })
  }

  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return new Response(error.message, {status: 500})
  }

  const {access_token, refresh_token} = data.session
  cookies.set('sb-access-token', access_token, {
    path: '/',
  })
  cookies.set('sb-refresh-token', refresh_token, {
    path: '/',
  })

  // Obtener la URL de referencia para redirigir de vuelta a la página actual
  const referer = request.headers.get('referer') || '/'
  return redirect(referer)
}
