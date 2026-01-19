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
import { Status } from "@/components/common/status";
import { TableNotFound } from "@/components/table-not-found";
import { Loader2, LogIn } from "lucide-react";
import { Switch } from "@/components/common/switch";
import { Pagination } from "@/components/common/pagination";
import { useQuery } from "@/hooks/useQuery";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { toast } from "sonner";
import { Button } from "@/components/common/button/button";
import {
  useGetAllKoreanAgenciesQuery,
  useVerifyKoreanAgencyMutation,
} from "@/store/agency/agency.api";
import { Link, useNavigate } from "react-router-dom";

export const KoreanAgencies = () => {
  const query = useQuery();
  const {
    data: { data: agencies = [], page_count } = {},
    isLoading,
    isFetching: agencyIsFetching,
  } = useGetAllKoreanAgenciesQuery({
    page: Number(query.get("page")) || 1,
    per_page: 10,
  });

  const [verifyKoreanAgency] = useVerifyKoreanAgencyMutation();

  const handleRequest = useHandleRequest();

  const navigate = useNavigate();

  const handleVerify = async (id: number, val: boolean) => {
    await handleRequest({
      request: async () => {
        const response = await verifyKoreanAgency({
          koreanAgencyId: id,
          status: val ? "verified" : "unverified",
        });
        return response;
      },
      onSuccess: () => {
        toast.success(`Agency ${val ? "verified" : "unverified"} successfully`);
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
                  key={c.id}
                  className={`${!c.isVerified ? "opacity-50" : ""} cursor-pointer`}
                  onClick={() => navigate(`/agency/${c.id}?agencyType=korean`)}
                >
                  <TableCell className="font-medium">
                    <Link to={`/agency/${c.id}?agencyType=korean`}>
                      {c.agencyName}
                    </Link>
                  </TableCell>
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
                        onChange={(val: boolean) => handleVerify(c.id, val)}
                        disabled={agencyIsFetching}
                      />
                      <Button
                        disabled={agencyIsFetching || !c.isVerified}
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
