import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h2>404 — Página no encontrada</h2>
      <p>La dirección que escribiste no existe en la aplicación.</p>
      <Link to="/">Ir al tablero</Link>
    </>
  );
}
