import { useQuery } from "@tanstack/react-query";
import { fetchOthersBuilds } from "../../../api/fetchOthersBuilds";
import { mapOtherBuilds } from "../../../domain/other/mapOtherBuilds";

export function useApiBuilds({ from, to }) {
  return useQuery({
    queryKey: ["builds-fallidos", { from, to }],
    queryFn: async () => {
      const raw = await fetchOthersBuilds({ from, to });
      return mapOtherBuilds(raw);
    },
    enabled: Boolean(from && to),
 retry: (failureCount, error) => {

      if (error?.status === 403) {
        return false;
      }

      return failureCount < 2;
    }  });
}