import { useDateRange } from "../../date-range/context/useDateRange";
import { useApiBuilds } from "../api/useApiBuilds";

export default function ComponenteB() {
  const { dateRange } = useDateRange();
  const { from, to } = dateRange;

  const { data, isLoading, isError, error, refetch } = useApiBuilds({
    from,
    to,
  });

  if (!from || !to) return <p>Seleccioná un rango de fechas.</p>;
  if (isLoading) return <p>Cargando builds fallidos...</p>;

  //  Manejo diferenciado de errores
  if (isError) {
    // Error de permisos (403)
    if (error?.status === 403) {
      return (
        <div style={{ color: "red" }}>
          <p>No tenés permisos para ver los builds fallidos.</p>
        </div>
      );
    }

    // Error de servidor (500)
    if (error?.status === 500) {
      return (
        <div style={{ color: "red" }}>
          <p>Hubo un problema en el servidor.</p>
          <button onClick={() => refetch()}>Reintentar</button>
        </div>
      );
    }

    // error desconocido
    return (
      <div style={{ color: "red" }}>
        <p>Error inesperado: {error.message}</p>
        <button onClick={() => refetch()}>Reintentar</button>
      </div>
    );
  }

  // 🟦 Empty state
  if (!data?.length) return <p>No hay builds fallidos en este rango.</p>;

  return (
    <ul>
      {data.map((build) => (
        <li key={build.id} style={{ marginBottom: "1rem" }}>
          <strong>Branch:</strong> {build.branch}
          <br />
          <strong>Status:</strong> {build.status}
          <br />
          <strong>Fecha:</strong> {build.date.toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
