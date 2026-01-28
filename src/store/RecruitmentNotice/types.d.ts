/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RecruitmentNotice {
  _id: string;
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
  _id: string;
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
  _id: string;
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

export interface RecruitmentNoticeSeeMoreInfo {
  applicationId: string;
  status: string;
  workerCount: number;
  appliedAt: string;
  updatedAt: string;
  company: Company;
}

export interface Company {
  _id: string;
  email: string;
  password: string;
  companyName: string;
  businessRegistrationNumber: string;
  mainProduct: string;
  mainService: string;
  managementBusinessNumber: string;
  employeesCount: number;
  representativeName: string;
  representativeMobilePhone: string;
  businessPhoneNumber: string;
  fax: string;
  address: string;
  region: string;
  photoRegistration: string;
  businessRegistrationCertificate: string;
  managementBusinessRegistrationCertificate: string;
  smallAndMediumSizedBusinessConfirmationCertificate: string;
  localTaxPaymentCertificate: string;
  nationalTaxPaymentCertificate: string;
  insuranceCertificate: string;
  employmentStatusInquiryForm: string;
  documentStatusMessage: string;
  sessionToken: string;
  refreshToken: string;
  role: string;
  documentStatus: string;
  isVerified: boolean;
  createdAt: string;
}

export interface GetRecruitmentNoticeSeeMoreInfoResponse {
  success: boolean;
  data: RecruitmentNoticeSeeMoreInfo[];
  recruitmentNotice: {
    _id: string;
    recruitmentTitle: "1차 베트남";
    country: "Viet Nam";
    skill: "판금";
    startDate: "2025-12-01T00:00:00.000Z";
    endDate: "2025-12-31T00:00:00.000Z";
    companyWorkerCount: 50;
    countType: "byPercent";
    workerCount: 0;
    documents: {
      region: string;
      ratio: string;
      numberOfApplicants: string;
    }[];
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
    mark1: {
      _id: string;
      title: string;
      subtitle: string;
      description: string;
      documentFile: string;
      assignments: [
        {
          title: string;
          marks: {
            title: string;
            score: number;
          }[][];
        },
      ];
      createdAt: string;
    };
    mark2: {
      _id: string;
      title: string;
      subtitle: string;
      description: string;
      documentFile: string;
      assignments: [
        {
          title: string;
          marks: {
            title: string;
            score: number;
          }[][];
        },
      ];
      createdAt: string;
    };
  };
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

export type ApplyJobNoticeResponse = {
  success: boolean;
};

export type ApplyJobNoticeRequest = {
  workerId: string;
  jobNoticeId: string;
};
