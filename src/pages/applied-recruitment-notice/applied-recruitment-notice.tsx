import { useGetUser } from "@/hooks/use-get-user";
import { Agency } from "./components";

export const AppliedRecruitmentNoticePage = () => {
  const user = useGetUser();

  if (user?.role === "agency") {
    return <Agency />;
  }

  return null;
};
