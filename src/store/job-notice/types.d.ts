import type { JobNotice } from "../../@types/JobNotice";

export interface AddJobNoticeResponse {
  success: boolean;
}

export interface AddJobNoticeRequest {
  recruitmentNoticeStartDate: string;
  recruitmentNoticeEndDate: string;
  evaluationId1: number;
  evaluationStartDate1: string;
  evaluationEndDate1: string;
  evaluationId2: number;
  evaluationStartDate2: string;
  evaluationEndDate2: string;
  description: string;
  recruitmentNoticeId: number;
}

export interface UpdateJobNoticeResponse {
  success: boolean;
}

export interface UpdateJobNoticeRequest {
  id: number;
  body: Partial<AddJobNoticeRequest>;
}

export interface GetJobNoticeByIDResponse {
  success: boolean;
  data: AddJobNoticeRequest;
}

export interface GetJobNoticeByIDResponse {
  data: JobNotice;
}

export interface GetJobNoticeListResponse {
  data: JobNotice[];
}

export interface GetJobNoticeListRequest {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface UpdateJobNoticeStatusRequest {
  id: number;
  status: string;
}

export interface GetJobNoticeApplicationByIdResponse {
  success: boolean;
  page_count: number;
  current_page: number;
  next_page: number;
  after_filtering_count: number;
  jobNotice: {
    id: number;
    workerAdId: number;
    workerAdStartDate: string;
    workerAdEndDate: string;
    evaluationId1: number;
    evaluationStartDate1: string;
    evaluationEndDate1: string;
    evaluationId2: number;
    evaluationStartDate2: string;
    evaluationEndDate2: string;
    description: string;
    status: string;
    createdAt: string;
  };
  data: {
    id: 1;
    workerId: 1;
    recruitmentNoticeId: 2;
    status: string;
    note: string;
    createdAt: string;
    updatedAt: string;
    worker: {
      id: number;
      email: string;
      password: string;
      name: string;
      dateOfBirth: string;
      phoneNumber: string;
      alternativePhoneNumber: string;
      gender: string;
      address: string;
      country: string;
      photoRegistration: string;
      graduationCertificate: string;
      qualification: string;
      cv: string;
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
      remarried: string;
      universities: {
        highestDegree: string;
        universityName: string;
        major: string;
        startDate: string;
        graduationDate: string;
      }[];
      foreignExperiences: any[];
      languageProficiencies: {
        language: string;
        proficiencyLevel: string;
        speakingLevel: string;
        writingAndReadingLevel: string;
        file: string;
      }[];
      professionalCertificates: {
        certificateType: string;
        issuingInstitution: string;
        issueDate: string;
        file: string;
      }[];
      workplaceInformation: {
        companyName: string;
        startDate: string;
        workingPeriod: string;
        field: string;
        position: string;
        file: string;
      }[];
      interviewVideo: string;
      skillsVerificationVideo: string;
      experienceVideo: string;
      sessionToken: string;
      refreshToken: string;
      agencyId: number;
      role: string;
      isVerified: boolean;
      createdAt: string;
      agency: {
        id: number;
        email: string;
        password: string;
        agencyName: string;
        businessRegistrationNumber: string;
        businessType: string;
        item: string;
        representativeName: string;
        representativeMobilePhone: string;
        representativeBusinessPhone: string;
        representativeAddress: string;
        country: string;
        sessionToken: string;
        refreshToken: string;
        role: string;
        isVerified: boolean;
        createdAt: string;
        koreanAgencyId: number;
      };
      interviewVideo: string;
      skillsVerificationVideo: string;
      experienceVideo: string;
      sessionToken: string;
      refreshToken: string;
      agencyId: number;
      role: string;
      isVerified: boolean;
      createdAt: string;
      agency: {
        id: number;
        email: string;
        password: string;
        agencyName: string;
        businessRegistrationNumber: string;
        businessType: string;
        item: string;
        representativeName: string;
        representativeMobilePhone: string;
        representativeBusinessPhone: string;
        representativeAddress: string;
        country: string;
        sessionToken: string;
        refreshToken: string;
        role: string;
        isVerified: boolean;
        createdAt: string;
        koreanAgencyId: number;
      };
    };
    recruitmentNotice: {
      id: number;
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
    };
    mark2: {
      id: number;
      title: string;
      subtitle: string;
      description: string;
      documentFile: string;
      assignments: {
        title: string;
        marks: [][{
          title: string;
          score: string;
        }];
        id: string;
      }[];
      createdAt: string;
    };
  }[];
}

export interface UpdateJobNoticeApplicationStatusRequest {
  id: number;
  status: string;
}

export interface GetJobNoticeApplicationByIdRequest {
  id: number;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string;
}

export interface GetJobNoticeApplicationIndividualByIdResponse {
  success: boolean;
  page_count: number;
  current_page: number;
  next_page: number;
  after_filtering_count: number;
  jobNotice: {
    id: number;
    workerAdId: number;
    workerAdStartDate: string;
    workerAdEndDate: string;
    evaluationId1: number;
    evaluationStartDate1: string;
    evaluationEndDate1: string;
    evaluationId2: number;
    evaluationStartDate2: string;
    evaluationEndDate2: string;
    description: string;
    status: string;
    createdAt: string;
  };
  data: {
    id: number;
    workerId: number;
    jobNoticeId: number;
    status: string;
    note: string;
    createdAt: string;
    updatedAt: string;
    worker: {
      id: number;
      email: string;
      password: string;
      representativeName: string;
      representativeMobilePhone: string;
      representativeMobilePhone2: string;
      age: number;
      gender: string;
      address: string;
      country: string;
      photoRegistration: string;
      graduationCertificate: string;
      qualification: string;
      sessionToken: string;
      refreshToken: string;
      isVerified: boolean;
      createdAt: string;
      cv: string;
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
      universities: [
        {
          highestDegree: string;
          universityName: string;
          major: string;
          startDate: string;
          graduationDate: string;
        },
        {
          highestDegree: string;
          universityName: string;
          major: string;
          startDate: string;
          graduationDate: string;
        }
      ];
      foreignExperiences: [
        {
          visitedCountry: string;
          durationOfVisit: string;
          purpose: string;
          file: string;
        },
        {
          visitedCountry: string;
          durationOfVisit: string;
          purpose: string;
          file: string;
        }
      ];
      languageProficiencies: [
        {
          language: string;
          proficiencyLevel: string;
          speakingLevel: string;
          writingAndReadingLevel: string;
          file: string;
        }
      ];
      professionalCertificates: [
        {
          certificateType: string;
          issuingInstitution: string;
          issueDate: string;
          file: string;
        },
        {
          certificateType: string;
          issuingInstitution: string;
          issueDate: string;
          file: string;
        }
      ];
      workplaceInformation: [
        {
          companyName: string;
          startDate: string;
          workingPeriod: number;
          field: string;
          position: string;
          file: string;
        }
      ];
      interviewVideo: string;
      skillsVerificationVideo: string;
      experienceVideo: string;
    };
    jobNotice: {
      id: number;
      workerAdId: number;
      workerAdStartDate: string;
      workerAdEndDate: string;
      evaluationId1: number;
      evaluationStartDate1: string;
      evaluationEndDate1: string;
      evaluationId2: number;
      evaluationStartDate2: string;
      evaluationEndDate2: string;
      description: string;
      status: string;
      createdAt: string;
    };
  }[];
}

export interface GetJobNoticeApplicationIndividualByIdRequest {
  id: number;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string;
}

export interface UpdateJobNoticeApplicationIndividualStatusRequest {
  id: number;
  status: string;
}

export interface UpdateJobNoticeAssignmentsResponse {
  success: boolean;
}

export interface UpdateJobNoticeAssignmentsRequest {
  workerId: number;
  recruitmentNoticeId: number;
  body: {
    assignments: [
      {
        title: string;
        rows: {
          subtitles: string[];
          scoreA: number;
          scoreB: number;
        }[];
      }
    ];
  };
}

export interface GetJobNoticeAssignmentsResponse {
  success: boolean;
  data: {
    id: number;
    workerId: number;
    recruitmentNoticeId: number;
    assignments: {
      title: string;
      rows: {
        subtitles: string[];
        scoreA: number;
        scoreB: number;
      }[];
    }[];
    markScoreA: number;
    markScoreB: number;
    markScoreTotalTitle: string;
    createdAt: string;
  };
}

export interface GetJobNoticeAssignmentsRequest {
  workerId: number;
  recruitmentNoticeId: number;
}
