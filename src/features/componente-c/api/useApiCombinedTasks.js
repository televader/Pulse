import { useQuery } from "@tanstack/react-query";
import { useCaseCombinedTasks } from "../domain/useCaseCombinedTasks";

export function useApiCombinedTasks({ status = "pending" }) {
  return useQuery({
    queryKey: ["combined-tasks", { status }],
    queryFn: async () => {
      const { tasks, errors } = await useCaseCombinedTasks({ status });
      return { tasks, errors };
    },
    retry: 1
  });
}
