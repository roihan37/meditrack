import { createBrowserRouter } from "react-router-dom";
// import { DashboardPage } from "@/pages/DashboardPage"
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { lazy, Suspense } from "react";
// import { HistoriesPage } from "@/pages/HistoriesPage";
// import { AddResultPage } from "@/pages/AddResultPage";
import { BaseLayout } from "@/layouts/BaseLayout";
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const HistoriesPage = lazy(() => import("@/pages/HistoriesPage"));
const AddResultPage = lazy(() => import("@/pages/AddResultPage"));
// const BaseLayout = lazy(() => import("@/components/BaseLayout"));

const router = createBrowserRouter([
  {
    element:
      <BaseLayout />,

    children:
      [
        {
          path: "/",
          element: (
            <Suspense fallback={<p>Loading dashboard...</p>}>
              <DashboardPage />
            </Suspense>
          ),
        },
        {
          path: "/histories",
          element: (
            <Suspense fallback={<p>Loading histories...</p>}>
              <HistoriesPage />
            </Suspense>
          ),
        },
        {
          path: "/add-result",
          element: (
            <Suspense fallback={<p>Loading form...</p>}>
              <AddResultPage />
            </Suspense>
          ),
        },
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