import { render, screen } from "@testing-library/react";
import ComponenteB from "../ComponenteB";
import { wrapperProviders } from "../../../../test-utils/renderWithProviders";
import { MockDateRangeProvider } from "../../../../test-utils/mockDateRangeProvider";
import * as api from "../../api/useApiBuilds";

jest.mock("../../api/useApiBuilds");

function renderWithAll(ui) {
  return render(
    <MockDateRangeProvider>{ui}</MockDateRangeProvider>,
    { wrapper: wrapperProviders }
  );
}

test("muestra listado de builds con branch, status y fecha", () => {
  api.useApiBuilds.mockReturnValue({
    isLoading: false,
    isError: false,
    data: [
      {
        id: 10,
        branch: "main",
        title: "Pipeline error",
        status: "failed",
        date: new Date(2024, 11, 30)
      }
    ]
  });

  renderWithAll(<ComponenteB />);

  expect(screen.getByText("Branch:")).toBeInTheDocument();
  expect(screen.getByText((t) => t.includes("main"))).toBeInTheDocument();
  expect(screen.getByText("Status:")).toBeInTheDocument();
  expect(screen.getByText((t) => t.includes("failed"))).toBeInTheDocument();

  expect(screen.getByText((t) => t.includes("30/12/2024"))).toBeInTheDocument();
});
