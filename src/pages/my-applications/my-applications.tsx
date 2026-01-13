import { useGetUser } from "@/hooks/use-get-user";
import { CompanyApplicants, WorkerApplicants } from "./components";

export const MyApplicantsPage = () => {
  const user = useGetUser();

  if (user?.role === "company") {
    return <CompanyApplicants />;
  }

  if (user?.role === "worker") {
    return <WorkerApplicants />;
  }

  return null;
};
