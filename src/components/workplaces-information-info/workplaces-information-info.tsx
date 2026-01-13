import { Briefcase, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TbInfoCircle } from "react-icons/tb";

import { useGetUser } from "@/hooks/use-get-user";
import { WorkplaceCard } from "../workplace-card/workplace-card";
import type { Worker } from "@/@types/worker";
import { AddWorkplaceInfoModal } from "./add-workplace-info-modal";
import { useState } from "react";
import { EditWorkplaceInfoModal } from "./edit-workplace-info-modal";
import { AlertModal } from "../common/alert-modal";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";

export const WorkplaceInformationInfo = () => {
  const user: Worker | null = useGetUser() as Worker | null;

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const handleRequest = useHandleRequest();

  const [updateUser, { isLoading }] = useWorkerUserUpdateMutation();

  const experiences = user?.workplaceInformation ?? [];

  const onConfirm = async () => {
    const workplaces = [...(user?.workplaceInformation ?? [])];
    workplaces.splice(deleteIndex!, 1);
    await handleRequest({
      request: async () => {
        const response = await updateUser({ workplaceInformation: workplaces });
        return response;
      },
      onSuccess: () => {
        toast.success("Workplace info deleted successfully");
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-none border-none">
        <CardHeader className="border-b px-0 bg-white/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2.5 text-xl">
              <div className="rounded-lg bg-blue-100 p-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              Work Experience
            </CardTitle>

            <Button onClick={() => setOpen(true)} className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 px-0">
          {experiences.length === 0 ? (
            <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-center text-gray-500">
              <TbInfoCircle className="h-8 w-8 text-gray-400" />
              <p className="text-sm">No work experience added yet</p>
              <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                Add your first experience
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {experiences?.map((exp: any, index: number) => (
                <WorkplaceCard
                  key={`${exp.companyName}-${index}`}
                  experience={exp}
                  index={index}
                  onEdit={() => {
                    setEditIndex(index);
                  }}
                  onDelete={() => {
                    setDeleteIndex(index);
                  }}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <AddWorkplaceInfoModal open={open} onClose={() => setOpen(false)} />
      <EditWorkplaceInfoModal
        open={editIndex !== null}
        onClose={() => setEditIndex(null)}
        index={editIndex ?? 0}
      />
      <AlertModal
        isOpen={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        title="Delete Experience"
        onConfirm={onConfirm}
        description="Are you sure you want to delete this experience?"
      />
    </div>
  );
};
