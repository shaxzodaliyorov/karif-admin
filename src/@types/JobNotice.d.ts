export interface JobNotice {
  _id: number;
  workerAdId: number;
  recruitmentNoticeStartDate: string;
  evaluationId1: number;
  evaluationStartDate1: string;
  evaluationEndDate1: string;
  evaluationId2: number;
  evaluationStartDate2: string;
  evaluationEndDate2: string;
  description: string;
  status: string;
  createdAt: string;
  recruitmentNoticeEndDate: string;
  recruitmentNotice: {
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
  evaluation1: {
    _id: string;
    evaluationList: string;
    evaluationName: string;
    evaluationStyle: string;
    evaluation: {
      tasks: {
        taskName: string;
        items: {
          criteria: string;
          score: string;
        }[];
      }[];
    };
    createdAt: string;
    updatedAt: string;
  };
  evaluation2: {
    _id: string;
    evaluationList: string;
    evaluationName: string;
    evaluationStyle: string;
    evaluation: {
      tasks: {
        taskName: string;
        items: {
          criteria: string;
          score: string;
        }[];
      }[];
    };
    createdAt: string;
    updatedAt: string;
  };
}
