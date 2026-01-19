import { GraduationCap, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TbInfoCircle } from "react-icons/tb";

import { useState } from "react";
import { useGetUser } from "@/hooks/use-get-user";
import { EducationCard } from "../college-card";
import { EditCollegeModal } from "./edit-college-modal";
import { AddCollegeModal } from "./add-college-modal";
import { AlertModal } from "../common/alert-modal";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";
import type { Workerad } from "@/@types/workerad";

interface CollegeInformationProps {
  userInfo?: Workerad;
  hideActions?: boolean;
}

export const CollegeInformation = ({
  userInfo,
  hideActions = false,
}: CollegeInformationProps) => {
  const userData: any = useGetUser();

  const user: any = userInfo || userData;

  const educations = user?.universities ?? [];

  const [addOpen, setAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const [updateUser, { isLoading }] = useWorkerUserUpdateMutation();

  const handleRequest = useHandleRequest();

  const onConfirm = async () => {
    const universities = [...(user?.universities ?? [])] as any[];
    universities.splice(deleteIndex ?? 0, 1);
    await handleRequest({
      request: async () => {
        const response = await updateUser({
          universities: universities as any,
        });
        return response;
      },
      onSuccess: () => {
        toast.success("University deleted successfully");
        setDeleteIndex(null);
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-none border-none">
        <CardHeader className="border-b px-0 bg-white/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-100 p-2.5">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-xl">College Information</CardTitle>
                <p className="text-sm text-gray-600 mt-0.5">
                  College Information
                </p>
              </div>
            </div>

            {!hideActions && (
              <Button onClick={() => setAddOpen(true)} className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add College
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 px-0">
          {educations.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center text-gray-500">
              <TbInfoCircle className="h-10 w-10 text-gray-400" />
              <p className="text-base">No education history added yet</p>
              {!hideActions && (
                <Button variant="outline" onClick={() => setAddOpen(true)}>
                  Add your first education
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {educations.map((edu: any, index: number) => (
                <EducationCard
                  key={`${edu.universityName}-${index}`}
                  education={edu}
                  index={index}
                  onEdit={setEditIndex}
                  onDelete={setDeleteIndex}
                  hideActions={hideActions}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <AddCollegeModal isDialogOpen={addOpen} setIsDialogOpen={setAddOpen} />
      <EditCollegeModal
        isDialogOpen={editIndex !== null}
        setIsDialogOpen={() => setEditIndex(null)}
        index={editIndex ?? 0}
      />
      <AlertModal
        isOpen={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        title="Are you sure you want to delete this education?"
        description="This action canånot be undone."
        onConfirm={onConfirm}
        loading={isLoading}
      />
    </div>
  );
};
