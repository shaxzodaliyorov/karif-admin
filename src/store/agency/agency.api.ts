/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ROUTES } from "@/constants/api-routes";
import baseApi from "../api";
import type { LoginResponse } from "../auth/auth";

import type {
  GetAgenciesRequest,
  GetAgenciesResponse,
  GetAllPublicAgenciesRequest,
  VerifyAgencyRequest,
  VerifyAgencyResponse,
} from "./agency";

export const agencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgencies: builder.query<GetAgenciesResponse, GetAgenciesRequest>({
      query: (params) => ({
        url: API_ROUTES.agency.getAll,
        method: "GET",
        params,
      }),
      providesTags: ["agency"],
    }),
    getAllPublicAgencies: builder.query<
      GetAgenciesResponse,
      GetAllPublicAgenciesRequest
    >({
      query: (params) => ({
        url: API_ROUTES.agency.getAllPublicAgencies,
        method: "GET",
        params,
      }),
      providesTags: ["agency"],
    }),
    getKoreanAgencies: builder.query<GetAgenciesResponse, GetAgenciesRequest>({
      query: (params) => ({
        url: API_ROUTES.koreanAgency.getAll,
        method: "GET",
        params,
      }),
      providesTags: ["agency"],
    }),
    verifyAgency: builder.mutation<VerifyAgencyResponse, VerifyAgencyRequest>({
      query: (body) => ({
        url: API_ROUTES.agency.verifyAgency,
        method: "POST",
        body,
      }),
      invalidatesTags: ["agency"],
    }),
    verifyWorker: builder.mutation<
      VerifyAgencyResponse,
      {
        workerId: string;
        status: "verified" | "unverified";
      }
    >({
      query: (body) => ({
        url: "/worker/verify-worker/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["agency", "worker"],
    }),
    getAllKoreanAgencies: builder.query<
      GetAgenciesResponse,
      GetAgenciesRequest
    >({
      query: (params) => ({
        url: API_ROUTES.koreanAgency.getAll,
        method: "GET",
        params,
      }),
      providesTags: ["agency"],
    }),
    verifyKoreanAgency: builder.mutation<
      VerifyAgencyResponse,
      { koreanAgencyId: string; status: string }
    >({
      query: (body) => ({
        url: API_ROUTES.agency.verifyKoreanAgency,
        method: "POST",
        body,
      }),
      invalidatesTags: ["agency"],
    }),
    loginKoreanAgencyWithAdmin: builder.mutation<
      LoginResponse,
      { koreanAgencyId: string }
    >({
      query: (body) => ({
        url: API_ROUTES.koreanAgency.loginKoreanAgencyWithAdmin,
        method: "POST",
        body,
      }),
      invalidatesTags: ["agency"],
    }),
    loginAgencyWithAdmin: builder.mutation<LoginResponse, { agencyId: string }>(
      {
        query: (body) => ({
          url: API_ROUTES.agency.loginAgencyWithAdmin,
          method: "POST",
          body,
        }),
        invalidatesTags: ["agency"],
      },
    ),
    getAgencyById: builder.query<any, string>({
      query: (id) => ({
        url: `/agency/get/${id}`,
        method: "GET",
      }),
      providesTags: ["agency"],
    }),
    getKoreanAgencyById: builder.query<any, string>({
      query: (id) => ({
        url: `/korean-agency/get/${id}`,
        method: "GET",
      }),
      providesTags: ["agency"],
    }),
  }),
});

export const {
  useGetAgenciesQuery,
  useVerifyAgencyMutation,
  useLoginAgencyWithAdminMutation,
  useGetKoreanAgenciesQuery,
  useLoginKoreanAgencyWithAdminMutation,
  useVerifyKoreanAgencyMutation,
  useGetAllKoreanAgenciesQuery,
  useGetAllPublicAgenciesQuery,
  useVerifyWorkerMutation,
  useGetAgencyByIdQuery,
  useGetKoreanAgencyByIdQuery,
} = agencyApi;
