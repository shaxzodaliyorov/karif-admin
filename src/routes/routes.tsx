import { HomePage } from "@/pages";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";

export const AppRoutes = () => {
  const location = useLocation();
  return (
    <RouterRoutes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<div>Login</div>} />
    </RouterRoutes>
  );
};
