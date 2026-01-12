import { useGetUser } from "@/hooks/use-get-user";
import { CompanyEmployment } from "./components";

export const EmploymentPage = () => {
  const user = useGetUser();
  if (user?.role === "company") {
    return <CompanyEmployment />;
  }
  return null;
};
