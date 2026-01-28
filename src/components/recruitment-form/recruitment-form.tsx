/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo } from "react";
import { DescriptionField } from "./description-field";
import { DateRangeField } from "./date-range-field";
import { EvaluationSchedule } from "./evaluation-schedule";
import { REGIONS } from "@/constants/regions";
import { BasicFields } from "./basic-fields";
import { RegionAllocation } from "./region-allocation";
import { Button } from "../common/button/button";
import { useGetRecruitmentNoticeByIdQuery } from "@/store/RecruitmentNotice/RecruitmentNotice.api";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

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
  mark1: string;
  mark2: string;
};

interface RecruitmentFormProps {
  isEdit: boolean;
  isLoading: boolean;
  onSubmit: (data: RecruitmentFormData) => void;
}

export const RecruitmentForm = ({
  isEdit,
  isLoading,
  onSubmit,
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

  const { id } = useParams();

  const {
    data: { data: recruitmentNotice = {} } = {},
    isLoading: isLoadingData,
  } = useGetRecruitmentNoticeByIdQuery(id as string);

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
        mark1: "",
        mark2: "",
      },
    });

  const { fields, remove, append } = useFieldArray({
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
      mark1: formData.mark1,
      mark2: formData.mark2,
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

  useEffect(() => {
    if (isEdit && recruitmentNotice) {
      const format = (date: string | null | undefined) =>
        date ? dayjs(date).format("YYYY-MM-DD") : "";
      setTimeout(() => {
        setValue("recruitmentTitle", recruitmentNotice.recruitmentTitle);
        setValue("mark1StartDate", format(recruitmentNotice?.mark1StartDate));
        setValue("mark1EndDate", format(recruitmentNotice?.mark1EndDate));
        setValue("mark2StartDate", format(recruitmentNotice?.mark2StartDate));
        setValue("mark2EndDate", format(recruitmentNotice?.mark2EndDate));
        setValue("recruitmentTitle", recruitmentNotice?.recruitmentTitle ?? "");
        setValue("country", recruitmentNotice?.country ?? "");
        setValue("skill", recruitmentNotice?.skill ?? "");
        setValue("startDate", recruitmentNotice?.startDate ?? "");
        setValue("endDate", recruitmentNotice?.endDate ?? "");
        setValue(
          "companyWorkerCount",
          Number(recruitmentNotice?.companyWorkerCount) || 1,
        );
        setValue("countType", recruitmentNotice?.countType ?? "");
        setValue("workerCount", Number(recruitmentNotice?.workerCount) || 1);
        setValue(
          "foreignWorkerStartDate",
          format(recruitmentNotice?.foreignWorkerStartDate),
        );
        setValue(
          "foreignWorkerEndDate",
          format(recruitmentNotice?.foreignWorkerEndDate),
        );
        setValue(
          "onSiteDeploymentStartDate",
          format(recruitmentNotice?.onSiteDeploymentStartDate),
        );

        setValue(
          "onSiteDeploymentEndDate",
          format(recruitmentNotice?.onSiteDeploymentEndDate),
        );
        setValue("description", recruitmentNotice?.description ?? "");

        setValue("mark1", recruitmentNotice?.mark1 ?? "");
        setValue("mark2", recruitmentNotice?.mark2 ?? "");

        const docs: any = Array.isArray(recruitmentNotice.documents)
          ? recruitmentNotice.documents.map((d: any) => ({
              region: d.region ?? "",
              ratio: d.ratio ? Number(d.ratio.replace("%", "")) : 0,
              numberOfApplicants: Number(d.numberOfApplicants) || 0,
            }))
          : defaultDocuments;

        docs.forEach((_: any, i: number) => remove(i));
        docs.forEach((doc: any) => append(doc));
      }, 100);
    }
  }, [isEdit, recruitmentNotice]);

  if (isLoadingData && isEdit) {
    return (
      <div className="w-full h-100 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

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
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            {isEdit ? "Edit" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};
