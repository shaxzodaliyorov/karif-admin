type CountType = "workerCount" | "byPercent";

type RegionData = {
  region: string;
  ratio: string;
  numberOfApplicants: string;
};

export function generateWorkerArray(
  data: RegionData[],
  countType: CountType,
  totalWorkerCount?: number,
  employeesSize?: number,
): number[] {
  if (countType === "byPercent") {
    if (!employeesSize) return [];

    const percentCount = Math.floor(employeesSize * 0.2);

    return Array.from({ length: percentCount }, (_, i) => i + 1);
  }

  if (countType === "workerCount") {
    if (!totalWorkerCount) return [];

    const targetRegion = data.find((item) => item.region === "충남(세종)");

    if (!targetRegion) return [];

    const applicantsCount = Number(targetRegion.numberOfApplicants);

    const maxAllowed = Math.min(applicantsCount, totalWorkerCount);

    return Array.from({ length: maxAllowed }, (_, i) => i + 1);
  }

  return [];
}
