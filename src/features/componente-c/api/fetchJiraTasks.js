import { apiClient } from "../../../api/apiClient";

export async function fetchJiraTasks({ status }) {
  const query = status ? `?status=${status}` : "";
  return apiClient(`/jira/tasks${query}`);
}