module.exports = {
  modulePaths: ["<rootDir>"],
  transformIgnorePatterns: [
    "node_modules/(?!(@chakra-ui|some-other-package)/)",
  ],
  // Otras configuraciones de Jest que puedas necesitar
  preset: "react-app", // si estás usando create-react-app
  testEnvironment: "jsdom", // para pruebas en un entorno de navegador
  // más configuraciones personalizadas aquí
};
