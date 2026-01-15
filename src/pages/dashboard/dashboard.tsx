import { useGetUser } from "@/hooks/use-get-user";
import {
  AdminDashboard,
  CompanyDashboard,
  ForeignAgencyDashboard,
  KoreanAgencyDashboard,
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

  if (user?.role === "korean_agency") {
    return <KoreanAgencyDashboard />;
  }

  if (user?.role === "agency") {
    return <ForeignAgencyDashboard />;
  }

  return null;
};
