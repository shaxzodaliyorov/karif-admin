import { AuthLayout } from "@/layout";
import { DashboardLayout } from "@/layout/dashboard-layout";
import { PublicLayout } from "@/layout/public-layout";
import { DashboardPage, HomePage, LoginPage } from "@/pages";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";

export const AppRoutes = () => {
  const location = useLocation();
  return (
    <RouterRoutes location={location} key={location.pathname}>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </RouterRoutes>
  );
};
