# Portfolio Backend API

API backend desarrollada con **Node.js + Express + TypeScript**, encargada de gestionar la información del portafolio profesional y proveer endpoints REST para el frontend.

El proyecto sigue una arquitectura modular y escalable, con **Prisma ORM** y **Cloudinary** para archivos.

---

## Tecnologías utilizadas

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* Cloudinary (uploads)
* JWT (autenticación)
* Helmet + Rate Limiting (seguridad)
* Vitest + Supertest (tests)
* Swagger/OpenAPI (documentación)

---

## Funcionalidades

* Autenticación JWT (register, login, refresh-token, logout, me, change-password)
* Gestión de perfil (user)
* Gestión de proyectos (project)
* Gestión de educación (education)
* Gestión de habilidades (skill)
* Gestión de redes sociales (socialLink)
* Subida de archivos a Cloudinary (foto, CV, imágenes de proyecto)
* API REST estructurada
* Validación de datos con Joi
* Documentación Swagger en `/api/docs`

---

## Estructura del proyecto

```bash
backend-api/
├── src/
│   ├── config/             # Configuración de Prisma, Cloudinary, env
│   ├── docs/               # Documentación Swagger/OpenAPI
│   ├── middlewares/        # Middlewares (auth, error, rateLimit, validate)
│   ├── modules/            # Módulos por entidad
│   │   ├── auth/           # Autenticación JWT
│   │   ├── user/           # Perfil de usuario
│   │   ├── project/        # Proyectos del portafolio
│   │   ├── education/      # Educación
│   │   ├── skill/          # Habilidades
│   │   └── socialLink/     # Redes sociales
│   ├── utils/              # Funciones utilitarias (cloudinary, multer, etc.)
│   ├── app.ts              # Configuración principal de Express
│   └── index.ts            # Punto de entrada del servidor
├── tests/                  # Tests de integración
│   ├── helpers/            # Helpers compartidos (auth, db, file, request)
│   └── setup.ts            # Setup global de tests
├── prisma/                 # Schema y migraciones de Prisma
├── .env                    # Variables de entorno (no se sube a git)
├── .env.test               # Variables de entorno para tests
├── vitest.config.ts        # Configuración de Vitest
├── package.json
├── tsconfig.json
└── README.md
```

---

## Instalación y ejecución en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/0carloscastillo0/Web-Portfolio-Carlos.git
cd Web-Portfolio-Carlos/backend-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/webPortfolio?schema=public"
JWT_ACCESS_SECRET="tu-access-secret"
JWT_REFRESH_SECRET="tu-refresh-secret"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
```

### 4. Configurar Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Ejecutar el servidor

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`.

Documentación Swagger: `http://localhost:3000/api/docs`.

---

## Tests

```bash
# Crear base de datos de test
createdb -h localhost -U postgres webPortfolio_test

# Aplicar migraciones a la DB de test
npm run test:db:migrate

# Ejecutar tests
npm run test

# Tests con watch
npm run test:watch

# Tests con coverage
npm run test:coverage
```

---

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DATABASE_URL` | URL de conexión a PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `JWT_ACCESS_SECRET` | Secreto para firmar access tokens | valor largo aleatorio |
| `JWT_REFRESH_SECRET` | Secreto para firmar refresh tokens | valor largo aleatorio |
| `JWT_ACCESS_EXPIRES_IN` | Tiempo de expiración del access token | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Tiempo de expiración del refresh token | `7d` |
| `CLOUDINARY_CLOUD_NAME` | Nombre del cloud de Cloudinary | tu cloud name |
| `CLOUDINARY_API_KEY` | API key de Cloudinary | tu api key |
| `CLOUDINARY_API_SECRET` | API secret de Cloudinary | tu api secret |
| `FRONTEND_URL` | URL del frontend para CORS | `https://castillo-sites.vercel.app` |
| `API_BASE_URL` | URL base de la API para Swagger | `https://tu-backend.onrender.com/api/v1` |
| `ENABLE_REGISTER` | Habilitar/deshabilitar registro (`true`/`false`) | `true` en desarrollo |
| `PORT` | Puerto del servidor (inyectado por Render) | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` / `production` / `test` |

---

## Deploy en Render

### Build Command

```bash
npm run render:build
```

### Start Command

```bash
npm run start
```

### Health Check Path

```txt
/health
```

### Flujo de registro de usuario

1. Desplegar con `ENABLE_REGISTER=true`
2. Crear usuario administrador con Postman
3. Cambiar `ENABLE_REGISTER=false` en Render
4. Redeploy/restart
5. Confirmar que `POST /api/v1/auth/register` devuelva `403`

---

## Licencia

Proyecto de uso personal / portafolio.

---

## Autor

Desarrollado por **Carlos Castillo Domínguez**
