import type { Workerad } from "../../@types/workerad";

export interface AddWorkerAdResponse {
  success: boolean;
}
export interface AddWorkerAdRequest {
  experience: string;
  skill: string;
  education: string;
  koreanLevel: string;
  age: string;
  description: string;
}

export interface GetAllWorkerAdsResponse {
  success: boolean;
  data: Workerad[];
}
export interface GetAllWorkerAdsRequest {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface UpdateWorkerAdResponse {
  success: boolean;
}
export interface UpdateWorkerAdRequest {
  id: number;
  body: {
    experience: string;
    skill: string;
    education: string;
    koreanLevel: string;
    age: string;
    description: string;
  };
}

export interface GetWorkerAdByIdResponse {
  success: boolean;
  data: Workerad;
}
export interface GetWorkerAdByIdRequest {
  id: number;
}

export interface DeleteWorkerAdResponse {
  success: boolean;
}
export interface DeleteWorkerAdRequest {
  id: number;
}

export interface AddWorkerResponse {}
export interface AddWorkerRequest {
  cv?: string;
  name: string;
  dateOfBirth: string;
  email: string;
  country: string;
  address: string;
  phoneNumber: string;
  alternativePhoneNumber: string;
  height: number;
  weight: number;
  religion: string;
  marital: string;
  shoeSize: number;
  bloodGroup: string;
  relationship: string;
  relPhoneNumber: string;
  relFullName: string;
  relDateOfBirth: string;
  collegeName: string;
  collageMajor: string;
  collageStartDate: string;
  collageGraduationDate: string;
  allergies: string;
  typeOfPropertyOwned: string;
  dietInformation: string;
  remarried: boolean;
  interviewVideo: string;
  skillsVerificationVideo: string;
  experienceVideo: string;
  photoRegistration?: string;
  graduationCertificate?: string;
  qualification?: string;
  universities: {
    highestDegree: string;
    universityName: string;
    major: string;
    startDate: string;
    graduationDate: string;
  }[];
  foreignExperiences: {
    visitedCountry: string;
    durationOfVisit: string;
    purpose: string;
    file?: string;
  }[];
  languageProficiencies: {
    language: string;
    proficiencyLevel: string;
    speakingLevel: string;
    writingAndReadingLevel: string;
    file?: string;
  }[];
  professionalCertificates: {
    certificateType: string;
    issuingInstitution: string;
    issueDate: string;
    file?: string;
  }[];
  workplaceInformation: {
    companyName: string;
    startDate: string;
    workingPeriod: number;
    field: string;
    position: string;
    file?: string;
  }[];
}

export interface WorkerUpdateRequest {
  id: number;
  body: Partial<AddWorkerRequest>;
}
