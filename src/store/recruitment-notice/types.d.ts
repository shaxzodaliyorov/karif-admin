import type { RecruitmentNotice } from "../../@types/recruitment-notice";

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
  status?: "openForCompany" | "openForWorker" | "closed";
}

export interface AddRecruitmentNoticeResponse {
  success: boolean;
  data: RecruitmentNotice;
}

export interface AddRecruitmentNoticeRequest {
  recruitmentTitle: string;
  country: string;
  skill: string;
  startDate: string;
  endDate: string;
  companyWorkerCount: number;
  countType: string;
  workerCount: number;
  documents: {
    region: string;
    ratio: string;
    numberOfApplicants: string;
  }[];
  markId1: number;
  markId2: number;
  foreignWorkerStartDate: string;
  foreignWorkerEndDate: string;
  onSiteDeploymentStartDate: string;
  onSiteDeploymentEndDate: string;
  mark1StartDate: string;
  mark1EndDate: string;
  mark2StartDate: string;
  mark2EndDate: string;
  description: string;
}

export interface UpdateRecruitmentNoticeResponse {
  success: boolean;
  data: RecruitmentNotice;
}

export interface UpdateRecruitmentNoticeRequest {
  id: string;
  body: Partial<AddRecruitmentNoticeRequest>;
}

export interface GetRecruitmentNoticeByIdResponse {
  success: boolean;
  data: RecruitmentNotice;
}

export interface GetRecruitmentNoticeByIdRequest {
  id: string;
}

export interface GetRecruitmentNoticeSeeMoreInfoResponse {
  success: boolean;
  page_count: number;
  current_page: number;
  next_page: number;
  after_filtering_count: number;
  recruitmentNotice: {
    _id: string;
    recruitmentTitle: number;
    country: string;
    skill: string;
    startDate: string;
    endDate: string;
    companyWorkerCount: number;
    documents: { region: string; ratio: string; numberOfApplicants: string }[];
    firstStepStartDate: string;
    firstStepEndDate: string;
    secondStepStartDate: string;
    secondStepEndDate: string;
    foreignWorkerStartDate: string;
    foreignWorkerEndDate: string;
    onSiteDeploymentStartDate: string;
    onSiteDeploymentEndDate: string;
    description: string;
    registeredCompany: number;
    createdAt: string;
  };
  data: {
    applicationId: 7;
    status: string;
    workerCount: number;
    appliedAt: string;
    updatedAt: string;
    company: {
      _id: string;
      companyName: string;
      email: string;
      businessRegistrationNumber: string;
      businessType: string;
      representativeName: string;
      representativeMobilePhone: string;
      businessPhoneNumber: string;
      address: string;
      isVerified: boolean;
      createdAt: string;
      region: string;
      managementBusinessNumber: string;
      documentStatus: "pending" | "approved" | "rejected";
    };
  }[];
}

export interface UpdateStatusRecruitmentNoticeSeeMoreInfoRequest {
  applicationId: string;
  status: "process" | "finish";
}

export interface UpdateRecruitmentNoticeSetStatusResponse {
  success: boolean;
}

export interface UpdateRecruitmentNoticeSetStatusRequest {
  id: string;
  body: {
    status: "openForCompany" | "openForWorker" | "closed";
  };
}
