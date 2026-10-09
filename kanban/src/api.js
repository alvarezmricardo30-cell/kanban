const API = "http://localhost:3001/api/tasks";

async function request(url, options) {
  let res;
  try {
    res = await fetch(url, options);
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Error en la solicitud");
  }
  return res.status === 204 ? null : res.json();
}

const JSON_HEADERS = { "Content-Type": "application/json" };

export const getTasks = () => request(API);

export const createTask = (title, priority) =>
  request(API, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ title, priority }),
  });

export const updateStatus = (id, status) =>
  request(`${API}/${id}`, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify({ status }),
  });

export const updateTitle = (id, title) =>
  request(`${API}/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify({ title }),
  });

export const deleteTask = (id) => request(`${API}/${id}`, { method: "DELETE" });

export const deleteDone = () =>
  request(API, { method: "DELETE" });

export const resetTasks = () =>
  request(`${API}/reset`, { method: "POST" });
