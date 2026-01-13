import { useGetUser } from "@/hooks/use-get-user";
import { CompanyMyInformation, WorkerMyInformation } from "./components";

export const MyInformationPage = () => {
  const user = useGetUser();

  if (user?.role === "company") {
    return <CompanyMyInformation />;
  }

  if (user?.role === "worker") {
    return <WorkerMyInformation />;
  }

  return null;
};
