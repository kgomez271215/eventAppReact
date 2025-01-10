import { render, screen } from "@testing-library/react";
import Hello from "../views/Hello";

describe("Prueba Hello", () => {
  it("should render a greeting message with the name", () => {
    render(<Hello name="Kevin" />);

    const greeting = screen.getByText("Hola, Kevin!");
    expect(greeting).toBeInTheDocument();
  });
});
