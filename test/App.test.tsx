// Libraries
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

// Components
import App from "../src/App";

describe("App", () => {
  test("should display the listing component and the form on app rendering", async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByText(/List of photos/i)).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  test("should land on a custom 404 page when route not found", () => {
    const badRoute = "/bad/route";

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument();
  });
});
