import type { BusinessOwner } from '../../@types/business-owner';

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface AddBusinessOwnerResponse {}
export interface AddBusinessOwnerRequest {
  description: string;
  data: {
    name: string;
    file_path: string;
  }[];
}

export interface GetBusinessOwnerResponse {
  data: BusinessOwner[];
  success: boolean;
  page_count: number;
  current_page: number;
  next_page: number;
  after_filtering_count: number;
  applyDocument?: string;
}

export interface GetBusinessOwnerRequest {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface UpdateBusinessOwnerRequest {
  id: number;
  body: Partial<AddBusinessOwnerRequest>;
}

export interface getBusinessOwnerByIdResponse {
  data: BusinessOwner;
}
