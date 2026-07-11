# AviDeyci

Sistema web para planeación y gestión de sacrificio avícola. Permite administrar granjas, pesos, sacrificios y nacimientos desde un panel centralizado.

## Descripción

AviDeyci es una aplicación de frontend construida con React y TypeScript, pensada para llevar el control operativo de una granja avícola: registro de granjas, seguimiento de pesos por categoría, planeación de sacrificio y control de nacimientos. El backend está planeado en Java (aún no integrado).

## Tecnologías

- **React 19** — librería de UI
- **TypeScript** — tipado estático
- **Vite** — bundler y servidor de desarrollo
- **Tailwind CSS v4** — estilos utilitarios
- **react-router-dom** — enrutamiento en cliente
- **framer-motion** — animaciones y transiciones
- **Font Awesome (`@fortawesome/fontawesome-free`)** — iconografía
- **pnpm** — gestor de paquetes

## Requisitos previos

- Node.js 18 o superior
- pnpm instalado globalmente

```bash
npm install -g pnpm
```

## Instalación

Clona el repositorio y entra a la carpeta del proyecto:

```bash
git clone <url-del-repositorio>
cd avideyci
```

Instala las dependencias:

```bash
pnpm install
```

Si el proyecto no las trae ya en el `package.json`, instala manualmente las dependencias clave:

```bash
pnpm add react-router-dom framer-motion @fortawesome/fontawesome-free
pnpm add -D tailwindcss @tailwindcss/vite
```

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Levanta el servidor de desarrollo con hot reload |
| `pnpm build` | Genera el build de producción |
| `pnpm preview` | Sirve localmente el build de producción para probarlo |
| `pnpm lint` | Corre el linter sobre el proyecto (si está configurado) |

Para iniciar el proyecto en desarrollo:

```bash
pnpm dev
```

Por defecto queda disponible en `http://localhost:5173`.

## Estructura del proyecto

```
src/
├── App.tsx                  # Layout raíz: sidebar + header + rutas
├── App.css
├── index.css                 # Variables de tema, @theme de Tailwind
├── main.tsx                  # Punto de entrada, envuelve la app en BrowserRouter
│
├── constants/
│   ├── routes.ts              # Definición central de rutas (paths)
│   └── pageTitles.ts          # Mapeo ruta -> título visible en el header
│
├── hooks/
│   └── usePageTitle.ts        # Hook que resuelve el título según la ruta activa
│
├── routes/
│   └── AppRoutes.tsx          # Definición de <Routes>/<Route> de la app
│
├── pages/                     # Una carpeta por vista/página asociada a una ruta
│   ├── Home/
│   ├── Granjas/
│   ├── Pesos/
│   ├── Sacrificio/
│   └── Nacimientos/
│
└── shared/
    └── components/
        ├── common/
        │   ├── Button.tsx      # Botón reutilizable para crear registros
        │   ├── List.tsx
        │   └── Title.tsx
        ├── navbar/
        │   ├── NavBar.tsx      # Sidebar de navegación
        │   ├── NavItem.tsx
        │   └── NavItemGroup.tsx
        ├── table/
        │   └── SimpleTable.tsx # Tabla reutilizable (título, acciones, filas dinámicas)
        ├── modal/
        │   └── Modal.tsx       # Modal genérico para formularios de creación
        └── transitions/
            └── TransitionMotion.tsx  # Wrapper de animaciones con framer-motion
```

## Convenciones del proyecto

- **Rutas centralizadas**: todos los paths viven en `constants/routes.ts`. Nunca se escriben strings de rutas a mano en componentes.
- **Páginas vs. componentes**: todo lo que se renderiza directamente sobre una ruta va en `pages/`; los bloques reutilizables (botones, tablas, modales, navbar) van en `shared/components/`.
- **Tema visual**: los colores, tipografías y radios están centralizados como variables CSS en `index.css` y expuestos a Tailwind mediante el bloque `@theme`, de forma que clases como `text-foreground` o `bg-accent` usan directamente los valores del tema.
- **Modo oscuro deshabilitado intencionalmente**: se usa `@custom-variant dark (&:where(.dark, .dark *))` para que `dark:` solo se active con una clase explícita, no por preferencia del sistema.
- **Formularios de creación**: cada página que necesita agregar registros usa el componente `Button` (con el prop `table` indicando a qué entidad pertenece) en conjunto con `Modal`, al que se le pasa un arreglo de `fields` describiendo el formulario. `Modal` soporta layout de 1 o 2 columnas mediante el prop `columns`.

## Estado actual

- Frontend funcional con navegación, sidebar responsivo (expandible/colapsable), tablas dinámicas y modales de creación por sección (Granjas, Pesos, Sacrificio, Nacimientos).
- Los datos mostrados en las tablas son estáticos/mock; aún no hay conexión a un backend.
- El `onSubmit` de los modales actualmente solo hace `console.log` de los datos capturados — pendiente de conectar a la API una vez esté disponible el backend en Java.

## Próximos pasos sugeridos

- Definir y construir la API en Java (REST) para Granjas, Pesos, Sacrificio y Nacimientos.
- Reemplazar los datos mock de `SimpleTable` por consumo real de la API (fetch/axios).
- Agregar manejo de estados de carga y error en las tablas y modales.
- Agregar autenticación y control de roles (ya existe la base con el campo `roles` en `NavItemConfig`).
- Agregar validaciones más robustas en los formularios del `Modal`.

## Licencia

Proyecto privado — uso interno.