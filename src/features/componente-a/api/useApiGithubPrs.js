import { useQuery } from "@tanstack/react-query";
import { fetchGithubPrs } from "../../../api/fetchGithubPrs";
import { mapGithubPrs } from "../../../domain/github/mapGithubPrs";

export function useApiGithubPrs({ from, to, status = "pending" }) {
  return useQuery({
    queryKey: ["github-prs", { from, to, status }],
    queryFn: async () => {
      const raw = await fetchGithubPrs({ from, to, status });
      return mapGithubPrs(raw);
    },
    enabled: Boolean(from && to),
    retry: 1,         // solo reintenta una vez
    staleTime: 1000,   // evita refetch constante
  });
}
