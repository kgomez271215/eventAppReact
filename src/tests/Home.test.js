import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../views/Home";
import { act } from "react-dom/test-utils";

describe("Home Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the main layout correctly", () => {
    render(<Home />);

    expect(screen.getByText(/Eventos y Recordatorios/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nuevo/i })).toBeInTheDocument();
    expect(screen.getByText(/Mis Eventos/i)).toBeInTheDocument();
    expect(screen.getByText(/Archivados/i)).toBeInTheDocument();
    expect(screen.getByText(/Eliminados/i)).toBeInTheDocument();
  });

  it("opens the modal when 'Nuevo' is clicked", () => {
    render(<Home />);
    const newButton = screen.getByRole("button", { name: /nuevo/i });

    fireEvent.click(newButton);
    expect(screen.getByText(/Crear Nuevo Evento/i)).toBeInTheDocument();
  });

  it("renders badges for categories", () => {
    render(<Home />);

    const categories = [
      "Trabajo",
      "Personal",
      "Reuniones",
      "Fiesta",
      "Capacitaciones",
      "Todos",
    ];
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("saves a new event and displays it", async () => {
    render(<Home />);

    const newButton = screen.getByRole("button", { name: /nuevo/i });
    fireEvent.click(newButton);

    const titleInput = screen.getByPlaceholderText("Título");
    const descriptionInput = screen.getByPlaceholderText("Descripción");
    const dateInput = screen.getByLabelText(/fecha/i);
    const timeInput = screen.getByLabelText(/hora/i);

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: "Evento de Prueba" } });
      fireEvent.change(descriptionInput, {
        target: { value: "Descripción de prueba" },
      });
      fireEvent.change(dateInput, { target: { value: "2025-01-01" } });
      fireEvent.change(timeInput, { target: { value: "12:00" } });
      fireEvent.click(screen.getByRole("button", { name: /guardar/i }));
    });

    expect(localStorage.getItem("events")).toContain("Evento de Prueba");
    expect(screen.getByText("Evento de Prueba")).toBeInTheDocument();
  });
});
