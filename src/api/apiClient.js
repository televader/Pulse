const BASE_URL = "http://localhost:4000/api";

export async function apiClient(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    let message = `Error ${res.status}`;

    switch (res.status) {
      case 403:
        message = "No tienes permisos para acceder a este recurso.";
        break;
      case 500:
        message = "Ocurrió un error en el servidor. Intenta nuevamente.";
        break;
      default:
        message = `Error inesperado (${res.status}).`;
    }

    const error = new Error(message);
    error.status = res.status; // 🔥 CLAVE para manejo en React Query
    error.url = url;

    throw error;
  }
  
 /*  if (!res.ok) {
    throw new Error(`API error ${res.status} at ${url}`);
  }
 */
  return res.json();
}
