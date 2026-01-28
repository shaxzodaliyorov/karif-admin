import { Pagination } from "@/components/common/pagination";
import { Status } from "@/components/common/status";
import { PageHeader } from "@/components/page-header";
import { TableNotFound } from "@/components/table-not-found";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@/hooks/useQuery";
import { useGetCompaniesQuery } from "@/store/company/company.api";
import { Download, Edit2Icon, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/common/button/button";
import { UpdateStatusModal } from "./update-status";
import { useState } from "react";
export const CompaniesPage = () => {
  const query = useQuery();
  const { data: { data: companies = [], page_count } = {}, isLoading } =
    useGetCompaniesQuery({
      page: Number(query.get("page")) || 1,
      per_page: 10,
    });
  const [open, setOpen] = useState<null | string>(null);

  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const handlePageChange = (page: number) => {
    query.set("page", String(page));
  };

  const downloadFile = (filePath: string) => {
    window.open(filePath, "_blank");
  };

  return (
    <section>
      <PageHeader title="Companies" description="List of companies" />
      <div className="hidden md:block rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Employees count</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Documents</TableHead>
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
            ) : companies?.length ? (
              companies?.map((c) => (
                <TableRow
                  key={c._id}
                  onClick={() => navigate(`/company/${c._id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium hover:underline group-hover:underline">
                    <Link to={`/company/${c._id}`}>{c.companyName}</Link>
                  </TableCell>
                  <TableCell>{c.region}</TableCell>
                  <TableCell>{c.employeesCount}</TableCell>
                  <TableCell>{c.address}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 justify-start">
                      <Badge
                        variant={"outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(c.insuranceCertificate);
                        }}
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Insurance Certificate <Download />
                      </Badge>
                      <Badge
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(c.employmentStatusInquiryForm);
                        }}
                        variant={"outline"}
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Employment Status Inquiry Form <Download />
                      </Badge>
                      <Badge
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(c.businessRegistrationCertificate);
                        }}
                        variant={"outline"}
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Business Registration Certificate <Download />
                      </Badge>
                      <Badge
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(
                            c.managementBusinessRegistrationCertificate,
                          );
                        }}
                        variant={"outline"}
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Management Business Registration Certificate{" "}
                        <Download />
                      </Badge>
                      <Badge
                        variant={"outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(
                            c.smallAndMediumSizedBusinessConfirmationCertificate,
                          );
                        }}
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Small And Medium Sized Business Confirmation Certificate{" "}
                        <Download />
                      </Badge>
                      <Badge
                        variant={"outline"}
                        className="cursor-pointer hover:bg-primary hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(c.localTaxPaymentCertificate);
                        }}
                      >
                        Local Tax Payment Certificate <Download />
                      </Badge>
                      <Badge
                        variant={"outline"}
                        className="cursor-pointer hover:bg-primary hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(c.nationalTaxPaymentCertificate);
                        }}
                      >
                        National Tax Payment Certificate <Download />
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Status
                      label={
                        c?.documentStatus === "approved"
                          ? "Approved"
                          : "Rejected"
                      }
                      variant={
                        c?.documentStatus === "approved"
                          ? "verified"
                          : "unverified"
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(c?._id);
                        setStatus(c?.documentStatus);
                      }}
                      size={"sm"}
                      variant={"outline"}
                    >
                      <Edit2Icon /> Update Status
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
      <UpdateStatusModal
        open={!!open}
        onClose={() => setOpen(null)}
        id={open as string}
        status={status}
      />
    </section>
  );
};
