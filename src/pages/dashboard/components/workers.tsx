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

import { useGetAllWorkersQuery } from "@/store/worker/worker.api";

export const Workers = () => {
  const query = useQuery();
  const { data: { data: workers = [], page_count } = {}, isLoading } =
    useGetAllWorkersQuery({
      page: Number(query.get("page")) || 1,
      per_page: 10,
    });

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
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phoneNumber}</TableCell>
                  <TableCell>{c.address}</TableCell>
                  <TableCell>
                    {dayjs(c.createdAt).format("DD MMMM, YYYY")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-x-4 justify-end">
                      <Button disabled={!c.isVerified} size={"sm"}>
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
