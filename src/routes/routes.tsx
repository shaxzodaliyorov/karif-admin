import { PublicLayout } from "@/layout/public-layout";
import { HomePage } from "@/pages";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";

export const AppRoutes = () => {
  const location = useLocation();
  return (
    <RouterRoutes location={location} key={location.pathname}>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </RouterRoutes>
  );
};
