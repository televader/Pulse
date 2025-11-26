import { render, screen } from "@testing-library/react";
import ComponenteA from "../ComponenteA";
import { wrapperProviders } from "../../../../test-utils/renderWithProviders";
import { MockDateRangeProvider } from "../../../../test-utils/mockDateRangeProvider";
import * as api from "../../api/useApiGithubPrs";   // 👈 IMPORTAR PRIMERO

jest.mock("../../api/useApiGithubPrs");             // 👈 MOCKEAR DESPUÉS

function renderWithAll(ui) {
  return render(
    <MockDateRangeProvider>{ui}</MockDateRangeProvider>,
    { wrapper: wrapperProviders }
  );
}

test("muestra cargando", () => {
  api.useApiGithubPrs.mockReturnValue({ isLoading: true });

  renderWithAll(<ComponenteA />);

  expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
});

test("muestra lista", () => {
  api.useApiGithubPrs.mockReturnValue({
    isLoading: false,
    isError: false,
    data: [
      {
        id: 1,
        title: "Fix login",
        author: "Pedro",
        date: new Date("2025-01-10")
      }
    ]
  });

  renderWithAll(<ComponenteA />);

  expect(screen.getByText("Fix login")).toBeInTheDocument();
});
