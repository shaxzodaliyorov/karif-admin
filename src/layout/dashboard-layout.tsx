import { DashboardHeader, DashboardSidebar } from "@/components";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardSidebar />
      <main className="pl-[350px] pt-[100px]">
        <Outlet />
      </main>
    </>
  );
};
