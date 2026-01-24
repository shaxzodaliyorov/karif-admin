/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { RefreshCw } from "lucide-react";
import { useCallback, useMemo } from "react";
import { DescriptionField } from "./description-field";
import { DateRangeField } from "./date-range-field";
import { EvaluationSchedule } from "./evaluation-schedule";
import { REGIONS } from "@/constants/regions";
import { BasicFields } from "./basic-fields";
import { RegionAllocation } from "./region-allocation";
import { Button } from "../common/button/button";

type RecruitmentFormData = {
  recruitmentTitle: string;
  country: string;
  skill: string;
  startDate: string;
  endDate: string;
  companyWorkerCount: number;
  documents: Array<{
    region: string;
    ratio: number;
    numberOfApplicants: number;
  }>;
  mark1StartDate: string;
  mark1EndDate: string;
  mark2StartDate: string;
  mark2EndDate: string;
  foreignWorkerStartDate: string;
  foreignWorkerEndDate: string;
  onSiteDeploymentStartDate: string;
  onSiteDeploymentEndDate: string;
  description: string;
  countType: string;
  workerCount?: number;
  markId1: string;
  markId2: string;
};

interface RecruitmentFormProps {
  isEdit: boolean;
  isLoading: boolean;
  onSubmit: (data: RecruitmentFormData) => void;
  onReset: () => void;
}

export const RecruitmentForm = ({
  isEdit,
  isLoading,
  onSubmit,
  onReset,
}: RecruitmentFormProps) => {
  const defaultDocuments = useMemo(
    () =>
      REGIONS.map((region) => ({
        region: region.label,
        ratio: region.ratio || 0,
        numberOfApplicants: region.numberOfApplicants || 0,
      })),
    [],
  );

  const { control, handleSubmit, setValue, watch, trigger } =
    useForm<RecruitmentFormData>({
      defaultValues: {
        recruitmentTitle: "",
        country: "",
        skill: "",
        startDate: "",
        endDate: "",
        companyWorkerCount: 50,
        documents: defaultDocuments,
        mark1StartDate: "",
        mark1EndDate: "",
        mark2StartDate: "",
        mark2EndDate: "",
        foreignWorkerStartDate: "",
        foreignWorkerEndDate: "",
        onSiteDeploymentStartDate: "",
        onSiteDeploymentEndDate: "",
        description: "",
        countType: "",
        workerCount: undefined,
        markId1: "",
        markId2: "",
      },
    });

  const { fields } = useFieldArray({
    control,
    name: "documents",
  });

  const companyWorkerCount = watch("companyWorkerCount");
  const documents = watch("documents");

  const handleRatioChange = useCallback(
    (index: number, ratioStr: string) => {
      let ratio = parseFloat(ratioStr) || 0;
      if (ratio < 0) ratio = 0;
      if (ratio > 100) ratio = 100;

      const otherRatios =
        documents
          ?.filter((_, i) => i !== index)
          .reduce((sum, d) => sum + (Number(d.ratio) || 0), 0) || 0;
      const remainingRatio = 100 - otherRatios;
      if (ratio > remainingRatio) ratio = remainingRatio;

      setValue(`documents.${index}.ratio`, ratio);

      const applicants = Math.round((ratio / 100) * companyWorkerCount);
      setValue(`documents.${index}.numberOfApplicants`, applicants);

      trigger("documents");
    },
    [companyWorkerCount, documents, setValue, trigger],
  );

  const handleApplicantsChange = useCallback(
    (index: number, applicantsStr: string) => {
      let applicants = parseInt(applicantsStr, 10) || 0;
      if (applicants < 0) applicants = 0;

      const maxApplicants = companyWorkerCount;
      const otherApplicants =
        documents
          ?.filter((_, i) => i !== index)
          .reduce((sum, d) => sum + (Number(d.numberOfApplicants) || 0), 0) ||
        0;
      const remainingApplicants = maxApplicants - otherApplicants;
      if (applicants > remainingApplicants) applicants = remainingApplicants;

      setValue(`documents.${index}.numberOfApplicants`, applicants);

      const ratio =
        companyWorkerCount > 0 ? (applicants / companyWorkerCount) * 100 : 0;
      setValue(`documents.${index}.ratio`, parseFloat(ratio.toFixed(2)));

      trigger("documents");
    },
    [companyWorkerCount, documents, setValue, trigger],
  );

  const formSubmit = (formData: RecruitmentFormData) => {
    const dataToSend = {
      ...formData,
      foreignWorkerStartDate: formData.foreignWorkerStartDate
        ? dayjs(formData.foreignWorkerStartDate).toISOString()
        : "",
      foreignWorkerEndDate: formData.foreignWorkerEndDate
        ? dayjs(formData.foreignWorkerEndDate).toISOString()
        : "",
      onSiteDeploymentStartDate: formData.onSiteDeploymentStartDate
        ? dayjs(formData.onSiteDeploymentStartDate).toISOString()
        : "",
      onSiteDeploymentEndDate: formData.onSiteDeploymentEndDate
        ? dayjs(formData.onSiteDeploymentEndDate).toISOString()
        : "",
      documents: formData?.documents?.map((doc) => ({
        ...doc,
        ratio: doc.ratio.toString(),
        numberOfApplicants: doc.numberOfApplicants.toString(),
      })),
      markId1: Number(formData.markId1),
      markId2: Number(formData.markId2),
      mark1StartDate: formData.mark1StartDate
        ? dayjs(formData.mark1StartDate).toISOString()
        : "",
      mark1EndDate: formData.mark1EndDate
        ? dayjs(formData.mark1EndDate).toISOString()
        : "",
      mark2StartDate: formData.mark2StartDate
        ? dayjs(formData.mark2StartDate).toISOString()
        : "",
      mark2EndDate: formData.mark2EndDate
        ? dayjs(formData.mark2EndDate).toISOString()
        : "",
    };
    onSubmit(dataToSend as any);
  };

  return (
    <div className="mb-6 p-6 border rounded-lg bg-white shadow-none ">
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
        <BasicFields control={control} watch={watch} />

        <RegionAllocation
          fields={fields}
          watch={watch}
          handleRatioChange={handleRatioChange}
          handleApplicantsChange={handleApplicantsChange}
          register={control.register}
        />

        <EvaluationSchedule control={control} />

        <DateRangeField
          control={control}
          label="외국인 근로자 매칭"
          startName="foreignWorkerStartDate"
          endName="foreignWorkerEndDate"
        />

        <DateRangeField
          control={control}
          label="입국 및 현장 투입 예상"
          startName="onSiteDeploymentStartDate"
          endName="onSiteDeploymentEndDate"
        />

        <DescriptionField control={control} />

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition"
          >
            <RefreshCw className="w-4 h-4" /> 재설정
          </button>
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            {isEdit ? "업데이트" : "제출"}
          </Button>
        </div>
      </form>
    </div>
  );
};
