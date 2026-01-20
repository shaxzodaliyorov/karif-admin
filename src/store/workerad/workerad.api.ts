import baseApi from "../api";

import type {
  AddWorkerAdRequest,
  AddWorkerAdResponse,
  AddWorkerRequest,
  AddWorkerResponse,
  GetAllWorkerAdsRequest,
  GetAllWorkerAdsResponse,
  GetWorkerAdByIdResponse,
  UpdateWorkerAdRequest,
  UpdateWorkerAdResponse,
} from "./types";

export const workeradApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkerAds: builder.query<
      GetAllWorkerAdsResponse,
      GetAllWorkerAdsRequest
    >({
      query: () => ({
        url: "/worker-ad/get-all",
        method: "GET",
      }),
      providesTags: ["WorkerAds"],
    }),
    addWorkerAd: builder.mutation<AddWorkerAdResponse, AddWorkerAdRequest>({
      query: (body) => ({
        url: "/worker-ad/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WorkerAds"],
    }),
    updateWorkerAd: builder.mutation<
      UpdateWorkerAdResponse,
      UpdateWorkerAdRequest
    >({
      query: ({ body, id }) => ({
        url: "/worker-ad/update/" + id,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["WorkerAds"],
    }),
    deleteWorkerAd: builder.mutation<void, number>({
      query: (id) => ({
        url: "/worker-ad/delete/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["WorkerAds"],
    }),
    getWorkerAdById: builder.query<GetWorkerAdByIdResponse, number>({
      query: (id) => ({
        url: `/worker/get/${id}`,
        method: "GET",
      }),
      providesTags: ["WorkerAds"],
    }),
    addWorker: builder.mutation<AddWorkerResponse, AddWorkerRequest>({
      query: (body) => ({
        url: "/worker/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WorkerAds"],
    }),
  }),
});

export const {
  useGetAllWorkerAdsQuery,
  useAddWorkerAdMutation,
  useUpdateWorkerAdMutation,
  useDeleteWorkerAdMutation,
  useGetWorkerAdByIdQuery,
  useAddWorkerMutation,
} = workeradApi;
