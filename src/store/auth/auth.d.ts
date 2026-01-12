/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { User } from "../../@types/user";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: true;
  access_token: string;
  refresh_token: string;
};

export type UserResponse = {
  data: User;
};

export interface SignUpWorkerResponse {}
export interface SignUpWorkerRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  alternativePhoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  country: string;
  photoRegistration: string;
  graduationCertificate: string;
  qualification: string;
  agencyId: number;
}

export interface SignUpAgencyResponse {}
export interface SignUpAgencyRequest {
  email: string;
  password: string;
  agencyName: string;
  businessRegistrationNumber: string;
  representativeName: string;
  representativeMobilePhone: string;
  representativeBusinessPhone: string;
  representativeAddress: string;
  koreanAgencyId?: number;
  country?: string;
  businessRegistrationCertificate?: string;
  license?: string;
}

export interface SignUpCompanyResponse {}
export interface SignUpCompanyRequest {
  email: string;
  password: string;
  companyName: string;
  businessRegistrationNumber: string;
  mainProductOrService: string;
  managementBusinessNumber: string;
  representativeName: string;
  representativeMobilePhone: string;
  businessPhoneNumber: string;
  fax?: string;
  address: string;
  photoRegistration: string;
  businessRegistrationCertificate: string;
  managementBusinessRegistrationCertificate: string;
  smallAndMediumSizedBusinessConfirmationCertificate?: string;
  localTaxPaymentCertificate?: string;
  nationalTaxPaymentCertificate?: string;
  region: string;
  employeesCount: number;
  mainService: string;
  mainProduct: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}
