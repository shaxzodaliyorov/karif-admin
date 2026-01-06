import type { Workerad } from '../../@types/workerad';

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
