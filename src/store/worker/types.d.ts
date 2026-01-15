/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Worker } from "../../@types/worker";

export interface GetAllWorkersResponse {
  data: Worker[];
  page_count: number;
}
export interface GetAllWorkersRequest {
  page: number;
  per_page: number;
  status?: "verified" | "unverified";
}

export interface VerifyWorkerResponse {}
export interface VerifyWorkerRequest {
  workerId: number;
  status: "verified" | "unverified";
}
