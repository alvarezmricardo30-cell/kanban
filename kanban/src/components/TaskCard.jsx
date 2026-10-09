import { COLUMNS } from "../columns";
import { useBoard } from "../context/BoardContext";

export default function TaskCard({ task }) {
  const { moveTask, removeTask } = useBoard();

  if (!task) return null;

  return (
    <article className={`card prio-${task.priority}`}>
      <strong>{task.title}</strong>
      <small>Prioridad: {task.priority}</small>
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
