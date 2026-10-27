export function reducer(state, action) {
  switch (action.type) {
    case "set":
      return action.tasks;
    case "add":
      return [...state, action.task];
    case "move":
      return state.map((t) =>
        t.id === action.id ? { ...t, status: action.status } : t
      );
    case "edit":
      return state.map((t) =>
        t.id === action.id
          ? { ...t, title: action.title, priority: action.priority }
          : t
      );
    case "rename":
      return state.map((t) =>
        t.id === action.id ? { ...t, title: action.title } : t
      );
    case "remove":
      return state.filter((t) => t.id !== action.id);
    case "removeDone":
      return state.filter((t) => t.status !== "done");
    default:
      return state;
  }
}
