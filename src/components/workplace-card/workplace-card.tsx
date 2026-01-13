import {
  Briefcase,
  User,
  Target,
  Clock,
  FileText,
  Download,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import type { WorkExperience } from "../work-experience/work-experience";

interface WorkplaceCardProps {
  experience: WorkExperience;
  index: number;
  onEdit?: (index: number | null) => void;
  onDelete?: (index: number | null) => void;
}

export const WorkplaceCard = ({
  experience,
  index,
  onEdit,
  onDelete,
}: WorkplaceCardProps) => {
  const { companyName, position, field, workingPeriod, file } = experience;

  return (
    <Card className="relative border-l-4 border-l-blue-500 hover:border-l-blue-600 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          {/* Timeline / Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-200">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-5">
            <h4 className="text-lg font-semibold text-gray-900">
              {companyName}
            </h4>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Position</p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {position || "—"}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Field</p>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-900">{field || "—"}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {workingPeriod} {workingPeriod === 1 ? "year" : "years"}
                  </span>
                </div>
              </div>
            </div>

            {file && (
              <div className="flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Supporting Document
                    </p>
                    <p className="text-xs text-gray-500">Uploaded</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="absolute right-3 top-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <PiDotsThreeOutlineVerticalFill className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(index)}>
                <TbEdit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => onDelete?.(index)}
              >
                <RiDeleteBinLine className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
