# 🚀 Portfolio Frontend

Aplicación frontend desarrollada con **React + TypeScript + Vite**, orientada a la visualización de un portafolio profesional. El proyecto está diseñado con una arquitectura modular y escalable, facilitando la mantenibilidad y la extensión de funcionalidades.

---

## 📦 Tecnologías utilizadas

* React
* TypeScript
* Vite
* TailwindCSS
* Context API
* Custom Hooks
* Fetch API (simulado)
* i18n (internacionalización)

---

## 📌 Funcionalidades principales

* Visualización de perfil profesional
* Sección de descripción, habilidades técnicas y educación
* Sección de proyectos
* Diseño responsivo
* Soporte multi-idioma (inglés / español)
* Tema dinámico (dark / light mode)
* Simulación de API para desarrollo desacoplado

---

## 📁 Estructura del proyecto

```bash
.
├── public/             # Recursos estáticos (imágenes, íconos, etc.)
│
├── src/
│   │
│   ├── contexts/       # Contextos globales (estado compartido)
│   │
│   ├── hooks/          # Custom hooks reutilizables
│   │
│   ├── i18n/           # Configuración de idiomas y traducciones
│   │
│   ├── modules/        # Dominios del negocio (modelo + lógica por entidad)
│   │   ├── contact/
│   │   ├── education/
│   │   ├── profile/
│   │   ├── project/
│   │   ├── skills/
│   │   └── portfolio.interface.ts
│   │
│   ├── test/          # Configuración de test unitarios
│   │
│   ├── utils/          # Funciones utilitarias
│   │
│   ├── views/          # Capa de presentación (UI)
│   │   │
│   │   ├── components/ # Componentes reutilizables
│   │   │
│   │   ├── layouts/    # Estructura base de la aplicación
│   │   │   ├── header/
│   │   │   └── footer/
│   │   │
│   │   └── sections/   # Secciones principales del sitio
│   │       ├── home/
│   │       ├── about/
│   │       └── projects/
│   │
│   ├── index.css       # Sistema de diseño base (TailwindCSS)
│   ├── App.tsx         # Componente raíz
│   └── main.tsx        # Punto de entrada
```

---

## 🧠 Arquitectura del proyecto

El proyecto sigue una arquitectura basada en **separación de responsabilidades**, combinando un enfoque **modular (por dominio)** con una clara división en capas.

---

### 🔹 modules (dominio + acceso a datos)

Contiene la lógica y estructuras de datos organizadas por entidad del negocio:

* profile
* project
* education
* skills
* contact

Cada dominio incluye:

* **`*.fallback.ts`** → Datos simulados (mock), actuando como fuente de persistencia
* **`*.service.ts`** → Capa de acceso a datos que abstrae el consumo, simulando una API
* **Tipos** → Definidos en `portfolio.interface.ts`

👉 Actualmente, el proyecto **no consume una API real**.

En su lugar:

* Los *fallbacks* actúan como una fuente de datos mock (simulando persistencia)
* Los *services* abstraen el acceso a datos, replicando el comportamiento de una API REST

Esto permite:

* Desarrollar el frontend de forma desacoplada
* Preparar fácilmente la integración futura con una API real
* Mantener una arquitectura consistente desde el inicio

---

### 🔹 views (presentación)

Encapsula toda la interfaz de usuario (UI), separada en tres niveles:

* **components** → Componentes reutilizables
* **layouts** → Estructura global (Header, Footer)
* **sections** → Secciones principales (Home, About, Projects)

---

### 🔹 hooks (lógica reutilizable)

Encapsulan lógica desacoplada de la UI:

* Manejo de estado
* Consumo de servicios
* Transformación de datos

---

### 🔹 contexts (estado global)

Gestión del estado compartido:

* Tema (dark / light)
* Idioma
* Datos del portafolio

---

### 🔹 i18n

Gestión de internacionalización:

* Idiomas disponibles
* Traducción de contenido estático
* Adaptación de contenido según idioma

---

### 🔹 utils

Funciones auxiliares reutilizables.

---

### 🎨 Sistema de diseño (index.css)

El archivo `index.css` define un **mini sistema de diseño** basado en TailwindCSS, incluyendo:

* Variables base
* Estilos globales
* Configuración visual consistente

👉 Permite mantener coherencia en toda la UI.

---

### 🧪 Testing

El proyecto incluye pruebas unitarias para validar el comportamiento de componentes, hooks y lógica de negocio. Se utilizaron las tecnologías Vitest, React Testing Library y jsdom.

Los tests cubren:

* Hooks personalizados (ej: manejo de idioma, estado global)
* Context API (providers y comportamiento)
* Componentes clave (ej: Header)
* Interacciones del usuario (eventos, navegación, UI dinámica)

La cual, cada componente tiene su correspondiente carpeta test

Para ejecutar los tests, ejecute el siguiente comando:

```bash
npm run test:run
```

## 🔄 Flujo de datos (simplificado)


Fallback → Service → Hook → Context → View

* **Fallback** → fuente de datos simulada
* **Service** → capa de acceso a datos
* **Hook** → lógica de consumo
* **Context** → estado global
* **View** → renderizado

---

## 🛠️ Buenas prácticas implementadas

* Tipado fuerte con TypeScript
* Arquitectura modular por dominio
* Separación de responsabilidades
* Simulación de capa de datos (API-ready)
* Reutilización mediante hooks
* Manejo de estado con Context API

---

## ⚙️ Instalación y ejecución en local (Frontend)

Este proyecto forma parte de un repositorio que contiene tanto frontend como backend.
Actualmente, el frontend puede ejecutarse de forma independiente, ya que utiliza una simulación de API mediante *fallbacks*.

---

### 📥 1. Clonar el repositorio

```bash
git clone https://github.com/0carloscastillo0/Web-Portfolio-Carlos.git
cd Web-Portfolio-Carlos
```

---

### 📂 2. Acceder al proyecto frontend

```bash
cd frontend-client
```

---

### 📦 3. Instalar dependencias

```bash
npm install
```

---

### ▶️ 4. Ejecutar en entorno local

```bash
npm run dev
```

---

### 🌐 5. Acceder a la aplicación

Por defecto, la aplicación estará disponible en:

```
http://localhost:5173
```

---

## 📄 Licencia

Proyecto de uso personal / portafolio.

---

## 👨‍💻 Autor

Desarrollado por **Carlos Castillo Domínguez**

---
