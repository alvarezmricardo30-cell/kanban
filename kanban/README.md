# Kanban · Frontend

Aplicación de tablero Kanban con React, Vite y React Router.

## Requisitos

- Node.js 20 o superior
- La API de `kanban-api/` encendida en http://localhost:3001

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — versión de producción en `dist/`
- `npm run preview` — sirve la versión de producción
- `npm test` — pruebas del reducer con Vitest
- `npm run lint` — revisión de código con oxlint

## Estructura

```
src/
  components/   Piezas reutilizables (Column, TaskCard, TaskForm)
  context/      Estado global con Context + useReducer
  hooks/        Hooks personalizados (useLocalStorage)
  pages/        Pantallas asociadas a rutas
  api.js        Llamadas a la API REST
  App.jsx       Menú y tabla de rutas
  main.jsx      Punto de entrada con BrowserRouter y BoardProvider
```

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Tablero |
| `/stats` | Estadísticas |
| `/tarea/:id` | Detalle y edición de una tarea |
| `*` | Página 404 |

## Variables de entorno

Copia `.env.example` a `.env` y ajusta la dirección de la API:

```
VITE_API_URL=http://localhost:3001
```

En Vite solo las variables que empiezan con `VITE_` llegan al navegador, así que
nunca deben contener contraseñas ni claves secretas.
