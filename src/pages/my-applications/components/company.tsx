import { PageHeader } from "@/components/page-header";
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
import { TableNotFound } from "@/components/table-not-found";
import { Pagination } from "@/components/common/pagination";
import { useRecruitmentNoticeByCompanyQuery } from "@/store/RecruitmentNotice/RecruitmentNotice.api";
import { Status } from "@/components/common/status";
import dayjs from "dayjs";
import { useQuery } from "@/hooks/useQuery";

export const CompanyApplicants = () => {
  const query = useQuery();
  const { data: { data: employments = [], page_count = 0 } = {}, isLoading } =
    useRecruitmentNoticeByCompanyQuery({
      page: Number(query.get("page")) || 1,
      per_page: 10,
      status: "openForCompany",
    });

  const handlePageChange = (page: number) => {
    query.set("page", String(page));
  };

  return (
    <div>
      <PageHeader
        title="My Applicants"
        description="View and manage all job applicants here."
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
            ) : employments?.length ? (
              employments?.map((c) => (
                <TableRow key={c.id}>
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
                        c?.applicationStatus?.status === "selected"
                          ? "Selected"
                          : "Pending"
                      }
                      variant={
                        c?.applicationStatus?.status === "selected"
                          ? "verified"
                          : "pending"
                      }
                    />
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
    </div>
  );
};
