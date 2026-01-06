/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Company } from '../../@types/company';

export type GetCompanyResponse = {
  data: Company[];
  success: boolean;
  page_count: number;
  current_page: number;
  next_page: number;
  after_filtering_count: number;
};
export type GetCompanyRequest = {
  search?: string;
  page?: number;
  per_page?: number;
  applyDocument?: string;
};

export interface VerifyCompanyResponse {}

export interface VerifyCompanyRequest {
  companyId: number;
  status: string;
}
