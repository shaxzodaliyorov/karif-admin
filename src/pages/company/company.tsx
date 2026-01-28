import { PageHeader } from "@/components/page-header";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyMyInformation } from "../my-information/components";
import { useGetCompanyByIdQuery } from "@/store/company/company.api";
import { Loader2 } from "lucide-react";

export const CompanyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: { data: companyInfo } = {}, isLoading } =
    useGetCompanyByIdQuery(String(id));

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
        title={"Company information"}
        showBackButton
        onBack={() => navigate(-1)}
      />
      <CompanyMyInformation companyInfo={companyInfo} />
    </section>
  );
};
