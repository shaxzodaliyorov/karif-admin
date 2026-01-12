import baseApi from '@/store/api';
import type {
  GetRecruitmentNoticeSeeMoreInfoResponse,
  RecruitmentNoticeApplyRequest,
  RecruitmentNoticeApplyResponse,
  RecruitmentNoticeRequest,
  RecruitmentNoticeResponse,
} from '@/store/RecruitmentNotice/types';

export const recruitmentNoticeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    recruitmentNotice: builder.query<
      RecruitmentNoticeResponse,
      RecruitmentNoticeRequest
    >({
      query: params => ({
        url: '/recruitment-notice/get-all',
        method: 'GET',
        params,
      }),
      providesTags: ['recruitment-notice'],
    }),
    recruitmentNoticeByCompany: builder.query<
      RecruitmentNoticeResponse,
      RecruitmentNoticeRequest
    >({
      query: params => ({
        url: '/recruitment-notice/get-all-by-company-own',
        method: 'GET',
        params,
      }),
      providesTags: ['recruitment-notice'],
    }),
    recruitmentNoticeApply: builder.mutation<
      RecruitmentNoticeApplyResponse,
      RecruitmentNoticeApplyRequest
    >({
      query: body => ({
        url: `/recruitment-notice/apply/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['recruitment-notice'],
    }),
    getRecruitmentNoticeById: builder.query<
      GetRecruitmentNoticeSeeMoreInfoResponse,
      number
    >({
      query: id => ({
        url: '/recruitment-notice/get-by-id' + id,
        method: 'GET',
      }),
      providesTags: ['recruitment-notice'],
    }),
    recruitmentNoticeSeeMoreInfo: builder.query<
      GetRecruitmentNoticeSeeMoreInfoResponse,
      number
    >({
      query: id => ({
        url: '/recruitment-notice/get/' + id,
        method: 'GET',
      }),
      providesTags: ['recruitment-notice'],
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
} = recruitmentNoticeApi;
