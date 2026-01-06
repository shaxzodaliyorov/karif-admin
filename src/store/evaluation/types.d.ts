/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface Evaluation {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  documentFile: string;
  assignments: {
    tasks: any[];
  };
  createdAt: string;
}

export type GetEvaluationsRequest = {
  search?: string;
  page?: number;
  per_page?: number;
};

export type GetEvaluationsResponse = {
  data: Evaluation[];
  success?: boolean;
  page_count?: number;
  current_page?: number;
  next_page?: number;
  after_filtering_count?: number;
};

export type GetEvaluationByIdRequest = { id: number };
export type GetEvaluationByIdResponse = { data: Evaluation };

export type AddEvaluationRequest = {
  title: string;
  subtitle: string;
  description: string;
  documentFile?: string;
  assignments: {};
};
export type AddEvaluationResponse = { data: Evaluation };

export type UpdateEvaluationRequest = { id: number; body: Partial<Evaluation> };
export type UpdateEvaluationResponse = { data: Evaluation };

export type DeleteEvaluationRequest = { id: number };
export interface DeleteEvaluationResponse {}
