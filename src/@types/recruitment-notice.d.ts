export interface RecruitmentNotice {
  _id: string;
  recruitmentTitle: string;
  country: string;
  skill: string;
  startDate: string;
  endDate: string;
  companyWorkerCount: number;
  documents: {
    region: string;
    ratio: string;
    numberOfApplicants: string;
  }[];
  foreignWorkerStartDate: string;
  foreignWorkerEndDate: string;
  onSiteDeploymentStartDate: string;
  onSiteDeploymentEndDate: string;
  description: string;
  registeredCompany: number;
  createdAt: string;
  countType: string;
  workerCount: number;
  markId1: number;
  markId2: number;
  mark1StartDate: string;
  mark1EndDate: string;
  mark2StartDate: string;
  mark2EndDate: string;
  status: "openForCompany" | "openForWorker" | "closed";
}
