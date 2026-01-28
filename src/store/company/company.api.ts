/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ROUTES } from "@/constants";
import baseApi from "../api";
import type { LoginResponse } from "../auth/auth";

import type {
  GetCompanyRequest,
  GetCompanyResponse,
  VerifyCompanyRequest,
  VerifyCompanyResponse,
} from "./types";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<GetCompanyResponse, GetCompanyRequest>({
      query: (params) => ({
        url: API_ROUTES.company.getAll,
        method: "GET",
        params,
      }),
      providesTags: ["company"],
    }),
    verifyCompany: builder.mutation<
      VerifyCompanyResponse,
      VerifyCompanyRequest
    >({
      query: (body) => ({
        url: API_ROUTES.company.verifyCompany,
        method: "POST",
        body,
      }),
      invalidatesTags: ["company"],
    }),
    loginCompanyWithAdmin: builder.mutation<
      LoginResponse,
      { companyId: string }
    >({
      query: (body) => ({
        url: API_ROUTES.company.loginCompanyWithAdmin,
        method: "POST",
        body,
      }),
      invalidatesTags: ["company"],
    }),
    companySetStatusDocument: builder.mutation<
      void,
      { id: string; status: string; documentStatusMessage?: string }
    >({
      query: ({ id, status, documentStatusMessage }) => ({
        url: `/company/set-document-status/${id}`,
        method: "PUT",
        body: { status, documentStatusMessage },
      }),
      invalidatesTags: ["company"],
    }),
    getCompanyById: builder.query<any, string>({
      query: (id) => ({
        url: `/company/get/${id}`,
        method: "GET",
      }),
      providesTags: ["company"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useVerifyCompanyMutation,
  useLoginCompanyWithAdminMutation,
  useCompanySetStatusDocumentMutation,
  useGetCompanyByIdQuery,
} = companyApi;
