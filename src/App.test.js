import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Welcome to the Home Page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the Home Page/i);
  expect(linkElement).toBeInTheDocument();
});
