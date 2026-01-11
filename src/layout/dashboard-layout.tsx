import { DashboardHeader, DashboardSidebar } from "@/components";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardSidebar />
      <main className="pr-[50px] pl-[350px]  pt-[100px]">
        <Outlet />
      </main>
    </>
  );
};
