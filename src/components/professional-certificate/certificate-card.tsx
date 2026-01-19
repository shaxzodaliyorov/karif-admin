import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Building, Download, FileText, Trash2 } from "lucide-react";
import { CiCalendar } from "react-icons/ci";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";

type Certificate = {
  certificateType: string;
  issuingInstitution: string;
  issueDate: string;
  file?: string;
};

type CertificateCardProps = {
  certificate: Certificate;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onDownload: (file?: string) => void;
};

export default function CertificateCard({
  certificate,
  index,
  onEdit,
  onDelete,
  onDownload,
}: CertificateCardProps) {
  return (
    <div className="relative">
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Timeline dot */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 flex-shrink-0">
              <Award className="h-6 w-6 text-blue-600" />
            </div>

            {/* Ma'lumotlar qismi */}
            <div className="flex-1 space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {certificate.certificateType}
              </h4>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Issuing Institution
                  </p>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-blue-500" />
                    <p className="text-sm text-gray-900 font-medium">
                      {certificate.issuingInstitution}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Issue Date
                  </p>
                  <div className="flex items-center gap-2">
                    <CiCalendar className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-gray-900">
                      {dayjs(certificate.issueDate).format("DD MMM YYYY")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document */}
              <div className="space-y-3">
                <div className="grid mt-2 gap-2">
                  <div className="flex pl-4 items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      <p className="text-sm font-medium text-gray-900">
                        Certificate Document
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => onDownload(certificate.file)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PiDotsThreeOutlineVerticalFill />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="mr-4">
                <DropdownMenuItem onClick={() => onEdit(index)}>
                  <TbEdit size={16} />
                  <span className="ml-2">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(index)}>
                  <Trash2 size={16} />
                  <span className="ml-2">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
