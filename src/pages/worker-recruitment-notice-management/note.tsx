import { useState } from "react";
import { Modal } from "@/components/common/modal";
import { Textarea } from "@/components/ui/textarea";
import { useGetJobNoticeApplicationNoteByIdMutation } from "@/store/job-notice/job-notice.api";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";
import { Button } from "@/components/common/button/button";

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  note?: string;
}

export const NoteModal = ({ open, onClose, note: noteId }: NoteModalProps) => {
  const [note, setNote] = useState("");
  const [jobNoticeApplicationNote, { isLoading }] =
    useGetJobNoticeApplicationNoteByIdMutation();
  const handleRequest = useHandleRequest();

  const handleSave = async () => {
    await handleRequest({
      request: async () => {
        const response = await jobNoticeApplicationNote({
          id: noteId as string,
          body: {
            note,
          },
        });
        return response;
      },
      onSuccess: () => {
        toast.success("Note updated successfully");
        onClose();
      },
    });
  };

  return (
    <Modal title="Note" open={open} onClose={onClose}>
      <div className="space-y-4">
        <Textarea
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[120px]"
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            loading={isLoading}
            onClick={handleSave}
            disabled={!note.trim()}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
