import { useEffect, useRef, useState } from "react";
import { COLUMNS } from "../columns";
import { useBoard } from "../context/BoardContext";

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function TaskCard({ task }) {
  const { moveTask, removeTask, renameTask } = useBoard();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  if (!task) return null;

  async function save() {
    const next = title.trim();
    setEditing(false);
    if (next && next !== task.title) {
      await renameTask(task.id, next);
    }
  }

  return (
    <article className={`card prio-${task.priority}`}>
      {editing ? (
        <input
          ref={inputRef}
          className="card-edit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setEditing(false);
          }}
          onBlur={save}
        />
      ) : (
        <strong
          className="card-title"
          title="Doble clic para editar"
          onDoubleClick={() => {
            setTitle(task.title);
            setEditing(true);
          }}
        >
          {task.title}
        </strong>
      )}
      <small>Prioridad: {task.priority}</small>
      {task.project && <small>Proyecto: {task.project}</small>}
      {task.created_at && (
        <time className="card-date">{formatDate(task.created_at)}</time>
      )}
      <div className="card-actions">
        <select
          value={task.status}
          onChange={(e) => moveTask(task.id, e.target.value)}
        >
          {COLUMNS.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <button onClick={() => removeTask(task.id)}>Eliminar</button>
      </div>
    </article>
  );
}