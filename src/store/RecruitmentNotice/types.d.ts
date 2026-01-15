export interface RecruitmentNotice {
  id: number;
  recruitmentTitle: string;
  country: string;
  skill: string;
  startDate: string;
  endDate: string;
  companyWorkerCount: number;
  countType: string;
  workerCount: number;
  documents: Document[];
  markId1: number;
  mark1StartDate: string;
  mark1EndDate: string;
  markId2: number;
  mark2StartDate: string;
  mark2EndDate: string;
  foreignWorkerStartDate: string;
  foreignWorkerEndDate: string;
  onSiteDeploymentStartDate: string;
  onSiteDeploymentEndDate: string;
  description: string;
  status: string;
  registeredCompany: number;
  createdAt: string;
  mark1: Mark1;
  mark2: Mark2;
  type: string;
  applicationStatus?: {
    hasApplied: boolean;
    status: "waiting" | "preparing" | "selected";
    workerCount: number;
    applicationId: number;
    appliedAt: string;
  };
}

export interface Document {
  region: string;
  ratio: string;
  numberOfApplicants: string;
}

export interface Mark1 {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  documentFile: string;
  assignments: Assignments;
  createdAt: string;
}

export interface Assignments {
  tasks: Task[];
}

export interface Task {
  taskName: string;
  items: Item[];
}

export interface Item {
  criteria: string;
  score: string;
}

export interface Mark2 {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  documentFile: string;
  assignments: Assignments2;
  createdAt: string;
}

export interface Assignments2 {
  tasks: any[];
}

export interface RecruitmentNoticeResponse {
  success: boolean;
  page_count: number;
  current_page: number;
  next_page: number | null;
  after_filtering_count: number;
  data: RecruitmentNotice[];
}

export interface RecruitmentNoticeRequest {
  search?: string;
  page?: number;
  per_page?: number;
  companyId?: string;
  status?: "openForCompany" | "openForWorker" | "closed";
}

export interface RecruitmentNoticeApplyResponse {
  success: boolean;
}
export interface RecruitmentNoticeApplyRequest {
  recruitmentNoticeId: number;
  workerCount: number;
}

export interface GetAllRecruitmentNoticeResponse {
  success: boolean;
  page_count: number;
  current_page: number;
  next_page: number | null;
  after_filtering_count: number;
  data: RecruitmentNotice[];
}

export interface GetAllRecruitmentNoticeRequest {
  search?: string;
  page?: number;
  per_page?: number;
  companyId?: number;
}

export interface GetRecruitmentNoticeByIdResponse {
  success: boolean;
  data: RecruitmentNotice;
}

export interface GetRecruitmentNoticeSeeMoreInfoResponse {
  success: boolean;
  data: RecruitmentNotice;
}

export interface GetRecruitmentNoticeByAgencyOwnResponse {
  success: boolean;
  data: RecruitmentNoticeByAgencyOwn[];
  page_count: number;
}

export interface GetRecruitmentNoticeByAgencyOwnRequest {
  search?: string;
  page?: number;
  per_page?: number;
  status?: "openForCompany" | "openForWorker" | "closed";
}
