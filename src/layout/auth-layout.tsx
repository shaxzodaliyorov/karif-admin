import { AuthHeader } from "@/components";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div>
      <AuthHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
