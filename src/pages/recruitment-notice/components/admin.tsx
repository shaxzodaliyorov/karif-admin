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
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/common/drop-down";
import { Button } from "@/components/ui/button";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Switch } from "@/components/common/switch";
import {
  useDeleteRecruitmentNoticeMutation,
  useUpdateRecruitmentNoticeSetStatusMutation,
} from "@/store/recruitment-notice/recruitment-notice.api";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AlertModal } from "@/components/common/alert-modal";
import { useState } from "react";

export const Admin = () => {
  const query = useQuery();
  const {
    data: { data: recruitmentNotices = [], page_count } = {},
    isLoading,
  } = useRecruitmentNoticeQuery({
    page: Number(query.get("page")) || 1,
    per_page: 10,
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleRequest = useHandleRequest();
  const navigate = useNavigate();
  const [deleteRecruitmentNotice, { isLoading: isLoadingDelete }] =
    useDeleteRecruitmentNoticeMutation();

  const onDelete = async () => {
    await handleRequest({
      request: async () => {
        const res = await deleteRecruitmentNotice(deleteId as number);
        return res;
      },
      onSuccess: () => {
        toast.success("Successfully deleted");
      },
    });
  };

  const [
    updateRecruitmentNoticeSetStatus,
    { isLoading: isLoadingUpdateSetStatus },
  ] = useUpdateRecruitmentNoticeSetStatusMutation();

  const handleFinishRequest = async (id: number) => {
    await handleRequest({
      request: async () => {
        const response = await updateRecruitmentNoticeSetStatus({
          id,
          body: {
            status: "openForWorker",
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
        title="Recruitment Notice"
        description="Manage all recruitment notices here."
        actions={
          <div>
            <Button onClick={() => navigate("/add-recruitment-notice")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Recruitment Notice
            </Button>
          </div>
        }
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
                  key={c.id}
                  className={`${c.status !== "openForCompany" ? "opacity-50" : ""} cursor-pointer`}
                >
                  <TableCell className="font-medium">
                    {c.recruitmentTitle}
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
                  <TableCell>
                    {c.type === "byPercent" ? "By Percent" : "By Count"}
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
                    <div className="flex gap-x-4 justify-end">
                      <Switch
                        onChange={() => handleFinishRequest(c.id)}
                        disabled={
                          c.status !== "openForCompany" ||
                          isLoadingUpdateSetStatus
                        }
                        defaultChecked={c.status === "openForCompany"}
                      />
                      <Dropdown
                        options={[
                          {
                            label: "Delete",
                            onClick: () => setDeleteId(c.id),
                            icon: <Trash2 />,
                          },
                          {
                            label: "Edit",
                            onClick: () => {},
                            icon: <Pencil />,
                          },
                        ]}
                      >
                        <Button variant="ghost" size="icon">
                          <HiOutlineDotsVertical />
                        </Button>
                      </Dropdown>
                    </div>
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
        title="Delete Recruitment Notice"
        description="Are you sure you want to delete this recruitment notice? This action cannot be undone."
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={onDelete}
        loading={isLoadingDelete}
      />
    </section>
  );
};
