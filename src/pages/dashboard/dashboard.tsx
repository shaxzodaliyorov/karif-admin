import { useGetUser } from "@/hooks/use-get-user";
import { AdminDashboard } from "./components";

export const DashboardPage = () => {
  const user = useGetUser();
  if (user?.role === "admin") {
    return <AdminDashboard />;
  }
};
