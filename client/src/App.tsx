import {
  RouterProvider,
} from "react-router-dom";

import router from "./router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

function App() {
  return (
  
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
      
    

  )
}

export default App;
