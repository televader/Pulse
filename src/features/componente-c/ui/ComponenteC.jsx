import { useApiCombinedTasks } from "../api/useApiCombinedTasks";

export default function ComponenteC() {
  const { data, isLoading, isError, error, refetch } = useApiCombinedTasks({
    status: "pending"
  });

  if (isLoading) return <p>Cargando tareas combinadas...</p>;

  if (isError) {
    return (
      <div style={{ color: "red" }}>
        <p>Error al cargar tareas combinadas: {error.message}</p>
        <button onClick={() => refetch()}>Reintentar</button>
      </div>
    );
  }

  if (!data?.length) return <p>No hay tareas combinadas.</p>;

  return (
    <ul>
      {data.map(item => (
        <li key={item.id} style={{ marginBottom: "1rem" }}>
          <strong>{item.tarea}</strong> — {item.responsable}
          <br />
          Estado: {item.status}
          <br />
          Fecha: {item.date.toLocaleDateString()}
          <br />
          plataforma: {item.plataforma}
        </li>
      ))}
    </ul>
  );
}