import TaskCard from "./TaskCard";

export default function Column({ title, count, tasks }) {
  return (
    <section className="column">
      <h2>{title} <span className="count">{count}</span></h2>
      {tasks.length === 0 && <p>Sin tareas</p>}
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </section>
  );
}
