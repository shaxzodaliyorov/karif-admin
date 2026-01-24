import { useGetUser } from "@/hooks/use-get-user";
import { Admin, Agency } from "./components";

export const RecruitmentNoticePage = () => {
  const user = useGetUser();

  if (user?.role === "agency") {
    return <Agency />;
  }

  if (user?.role === "admin") {
    return <Admin />;
  }
};
