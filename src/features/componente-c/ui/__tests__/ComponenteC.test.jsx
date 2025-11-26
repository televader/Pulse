import { render, screen } from "@testing-library/react";
import { wrapperProviders } from "../../../../test-utils/renderWithProviders";
import ComponenteC from "../ComponenteC";
import * as api from "../../api/useApiCombinedTasks";

jest.mock("../../api/useApiCombinedTasks");

test("muestra tareas combinadas", () => {
  api.useApiCombinedTasks.mockReturnValue({
    isLoading: false,
    isError: false,
    data: {
      tasks: [
        { id: 1, title: "Tarea A", source: "jira", date: "2025-01-01" },
        { id: 2, title: "Tarea B", source: "github", date: "2025-01-02" }
      ]
    }
  });

  render(<ComponenteC />, { wrapper: wrapperProviders });

  expect(screen.getByText("Tarea A")).toBeInTheDocument();
  expect(screen.getByText("Tarea B")).toBeInTheDocument();
});
