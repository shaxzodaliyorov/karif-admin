import { useGetUser } from "@/hooks/use-get-user";
import { CompanyMyInformation, WorkerMyInformation } from "./components";
import { KoreanAgency } from "./components/korean-agency";

export const MyInformationPage = () => {
  const user = useGetUser();

  if (user?.role === "company") {
    return <CompanyMyInformation />;
  }

  if (user?.role === "worker") {
    return <WorkerMyInformation />;
  }

  if (user?.role === "korean_agency" || user?.role === "agency") {
    return <KoreanAgency />;
  }

  return null;
};
