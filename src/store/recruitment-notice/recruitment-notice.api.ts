import baseApi from "../api";

import type {
  AddRecruitmentNoticeRequest,
  AddRecruitmentNoticeResponse,
  GetAllRecruitmentNoticeRequest,
  GetAllRecruitmentNoticeResponse,
  GetRecruitmentNoticeByIdResponse,
  GetRecruitmentNoticeSeeMoreInfoResponse,
  UpdateRecruitmentNoticeRequest,
  UpdateRecruitmentNoticeResponse,
  UpdateRecruitmentNoticeSetStatusRequest,
  UpdateRecruitmentNoticeSetStatusResponse,
  UpdateStatusRecruitmentNoticeSeeMoreInfoRequest,
} from "./types";

export const recruitmentNoticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitmentNotice: builder.query<
      GetAllRecruitmentNoticeResponse,
      GetAllRecruitmentNoticeRequest
    >({
      query: (params) => ({
        url: "/recruitment-notice/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["recruitment-notice"],
    }),
    addRecruitmentNotice: builder.mutation<
      AddRecruitmentNoticeResponse,
      AddRecruitmentNoticeRequest
    >({
      query: (body) => ({
        url: "/recruitment-notice/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["recruitment-notice"],
    }),
    updateRecruitmentNotice: builder.mutation<
      UpdateRecruitmentNoticeResponse,
      UpdateRecruitmentNoticeRequest
    >({
      query: ({ id, body }) => ({
        url: "/recruitment-notice/update/" + id,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["recruitment-notice"],
    }),
    deleteRecruitmentNotice: builder.mutation<void, string>({
      query: (id) => ({
        url: "/recruitment-notice/delete/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["recruitment-notice"],
    }),
    getRecruitmentNoticeById: builder.query<
      GetRecruitmentNoticeByIdResponse,
      string
    >({
      query: (id) => ({
        url: "/recruitment-notice/get-by-id" + id,
        method: "GET",
      }),
      providesTags: ["recruitment-notice"],
    }),
    recruitmentNoticeSeeMoreInfo: builder.query<
      GetRecruitmentNoticeSeeMoreInfoResponse,
      string
    >({
      query: (id) => ({
        url: "/recruitment-notice/see-more-info/" + id,
        method: "GET",
      }),
      providesTags: ["recruitment-notice"],
    }),
    updateStatusRecruitmentNoticeSeeMoreInfo: builder.mutation<
      void,
      UpdateStatusRecruitmentNoticeSeeMoreInfoRequest
    >({
      query: ({ applicationId, status }) => ({
        url: "/recruitment-notice/see-more-info/set-status/" + applicationId,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["recruitment-notice"],
    }),
    updateRecruitmentNoticeSetStatus: builder.mutation<
      UpdateRecruitmentNoticeSetStatusResponse,
      UpdateRecruitmentNoticeSetStatusRequest
    >({
      query: ({ id, body }) => ({
        url: "/recruitment-notice/set-status/" + id,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["recruitment-notice"],
    }),
  }),
});

export const {
  useGetRecruitmentNoticeQuery,
  useAddRecruitmentNoticeMutation,
  useUpdateRecruitmentNoticeMutation,
  useDeleteRecruitmentNoticeMutation,
  useGetRecruitmentNoticeByIdQuery,
  useRecruitmentNoticeSeeMoreInfoQuery,
  useUpdateStatusRecruitmentNoticeSeeMoreInfoMutation,
  useUpdateRecruitmentNoticeSetStatusMutation,
} = recruitmentNoticeApi;
