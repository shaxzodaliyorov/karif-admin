import { API_ROUTES } from "@/constants";
import baseApi from "../api";
import type { LoginResponse } from "../auth/auth";

import type {
  GetAllWorkersRequest,
  GetAllWorkersResponse,
  VerifyWorkerRequest,
  VerifyWorkerResponse,
} from "./types";

export const workerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkers: builder.query<GetAllWorkersResponse, GetAllWorkersRequest>({
      query: (params) => ({
        url: API_ROUTES.worker.getAll,
        method: "GET",
        params,
      }),
      providesTags: ["worker"],
    }),
    verifyWorker: builder.mutation<VerifyWorkerResponse, VerifyWorkerRequest>({
      query: (body) => ({
        url: API_ROUTES.agency.verifyAgency,
        method: "POST",
        body,
      }),
      invalidatesTags: ["worker"],
    }),
    loginWorkerWithAdmin: builder.mutation<LoginResponse, { workerId: number }>(
      {
        query: (body) => ({
          url: API_ROUTES.worker.loginWorkerWithAdmin,
          method: "POST",
          body,
        }),
        invalidatesTags: ["worker"],
      },
    ),
  }),
});

export const {
  useGetAllWorkersQuery,
  useVerifyWorkerMutation,
  useLoginWorkerWithAdminMutation,
} = workerApi;
