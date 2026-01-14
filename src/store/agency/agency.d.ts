/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Agency } from "../../@types/agency";

export type GetAgenciesResponse = {
  success: boolean;
  page_count: number;
  current_page: number;
  next_page: number;
  after_filtering_count: number;
  data: Agency[];
};
export type GetAgenciesRequest = {
  search?: string;
  page: number;
  per_page: number;
  status?: string;
};

export interface VerifyAgencyRequest {
  agencyId: number;
  status: string;
}

export interface VerifyAgencyResponse {}

export interface GetAllPublicAgenciesRequest {
  country: string;
  search?: string;
  page?: number;
  per_page?: number;
}
