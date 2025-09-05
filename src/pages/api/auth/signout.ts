export const prerender = false

import type {APIRoute} from 'astro'

export const GET: APIRoute = async ({cookies, redirect, request}) => {
  cookies.delete('sb-access-token', {path: '/'})
  cookies.delete('sb-refresh-token', {path: '/'})

  // Obtener la URL de referencia para redirigir de vuelta a la página actual
  const referer = request.headers.get('referer') || '/'
  return redirect(referer)
}
