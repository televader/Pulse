import { renderHook, waitFor } from "@testing-library/react";
import { wrapperProviders } from "../../../../test-utils/renderWithProviders";
import { useApiCombinedTasks } from "../useApiCombinedTasks";
import * as useCase from "../../domain/useCaseCombinedTasks";

jest.mock("../../domain/useCaseCombinedTasks");

test("retorna tareas combinadas", async () => {
  useCase.useCaseCombinedTasks.mockResolvedValue({
    tasks: [
      { id: 1, title: "Task A", status: "open", source: "jira", date: "2025-01-01" }
    ],
    errors: []
  });

  const { result } = renderHook(
    () => useApiCombinedTasks({ status: "open" }),
    { wrapper: wrapperProviders }
  );

  await waitFor(() => expect(result.current.isLoading).toBe(false));

  expect(result.current.data.tasks.length).toBe(1);
});
