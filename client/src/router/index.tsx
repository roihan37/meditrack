import { createBrowserRouter } from "react-router-dom";
// import { DashboardPage } from "@/pages/DashboardPage"
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { lazy, Suspense } from "react";
import { BaseLayout } from "@/layouts/BaseLayout";
import FallbackLoader from "@/components/fallback-loader";
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const HistoriesPage = lazy(() => import("@/pages/HistoriesPage"));
const AddResultPage = lazy(() => import("@/pages/AddResultPage"));

const router = createBrowserRouter([
  {
    element:
      <BaseLayout />,

    children:
      [
        {
          path: "/",
          element: (
            <Suspense fallback={<FallbackLoader />}>
              <DashboardPage />
            </Suspense>
          ),
        },
        {
          path: "/histories",
          element: (
            <Suspense fallback={<FallbackLoader />}>
              <HistoriesPage />
            </Suspense>
          ),
        },
        {
          path: "/add-result",
          element: (
            <Suspense fallback={<FallbackLoader />}>
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