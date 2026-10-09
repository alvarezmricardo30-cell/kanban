import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function TaskForm() {
  const { addTask } = useBoard();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    if (title.trim() === "") {
      setError("Escribe un título para la tarea.");
      return;
    }
    if (priority === "") {
      setError("Seleccione una prioridad.");
      return;
    }

    setSaving(true);
    const ok = await addTask(title.trim(), priority);
    setSaving(false);

    if (!ok) {
      setError("No se pudo guardar la tarea.");
      return;
    }

    setError("");
    setTitle("");
    setPriority("");
  }

  return (
    <div className="task-form-wrap">
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="" disabled>Seleccione prioridad</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button disabled={saving}>{saving ? "Guardando..." : "Agregar"}</button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
