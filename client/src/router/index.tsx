import { createBrowserRouter } from "react-router-dom";
import  {DashboardPage}  from "@/pages/DashboardPage"
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
const router = createBrowserRouter([
            {
                path: "/",
                element: <DashboardPage/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/register",
                element: <RegisterPage/>
            },
            

]);

export default router