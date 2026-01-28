/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface Evaluation {
  id: string;
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

export type GetEvaluationByIdRequest = { id: string };
export type GetEvaluationByIdResponse = { data: Evaluation };

export type AddEvaluationRequest = {
  title: string;
  subtitle: string;
  description: string;
  documentFile?: string;
  assignments: {};
};
export type AddEvaluationResponse = { data: Evaluation };

export type UpdateEvaluationRequest = { id: string; body: Partial<Evaluation> };
export type UpdateEvaluationResponse = { data: Evaluation };

export type DeleteEvaluationRequest = { id: string };
export interface DeleteEvaluationResponse {}
