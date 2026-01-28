import baseApi from "../api";

import type {
  AddJobNoticeRequest,
  AddJobNoticeResponse,
  GetAllJobNoticesOwnRequest,
  GetAllJobNoticesOwnResponse,
  GetJobNoticeApplicationByIdRequest,
  GetJobNoticeApplicationByIdResponse,
  GetJobNoticeApplicationIndividualByIdRequest,
  GetJobNoticeApplicationIndividualByIdResponse,
  GetJobNoticeAssignmentsRequest,
  GetJobNoticeAssignmentsResponse,
  GetJobNoticeByIDResponse,
  GetJobNoticeListRequest,
  GetJobNoticeListResponse,
  UpdateJobNoticeApplicationIndividualStatusRequest,
  UpdateJobNoticeApplicationStatusRequest,
  UpdateJobNoticeAssignmentsRequest,
  UpdateJobNoticeAssignmentsResponse,
  UpdateJobNoticeRequest,
  UpdateJobNoticeResponse,
  UpdateJobNoticeStatusRequest,
} from "./types";

export const JobNoticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addJobNotice: builder.mutation<AddJobNoticeResponse, AddJobNoticeRequest>({
      query: (body) => ({
        url: "/recruitment-notice/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["job-notice-list"],
    }),
    updateJobNotice: builder.mutation<
      UpdateJobNoticeResponse,
      UpdateJobNoticeRequest
    >({
      query: ({ id, body }) => ({
        url: `/recruitment-notice/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["job-notice-list"],
    }),
    updateJobNoticeStatus: builder.mutation<void, UpdateJobNoticeStatusRequest>(
      {
        query: ({ id, status }) => ({
          url: `/recruitment-notice/set-status/${id}`,
          method: "PUT",
          body: { status },
        }),
        invalidatesTags: ["job-notice-list"],
      },
    ),
    getAllJobNoticesOwn: builder.query<
      GetAllJobNoticesOwnResponse,
      GetAllJobNoticesOwnRequest
    >({
      query: (params) => ({
        url: "/recruitment-notice/get-all-by-worker-own",
        method: "GET",
        params,
      }),
      providesTags: ["job-notice-list"],
    }),
    deleteJobNotice: builder.mutation<void, string>({
      query: (id) => ({
        url: `/recruitment-notice/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job-notice-list"],
    }),
    GetJobNoticeByID: builder.query<GetJobNoticeByIDResponse, string>({
      query: (id) => ({
        url: `/recruitment-notice/get/${id}`,
        method: "GET",
      }),
      providesTags: ["job-notice-list"],
    }),
    GetJobNoticeList: builder.query<
      GetJobNoticeListResponse,
      GetJobNoticeListRequest
    >({
      query: (params) => ({
        url: "/recruitment-notice/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["job-notice-list"],
    }),
    getJobNoticeApplicationById: builder.query<
      GetJobNoticeApplicationByIdResponse,
      GetJobNoticeApplicationByIdRequest
    >({
      query: ({ id, search, page, per_page, status }) => ({
        url: `/recruitment-notice/worker-applications/${id}`,
        method: "GET",
        params: { search, page, per_page, status },
      }),
      providesTags: ["job-notice-list"],
    }),
    getJobNoticeApplicationIndividualById: builder.query<
      GetJobNoticeApplicationIndividualByIdResponse,
      GetJobNoticeApplicationIndividualByIdRequest
    >({
      query: ({ id, search, page, per_page, status }) => ({
        url: `/recruitment-notice/worker-applications/${id}`,
        method: "GET",
        params: {
          search,
          page,
          per_page,
          status,
        },
      }),
      providesTags: ["job-notice-list"],
    }),

    getJobNoticeApplicationNoteById: builder.mutation<
      GetJobNoticeApplicationByIdResponse,
      { id: string; body: { note: string } }
    >({
      query: ({ id, body }) => ({
        url: `/recruitment-notice/worker-application/note/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["job-notice-list"],
    }),
    updateJobNoticeApplicationIndividualNoteById: builder.mutation<
      GetJobNoticeApplicationByIdResponse,
      { id: string; body: { note: string } }
    >({
      query: ({ id, body }) => ({
        url: `/recruitment-notice/worker-application/note/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["job-notice-list"],
    }),
    updateJobNoticeApplicationStatus: builder.mutation<
      void,
      UpdateJobNoticeApplicationStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/recruitment-notice/worker-application/status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["job-notice-list"],
    }),
    updateJobNoticeApplicationIndividualStatus: builder.mutation<
      void,
      UpdateJobNoticeApplicationIndividualStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/recruitment-notice/worker-application/status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["job-notice-list"],
    }),
    updateJobNoticeAssignments: builder.mutation<
      UpdateJobNoticeAssignmentsResponse,
      UpdateJobNoticeAssignmentsRequest
    >({
      query: ({ workerId, recruitmentNoticeId, body }) => ({
        url: `/recruitment-notice/worker/${workerId}/recruitment-notice/${recruitmentNoticeId}/assignments`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["job-notice-list"],
    }),
    getJobNoticeAssignments: builder.query<
      GetJobNoticeAssignmentsResponse,
      GetJobNoticeAssignmentsRequest
    >({
      query: ({ workerId, recruitmentNoticeId }) => ({
        url: `/recruitment-notice/worker/${workerId}/recruitment-notice/${recruitmentNoticeId}/assignments`,
        method: "GET",
      }),
      providesTags: ["job-notice-list"],
    }),
  }),
});

export const {
  useAddJobNoticeMutation,
  useUpdateJobNoticeMutation,
  useDeleteJobNoticeMutation,
  useGetJobNoticeByIDQuery,
  useUpdateJobNoticeStatusMutation,
  useGetJobNoticeApplicationByIdQuery,
  useGetJobNoticeApplicationNoteByIdMutation,
  useUpdateJobNoticeApplicationStatusMutation,
  useGetJobNoticeApplicationIndividualByIdQuery,
  useUpdateJobNoticeApplicationIndividualStatusMutation,
  useUpdateJobNoticeApplicationIndividualNoteByIdMutation,
  useUpdateJobNoticeAssignmentsMutation,
  useGetJobNoticeAssignmentsQuery,
  useGetJobNoticeListQuery,
  useGetAllJobNoticesOwnQuery,
} = JobNoticeApi;
