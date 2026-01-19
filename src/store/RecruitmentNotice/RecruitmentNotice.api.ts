import baseApi from "@/store/api";
import type {
  ApplyJobNoticeRequest,
  ApplyJobNoticeResponse,
  GetRecruitmentNoticeByAgencyOwnRequest,
  GetRecruitmentNoticeByAgencyOwnResponse,
  GetRecruitmentNoticeSeeMoreInfoResponse,
  RecruitmentNoticeApplyRequest,
  RecruitmentNoticeApplyResponse,
  RecruitmentNoticeRequest,
  RecruitmentNoticeResponse,
} from "@/store/RecruitmentNotice/types";

export const recruitmentNoticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    recruitmentNotice: builder.query<
      RecruitmentNoticeResponse,
      RecruitmentNoticeRequest
    >({
      query: (params) => ({
        url: "/recruitment-notice/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["recruitment-notice"],
    }),
    recruitmentNoticeByCompany: builder.query<
      RecruitmentNoticeResponse,
      RecruitmentNoticeRequest
    >({
      query: (params) => ({
        url: "/recruitment-notice/get-all-by-company-own",
        method: "GET",
        params,
      }),
      providesTags: ["recruitment-notice"],
    }),
    recruitmentNoticeApply: builder.mutation<
      RecruitmentNoticeApplyResponse,
      RecruitmentNoticeApplyRequest
    >({
      query: (body) => ({
        url: `/recruitment-notice/apply/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["recruitment-notice"],
    }),
    getRecruitmentNoticeById: builder.query<
      GetRecruitmentNoticeSeeMoreInfoResponse,
      number
    >({
      query: (id) => ({
        url: "/recruitment-notice/get-by-id" + id,
        method: "GET",
      }),
      providesTags: ["recruitment-notice"],
    }),
    recruitmentNoticeSeeMoreInfo: builder.query<
      GetRecruitmentNoticeSeeMoreInfoResponse,
      number
    >({
      query: (id) => ({
        url: "/recruitment-notice/get/" + id,
        method: "GET",
      }),
      providesTags: ["recruitment-notice"],
    }),
    getRecruitmentNoticeByAgencyOwn: builder.query<
      GetRecruitmentNoticeByAgencyOwnResponse,
      GetRecruitmentNoticeByAgencyOwnRequest
    >({
      query: (params) => ({
        url: "/recruitment-notice/get-all-by-agency-own",
        method: "GET",
        params,
      }),
      providesTags: ["recruitment-notice"],
    }),
    recruitmentNoticeApplyWorkers: builder.mutation<
      void,
      { id: number; workerIds: number[] }
    >({
      query: ({ id, workerIds }) => ({
        url: `/recruitment-notice/apply-agency-workers/${id}`,
        method: "POST",
        body: { workerIds },
      }),
      invalidatesTags: ["recruitment-notice"],
    }),
    applyWorkerJobNotice: builder.mutation<
      ApplyJobNoticeResponse,
      ApplyJobNoticeRequest
    >({
      query: ({ workerId, jobNoticeId }) => ({
        url: "/recruitment-notice/apply-worker/" + jobNoticeId,
        method: "POST",
        body: { workerId },
      }),
      invalidatesTags: ["recruitment-notice"],
    }),
  }),
});

export const {
  useLazyRecruitmentNoticeQuery,
  useRecruitmentNoticeQuery,
  useRecruitmentNoticeApplyMutation,
  useGetRecruitmentNoticeByIdQuery,
  useRecruitmentNoticeSeeMoreInfoQuery,
  useLazyRecruitmentNoticeByCompanyQuery,
  useRecruitmentNoticeByCompanyQuery,
  useLazyGetRecruitmentNoticeByAgencyOwnQuery,
  useGetRecruitmentNoticeByAgencyOwnQuery,
  useRecruitmentNoticeApplyWorkersMutation,
  useApplyWorkerJobNoticeMutation,
} = recruitmentNoticeApi;
