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
    throw new Error(`API error ${res.status} at ${url}`);
  }

  return res.json();
}
