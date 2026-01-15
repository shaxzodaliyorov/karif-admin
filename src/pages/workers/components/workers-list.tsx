import { Button } from "@/components/common/button/button";
import { Pagination } from "@/components/common/pagination";
import { Status } from "@/components/common/status";
import { Switch } from "@/components/common/switch";
import { TableNotFound } from "@/components/table-not-found";
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
import { useVerifyWorkerMutation } from "@/store/agency/agency.api";
import { useGetAllWorkersQuery } from "@/store/worker/worker.api";
import dayjs from "dayjs";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";

interface WorkersListsProps {
  status?: "verified" | "unverified";
}

export const WorkersLists = ({ status }: WorkersListsProps) => {
  const query = useQuery();
  const {
    data: { data: workers = [], page_count } = {},
    isLoading,
    isFetching: workersIsFetching,
  } = useGetAllWorkersQuery({
    page: Number(query.get("page")) || 1,
    per_page: 10,
    status,
  });

  const handlePageChange = (page: number) => {
    query.set("page", String(page));
  };

  const [verifyCompany] = useVerifyWorkerMutation();

  const handleRequest = useHandleRequest();

  const handleVerify = async (id: number, val: boolean) => {
    await handleRequest({
      request: async () => {
        const response = await verifyCompany({
          workerId: id,
          status: val ? "verified" : "unverified",
        });
        return response;
      },
      onSuccess: () => {
        toast.success(`Worker ${val ? "verified" : "unverified"} successfully`);
      },
    });
  };

  return (
    <div>
      <div className="hidden md:block rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <div className="w-full h-40 flex justify-center items-center">
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : workers?.length ? (
              workers?.map((c) => (
                <TableRow
                  key={c.id}
                  className={`${!c.isVerified ? "opacity-50" : ""}`}
                >
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phoneNumber}</TableCell>
                  <TableCell>{c.address}</TableCell>
                  <TableCell>
                    <Status
                      label={c.isVerified ? "Verified" : "Unverified"}
                      variant={c.isVerified ? "verified" : "unverified"}
                    />
                  </TableCell>
                  <TableCell>
                    {dayjs(c.createdAt).format("DD MMMM, YYYY")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-x-4 justify-end">
                      <Button disabled={!c.isVerified} size={"sm"}>
                        <LogIn /> Login
                      </Button>
                      <Switch
                        defaultChecked={c.isVerified}
                        onChange={(val: boolean) => handleVerify(c.id, val)}
                        disabled={workersIsFetching}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <TableNotFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} className="pb-5">
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
    </div>
  );
};
