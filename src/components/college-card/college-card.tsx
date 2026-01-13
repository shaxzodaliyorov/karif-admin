import { GraduationCap, BookOpen, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Pencil } from "lucide-react";
import { RiDeleteBinLine } from "react-icons/ri";
import dayjs from "dayjs";

interface EducationCardProps {
  education: any;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const calculateDuration = (start: string, end: string) => {
  if (end.includes("Expected") || end.includes("Kutilmoqda")) {
    return "In Progress / Davom etmoqda";
  }

  try {
    const startDate = dayjs(start, "DD/MM/YYYY");
    const endDate = dayjs(end, "DD/MM/YYYY");

    if (!startDate.isValid() || !endDate.isValid()) {
      return "Invalid dates";
    }

    const years = endDate.diff(startDate, "year");
    const months = endDate.diff(startDate, "month") % 12;

    const parts = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);

    return parts.join(", ") || "< 1 month";
  } catch {
    return "—";
  }
};

export const EducationCard = ({
  education,
  index,
  onEdit,
  onDelete,
}: EducationCardProps) => {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-6 flex relative justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 flex-shrink-0">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg font-semibold text-gray-900">
                {education.universityName}
              </h4>
              <Badge variant="outline">{education.highestDegree}</Badge>
            </div>

            <div className="grid pt-4 gap-4 md:grid-cols-2 lg:grid-cols-4 bg-amer-300">
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium text-gray-500">Major</p>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-gray-900">{education.major}</p>
                </div>
              </div>

              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900">
                    {calculateDuration(
                      education.startDate,
                      education.graduationDate
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium text-gray-500">Start Date</p>
                <div className="flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-900">
                    {dayjs(education.startDate).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Graduation Date
                </p>
                <div className="flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-gray-900">
                    {dayjs(education.graduationDate).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <PiDotsThreeOutlineVerticalFill />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="mr-4">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onDelete(index)}>
                  <RiDeleteBinLine size={16} />
                  <span className="ml-2">Delete</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(index)}>
                  <Pencil size={16} />
                  <span className="ml-2">Edit</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
