# 🚀 Portfolio Backend API (EN DESARROLLO)

API backend desarrollada con **Node.js + Express + TypeScript**, encargada de gestionar la información del portafolio profesional y proveer endpoints REST para el frontend.

El proyecto sigue una arquitectura modular y escalable, preparada para integrarse con base de datos mediante **Prisma ORM**.

---

## 📦 Tecnologías utilizadas

* Node.js  
* Express.js  
* TypeScript  
* Prisma ORM  
* PostgreSQL
* dotenv    
* API REST  

---

## 📌 Estado del proyecto

🚧 **Proyecto en desarrollo**

Actualmente, el backend está en proceso de construcción y tiene como objetivo:

* Reemplazar la capa de datos simulada del frontend  
* Proveer endpoints reales  
* Centralizar la lógica de negocio  
* Integrarse con base de datos mediante Prisma  

---

## 📌 Funcionalidades previstas

* Gestión de perfil (user)
* Gestión de proyectos (project)
* Gestión de educación (education)
* Gestión de habilidades (skill)  
* Gestión de contactos (contact)
* Manejo de archivos (uploads)  
* API REST estructurada  
* Validación de datos  

---

## 📁 Estructura del proyecto

```bash
.
├── src/
│   │
│   ├── config/             # Configuración de Prisma ORM
│   ├── docs/               # Documentación Swagger/OpenAPI
│   ├── middlewares/        # Middlewares globales
│   ├── utils/              # Funciones utilitarias
│   │
│   ├── modules/
│   │   │
│   │   ├── user/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.route.ts
│   │   │   ├── user.schema.ts
│   │   │   └── user.service.ts
│   │   │
│   │   ├── project/
│   │   │   ├── project.controller.ts
│   │   │   ├── project.route.ts
│   │   │   ├── project.schema.ts
│   │   │   └── project.service.ts
│   │   │
│   │   ├── education/
│   │   │   ├── education.controller.ts
│   │   │   ├── education.route.ts
│   │   │   ├── education.schema.ts
│   │   │   └── education.service.ts
│   │   │
│   │   ├── skill/
│   │   │   ├── skill.controller.ts
│   │   │   ├── skill.route.ts
│   │   │   ├── skill.schema.ts
│   │   │   └── skill.service.ts
│   │   │
│   │   └── socialLink/
│   │       ├── socialLink.controller.ts
│   │       ├── socialLink.route.ts
│   │       ├── socialLink.schema.ts
│   │       └── socialLink.service.ts
│   │
│   ├── app.ts              # Configuración principal de Express
│   └── index.ts            # Punto de entrada del servidor
│
├── prisma/                 # Schema y migraciones de Prisma
├── generated/              # Cliente generado por Prisma
├── uploads/                # Archivos subidos
│
├── .env                    # Variables de entorno
├── .gitignore
├── package.json
├── package-lock.json
├── prisma.config.ts        # Configuración de Prisma
├── tsconfig.json           # Configuración de TypeScript
└── README.md
```


## ⚙️ Instalación y ejecución en local (Backend)

Este proyecto forma parte de un repositorio que contiene tanto frontend como backend.

---
### 📥 1. Clonar el repositorio

```bash
git clone https://github.com/0carloscastillo0/Web-Portfolio-Carlos.git
cd Web-Portfolio-Carlos
```
---

### 📂 2. Acceder al proyecto backend

```bash
cd backend-api
```

---

### 📦 3. Instalar dependencias

```bash
npm install
```

---
### ⚙️ 4. Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto y añadir la URL de la base de datos:

```bash
DATABASE_URL="postgresql://postgres:1234@localhost:5432/webPortfolio?schema=public"
```

---
### 🧬 5. Configurar Prisma
Generar el cliente de prisma:
```bash
npx prisma generate
```

Ejecutar migraciones (si existen):
```bash
npx prisma migrate dev
```

---

### ▶️ 6. Ejecutar el servidor en desarrollo

```bash
npm run dev
```
---

### 🌐 7. Acceder a la API

Por defecto, la aplicación estará disponible en:
```
http://localhost:3000
```

---

## 📄 Licencia
Proyecto de uso personal / portafolio.

---

## 👨‍💻 Autor
Desarrollado por **Carlos Castillo Domínguez**

---



