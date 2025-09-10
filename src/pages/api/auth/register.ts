export const prerender = false

import type {APIRoute} from 'astro'
import {supabase} from '@/lib/supabase'
import {setSessionCookies} from '@/lib/authCookies'

export const POST: APIRoute = async ({request, cookies}) => {
  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return new Response(
      JSON.stringify({error: 'Correo electrónico y contraseña obligatorios'}),
      {status: 400, headers: {'Content-Type': 'application/json'}}
    )
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({error: 'Formato de email inválido'}), {
      status: 400,
      headers: {'Content-Type': 'application/json'},
    })
  }

  // Validar contraseña (mínimo 6 caracteres)
  if (password.length < 6) {
    return new Response(
      JSON.stringify({error: 'La contraseña debe tener al menos 6 caracteres'}),
      {status: 400, headers: {'Content-Type': 'application/json'}}
    )
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
      // Respuestas genéricas
      if (error.message.includes('already registered')) {
        return new Response(
          JSON.stringify({error: 'Este email ya está registrado'}),
          {status: 400, headers: {'Content-Type': 'application/json'}}
        )
      }
      if (error.message.includes('Password should be at least')) {
        return new Response(
          JSON.stringify({
            error: 'La contraseña debe tener al menos 6 caracteres',
          }),
          {status: 400, headers: {'Content-Type': 'application/json'}}
        )
      }
      return new Response(
        JSON.stringify({error: 'No se pudo completar el registro'}),
        {status: 500, headers: {'Content-Type': 'application/json'}}
      )
    }

    // Si el usuario se creó inmediatamente (sin confirmación de email)
    if (data.user && data.session) {
      const {access_token, refresh_token} = data.session

      // Establecer cookies de sesión
      setSessionCookies(cookies, access_token, refresh_token)

      // Responder JSON para que el cliente gestione UX consistente
      return new Response(JSON.stringify({success: true}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      })
    }

    // Si se requiere confirmación de email
    return new Response(
      JSON.stringify({
        success: true,
        requiresEmailConfirm: true,
        message: 'check-email',
      }),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    )
  } catch (error) {
    console.error('Error inesperado en registro:', error)
    return new Response(JSON.stringify({error: 'Error interno del servidor'}), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    })
  }
}
