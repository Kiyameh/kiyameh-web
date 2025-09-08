import type {AstroCookies} from 'astro'

const week = 60 * 60 * 24 * 7
const month = 60 * 60 * 24 * 30

export function getCookieOptions(): {
  httpOnly: boolean
  secure: boolean
  sameSite: 'lax' | 'strict' | 'none'
} {
  const isProd = (import.meta as any).env?.PROD === true
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
  }
}

export function setSessionCookies(
  cookies: AstroCookies,
  accessToken: string,
  refreshToken: string
) {
  const base = getCookieOptions()
  cookies.set('sb-access-token', accessToken, {
    path: '/',
    maxAge: week,
    ...base,
  })
  cookies.set('sb-refresh-token', refreshToken, {
    path: '/',
    maxAge: month,
    ...base,
  })
}

export function clearSessionCookies(cookies: AstroCookies) {
  cookies.delete('sb-access-token', {path: '/'})
  cookies.delete('sb-refresh-token', {path: '/'})
}

export function setOAuthRedirectCookie(cookies: AstroCookies, value: string) {
  const base = getCookieOptions()
  cookies.set('oauth-redirect-url', value, {
    path: '/',
    maxAge: 60 * 10,
    ...base,
  })
}

export function getOAuthRedirectCookie(cookies: AstroCookies) {
  return cookies.get('oauth-redirect-url')?.value || '/'
}

export function deleteOAuthRedirectCookie(cookies: AstroCookies) {
  cookies.delete('oauth-redirect-url', {path: '/'})
}
