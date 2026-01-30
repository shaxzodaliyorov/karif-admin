/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader } from "@/components/page-header";
import { RecruitmentForm } from "@/components/recruitment-form/recruitment-form";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useAddRecruitmentNoticeMutation } from "@/store/recruitment-notice/recruitment-notice.api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AddRecruitmentNoticePage = () => {
  const navigate = useNavigate();
  const [addRecruitmentNotice, { isLoading: isLoadingAdd }] =
    useAddRecruitmentNoticeMutation();
  const handleRequest = useHandleRequest();

  const onSubmit = async (formData: any) => {
    const dataToSend = {
      ...formData,
      foreignWorkerStartDate: formData.foreignWorkerStartDate
        ? dayjs(formData.foreignWorkerStartDate).toISOString()
        : "",
      foreignWorkerEndDate: formData.foreignWorkerEndDate
        ? dayjs(formData.foreignWorkerEndDate).toISOString()
        : "",
      onSiteDeploymentStartDate: formData.onSiteDeploymentStartDate
        ? dayjs(formData.onSiteDeploymentStartDate).toISOString()
        : "",
      onSiteDeploymentEndDate: formData.onSiteDeploymentEndDate
        ? dayjs(formData.onSiteDeploymentEndDate).toISOString()
        : "",
      documents: formData?.documents?.map((doc: any) => ({
        ...doc,
        ratio: doc.ratio.toString(),
        numberOfApplicants: doc.numberOfApplicants.toString(),
      })),
      mark1: formData.mark1,
      mark2: formData.mark2,
      mark1StartDate: formData.mark1StartDate
        ? dayjs(formData.mark1StartDate).toISOString()
        : "",
      mark1EndDate: formData.mark1EndDate
        ? dayjs(formData.mark1EndDate).toISOString()
        : "",
      mark2StartDate: formData.mark2StartDate
        ? dayjs(formData.mark2StartDate).toISOString()
        : "",
      mark2EndDate: formData.mark2EndDate
        ? dayjs(formData.mark2EndDate).toISOString()
        : "",
    };

    await handleRequest({
      request: () => addRecruitmentNotice(dataToSend as any),
      onSuccess: () => {
        toast.success("Successfully added");
        navigate("/recruitment-notice");
      },
    });
  };

  return (
    <div>
      <PageHeader
        title="Add Recruitment Notice"
        showBackButton
        onBack={() => navigate("/recruitment-notice")}
      />
      <RecruitmentForm
        onSubmit={onSubmit}
        isLoading={isLoadingAdd}
        isEdit={false}
      />
    </div>
  );
};
