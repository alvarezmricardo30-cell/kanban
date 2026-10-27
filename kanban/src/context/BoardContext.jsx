import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import * as api from "../api";
import { reducer } from "./boardReducer";

const BoardContext = createContext(null);

export function BoardProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getTasks()
      .then((data) => dispatch({ type: "set", tasks: data }))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function addTask(title, priority) {
    try {
      setError(null);
      const task = await api.createTask(title, priority);
      dispatch({ type: "add", task });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function moveTask(id, status) {
    try {
      setError(null);
      await api.updateStatus(id, status);
      dispatch({ type: "move", id, status });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function renameTask(id, title) {
    try {
      setError(null);
      const updated = await api.updateTitle(id, title);
      dispatch({ type: "rename", id, title: updated.title });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function editTask(id, title, priority) {
    try {
      setError(null);
      await api.updateTask(id, title, priority);
      dispatch({ type: "edit", id, title, priority });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function removeTask(id) {
    try {
      setError(null);
      await api.deleteTask(id);
      dispatch({ type: "remove", id });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function clearDone() {
    try {
      setError(null);
      await api.deleteDone();
      dispatch({ type: "removeDone" });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function resetBoard() {
    try {
      setError(null);
      const data = await api.resetTasks();
      dispatch({ type: "set", tasks: data });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  return (
    <BoardContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        moveTask,
        renameTask,
        editTask,
        removeTask,
        clearDone,
        resetBoard,
      }}
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
