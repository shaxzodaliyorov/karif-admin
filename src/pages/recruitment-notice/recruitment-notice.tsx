import { useGetUser } from "@/hooks/use-get-user";
import { Agency } from "./components";

export const RecruitmentNoticePage = () => {
  const user = useGetUser();

  if (user?.role === "agency") {
    return <Agency />;
  }
};
