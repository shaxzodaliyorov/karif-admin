export interface DocumentFile {
  file_path: string;
  name: string;
  type: string;
}

export interface Company {
  _id: string;
  email: string;
  password: string;
  companyName: string;
  businessRegistrationNumber: string;
  businessType: string;
  mainProductOrService: string;
  managementBusinessNumber: string;
  representativeName: string;
  representativeMobilePhone: string;
  businessPhoneNumber: string;
  fax: string;
  address: string;
  region: string;
  photoRegistration: string;
  businessRegistrationCertificate: string;
  managementBusinessRegistrationCertificate: string;
  smallAndMediumSizedBusinessConfirmationCertificate: string;
  localTaxPaymentCertificate: string;
  nationalTaxPaymentCertificate: string;
  insuranceCertificate: string;
  employmentStatusInquiryForm: string;
  documentStatus: "pending" | "approved" | "rejected";
  documentStatusMessage?: string;
  sessionToken: string;
  refreshToken: string;
  isVerified: boolean;
  createdAt: string;
  data?: DocumentFile[];
  description?: string;
  role?: string;
  employeesCount: number;
}
