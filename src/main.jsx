import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { OnboardingProvider } from "./context/OnboardingContext.jsx";
import AppRoutes from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <OnboardingProvider>
      <AppRoutes />
    </OnboardingProvider>
  </ChakraProvider>
);
