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
      console.warn("⚠️ Retry handler:", failureCount, error);

      if (error?.status === 403) {
        console.warn("⛔ No se reintenta porque es 403 (Forbidden)");
        return false;
      }

      // Para 500 reintentás 2 veces
      return failureCount < 2;
    }  });
}