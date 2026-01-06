/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Worker } from '../../@types/worker';

export interface GetAllWorkersResponse {
  data: Worker[];
}
export interface GetAllWorkersRequest {}

export interface VerifyWorkerResponse {}
export interface VerifyWorkerRequest {
  workerId: number;
  status: 'verified' | 'unverified';
}
