import {
  useGetCompaniesQuery,
  useLoginCompanyWithAdminMutation,
  useVerifyCompanyMutation,
} from "@/store/company/company.api";
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
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utils/tokenStorage";

export const Companies = () => {
  const query = useQuery();
  const {
    data: { data: companies = [], page_count } = {},
    isLoading,
    isFetching: companyIsFetching,
  } = useGetCompaniesQuery({
    page: Number(query.get("page")) || 1,
    per_page: 10,
  });

  const [verifyCompany] = useVerifyCompanyMutation();
  const [loginCompany] = useLoginCompanyWithAdminMutation();

  const handleRequest = useHandleRequest();

  const navigate = useNavigate();

  const handleVerify = async (id: string, val: boolean) => {
    await handleRequest({
      request: async () => {
        const response = await verifyCompany({
          companyId: id,
          status: val ? "verified" : "unverified",
        });
        return response;
      },
      onSuccess: () => {
        toast.success(
          `Company ${val ? "verified" : "unverified"} successfully`,
        );
      },
    });
  };

  const handleLogin = async (id: string) => {
    await handleRequest({
      request: async () => {
        const response = await loginCompany({
          companyId: id,
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
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>CEO</TableHead>
              <TableHead>Region</TableHead>
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
            ) : companies?.length ? (
              companies?.map((c) => (
                <TableRow
                  key={c._id}
                  className={`${!c.isVerified ? "opacity-50" : ""} cursor-pointer`}
                  onClick={() => navigate(`/company/${c._id}`)}
                >
                  <TableCell className="font-medium hover:cursor-pointer hover:underline">
                    <Link to={`/company/${c._id}`}>{c.companyName}</Link>
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.representativeName}</TableCell>
                  <TableCell>{c.region}</TableCell>
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
                        disabled={companyIsFetching}
                      />
                      <Button
                        disabled={companyIsFetching || !c.isVerified}
                        size={"sm"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogin(c._id);
                        }}
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
