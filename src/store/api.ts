import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getAccessToken } from "../utils/tokenStorage";

import { SERVER_URL } from "@/constants/SERVER_URL";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "user",
    "company",
    "agency",
    "worker",
    "evaluation",
    "businessOwner",
    "WorkerAds",
    "recruitment-notice",
    "job-notice-list",
  ],
  endpoints: () => ({}),
});

export default baseApi;
