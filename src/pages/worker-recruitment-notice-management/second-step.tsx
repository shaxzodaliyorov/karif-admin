/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "@/components/common/pagination";
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
import {
  useGetJobNoticeApplicationByIdQuery,
  useUpdateJobNoticeAssignmentsMutation,
} from "@/store/job-notice/job-notice.api";
import { Loader2, StarIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/common/button/button";
import { RatingModal } from "./rating-modal";

export const SecondStep = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const query = useQuery();
  const [openRatingModal, setOpenRatingModal] = useState<null | any>(null);
  const { data: jobNotice, isLoading: jobNoticeLoading } =
    useGetJobNoticeApplicationByIdQuery(
      {
        id: String(id),
        page: 1,
        per_page: 10,
        status: "pass",
      },
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const handlePageChange = (page: number) => {
    query.set("page", String(page));
  };
  const [updateJobNoticeAssignment, { isLoading }] =
    useUpdateJobNoticeAssignmentsMutation();

  const handleRequest = useHandleRequest();

  const onSubmitRating = async (data: any) => {
    await handleRequest({
      request: async () => {
        const result = await updateJobNoticeAssignment({
          recruitmentNoticeId: jobNotice?.recruitmentNotice?._id,
          workerId: openRatingModal._id,
          body: {
            assignments: data.assignments,
          },
        });
        return result;
      },
      onSuccess: () => {
        toast.success("Rating saved successfully");
        setOpenRatingModal(null);
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
              <TableHead>Phone number</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Score A</TableHead>
              <TableHead>Score B</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobNoticeLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  <div className="w-full h-40 flex justify-center items-center">
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : jobNotice?.data?.length ? (
              jobNotice?.data?.map((c) => (
                <TableRow
                  key={c._id}
                  onClick={() => navigate(`/worker/${c.worker?._id}`)}
                >
                  <TableCell className="font-medium hover:underline group-hover:underline">
                    <Link to={`/worker/${c.worker?._id}`}>
                      {c?.worker?.name}
                    </Link>
                  </TableCell>
                  <TableCell>{c.worker?.email}</TableCell>
                  <TableCell>{c.worker?.phoneNumber}</TableCell>
                  <TableCell>{c.worker?.country}</TableCell>
                  <TableCell>{c.worker?.address}</TableCell>
                  <TableCell>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenRatingModal(c);
                      }}
                    >
                      <StarIcon />
                      Rating
                    </Button>
                  </TableCell>
                  <TableCell>{c?.markScoreA}</TableCell>
                  <TableCell>{c?.markScoreB}</TableCell>
                  <TableCell>{c?.markScoreTotalTitle}</TableCell>
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
              <TableCell colSpan={11} className="pb-5">
                <Pagination
                  currentPage={
                    query.get("page") ? Number(query.get("page")) : 1
                  }
                  totalPages={jobNotice?.page_count || 1}
                  onPageChange={handlePageChange}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <RatingModal
        open={openRatingModal !== null}
        onClose={() => setOpenRatingModal(null)}
        marks={jobNotice?.recruitmentNotice?.mark2 as any}
        onSave={onSubmitRating}
        loading={isLoading}
      />
    </div>
  );
};
