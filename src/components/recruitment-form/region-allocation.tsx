/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/recruitment/RegionAllocation.tsx

import { REGIONS } from "@/constants/regions";

interface RegionAllocationProps {
  fields: any[];
  watch: any;
  handleRatioChange: (index: number, value: string) => void;
  handleApplicantsChange: (index: number, value: string) => void;
  register: any;
}

export const RegionAllocation = ({
  fields,
  watch,
  handleRatioChange,
  handleApplicantsChange,
  register,
}: RegionAllocationProps) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">지역별 선발배정</h3>
        <div className="text-sm text-gray-600">
          <span className="mr-4">
            총 근로자 수: {watch("companyWorkerCount") || 0}명
          </span>
          <span>
            총 선발 비율:{" "}
            {watch("documents")?.reduce(
              (sum: number, doc: any) => sum + (doc.ratio || 0),
              0,
            ) || 0}
            %
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }, (_, colIndex) => {
          const start = colIndex * 8;
          const end = start + 8;
          return (
            <div key={colIndex} className="border rounded-lg p-4 bg-gray-50">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-xs">
                    <th className="border px-3 py-2 text-left w-32">지역</th>
                    <th className="border px-3 py-2 text-center w-24">
                      비율 (%)
                    </th>
                    <th className="border px-3 py-2 text-center">선발인원</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.slice(start, end).map((field, idx) => {
                    const index = start + idx;
                    const region = REGIONS[index]?.label || "";
                    const ratio = watch(`documents.${index}.ratio`) || 0;
                    const applicants =
                      watch(`documents.${index}.numberOfApplicants`) || 0;
                    const orderNo = index + 1;

                    return (
                      <tr key={field.id} className="hover:bg-white">
                        <td className="border px-3 py-2 text-sm">
                          <span className="font-medium">
                            {orderNo}. {region}
                          </span>
                          <input
                            type="hidden"
                            {...register(`documents.${index}.region`)}
                            value={region}
                          />
                        </td>
                        <td className="border px-3 py-2">
                          <input
                            type="text"
                            value={ratio}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (/^\d*\.?\d*$/.test(v))
                                handleRatioChange(index, v);
                            }}
                            className="w-full px-2 py-1 text-center border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="border px-3 py-2 text-center">
                          <input
                            type="text"
                            value={applicants}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (/^\d*$/.test(v))
                                handleApplicantsChange(index, v);
                            }}
                            className="w-full px-2 py-1 text-center bg-gray-100 text-sm rounded"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};
