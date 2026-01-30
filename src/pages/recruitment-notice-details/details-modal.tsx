/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/common/button/button";
import { Modal } from "@/components/common/modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Printer } from "lucide-react";
import { useRef } from "react";

export interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  recruitmentNotice: any;
}
const STATUS_LIST = [
  { value: "waiting", label: "대기", color: "bg-yellow-100 text-yellow-800" },
  { value: "preparing", label: "예비", color: "bg-blue-100 text-blue-800" },
  { value: "selected", label: "선정", color: "bg-green-100 text-green-800" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const statusItem = STATUS_LIST.find((item) => item.value === status);

  if (!statusItem) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        알 수 없음
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusItem.color}`}
    >
      {statusItem.label}
    </span>
  );
};

export const DetailsModal = ({
  onClose,
  open,
  recruitmentNotice,
}: DetailsModalProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!recruitmentNotice) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  console.log("recruitmentNotice", recruitmentNotice);

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=600,width=900");
    if (printWindow && printRef.current) {
      const printContent = printRef.current.innerHTML;
      printWindow.document.write(`
        <html>
          <head>
            <title>Recruitment Details - ${recruitmentNotice?.recruitmentNotice?.recruitmentTitle}</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                background-color: #ffffff;
                color: #1a1a1a;
                line-height: 1.6;
                padding: 40px;
              }
              .print-header {
                text-align: center;
                margin-bottom: 40px;
                border-bottom: 2px solid #e5e5e5;
                padding-bottom: 20px;
              }
              .print-header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 8px;
                color: #000;
              }
              .print-header p {
                font-size: 13px;
                color: #666;
              }
              .card {
                border: 1px solid #e5e5e5;
                border-radius: 8px;
                margin-bottom: 24px;
                background-color: #fafafa;
                overflow: hidden;
              }
              .card-header {
                background-color: #f5f5f5;
                padding: 16px;
                border-bottom: 1px solid #e5e5e5;
              }
              .card-title {
                font-size: 16px;
                font-weight: 600;
                color: #000;
              }
              .card-content {
                padding: 20px;
              }
              .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 12px;
              }
              .grid.full {
                grid-template-columns: 1fr;
              }
              .field {
                margin-bottom: 0;
              }
              .field-label {
                font-size: 12px;
                color: #666;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 6px;
              }
              .field-value {
                font-size: 14px;
                color: #1a1a1a;
                font-weight: 500;
              }
              .badge {
                display: inline-block;
                padding: 6px 12px;
                background-color: #e5e5e5;
                color: #1a1a1a;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 12px;
              }
              thead {
                background-color: #f5f5f5;
              }
              th {
                padding: 12px;
                text-align: left;
                font-size: 12px;
                font-weight: 600;
                color: #1a1a1a;
                border-bottom: 2px solid #e5e5e5;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              td {
                padding: 12px;
                font-size: 13px;
                color: #1a1a1a;
                border-bottom: 1px solid #e5e5e5;
              }
              tbody tr:last-child td {
                border-bottom: none;
              }
              @media print {
                body {
                  padding: 20px;
                }
                .card {
                  page-break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            <div class="print-header">
              <h1>Recruitment Details</h1>
              <p>${recruitmentNotice.recruitmentNotice.recruitmentTitle}</p>
            </div>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className=" !max-w-[80vw] max-h-[90vh] overflow-y-auto"
    >
      <div className="flex justify-end pb-5">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="gap-2 bg-transparent"
        >
          <Printer className="w-4 h-4" />
          Print
        </Button>
      </div>

      <div ref={printRef} className="space-y-6">
        <Card className="rounded border shadow-none">
          <CardHeader>
            <CardTitle className="text-lg text-center">
              {recruitmentNotice?.recruitmentNotice?.recruitmentTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3  shadow-none">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">모집국가</p>
                <p className="font-medium">
                  {recruitmentNotice?.recruitmentNotice?.country}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">모집직군</p>
                <p className="font-medium">
                  {recruitmentNotice?.recruitmentNotice?.skill}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">모집기간</p>
                <p className="font-medium">
                  {dayjs(
                    recruitmentNotice?.recruitmentNotice?.startDate,
                  ).format("YYYY-MM-DD")}
                  ~
                  {dayjs(recruitmentNotice?.recruitmentNotice?.endDate).format(
                    "YYYY-MM-DD",
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">모집업체수</p>
                <p className="font-medium">
                  {recruitmentNotice?.recruitmentNotice?.companyWorkerCount}개
                  업체
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">기타 문의 :</p>
                <p className="font-medium">
                  {recruitmentNotice?.recruitmentNotice?.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="rounded border shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">지역별 선발배정(안):</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>지역</TableHead>
                    <TableHead>비율 (%)</TableHead>
                    <TableHead>선발업체</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recruitmentNotice.recruitmentNotice?.documents.map(
                    (doc: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {doc.region}
                        </TableCell>
                        <TableCell>{doc.ratio}%</TableCell>
                        <TableCell>{doc.numberOfApplicants}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
              <div className="text-sm text-gray-600">
                ※ 상기 지역별 선발인원은 지역별 조합원수 대비 비율로 정한다는
                연합회의 합의에 따름
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="rounded border shadow-none">
          <CardHeader>
            <CardTitle className="text-lg"> 업무관련 향 후 일정(안)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  1차 평가(동영상):
                </p>
                <p className="text-xs font-medium">
                  {formatDate(
                    recruitmentNotice?.recruitmentNotice?.firstStepStartDate,
                  )}{" "}
                  -{" "}
                  {formatDate(
                    recruitmentNotice?.recruitmentNotice?.firstStepEndDate,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {" "}
                  2차 평가(현지 기량평가):
                </p>
                <p className="text-xs font-medium">
                  {formatDate(
                    recruitmentNotice?.recruitmentNotice?.secondStepStartDate,
                  )}{" "}
                  -{" "}
                  {formatDate(
                    recruitmentNotice?.recruitmentNotice?.secondStepEndDate,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  외국인 근로자 매칭:
                </p>
                <p className="text-xs font-medium">
                  {formatDate(
                    recruitmentNotice?.recruitmentNotice
                      ?.foreignWorkerStartDate,
                  )}{" "}
                  -{" "}
                  {formatDate(
                    recruitmentNotice?.recruitmentNotice?.foreignWorkerEndDate,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  현장투입 예상일:
                </p>
                <p className="text-xs font-medium">
                  {formatDate(
                    recruitmentNotice?.recruitmentNotice
                      ?.onSiteDeploymentStartDate,
                  )}{" "}
                  -{" "}
                  {formatDate(
                    recruitmentNotice?.recruitmentNotice
                      ?.onSiteDeploymentEndDate,
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="rounded border shadow-none">
          <CardHeader>
            <CardTitle className="text-lg text-red-900">
              지역별 신청리스트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>조합</TableHead>
                    <TableHead>지역</TableHead>
                    <TableHead>업체명</TableHead>
                    <TableHead>관리사업번호</TableHead>
                    <TableHead>사업장전화번호</TableHead>
                    <TableHead>대표자 연락처</TableHead>
                    <TableHead>확정결과</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recruitmentNotice?.data?.length ? (
                    recruitmentNotice?.data?.map((app: any, idx: number) => (
                      <TableRow key={app.applicationId}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell className="font-medium">
                          {app.company?.region || "-"}
                        </TableCell>
                        <TableCell>{app.company?.address || "-"}</TableCell>
                        <TableCell className="capitalize">
                          {app.company.companyName}
                        </TableCell>
                        <TableCell>
                          {app.company?.managementBusinessNumber}
                        </TableCell>
                        <TableCell>
                          {app.company?.businessRegistrationNumber}
                        </TableCell>
                        <TableCell>
                          {app.company?.businessPhoneNumber}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={app?.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No applications found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};
