import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "@/pages/DashboardPage"
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { HistoriesPage } from "@/pages/HistoriesPage";
import { AddResultPage } from "@/pages/AddResultPage";
import { BaseLayout } from "@/components/BaseLayout";
const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children:
            [
                {
                    path: "/",
                    element: <DashboardPage />
                },
                {
                    path: "/histories",
                    element: <HistoriesPage />
                },
                {
                    path: "/add-result",
                    element: <AddResultPage />
                }
            ],
        
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },


]);

export default router