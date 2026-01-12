export interface RegisterAgencyFormValues {
  email: string;
  password: string;
  agencyName: string;
  businessRegistrationNumber: string;
  representativeName: string;
  representativeMobilePhone: string;
  representativeBusinessPhone: string;
  representativeAddress: string;
  country: string;
  koreanAgencyId?: string | number;
  businessRegistrationCertificate: string;
  license: string;
}
