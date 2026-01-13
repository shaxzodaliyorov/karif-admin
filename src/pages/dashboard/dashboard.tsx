import { useGetUser } from "@/hooks/use-get-user";
import {
  AdminDashboard,
  CompanyDashboard,
  WorkerDashboard,
} from "./components";

export const DashboardPage = () => {
  const user = useGetUser();
  if (user?.role === "admin") {
    return <AdminDashboard />;
  }
  if (user?.role === "company") {
    return <CompanyDashboard />;
  }

  if (user?.role === "worker") {
    return <WorkerDashboard />;
  }

  return null;
};
