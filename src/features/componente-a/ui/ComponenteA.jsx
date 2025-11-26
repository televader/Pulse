import { useDateRange } from "../../date-range/context/useDateRange";
import { useApiGithubPrs } from "../api/useApiGithubPrs";

export default function ComponenteA() {
  const { dateRange } = useDateRange();
  const { from, to } = dateRange;

  const { data, isLoading, isError, error, refetch } = useApiGithubPrs({
    from,
    to,
    status: "pending",
  });

  if (!from || !to) return <p>Seleccioná un rango de fechas.</p>;
  if (isLoading) return <p>Cargando Pull Requests de GitHub...</p>;

  if (isError) {
    return (
      <div style={{ color: "red" }}>
        <p>Error al cargar PRs: {error.message}</p>
        <button onClick={() => refetch()}>Reintentar</button>
      </div>
    );
  }

  if (!data?.length) return <p>No hay PRs en este rango.</p>;

  return (
    <ul>
      {data.map((pr) => (
        <li key={pr.id} style={{ marginBottom: "1rem" }}>
          <strong>{pr.title}</strong> — {pr.author}
          <br />
          Estado: {pr.status}
          <br />
          Fecha: {pr.date.toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
