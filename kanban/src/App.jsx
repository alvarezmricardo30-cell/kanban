import { useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import Stats from "./pages/Stats";
import TaskDetail from "./pages/TaskDetail";
import NotFound from "./pages/NotFound";
import { useBoard } from "./context/BoardContext";

export default function App() {
  const { tasks } = useBoard();

  useEffect(() => {
    const pending = tasks.filter((t) => t.status !== "done").length;
    document.title = `Kanban (${pending} pendientes)`;
  }, [tasks]);

  return (
    <>
      <header className="topbar">
        <h1>Kanban</h1>
        <nav>
          <NavLink to="/" end>
            Tablero
          </NavLink>
          <NavLink to="/stats">Estadísticas</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/tarea/:id" element={<TaskDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
