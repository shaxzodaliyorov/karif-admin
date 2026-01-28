import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { TableNotFound } from "@/components/table-not-found";
import { Loader2, LogIn } from "lucide-react";
import { Pagination } from "@/components/common/pagination";
import { useQuery } from "@/hooks/useQuery";
import { Button } from "@/components/common/button/button";

import {
  useGetAllWorkersQuery,
  useLoginWorkerWithAdminMutation,
} from "@/store/worker/worker.api";
import { Link, useNavigate } from "react-router-dom";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utils/tokenStorage";
import { toast } from "sonner";

export const Workers = () => {
  const query = useQuery();
  const { data: { data: workers = [], page_count } = {}, isLoading } =
    useGetAllWorkersQuery({
      page: Number(query.get("page")) || 1,
      per_page: 10,
    });

  const handleRequest = useHandleRequest();

  const navigate = useNavigate();
  const [loginWorker] = useLoginWorkerWithAdminMutation();

  const handleLogin = async (id: number) => {
    await handleRequest({
      request: async () => {
        const response = await loginWorker({
          workerId: id,
        });
        return response;
      },
      onSuccess: (result) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, result?.data?.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, result?.data?.refresh_token);
        window.open("/dashboard", "_blank");
        toast.success("Login successfully");
      },
    });
  };

  const handlePageChange = (page: number) => {
    query.set("page", String(page));
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
                  onClick={() => navigate(`/worker/${c.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium cursor-pointer hover:underline">
                    <Link to={`/worker/${c.id}`}>{c.name}</Link>
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phoneNumber}</TableCell>
                  <TableCell>{c.address}</TableCell>
                  <TableCell>
                    {dayjs(c.createdAt).format("DD MMMM, YYYY")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-x-4 justify-end">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogin(c.id);
                        }}
                        disabled={!c.isVerified}
                        size={"sm"}
                      >
                        <LogIn /> Login
                      </Button>
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
