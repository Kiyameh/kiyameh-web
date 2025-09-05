export const prerender = false

import type {APIRoute} from 'astro'
import {supabase} from '@/lib/supabase'

export const POST: APIRoute = async ({request, redirect, cookies}) => {
  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return new Response('Correo electrónico y contraseña obligatorios', {
      status: 400,
    })
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return new Response('Formato de email inválido', {
      status: 400,
    })
  }

  // Validar contraseña (mínimo 6 caracteres)
  if (password.length < 6) {
    return new Response('La contraseña debe tener al menos 6 caracteres', {
      status: 400,
    })
  }

  try {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Opcional: deshabilitar confirmación de email para desarrollo
        emailRedirectTo: `${request.url.split('/api')[0]}/api/auth/callback`,
      },
    })

    if (error) {
      console.error('Error en registro:', error)

      // Manejar errores específicos
      if (error.message.includes('already registered')) {
        return new Response(
          'Este email ya está registrado. Intenta iniciar sesión.',
          {
            status: 400,
          }
        )
      }

      if (error.message.includes('Password should be at least')) {
        return new Response('La contraseña debe tener al menos 6 caracteres', {
          status: 400,
        })
      }

      return new Response(`Error en el registro: ${error.message}`, {
        status: 500,
      })
    }

    // Si el usuario se creó inmediatamente (sin confirmación de email)
    if (data.user && data.session) {
      const {access_token, refresh_token} = data.session

      // Establecer cookies de sesión
      cookies.set('sb-access-token', access_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 días
      })

      cookies.set('sb-refresh-token', refresh_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 días
      })

      // Obtener la URL de referencia para redirigir de vuelta a la página actual
      const referer = request.headers.get('referer') || '/'
      return redirect(referer)
    }

    // Si se requiere confirmación de email
    return redirect('/signin?message=check-email')
  } catch (error) {
    console.error('Error inesperado en registro:', error)
    return new Response('Error interno del servidor', {
      status: 500,
    })
  }
}
