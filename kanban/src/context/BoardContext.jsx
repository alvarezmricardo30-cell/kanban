import { createContext, useContext, useEffect, useReducer } from "react";

const BoardContext = createContext(null);
const KEY = "kanban-tasks";

const initialTasks = [
  { id: 1, title: "Diseñar la base de datos", status: "done", priority: "alta" },
  { id: 2, title: "Crear el login", status: "doing", priority: "media" },
  { id: 3, title: "Escribir pruebas", status: "todo", priority: "baja" },
  { id: 4, title: "Preparar la demo", status: "todo", priority: "alta" },
];

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.task];
    case "move":
      return state.map((t) =>
        t.id === action.id ? { ...t, status: action.status } : t
      );
    case "remove":
      return state.filter((t) => t.id !== action.id);
    case "removeDone":
      return state.filter((t) => t.status !== "done");
    case "reset":
      return initialTasks;
    default:
      return state;
  }
}

function init() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : initialTasks;
  } catch {
    return initialTasks;
  }
}

export function BoardProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, null, init);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch {
      // localStorage no disponible
    }
  }, [tasks]);

  function addTask(title, priority) {
    const task = { id: Date.now(), title, status: "todo", priority };
    dispatch({ type: "add", task });
    return true;
  }

  function moveTask(id, status) {
    dispatch({ type: "move", id, status });
  }

  function removeTask(id) {
    dispatch({ type: "remove", id });
  }

  function clearDone() {
    dispatch({ type: "removeDone" });
  }

  function resetBoard() {
    dispatch({ type: "reset" });
  }

  return (
    <BoardContext.Provider
      value={{ tasks, addTask, moveTask, removeTask, clearDone, resetBoard }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard debe usarse dentro de BoardProvider");
  return ctx;
}