// Libraries
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// Components
import NotFoundPage from "../../src/pages/NotFound";

test("should display the not found page correctly", () => {
  render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  );

  expect(screen.getByText("404 - Not Found")).toBeInTheDocument();
});
