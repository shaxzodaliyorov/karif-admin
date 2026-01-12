import { useGetUser } from "@/hooks/use-get-user";
import { CompanyApplicants } from "./components";

export const MyApplicantsPage = () => {
  const user = useGetUser();

  if (user?.role === "company") {
    return <CompanyApplicants />;
  }

  return null;
};
