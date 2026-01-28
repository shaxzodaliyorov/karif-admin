import { PageHeader } from "@/components/page-header";
import { useRecruitmentNoticeSeeMoreInfoQuery } from "@/store/RecruitmentNotice/RecruitmentNotice.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/common/button/button";
import { DownloadIcon, Printer, Loader2, ChevronDown } from "lucide-react";
import dayjs from "dayjs";
import { TableNotFound } from "@/components/table-not-found";
import { useParams } from "react-router-dom";
import { Dropdown } from "@/components/common/drop-down";
import { PiClock } from "react-icons/pi";
import { IoCheckbox } from "react-icons/io5";
import { CgSandClock } from "react-icons/cg";
import { Status } from "@/components/common/status";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useUpdateStatusRecruitmentNoticeSeeMoreInfoMutation } from "@/store/recruitment-notice/recruitment-notice.api";
import { toast } from "sonner";

export const RecruitmentNoticeDetailsPage = () => {
  const { id } = useParams();
  const { data: { data: recruitmentNotice } = {}, isLoading } =
    useRecruitmentNoticeSeeMoreInfoQuery(String(id));

  const applications = Array.isArray(recruitmentNotice)
    ? recruitmentNotice
    : [];
  const isEmpty = applications.length === 0;
  const [
    updateStatusRecruitmentNoticeSeeMoreInfo,
    { isLoading: isLoadingUpdateStatusRecruitmentNoticeSeeMoreInfo },
  ] = useUpdateStatusRecruitmentNoticeSeeMoreInfoMutation();
  const handleRequest = useHandleRequest();

  const handleUpdateStatus = async (applicationId: string, status: string) => {
    await handleRequest({
      request: async () => {
        const result = await updateStatusRecruitmentNoticeSeeMoreInfo({
          applicationId,
          status: status as "process" | "finish",
        });
        return result;
      },
      onSuccess: () => {
        toast.success("Updated successfully.");
      },
      onError: () => {
        toast.error("Update failed.");
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recruitment Notice Details"
        description="Detailed view of the selected recruitment notice"
        actions={
          <div className="flex gap-x-3">
            <Button variant="outline" disabled={isLoading || isEmpty}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" disabled={isLoading || isEmpty}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download Excel
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : isEmpty ? (
        <TableNotFound title="No applications found for this recruitment notice" />
      ) : (
        <>
          <div className="hidden md:block rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Country / Region</TableHead>
                  <TableHead>Worker Count</TableHead>
                  <TableHead>Applied At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recruitmentNotice?.map((app) => (
                  <TableRow key={app.applicationId}>
                    <TableCell className="font-medium">
                      {app.company.companyName}
                    </TableCell>
                    <TableCell>{app.company.region}</TableCell>
                    <TableCell>{app.workerCount}</TableCell>
                    <TableCell>
                      {dayjs(app.appliedAt).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>
                      <Status
                        className="capitalize"
                        label={app.status}
                        variant={
                          app.status === "selected"
                            ? "verified"
                            : app.status === "waiting"
                              ? "pending"
                              : "rejected"
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Dropdown
                        options={[
                          {
                            label: "Preparing",
                            icon: <CgSandClock />,
                            onClick: () =>
                              handleUpdateStatus(
                                app.applicationId,
                                "preparing",
                              ),
                          },
                          {
                            label: "Waiting",
                            icon: <PiClock />,
                            onClick: () =>
                              handleUpdateStatus(app.applicationId, "waiting"),
                          },
                          {
                            label: "Selected",
                            icon: <IoCheckbox className="text-green-500" />,
                            onClick: () =>
                              handleUpdateStatus(app.applicationId, "selected"),
                          },
                        ]}
                      >
                        <Button
                          disabled={
                            isLoadingUpdateStatusRecruitmentNoticeSeeMoreInfo
                          }
                          variant={"outline"}
                          className="capitalize"
                        >
                          <ChevronDown />
                          {app.status}
                        </Button>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};
