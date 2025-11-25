import { apiClient } from "./apiClient";

export async function fetchOtherTasks({ status }) {
  const query = status ? `?status=${status}` : "";
  return apiClient(`/invented/tasks${query}`);
}