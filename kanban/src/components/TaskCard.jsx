import { Link } from "react-router-dom";
import { COLUMNS } from "../columns";
import { useBoard } from "../context/BoardContext";

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function TaskCard({ task }) {
  const { moveTask, removeTask } = useBoard();

  return (
    <article className={`card prio-${task.priority}`}>
      <strong>
        <Link to={`/tarea/${task.id}`}>{task.title}</Link>
      </strong>
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
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <button className="danger" onClick={() => removeTask(task.id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}
