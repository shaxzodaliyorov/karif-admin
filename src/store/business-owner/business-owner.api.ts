import baseApi from "../api";

import type {
  AddBusinessOwnerRequest,
  AddBusinessOwnerResponse,
  getBusinessOwnerByIdResponse,
  GetBusinessOwnerRequest,
  GetBusinessOwnerResponse,
  UpdateBusinessOwnerRequest,
} from "./types";

export const businessOwnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBusinessOwner: builder.mutation<
      AddBusinessOwnerResponse,
      AddBusinessOwnerRequest
    >({
      query: (body) => ({
        url: "/business-owner/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["businessOwner"],
    }),
    getBusinessOwner: builder.query<
      GetBusinessOwnerResponse,
      GetBusinessOwnerRequest
    >({
      query: (params) => ({
        url: "/business-owner/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["businessOwner"],
    }),
    deleteBusinessOwner: builder.mutation<void, number>({
      query: (id) => ({
        url: `/business-owner/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["businessOwner"],
    }),
    updateBusinessOwner: builder.mutation<void, UpdateBusinessOwnerRequest>({
      query: ({ id, body }) => ({
        url: `/business-owner/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["businessOwner"],
    }),
    getBusinessOwnerById: builder.query<getBusinessOwnerByIdResponse, number>({
      query: (id) => ({
        url: `/business-owner/${id}`,
        method: "GET",
      }),
      providesTags: ["businessOwner"],
    }),
  }),
});

export const {
  useAddBusinessOwnerMutation,
  useGetBusinessOwnerQuery,
  useDeleteBusinessOwnerMutation,
  useUpdateBusinessOwnerMutation,
  useGetBusinessOwnerByIdQuery,
} = businessOwnerApi;
