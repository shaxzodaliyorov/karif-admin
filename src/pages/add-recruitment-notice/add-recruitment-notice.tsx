import { RecruitmentForm } from "@/components/add-recruitment-form";
import { PageHeader } from "@/components/page-header";
import { useNavigate } from "react-router-dom";

export const AddRecruitmentNoticePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="Add Recruitment Notice"
        showBackButton
        onBack={() => navigate("/recruitment-notice")}
      />
      <RecruitmentForm
        onReset={() => {}}
        onSubmit={() => {}}
        isLoading={false}
        isEdit={false}
      />
    </div>
  );
};
