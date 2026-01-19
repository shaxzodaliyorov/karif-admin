/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useRecruitmentNoticeApplyWorkersMutation } from "@/store/RecruitmentNotice/RecruitmentNotice.api";
import { Modal } from "@/components/common/modal";
import { useGetAllWorkersQuery } from "@/store/worker/worker.api";
import { MultiSelect } from "@/components/common/multiple-select";

type ApplyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recruitmentNoticeId: any;
};

export const ApplyModal = ({
  isOpen,
  onClose,
  recruitmentNoticeId,
}: ApplyModalProps) => {
  const { data: workersResponse } = useGetAllWorkersQuery({
    page: 1,
    per_page: 999,
  });
  const [selectedWorkers, setSelectedWorkers] = React.useState<string[]>([]);

  const [applyWorkers, { isLoading }] =
    useRecruitmentNoticeApplyWorkersMutation();
  const handleRequest = useHandleRequest();

  const handleSubmit = async () => {
    try {
      await handleRequest({
        request: async () => {
          const workerIds = selectedWorkers.map((id) => Number(id));
          const response = await applyWorkers({
            id: recruitmentNoticeId,
            workerIds,
          });
          return response;
        },
        onSuccess: () => {
          toast.success("Workers applied successfully");
          onClose();
          setSelectedWorkers([]);
        },
      });
    } catch (error) {
      console.error("Failed to apply:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Apply for Position ">
      <div>
        <p>Select workers</p>
        <MultiSelect
          options={
            workersResponse?.data?.map((item) => ({
              value: item?.id?.toString() ?? "",
              label: item?.name ?? "",
            })) || []
          }
          selected={selectedWorkers}
          onChange={setSelectedWorkers}
        />
        <div className="mt-4">
          <Button
            disabled={!selectedWorkers.length}
            onClick={handleSubmit}
            className="flex items-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Submit Application
          </Button>
        </div>
      </div>
    </Modal>
  );
};
