/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader } from "@/components/page-header";
import { useQuery } from "@/hooks/useQuery";
import { useRecruitmentNoticeQuery } from "@/store/RecruitmentNotice/RecruitmentNotice.api";
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
import { Check, Loader2 } from "lucide-react";
import { Status } from "@/components/common/status";
import { TableNotFound } from "@/components/table-not-found";
import { Pagination } from "@/components/common/pagination";
import { Button } from "@/components/common/button/button";
import { useState } from "react";
import { ApplyModal } from "./apply-modal";
import { useGetUser } from "@/hooks/use-get-user";

export const CompanyEmployment = () => {
  const query = useQuery();
  const user = useGetUser();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<null | any>(null);
  const { data: { data: employments = [], page_count = 0 } = {}, isLoading } =
    useRecruitmentNoticeQuery({
      page: Number(query.get("page")) || 1,
      per_page: 10,
      status: user?.role === "company" ? "openForCompany" : "openForWorker",
    });

  const handlePageChange = (page: number) => {
    query.set("page", String(page));
  };

  return (
    <section>
      <PageHeader
        title="Employment"
        description="Here you can apply for works as company. Fill the form and wait for confirmation."
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
            ) : employments?.length ? (
              employments?.map((c) => (
                <TableRow key={c._id}>
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
                        c.status === "openForCompany"
                          ? "Open for Company"
                          : "Closed"
                      }
                      variant={
                        c.status === "openForCompany"
                          ? "verified"
                          : "unverified"
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => setIsApplyModalOpen(c)} size={"sm"}>
                      <Check /> Apply
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
      <ApplyModal
        isOpen={isApplyModalOpen !== null}
        onClose={() => setIsApplyModalOpen(null)}
        selectedJob={isApplyModalOpen}
      />
    </section>
  );
};
