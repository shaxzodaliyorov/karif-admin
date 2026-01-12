import { useGetUser } from "@/hooks/use-get-user";
import { CompanyMyInformation } from "./components";

export const MyInformationPage = () => {
  const user = useGetUser();

  if (user?.role === "company") {
    return <CompanyMyInformation />;
  }

  return null;
};
