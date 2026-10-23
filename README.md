# CAPROO Platform Foundation

Este repositorio contiene una base funcional para la plataforma web de CAPROO, una academia presencial de preparación para el ingreso a Medicina en Chetumal, Quintana Roo.

## Qué incluye esta versión

- Sitio web responsive con foco en marketing y captación de alumnos.
- Catálogo de cursos presenciales con cupos y precios provisionales.
- Panel de control orientado a roles: administrador, profesor y alumno.
- Base de datos SQL propuesta para Supabase con seguridad por filas (RLS).
- Worker de ejemplo para flujo de pago con Mercado Pago / Cloudflare.
- Variables de entorno para configuración segura.

## Stack recomendado

- Frontend: React + Vite + Cloudflare Pages
- Backend/seguridad: Supabase PostgreSQL + Auth + RLS
- Servidor/funciones: Cloudflare Workers
- Pagos: Mercado Pago (validar tarifas y condiciones vigentes)

## Requisitos

- Node.js 18+
- npm
- Cuenta de Supabase
- Cuenta de Mercado Pago
- Cuenta Cloudflare para despliegue de Pages/Workers

## Instalación local

```bash
npm install
cp .env.example .env
npm run dev
```

## Construcción para producción

```bash
npm run build
```

## Variables de entorno

Copia `.env.example` a `.env.local` o al entorno del despliegue y reemplaza los valores reales:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MERCADOPAGO_ACCESS_TOKEN`
- `WHATSAPP_NUMBER`
- `CLOUDFLARE_PROJECT_NAME`

## Recomendaciones de implementación

1. Configura Supabase Auth con roles personalizados: `admin`, `professor`, `student`.
2. Aplica RLS y políticas en la base de datos.
3. Integra Mercado Pago en el backend con validación server-side.
4. Sustituye texto provisional, precios y datos de pruebas por contenido real de CAPROO.
5. Agrega el logotipo oficial cuando lo proporciones.

## Consideraciones de seguridad

- Nunca publiques tokens, secretos ni credenciales en GitHub.
- La validación de pagos debe ocurrir del lado del servidor.
- La confirmación de inscripción no debe depender únicamente de la respuesta del navegador.
- Utiliza webhooks verificados y referencias únicas por inscripción.

## Importante

Esta versión es una base funcional para construir la plataforma real. Los precios, horarios, grupos y contenidos académicos deben ser validados por el negocio antes de pasar a producción.

## Enlace del repositorio

https://github.com/marioalcocerfierro10-pixel/capqroo
