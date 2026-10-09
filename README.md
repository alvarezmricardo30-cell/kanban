# Kanban - Clase 4

Proyecto Kanban del curso **Tecnólogo en Análisis y Desarrollo de Software**: tablero hecho en React con
estado global (`Context` + `useReducer`) conectado a una base de datos **MySQL** a través de una **API Express**.

## Funcionalidades

- Crear tareas con prioridad (alta / media / baja)
- Mover tareas entre columnas (Por hacer / En progreso / Hecho)
- Eliminar tareas y vaciar la columna "Hecho"
- Buscar tareas por título
- Restablecer el tablero a los datos iniciales
- Editar el título con doble clic en la tarjeta (Reto 3)
- Mostrar fecha de creación y proyecto en cada tarjeta (Retos 2 y 4)
- Actualización optimista al mover tarjetas (Reto 5)

## Requisitos

- Node.js 20 o superior
- XAMPP con MySQL y Apache (phpMyAdmin)

## Cómo correrlo

### 1. Crear la base de datos

Abre `http://localhost/phpmyadmin`, ve a la pestaña **Importar** y sube el archivo
[`kanban-api/database.sql`](kanban-api/database.sql). Esto crea `kanban_db` con las tablas
`tasks` y `projects` y sus datos iniciales.

### 2. Levantar la API

```bash
cd kanban-api
npm install
npm start
```

Debe aparecer: `API en http://localhost:3001`. Pruébala en
[http://localhost:3001/api/tasks](http://localhost:3001/api/tasks).

### 3. Levantar el frontend

En otra terminal:

```bash
cd kanban
npm install
npm run dev
```

Abre la dirección que muestre la terminal (normalmente `http://localhost:5173`) y el tablero cargará
las tareas desde MySQL.

## Estructura

| Carpeta         | Descripción                                            |
| --------------- | ------------------------------------------------------ |
| `kanban/`       | Frontend en React (Context + useReducer + fetch a la API) |
| `kanban-api/`   | API Express con MySQL (`server.js`) y `database.sql`     |
| `evidencia/`    | Capturas de pantalla y documento de evidencia           |

## Evidencia

- [Evidencia_Clase_4_FINAL.docx](evidencia/Evidencia_Clase_4_FINAL.docx)
- [Capturas](evidencia/)