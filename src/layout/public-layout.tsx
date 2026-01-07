import { PublicHeader } from "@/components";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};
