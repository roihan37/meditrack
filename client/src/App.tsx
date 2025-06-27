import {
  RouterProvider,
} from "react-router-dom";

import router from "./router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "./context/theme-provider";

function App() {
  const { theme } = useTheme()
  return (
    <ThemeProvider defaultTheme="system"  storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors theme={theme as "light" | "dark" | "system"} />
      </AuthProvider>
    </ThemeProvider>
      
    

  )
}

export default App;
