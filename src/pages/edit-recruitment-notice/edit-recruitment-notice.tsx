/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader } from "@/components/page-header";
import { RecruitmentForm } from "@/components/recruitment-form/recruitment-form";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useUpdateRecruitmentNoticeMutation } from "@/store/recruitment-notice/recruitment-notice.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const EditRecruitmentNoticePage = () => {
  const navigate = useNavigate();
  const [updateRecruitmentNotice, { isLoading: isLoadingUpdate }] =
    useUpdateRecruitmentNoticeMutation();
  const handleRequest = useHandleRequest();
  const { id } = useParams();

  const onUpdate = async (formData: any) => {
    await handleRequest({
      request: () =>
        updateRecruitmentNotice({
          id: id!,
          body: formData,
        } as any),
      onSuccess: () => {
        toast.success("Successfully updated");
        navigate("/recruitment-notice");
      },
    });
  };

  return (
    <div>
      <PageHeader
        title="Edit Recruitment Notice"
        showBackButton
        onBack={() => navigate("/recruitment-notice")}
      />
      <RecruitmentForm
        onSubmit={onUpdate}
        isLoading={isLoadingUpdate}
        isEdit={true}
      />
    </div>
  );
};
