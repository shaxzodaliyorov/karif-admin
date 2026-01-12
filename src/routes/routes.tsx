import { AuthLayout } from "@/layout";
import { DashboardLayout } from "@/layout/dashboard-layout";
import { PublicLayout } from "@/layout/public-layout";
import {
  DashboardPage,
  HomePage,
  LoginPage,
  RegisterAgencyPage,
  RegisterCompany,
  SelectRolePage,
} from "@/pages";
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
        <Route path="/role" element={<SelectRolePage />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/register-agency" element={<RegisterAgencyPage />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </RouterRoutes>
  );
};
