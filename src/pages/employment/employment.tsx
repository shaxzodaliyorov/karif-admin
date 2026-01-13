import { useGetUser } from "@/hooks/use-get-user";
import { CompanyEmployment } from "./components";

export const EmploymentPage = () => {
  const user = useGetUser();
  if (user?.role === "company" || user?.role === "worker") {
    return <CompanyEmployment />;
  }
  return null;
};
