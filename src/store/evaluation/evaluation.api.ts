import type {
  AddEvaluationRequest,
  AddEvaluationResponse,
  DeleteEvaluationResponse,
  GetEvaluationByIdRequest,
  GetEvaluationByIdResponse,
  GetEvaluationsRequest,
  GetEvaluationsResponse,
  UpdateEvaluationRequest,
  UpdateEvaluationResponse,
} from "./types";

import { API_ROUTES } from "@/constants";
import baseApi from "../api";

export const evaluationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvaluations: builder.query<
      GetEvaluationsResponse,
      GetEvaluationsRequest
    >({
      query: (params) => ({
        url: API_ROUTES.mark.getAll,
        method: "GET",
        params,
      }),
      providesTags: ["evaluation"],
    }),
    getEvaluationById: builder.query<
      GetEvaluationByIdResponse,
      GetEvaluationByIdRequest
    >({
      query: ({ id }) => ({
        url: API_ROUTES.mark.getById,
        method: "GET",
        params: { id },
      }),
      providesTags: ["evaluation"],
    }),
    addEvaluation: builder.mutation<
      AddEvaluationResponse,
      AddEvaluationRequest
    >({
      query: (body) => ({
        url: API_ROUTES.mark.add,
        method: "POST",
        body,
      }),
      invalidatesTags: ["evaluation"],
    }),
    updateEvaluation: builder.mutation<
      UpdateEvaluationResponse,
      UpdateEvaluationRequest
    >({
      query: ({ id, body }) => ({
        url: API_ROUTES.mark.update + id,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["evaluation"],
    }),
    deleteEvaluation: builder.mutation<DeleteEvaluationResponse, string>({
      query: (id) => ({
        url: API_ROUTES.mark.delete + id,
        method: "DELETE",
      }),
      invalidatesTags: ["evaluation"],
    }),
  }),
});

export const {
  useGetEvaluationsQuery,
  useGetEvaluationByIdQuery,
  useAddEvaluationMutation,
  useUpdateEvaluationMutation,
  useDeleteEvaluationMutation,
} = evaluationApi;
