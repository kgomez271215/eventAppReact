import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Onboarding from "../views/Onboarding.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { OnboardingContext } from "../context/OnboardingContext.jsx";
import { createContext, useReducer } from "react";

// Crear un contexto simulado
const mockDispatch = jest.fn();
const mockOnFinish = jest.fn();

const mockContextValue = {
  dispatch: mockDispatch,
};

const TestWrapper = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "COMPLETE_ONBOARDING":
        return { ...state, onboardingCompleted: true };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { onboardingCompleted: false });

  return (
    <OnboardingContext.Provider value={{ dispatch }}>
      <Router>{children}</Router>
    </OnboardingContext.Provider>
  );
};

describe("Pantalla Onboarding", () => {
  it("Renderizacion de texto en primer paso", () => {
    render(
      <TestWrapper>
        <Onboarding onFinish={mockOnFinish} />
      </TestWrapper>
    );

    const stepText = screen.getByText(
      "Bienvenido a nuestra aplicación de gestión de eventos y recordatorios"
    );
    expect(stepText).toBeInTheDocument();
  });

  it("Renderizar texto al dar click en siguiente", () => {
    render(
      <TestWrapper>
        <Onboarding onFinish={mockOnFinish} />
      </TestWrapper>
    );

    const nextButton = screen.getByText("Siguiente");
    fireEvent.click(nextButton);

    const secondStepText = screen.getByText(
      "Crea, edita, elimina y organiza tus eventos fácilmente"
    );
    expect(secondStepText).toBeInTheDocument();
  });

  it('Se prueba boton "Anterior"', () => {
    render(
      <TestWrapper>
        <Onboarding onFinish={mockOnFinish} />
      </TestWrapper>
    );

    const nextButton = screen.getByText("Siguiente");
    fireEvent.click(nextButton); // Avanzamos al segundo paso

    const prevButton = screen.getByText("Anterior");
    fireEvent.click(prevButton); // Volvemos al primer paso

    const firstStepText = screen.getByText(
      "Bienvenido a nuestra aplicación de gestión de eventos y recordatorios"
    );
    expect(firstStepText).toBeInTheDocument();
  });

  it('Se prueba boton "Empezar" para ver onboarding completado', async () => {
    render(
      <TestWrapper>
        <Onboarding onFinish={mockOnFinish} />
      </TestWrapper>
    );

    // Avanzamos hasta el último paso
    const nextButton = screen.getByText("Siguiente");
    fireEvent.click(nextButton); // Primer paso
    fireEvent.click(nextButton); // Segundo paso

    const startButton = screen.getByText("¡Empezar!");
    fireEvent.click(startButton);

    // Verificamos que se haya llamado al dispatch con la acción correcta
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "COMPLETE_ONBOARDING",
      });
    });

    // Verificamos que la navegación ocurra (en un entorno de pruebas, no navega realmente)
    expect(mockOnFinish).toHaveBeenCalled();
  });
});
