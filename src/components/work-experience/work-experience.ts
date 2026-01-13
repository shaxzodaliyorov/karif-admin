export interface WorkExperience {
  companyName: string;
  startDate: string | Date;
  workingPeriod: number;
  field: string;
  position: string;
  file?: File | string | null;
}
