import { PageHeader } from "@/components/page-header";
import { useNavigate, useParams } from "react-router-dom";
import { KoreanAgency } from "../my-information/components";
import {
  useGetAgencyByIdQuery,
  useGetKoreanAgencyByIdQuery,
} from "@/store/agency/agency.api";
import { Loader2 } from "lucide-react";
import { useQuery } from "@/hooks/useQuery";

export const AgencyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const query = useQuery();
  const agencyType = query.get("agencyType");

  const { data: { data: agencyInfo } = {}, isLoading } =
    agencyType === "foreign"
      ? useGetAgencyByIdQuery(id ? Number(id) : 0)
      : useGetKoreanAgencyByIdQuery(id ? Number(id) : 0);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return (
    <section>
      <PageHeader
        title={`${agencyType === "foreign" ? "Foreign" : "Korean"} Agency `}
        showBackButton
        onBack={() => navigate(-1)}
      />
      <KoreanAgency agencyInfo={agencyInfo} hideActions />
    </section>
  );
};
