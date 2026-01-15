/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { CheckIcon, Loader2, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useRecruitmentNoticeApplyMutation } from "@/store/RecruitmentNotice/RecruitmentNotice.api";

type ApplyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: any;
};

export const ApplyModal = ({
  isOpen,
  onClose,
  selectedJob,
}: ApplyModalProps) => {
  const [applicants, setApplicants] = useState("1");
  const [recruitmentNoticeApply, { isLoading }] =
    useRecruitmentNoticeApplyMutation();
  const handleRequest = useHandleRequest();

  const handleSubmit = async () => {
    await handleRequest({
      request: async () => {
        const response = await recruitmentNoticeApply({
          recruitmentNoticeId: selectedJob.id,
          workerCount: Number(applicants),
        });
        return response;
      },
      onSuccess: () => {
        toast.success("Apply successfully!");
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl">
            Apply for {selectedJob?.recruitmentTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="p-3">
          <div className="space-y-6 ">
            <div className="flex flex-col justify-start items-start">
              <p className="text-muted-foreground flex-1">
                Number of Applicants
              </p>
              <Select value={applicants} onValueChange={setApplicants}>
                <SelectTrigger className="flex-3 w-full">
                  <SelectValue placeholder="Select number of applicants" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="destructive" onClick={onClose}>
                <XIcon />
                Cancel
              </Button>
              <Button
                disabled={!applicants}
                onClick={handleSubmit}
                type="button"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 animate-spin" />
                  </div>
                ) : (
                  <CheckIcon />
                )}
                Apply
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
