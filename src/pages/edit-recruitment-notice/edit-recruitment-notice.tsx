import { PageHeader } from "@/components/page-header";
import { RecruitmentForm } from "@/components/recruitment-form/recruitment-form";
import { useNavigate } from "react-router-dom";

export const EditRecruitmentNoticePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="Edit Recruitment Notice"
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
