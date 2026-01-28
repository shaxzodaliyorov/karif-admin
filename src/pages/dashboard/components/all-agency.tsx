import {
  useGetAgenciesQuery,
  useVerifyAgencyMutation,
} from "@/store/agency/agency.api";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import dayjs from "dayjs";
import { TableNotFound } from "@/components/table-not-found";
import { Pagination } from "@/components/common/pagination";
import { useQuery } from "@/hooks/useQuery";
import { Status } from "@/components/common/status";
import { Switch } from "@/components/common/switch";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";

export const AllGetAgencies = ({ status }: { status?: string }) => {
  const query = useQuery();

  const { data: { data: agencies = [], page_count } = {}, isLoading } =
    useGetAgenciesQuery({
      status,
      page: Number(query.get("page")) || 1,
      per_page: 10,
    });

  const [verifyAgency] = useVerifyAgencyMutation();

  const handleRequest = useHandleRequest();

  const handlePageChange = (page: number) => {
    query.set("page", String(page));
  };

  const handleVerify = async (id: string, val: boolean) => {
    await handleRequest({
      request: async () => {
        const response = await verifyAgency({
          agencyId: id,
          status: val ? "verified" : "unverified",
        });
        return response;
      },
      onSuccess: () => {
        toast.success(`Agency ${val ? "verified" : "unverified"} successfully`);
      },
    });
  };

  return (
    <div>
      <div className="hidden md:block rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agency Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Representative Name</TableHead>
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
            ) : agencies?.length ? (
              agencies?.map((c) => (
                <TableRow
                  key={c._id}
                  className={`${!c.isVerified ? "opacity-50" : ""}`}
                >
                  <TableCell className="font-medium">{c.agencyName}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.representativeName}</TableCell>
                  <TableCell>{c.representativeAddress}</TableCell>
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
                      <Switch
                        defaultChecked={c.isVerified}
                        onChange={(val: boolean) => handleVerify(c._id, val)}
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
