import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { COLUMNS } from "../columns";
import { useBoard } from "../context/BoardContext";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, loading, error, moveTask, removeTask, editTask } = useBoard();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("media");

  if (loading) return <p>Cargando...</p>;

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <>
        <p>No existe una tarea con id {id}.</p>
        <Link to="/">Volver al tablero</Link>
      </>
    );
  }

  function startEdit() {
    setTitle(task.title);
    setPriority(task.priority);
    setEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (title.trim() === "") return;
    const ok = await editTask(task.id, title.trim(), priority);
    if (ok) setEditing(false);
  }

  async function handleRemove() {
    const ok = await removeTask(task.id);
    if (ok) navigate("/");
  }

  return (
    <article className="detail">
      <Link to="/">← Volver al tablero</Link>
      {error && <p className="error">{error}</p>}

      {editing ? (
        <form className="task-form" onSubmit={handleSave}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <button>Guardar</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <h2>{task.title}</h2>
          <p>Prioridad: {task.priority}</p>
          {task.project && <p>Proyecto: {task.project}</p>}
          {task.created_at && <p>Creada: {task.created_at}</p>}
          <button onClick={startEdit}>Editar</button>
        </>
      )}

      <label>
        Estado:{" "}
        <select
          value={task.status}
          onChange={(e) => moveTask(task.id, e.target.value)}
        >
          {COLUMNS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </label>
      <button className="danger" onClick={handleRemove}>
        Eliminar tarea
      </button>
    </article>
  );
}
