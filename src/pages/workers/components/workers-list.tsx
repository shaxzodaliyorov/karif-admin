import { AlertModal } from "@/components/common/alert-modal";
import { Button } from "@/components/common/button/button";
import { Dropdown } from "@/components/common/drop-down";
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
import { useDeleteWorkerAdMutation } from "@/store/workerad/workerad.api";
import dayjs from "dayjs";
import {
  Edit2Icon,
  Loader2,
  LogIn,
  MoreVertical,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface WorkersListsProps {
  status?: "verified" | "unverified";
}

export const WorkersLists = ({ status }: WorkersListsProps) => {
  const navigate = useNavigate();
  const query = useQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
  const [deleteWorkerAd] = useDeleteWorkerAdMutation();

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

  const handleVerify = async (id: string, val: boolean) => {
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

  const handleDeleteWorker = async ({ id }: { id: string }) => {
    await handleRequest({
      request: async () => {
        const response = await deleteWorkerAd(id as string);
        return response;
      },
      onSuccess: () => {
        toast.success("Worker deleted successfully");
      },
    });
  };

  return (
    <div>
      <div className="hidden md:block rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
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
                <TableCell colSpan={8} className="text-center">
                  <div className="w-full h-40 flex justify-center items-center">
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : workers?.length ? (
              workers?.map((c) => (
                <TableRow
                  key={c._id}
                  onClick={() => navigate(`/worker/${c._id}`)}
                  className={`cursor-pointer ${!c.isVerified ? "opacity-50" : ""}`}
                >
                  <TableCell>
                    <img
                      src={
                        c.photoRegistration ||
                        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      }
                      alt={c.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium hover:underline">
                    {c.name}
                  </TableCell>
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
                        onChange={(val: boolean) => handleVerify(c._id, val)}
                        disabled={workersIsFetching}
                      />
                      <Dropdown
                        options={[
                          {
                            label: "Edit",
                            icon: <Edit2Icon />,
                            onClick: () => {
                              navigate(`/add-worker?id=${c._id}`);
                            },
                          },
                          {
                            label: "Delete",
                            icon: <Trash2Icon />,
                            onClick: () => {
                              setIsOpen(true);
                              setSelectedWorkerId(c._id);
                            },
                          },
                        ]}
                      >
                        <button className="cursor-pointer">
                          <MoreVertical />
                        </button>
                      </Dropdown>
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
      <AlertModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedWorkerId(null);
        }}
        onConfirm={() => {
          if (selectedWorkerId) {
            handleDeleteWorker({ id: selectedWorkerId });
          }
          setIsOpen(false);
          setSelectedWorkerId(null);
        }}
        title="Delete Worker"
        description="Are you sure you want to delete this worker? This action cannot be undone."
      />
    </div>
  );
};
