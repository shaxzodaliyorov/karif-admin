export interface RegisterCompanyFormValues {
  email: string;
  password: string;
  companyName: string;
  businessRegistrationNumber: string;
  mainProduct: string;
  mainService: string;
  employeesCount: number;
  managementBusinessNumber: string;
  representativeName: string;
  representativeMobile: string;
  businessPhoneNumber: string;
  fax: string;
  address: string;
  region: string;
  photoRegistration: string;
  businessRegistrationCertificate?: string;
  managementBusinessRegistrationCertificate: string;
  smallAndMediumSizedBusinessConfirmationCertificate?: string;
  localTaxPaymentCertificate: string;
  nationalTaxPaymentCertificate?: string;
  insuranceCertificate: string;
  employmentStatusInquiryForm: string;
}
