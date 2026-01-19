import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Plus } from "lucide-react";
import { TbInfoCircle } from "react-icons/tb";
import CertificateCard from "./certificate-card";
import { useGetUser } from "@/hooks/use-get-user";
import { AddCertificateModal } from "./add-certificate-modal";
import { useState } from "react";
import { AlertModal } from "../common/alert-modal";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import { toast } from "sonner";
import { EditCertificateModal } from "./edit-certificate-modal";

interface ProfessionalCertificatesProps {
  userInfo?: any;
  hideActions?: boolean;
}

export default function ProfessionalCertificates({
  userInfo,
  hideActions,
}: ProfessionalCertificatesProps) {
  const user: any = userInfo || useGetUser();
  const certificates = user?.professionalCertificates ?? [];
  const [open, setOpen] = useState(false);
  const [openEditIndex, setOpenEditIndex] = useState<number | null>(null);
  const [openDeleteIndex, setOpenDeleteIndex] = useState<number | null>(null);
  const [updateUser, { isLoading }] = useWorkerUserUpdateMutation();

  const handleRequest = useHandleRequest();

  const onConfirmDelete = async () => {
    const professionalCertificates = [
      ...(user?.professionalCertificates ?? []),
    ];
    professionalCertificates.splice(openDeleteIndex || 0, 1);
    await handleRequest({
      request: async () => {
        const response = await updateUser({
          professionalCertificates: professionalCertificates as any,
        });
        return response;
      },
      onSuccess: () => {
        toast.success("Professional certificate deleted successfully");
        setOpenDeleteIndex(null);
      },
    });
  };

  const handleDownload = (document: string) => {
    window.open(document, "_blank");
  };

  return (
    <div>
      <Card className="shadow-none border-none">
        <CardHeader className="border-b bg-white px-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Award className="h-5 w-5 text-blue-600" />
              Professional Certificate
            </CardTitle>

            {!hideActions && (
              <Button variant="outline" onClick={() => setOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Certificate
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6 px-0">
          {certificates.length === 0 ? (
            <div className="flex h-40 items-center justify-center flex-col gap-4">
              <TbInfoCircle className="h-6 w-6 text-gray-500" />
              <p className="text-sm text-gray-600">
                No professional certificates added yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {certificates.map((certificate: any, index: any) => (
                <CertificateCard
                  key={`${certificate.certificateType}-${index}`}
                  certificate={certificate}
                  index={index}
                  onEdit={() => setOpenEditIndex(index)}
                  onDelete={() => setOpenDeleteIndex(index)}
                  hideActions={hideActions}
                  onDownload={() => handleDownload(certificate.file)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <AlertModal
        title="Delete Certificate"
        isOpen={openDeleteIndex !== null}
        onClose={() => setOpenDeleteIndex(null)}
        onConfirm={onConfirmDelete}
        loading={isLoading}
      />
      <AddCertificateModal open={open} onOpenChange={() => setOpen(false)} />
      <EditCertificateModal
        open={openEditIndex !== null}
        onOpenChange={() => setOpenEditIndex(null)}
        index={openEditIndex || 0}
      />
    </div>
  );
}
