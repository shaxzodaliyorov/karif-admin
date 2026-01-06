import { API_ROUTES } from "@/constants/api-routes";
import baseApi from "../api";

import type {
  LoginRequest,
  LoginResponse,
  SignUpAgencyRequest,
  SignUpAgencyResponse,
  SignUpCompanyRequest,
  SignUpCompanyResponse,
  SignUpWorkerRequest,
  SignUpWorkerResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UserResponse,
} from "./auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ROUTES.auth.login,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"],
    }),
    user: builder.query<UserResponse, void>({
      query: () => ({
        url: API_ROUTES.auth.me,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    signUpWorker: builder.mutation<SignUpWorkerResponse, SignUpWorkerRequest>({
      query: (credentials) => ({
        url: API_ROUTES.auth.signUpWorker,
        method: "POST",
        body: credentials,
      }),
    }),
    signUpAgency: builder.mutation<SignUpAgencyResponse, SignUpAgencyRequest>({
      query: (credentials) => ({
        url: API_ROUTES.auth.signUpAgency,
        method: "POST",
        body: credentials,
      }),
    }),
    signUpKoreanAgency: builder.mutation<
      SignUpAgencyResponse,
      SignUpAgencyRequest
    >({
      query: (credentials) => ({
        url: API_ROUTES.auth.signUpKoreanAgency,
        method: "POST",
        body: credentials,
      }),
    }),
    signUpCompany: builder.mutation<
      SignUpCompanyResponse,
      SignUpCompanyRequest
    >({
      query: (credentials) => ({
        url: API_ROUTES.auth.signUpCompany,
        method: "POST",
        body: credentials,
      }),
    }),
    updatePassword: builder.mutation<
      UpdatePasswordResponse,
      UpdatePasswordRequest
    >({
      query: (passwordData) => ({
        url: API_ROUTES.auth.updatePassword,
        method: "PUT",
        body: passwordData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useUserQuery,
  useLazyUserQuery,
  useSignUpWorkerMutation,
  useSignUpAgencyMutation,
  useSignUpCompanyMutation,
  useUpdatePasswordMutation,
  useSignUpKoreanAgencyMutation,
} = authApi;
