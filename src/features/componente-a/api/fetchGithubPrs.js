import { apiClient } from "../../../api/apiClient";



export async function fetchGithubPrs({ from, to, status }) {
  const queryParts = [];

  if (status) queryParts.push(`status=${status}`);
  if (from && to) queryParts.push(`from=${from}&to=${to}`);

  const query = queryParts.length ? `?${queryParts.join("&")}` : "";

  return apiClient(`/github/prs${query}`);
}