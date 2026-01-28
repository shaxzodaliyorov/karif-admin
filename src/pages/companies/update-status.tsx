/* eslint-disable react-hooks/set-state-in-effect */
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { useHandleRequest } from "../../hooks/use-handle-request";
import { useCompanySetStatusDocumentMutation } from "../../store/company/company.api";

export const UpdateStatusModal = ({
  open,
  onClose,
  id,
  status: initialStatus,
}: {
  open: boolean;
  onClose: () => void;
  id: number;
  status: string;
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [message, setMessage] = useState("");
  const handleRequest = useHandleRequest();
  const [updateStatusFn, { isLoading }] = useCompanySetStatusDocumentMutation();
  const updateStatus = () => {
    handleRequest({
      request: async () => {
        const response = await updateStatusFn({
          id,
          status,
          documentStatusMessage: message,
        });
        return response;
      },
      onSuccess: () => {
        onClose();
        setStatus("");
        setMessage("");
        toast.success("Status updated successfully");
      },
    });
  };

  useEffect(() => {
    if (initialStatus) {
      setStatus(initialStatus);
    }
  }, [initialStatus]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Select
            value={status}
            onValueChange={setStatus}
            defaultValue={initialStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            className="w-full h-24"
            placeholder="Enter a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={updateStatus}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : null}
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
