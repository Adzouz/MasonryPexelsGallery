// app.test.js
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

test("should display the listing component on app rendering", async () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/List of images/i)).toBeInTheDocument();
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
