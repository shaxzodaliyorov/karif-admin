import { DashboardHeader, DashboardSidebar } from "@/components";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardSidebar />
      <main className="pr-[20px] pb-[20px] pl-[320px] pt-[80px]">
        <Outlet />
      </main>
    </>
  );
};
