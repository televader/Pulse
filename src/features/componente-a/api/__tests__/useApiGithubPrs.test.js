import { renderHook, waitFor } from "@testing-library/react";
import { wrapperProviders } from "../../../../test-utils/renderWithProviders";
import { useApiGithubPrs } from "../useApiGithubPrs";
import * as fetcher from "../../api/fetchGithubPrs";

jest.mock("../../api/fetchGithubPrs");

test("loading → success", async () => {
  fetcher.fetchGithubPrs.mockResolvedValue([
    { id: 1, titulo: "Fix", autor: "Pedro", date: "2025-01-10", status: "pending" }
  ]);

  const { result } = renderHook(
    () => useApiGithubPrs({ from: "2025-01-01", to: "2025-02-01" }),
    { wrapper: wrapperProviders }
  );

  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data.length).toBe(1);
});
