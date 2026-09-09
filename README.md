# Aceraluminios — sitio web

Sitio estático (HTML/CSS/JS) con un formulario de contacto que envía el mensaje por correo mediante una función serverless (`api/contact.js`), pensado para desplegarse gratis en [Vercel](https://vercel.com).

## Desplegar en Vercel (gratis)

1. Instala/usa la CLI de Vercel desde esta carpeta:
   ```bash
   npx vercel login
   ```
   Se abrirá el navegador para iniciar sesión (o crear una cuenta gratis) con tu correo o GitHub.

2. Despliega:
   ```bash
   npx vercel --prod
   ```
   La primera vez te preguntará el nombre del proyecto (ej. `aceraluminios`) — acepta los valores por defecto. Al terminar te da una URL tipo `https://aceraluminios.vercel.app`.

3. Configura el correo que envía los mensajes del formulario:
   - Entra al proyecto en [vercel.com/dashboard](https://vercel.com/dashboard) → **Settings → Environment Variables**.
   - Agrega:
     - `GMAIL_USER` = `aceraluminios297@gmail.com`
     - `GMAIL_APP_PASSWORD` = una **contraseña de aplicación** de Gmail (no la contraseña normal). Se genera en [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) — requiere tener activada la verificación en dos pasos en esa cuenta de Gmail.
   - Vuelve a desplegar para que tome las variables: `npx vercel --prod`.

4. Prueba el formulario en la URL publicada — el mensaje llega como correo a `aceraluminios297@gmail.com`.

## Dominio propio (opcional)

En el dashboard del proyecto → **Settings → Domains**, puedes conectar un dominio propio (ej. `aceraluminios.com`) si lo compran más adelante.

## Desarrollo local

```bash
npm install
npx vercel dev
```

Esto corre el sitio y la función `/api/contact` juntos en `localhost`. Necesitas un archivo `.env` (copiado de `.env.example`) con `GMAIL_APP_PASSWORD` para que el envío de correo funcione en local.
