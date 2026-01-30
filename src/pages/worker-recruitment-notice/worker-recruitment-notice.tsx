import { PageHeader } from "@/components/page-header";

import { useRecruitmentNoticeQuery } from "@/store/RecruitmentNotice/RecruitmentNotice.api";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/common/pagination";
import { useQuery } from "@/hooks/useQuery";
import { Status } from "@/components/common/status";
import dayjs from "dayjs";
import { TableNotFound } from "@/components/table-not-found";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateRecruitmentNoticeSetStatusMutation } from "@/store/recruitment-notice/recruitment-notice.api";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { AlertModal } from "@/components/common/alert-modal";
import { useState } from "react";
import { FaFlag } from "react-icons/fa";

export const WorkerRecruitmentNoticePage = () => {
  const query = useQuery();
  const {
    data: { data: recruitmentNotices = [], page_count } = {},
    isLoading,
  } = useRecruitmentNoticeQuery({
    page: Number(query.get("page")) || 1,
    per_page: 10,
    status: "openForWorker",
  });
  const [finishedId, setFinishedId] = useState<null | string>(null);

  const handleRequest = useHandleRequest();
  const navigate = useNavigate();

  const [
    updateRecruitmentNoticeSetStatus,
    { isLoading: isLoadingUpdateSetStatus },
  ] = useUpdateRecruitmentNoticeSetStatusMutation();

  const handleFinishRequest = async () => {
    await handleRequest({
      request: async () => {
        const response = await updateRecruitmentNoticeSetStatus({
          id: finishedId as string,
          body: {
            status: "closed",
          },
        });
        return response;
      },
      onSuccess: () => {
        toast.success("The recruitment notice has been completed.");
      },
    });
  };

  const handlePageChange = (page: number) => {
    query.set("page", String(page));
  };

  return (
    <section>
      <PageHeader
        title="Worker Recruitment Notice"
        description="A page where workers can see and apply for job notices posted by agencies"
      />
      <div className="hidden md:block rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Skill</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Worker Count</TableHead>
              <TableHead>Registered company</TableHead>
              <TableHead>Company Worker Count</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  <div className="w-full h-40 flex justify-center items-center">
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : recruitmentNotices?.length ? (
              recruitmentNotices?.map((c) => (
                <TableRow
                  key={c._id}
                  onClick={() =>
                    navigate(`/recruitment-notice-management/${c._id}`)
                  }
                >
                  <TableCell className="font-medium hover:underline group-hover:underline">
                    <Link to={`/recruitment-notice-management/${c._id}`}>
                      {c.recruitmentTitle}
                    </Link>
                  </TableCell>
                  <TableCell>{c.country}</TableCell>
                  <TableCell>{c.skill}</TableCell>
                  <TableCell>
                    {dayjs(c.startDate).format("DD MMM, YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(c.endDate).format("DD MMM, YYYY")}
                  </TableCell>
                  <TableCell>{c.workerCount}</TableCell>
                  <TableCell>{c.registeredCompany}</TableCell>
                  <TableCell>{c.companyWorkerCount}</TableCell>
                  <TableCell>
                    {c.countType === "byPercent" ? "By Percent" : "By Count"}
                  </TableCell>
                  <TableCell>
                    <Status
                      label={
                        c.status === "openForCompany"
                          ? "Open for Company"
                          : "Closed"
                      }
                      variant={
                        c.status === "openForCompany"
                          ? "verified"
                          : "unverified"
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      disabled={c.status !== "openForWorker"}
                      size={"sm"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFinishedId(c._id);
                      }}
                    >
                      <FaFlag />
                      Finish
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10}>
                  <TableNotFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={10} className="pb-5">
                <Pagination
                  currentPage={
                    query.get("page") ? Number(query.get("page")) : 1
                  }
                  totalPages={page_count || 1}
                  onPageChange={handlePageChange}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <AlertModal
        title="Are you sure you want to change it?"
        description="After changing the status, you won't be able to edit it again."
        isOpen={finishedId !== null}
        onClose={() => setFinishedId(null)}
        onConfirm={handleFinishRequest}
        loading={isLoadingUpdateSetStatus}
      />
    </section>
  );
};
