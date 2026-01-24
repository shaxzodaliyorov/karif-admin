/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { COUNTRIES } from "../../constants/countries";
import { COUNT_TYPES, SKILLS } from "./constants";

interface BasicFieldsProps {
  control: any;
  watch: any;
}

export const BasicFields = ({ control, watch }: BasicFieldsProps) => {
  return (
    <div className="grid gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          채용 공고 제목
        </label>
        <Controller
          name="recruitmentTitle"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            모집국가
          </label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full rounded-md !h-11">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(({ value, label }) => (
                    <SelectItem key={value} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            모집 SKILL
          </label>
          <Controller
            name="skill"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full rounded-md !h-11">
                  <SelectValue placeholder="SKILL 선택" />
                </SelectTrigger>
                <SelectContent>
                  {SKILLS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            모집 시작일
          </label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            모집 종료일
          </label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          신청기준
        </label>
        <Controller
          name="countType"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full rounded-md !h-11">
                <SelectValue placeholder="신청기준" />
              </SelectTrigger>
              <SelectContent>
                {COUNT_TYPES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {watch("countType") === "workerCount" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            업체별 고용신청수 제한
          </label>
          <Controller
            name="workerCount"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                min="1"
                {...field}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) =>
                  ["e", "+", "-"].includes(e.key) && e.preventDefault()
                }
              />
            )}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          모집 업체수 (총 근로자 수)
        </label>
        <Controller
          name="companyWorkerCount"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              min="1"
              {...field}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) =>
                ["e", "+", "-"].includes(e.key) && e.preventDefault()
              }
            />
          )}
        />
      </div>
    </div>
  );
};
