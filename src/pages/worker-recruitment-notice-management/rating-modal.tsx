/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { CustomSelect } from "@/components/common/custom-select";
import { SCORES_VALUE } from "@/constants/recruitment-notice";

interface RowScore {
  assignmentIndex: number;
  rowIndex: number;
  scoreA: string;
  scoreB: string;
}

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  marks?: any;
  onSave?: (scores: RowScore[]) => void;
  loading: boolean;
}

export const RatingModal = ({
  open,
  onClose,
  marks,
  onSave,
  loading,
}: RatingModalProps) => {
  const [scores, setScores] = useState<RowScore[]>([]);
  useEffect(() => {
    if (open && marks?.assignments) {
      const initial: RowScore[] = [];

      marks.assignments.forEach((assignment: any, aIdx: number) => {
        assignment.marks.forEach((_: any, rIdx: number) => {
          initial.push({
            assignmentIndex: aIdx,
            rowIndex: rIdx,
            scoreA: "0",
            scoreB: "0",
          });
        });
      });

      setScores(initial);
    }
  }, [open, marks]);

  useEffect(() => {
    if (!open) {
      setScores([]);
    }
  }, [open]);

  const handleChange = (
    assignmentIndex: number,
    rowIndex: number,
    type: "scoreA" | "scoreB",
    value: string,
  ) => {
    setScores((prev) =>
      prev.map((item) =>
        item.assignmentIndex === assignmentIndex && item.rowIndex === rowIndex
          ? { ...item, [type]: value }
          : item,
      ),
    );
  };

  const getScore = (assignmentIndex: number, rowIndex: number) => {
    const found = scores.find(
      (s) => s.assignmentIndex === assignmentIndex && s.rowIndex === rowIndex,
    );
    return found || { scoreA: "0", scoreB: "0" };
  };

  const getTotal = (assignmentIndex: number, rowIndex: number) => {
    const { scoreA, scoreB } = getScore(assignmentIndex, rowIndex);
    return Number(scoreA) + Number(scoreB);
  };

  const handleSave = () => {
    const result = {
      assignments: marks.assignments.map((assignment: any, aIdx: number) => ({
        title: assignment.title,
        rows: assignment.marks.map((markRow: any, rIdx: number) => {
          const { scoreA, scoreB } = getScore(aIdx, rIdx);
          const subtitles = markRow.map((m: any) => m.title);

          return {
            subtitles,
            scoreA: Number(scoreA),
            scoreB: Number(scoreB),
          };
        }),
      })),
    };

    onSave?.(result as any);
  };

  if (!marks?.assignments) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-6xl">
        <DialogHeader>
          <DialogTitle>Rating</DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Title</TableHead>
                <TableHead className="font-bold">Subtitles</TableHead>
                <TableHead className="font-bold text-center">Score A</TableHead>
                <TableHead className="font-bold text-center">Score B</TableHead>
                <TableHead className="font-bold text-center">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {marks.assignments.map(
                (assignment: any, assignmentIndex: number) =>
                  assignment.marks.map((markRow: any[], rowIndex: number) => {
                    const { scoreA, scoreB } = getScore(
                      assignmentIndex,
                      rowIndex,
                    );
                    const subtitle = markRow
                      .map((m: any) => m.title)
                      .join(", ");

                    return (
                      <TableRow
                        key={`${assignmentIndex}-${rowIndex}`}
                        className={
                          rowIndex % 2 === 0 ? "bg-card" : "bg-muted/30"
                        }
                      >
                        {rowIndex === 0 && (
                          <TableCell
                            rowSpan={assignment.marks.length}
                            className="border border-border px-6 py-3 font-semibold align-top"
                          >
                            {assignment.title}
                          </TableCell>
                        )}

                        <TableCell className="border border-border px-6 py-3">
                          {subtitle}
                        </TableCell>

                        {/* Score A */}
                        <TableCell className="border border-border px-6 py-3 text-center">
                          <CustomSelect
                            className="w-[75px]"
                            options={SCORES_VALUE}
                            value={scoreA}
                            onChange={(value) =>
                              handleChange(
                                assignmentIndex,
                                rowIndex,
                                "scoreA",
                                value,
                              )
                            }
                            placeholder="0"
                          />
                        </TableCell>

                        {/* Score B */}
                        <TableCell className="border border-border px-6 py-3 text-center">
                          <CustomSelect
                            className="w-[75px]"
                            options={SCORES_VALUE}
                            value={scoreB}
                            onChange={(value) =>
                              handleChange(
                                assignmentIndex,
                                rowIndex,
                                "scoreB",
                                value,
                              )
                            }
                            placeholder="0"
                          />
                        </TableCell>

                        {/* Total */}
                        <TableCell className="border border-border px-6 py-3 text-center font-semibold">
                          {getTotal(assignmentIndex, rowIndex)}
                        </TableCell>
                      </TableRow>
                    );
                  }),
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex justify-end py-5 gap-3">
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
