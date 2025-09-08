export const prerender = false

import type {APIRoute} from 'astro'
import {supabase} from '@/lib/supabase'

export const GET: APIRoute = async ({cookies}) => {
  const accessToken = cookies.get('sb-access-token')?.value

  if (!accessToken) {
    return new Response(JSON.stringify({user: null}), {
      status: 401,
      headers: {'Content-Type': 'application/json'},
    })
  }

  try {
    const {data, error} = await supabase.auth.getUser(accessToken)
    if (error || !data?.user) {
      return new Response(JSON.stringify({user: null}), {
        status: 401,
        headers: {'Content-Type': 'application/json'},
      })
    }

    const u = data.user
    const name =
      (u.user_metadata &&
        (u.user_metadata.name || u.user_metadata.full_name)) ||
      (u.email ? u.email.split('@')[0] : 'Usuario')

    return new Response(
      JSON.stringify({user: {id: u.id, name, email: u.email || undefined}}),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    )
  } catch (e) {
    return new Response(JSON.stringify({user: null}), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    })
  }
}
