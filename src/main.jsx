import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
}
const theme = extendTheme({ config })
createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
)
