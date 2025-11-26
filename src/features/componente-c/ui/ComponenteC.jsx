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

  if (!data?.tasks?.length) return <p>No hay tareas combinadas.</p>;

  const { tasks, errors } = data;

  return (
    <div>
      {errors?.jiraFailed && (
        <p style={{ color: "orange" }}>⚠ No se pudieron obtener datos de JIRA</p>
      )}

      {errors?.otherFailed && (
        <p style={{ color: "orange" }}>⚠ No se pudieron obtener datos de la otra API</p>
      )}

      <ul>
        {tasks.map(item => (
          <li key={item.id} style={{ marginBottom: "1rem" }}>
            <strong>{item.tarea || item.title}</strong> — {item.responsable || item.assignee}
            <br />
            Estado: {item.status}
            <br />
            Fecha: {new Date(item.date).toLocaleDateString()}
            <br />
            Plataforma: {item.plataforma}
          </li>
        ))}
      </ul>
    </div>
  );
}