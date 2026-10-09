import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "kanban_db",
  waitForConnections: true,
  connectionLimit: 10,
  charset: "utf8mb4",
});

const STATUS = ["todo", "doing", "done"];
const PRIORITY = ["alta", "media", "baja"];

const SEED = [
  ["Diseñar la base de datos", "done", "alta"],
  ["Crear el login", "doing", "media"],
  ["Escribir pruebas", "todo", "baja"],
  ["Preparar la demo", "todo", "alta"],
];

const SELECT_ALL =
  "SELECT t.id, t.title, t.status, t.priority, t.created_at, t.project_id, p.name AS project FROM tasks t LEFT JOIN projects p ON p.id = t.project_id ORDER BY t.id";

const SELECT_ONE =
  "SELECT t.id, t.title, t.status, t.priority, t.created_at, t.project_id, p.name AS project FROM tasks t LEFT JOIN projects p ON p.id = t.project_id WHERE t.id = ?";

async function getTaskById(id) {
  const [rows] = await pool.query(SELECT_ONE, [id]);
  return rows[0] || null;
}

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

app.get("/api/tasks", handle(async (req, res) => {
  const [rows] = await pool.query(SELECT_ALL);
  res.json(rows);
}));

app.post("/api/tasks", handle(async (req, res) => {
  const { title, priority = "media" } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }
  if (!PRIORITY.includes(priority)) {
    return res.status(400).json({ error: "Prioridad no válida" });
  }
  const [result] = await pool.query(
    "INSERT INTO tasks (title, priority) VALUES (?, ?)",
    [title.trim(), priority]
  );
  const task = await getTaskById(result.insertId);
  res.status(201).json(task);
}));

app.put("/api/tasks/:id", handle(async (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }
  const clean = title.trim();
  if (clean.length > 150) {
    return res.status(400).json({ error: "El título no puede superar 150 caracteres" });
  }
  const [result] = await pool.query(
    "UPDATE tasks SET title = ? WHERE id = ?",
    [clean, req.params.id]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  const task = await getTaskById(req.params.id);
  res.json(task);
}));

app.patch("/api/tasks/:id", handle(async (req, res) => {
  const { status } = req.body;
  if (!STATUS.includes(status)) {
    return res.status(400).json({ error: "Estado no válido" });
  }
  const [result] = await pool.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, req.params.id]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json({ id: Number(req.params.id), status });
}));

app.delete("/api/tasks/:id", handle(async (req, res) => {
  const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
    req.params.id,
  ]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.status(204).end();
}));

app.delete("/api/tasks", handle(async (req, res) => {
  const [result] = await pool.query("DELETE FROM tasks WHERE status = ?", [
    "done",
  ]);
  res.json({ deleted: result.affectedRows });
}));

app.post("/api/tasks/reset", handle(async (req, res) => {
  await pool.query("TRUNCATE TABLE tasks");
  for (const [title, status, priority] of SEED) {
    await pool.query(
      "INSERT INTO tasks (title, status, priority) VALUES (?, ?, ?)",
      [title, status, priority]
    );
  }
  const [rows] = await pool.query(SELECT_ALL);
  res.json(rows);
}));

app.listen(3001, () => console.log("API en http://localhost:3001"));
