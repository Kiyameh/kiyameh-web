# AUTH.md

## 📌 Descripción General

Este archivo explica cómo **consumir el servicio de autenticación centralizado**.  
Cada aplicación cliente (Next, Astro, React, etc.) **no gestiona login/signup directamente**, sino que redirige al Auth Gateway.

---

## 🔑 Flujo de Uso

1. **Redirigir al Auth Gateway**  
   - Cuando el usuario no esté autenticado, redirigir a:

     ```url
     https://auth.miservicio.com/login?redirect=<URL_DE_RETORNO>&app=<APP_ID>
     ```

   - Ejemplo:

     ```url
     https://auth.miservicio.com/login?redirect=https://app-a.com/dashboard&app=appA
     ```

2. **Usuario completa login/registro**  
   - En el Auth Gateway se realiza la autenticación contra Supabase.

3. **Redirección de vuelta**  
   - Tras completar el login:

     ```url
     https://app-a.com/dashboard?access_token=xxx&refresh_token=yyy
     ```

   - Los parámetros incluyen tokens de sesión (`access_token`, `refresh_token`).  

4. **Almacenar sesión en la app cliente**  
   - Guardar los tokens en cookies locales o memoria.  
   - Usar `access_token` para llamadas API autenticadas.  
   - Refrescar sesión con el `refresh_token` cuando expire.

---

## 📂 API del Auth Gateway

### `POST /api/auth/login`

- Entrada: `{ email, password }`
- Respuesta: `{ access_token, refresh_token, user }`

### `POST /api/auth/signup`

- Entrada: `{ email, password, metadata }`
- Respuesta: `{ access_token, refresh_token, user }`

### `POST /api/auth/refresh`

- Entrada: `{ refresh_token }`
- Respuesta: `{ access_token }`

### `GET /api/auth/user`

- Entrada: `{ access_token }`
- Respuesta: `{ user }`

### `POST /api/auth/logout`

- Invalida la sesión.

---

## 🎨 Personalización de UI

El parámetro `app` controla la apariencia del Auth Gateway.  

- Ejemplo:
  - `?app=appA` → colores y logo de App A  
  - `?app=appB` → colores y logo de App B  

---

## ⚠️ Consideraciones

- Mantener `redirect` en una lista blanca para evitar open redirects.  
- Configurar cookies con `SameSite=None; Secure` si los dominios son distintos.  
- Los tokens deben guardarse de forma segura (preferiblemente en `HttpOnly cookies`).  
