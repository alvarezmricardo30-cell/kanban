import { useEffect, useMemo } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./columns";
import { useBoard } from "./context/BoardContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const { tasks, loading, error, resetBoard, clearDone } = useBoard();
  const [query, setQuery] = useLocalStorage("kanban-search-query", "");

  useEffect(() => {
    const pending = tasks.filter((t) => t.status !== "done").length;
    document.title = `Kanban (${pending} pendientes)`;
  }, [tasks]);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      ),
    [tasks, query]
  );

  function handleReset() {
    resetBoard();
    setQuery("");
  }

  return (
    <main>
      <h1>Kanban</h1>
      <TaskForm />
      <input
        className="search"
        placeholder="Buscar tareas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="toolbar">
        <button
          className="reset-btn"
          onClick={handleReset}
          disabled={loading}
        >
          Restablecer tablero
        </button>
        <button
          className="clear-btn"
          onClick={clearDone}
          disabled={loading}
        >
          Vaciar columna Hecho
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading">Cargando tareas...</p>
      ) : (
        <div className="board">
          {COLUMNS.map((c) => (
            <Column
              key={c.id}
              title={c.title}
              count={tasks.filter((t) => t.status === c.id).length}
              tasks={filteredTasks.filter((t) => t.status === c.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
