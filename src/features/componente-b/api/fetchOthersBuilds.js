import { apiClient } from "../../../api/apiClient";

export async function fetchOthersBuilds({ from, to }) {
  let query = "";

  if (from && to) {
    query = `?from=${from}&to=${to}`;
  }

  return apiClient(`/invented/builds${query}`);
}