import { renderHook, waitFor } from "@testing-library/react";
import { wrapperProviders } from "../../../../test-utils/renderWithProviders";
import { useApiBuilds } from "../useApiBuilds";
import * as fetcher from "../../api/fetchOthersBuilds";

jest.mock("../../api/fetchOthersBuilds");

test("retorna builds", async () => {
  fetcher.fetchOthersBuilds.mockResolvedValue([
    { id: 10, title: "Fallo", status: "failed", date: "2025-01-01" }
  ]);

  const { result } = renderHook(
    () => useApiBuilds({ from: "2025-01-01", to: "2025-02-01" }),
    { wrapper: wrapperProviders }
  );

  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data.length).toBe(1);
});
