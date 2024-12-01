import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../MainPortal/Pages/Contact";

describe("Contact Component", () => {
  test("renders without crashing", () => {
    const { container } = render(<Contact />);
    console.log(container.innerHTML); // Debugging: Check rendered HTML

    // Find the divider by data-testid
    const divider = screen.getByTestId("divider"); // Or container.querySelector(".divider")
    expect(divider).toBeInTheDocument();
  });

  test("contains correct links", () => {
    render(<Contact />);
    const links = screen.getAllByText("Placeholder!");
    links.forEach((link) => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "#");
    });
  });
});
