import { Pagination } from "@/components/common/pagination";
import { Status } from "@/components/common/status";
import { TableNotFound } from "@/components/table-not-found";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useQuery } from "@/hooks/useQuery";
import {
  useGetJobNoticeApplicationByIdQuery,
  useUpdateJobNoticeApplicationStatusMutation,
} from "@/store/job-notice/job-notice.api";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { NoteModal } from "./note";
import { Button } from "@/components/ui/button";

export const FirstStep = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const query = useQuery();
  const [selectedStatus, setSelectedStatus] = useState({ id: "", status: "" });
  const [note, setNote] = useState<string | null>(null);
  const { data: jobNotice, isLoading } = useGetJobNoticeApplicationByIdQuery(
    {
      id: String(id),
      page: 1,
      per_page: 10,
      status:
        query.get("status") !== "all" && query.get("status")
          ? query.get("status")
          : undefined,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const handlePageChange = (page: number) => {
    query.set("page", String(page));
  };

  const [updateJobNoticeApplicationStatus, { isLoading: isUpdateLoading }] =
    useUpdateJobNoticeApplicationStatusMutation();
  const handleRequest = useHandleRequest();

  const handleUpdateJobNoticeApplicationStatus = async (
    id: string,
    status: string,
  ) => {
    await handleRequest({
      request: async () => {
        const response = await updateJobNoticeApplicationStatus({ id, status });
        return response;
      },
      onSuccess: () => {
        toast.success("Status updated successfully");
        setSelectedStatus({ id: "", status: "" });
      },
    });
  };

  return (
    <div>
      <div className="pb-5">
        <Select
          onValueChange={(val) => query.set("status", val)}
          value={query.get("status") || "all"}
        >
          <SelectTrigger className="w-[180px]" defaultValue="pass">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pass">Pass</SelectItem>
            <SelectItem value="fail">Fail</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="hidden md:block rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Note</TableHead>
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
            ) : jobNotice?.data?.length ? (
              jobNotice?.data?.map((c) => (
                <TableRow
                  key={c._id}
                  onClick={() => navigate(`/worker/${c.workerId?._id}`)}
                >
                  <TableCell className="font-medium hover:underline group-hover:underline">
                    <Link to={`/worker/${c.workerId?._id}`}>
                      {c?.workerId?.name}
                    </Link>
                  </TableCell>
                  <TableCell>{c.workerId?.email}</TableCell>
                  <TableCell>{c.workerId?.phoneNumber}</TableCell>
                  <TableCell>{c.workerId?.country}</TableCell>
                  <TableCell>{c.workerId?.address}</TableCell>
                  <TableCell>{c.note}</TableCell>
                  <TableCell>
                    <Status
                      label={c.status === "pass" ? "Pass" : "Fail"}
                      variant={c.status === "pass" ? "verified" : "unverified"}
                    />
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-x-2 justify-end">
                      <Button
                        variant={"outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNote(c._id);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Note
                      </Button>
                      <Select
                        onValueChange={(value) => {
                          setSelectedStatus({ id: c._id, status: value });
                          handleUpdateJobNoticeApplicationStatus(c._id, value);
                        }}
                        value={c?.status as string}
                        disabled={
                          isUpdateLoading && selectedStatus.id === c._id
                        }
                      >
                        <SelectTrigger className="w-[80px]">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pass">Pass</SelectItem>
                          <SelectItem value="fail">Fail</SelectItem>
                        </SelectContent>
                      </Select>
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
              <TableCell colSpan={8} className="pb-5">
                <Pagination
                  currentPage={
                    query.get("page") ? Number(query.get("page")) : 1
                  }
                  totalPages={jobNotice?.page_count || 1}
                  onPageChange={handlePageChange}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <NoteModal
        note={note || ""}
        open={note !== null}
        onClose={() => setNote(null)}
      />
    </div>
  );
};
