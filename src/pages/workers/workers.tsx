import { useGetUser } from "@/hooks/use-get-user";
import { AgencyWorkers } from "./components";

export const WorkersPage = () => {
  const user = useGetUser();

  if (user?.role === "agency") {
    return <AgencyWorkers />;
  }

  return null;
};
