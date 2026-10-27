import { COLUMNS } from "../columns";
import { useBoard } from "../context/BoardContext";

const PRIORITIES = ["alta", "media", "baja"];

export default function Stats() {
  const { tasks, loading } = useBoard();

  if (loading) return <p>Cargando...</p>;

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section>
      <h2>Estadísticas</h2>
      <p>
        Total: {total} · Completadas: {done} ({pct}%)
      </p>
      <div className="bar">
        <div style={{ width: `${pct}%` }} />
      </div>

      <h3>Por columna</h3>
      <ul>
        {COLUMNS.map((c) => (
          <li key={c.id}>
            {c.title}: {tasks.filter((t) => t.status === c.id).length}
          </li>
        ))}
      </ul>

      <h3>Por prioridad</h3>
      <ul>
        {PRIORITIES.map((p) => (
          <li key={p}>
            {p}: {tasks.filter((t) => t.priority === p).length}
          </li>
        ))}
      </ul>
    </section>
  );
}
