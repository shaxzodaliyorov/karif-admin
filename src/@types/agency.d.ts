export interface Agency {
  _id: string;
  email: string;
  password: string;
  agencyName: string;
  businessRegistrationNumber: string;
  businessType: string;
  item: string;
  representativeName: string;
  representativeMobilePhone: string;
  representativeBusinessPhone: string;
  representativeAddress: string;
  sessionToken: string;
  refreshToken: string;
  isVerified: boolean;
  createdAt: string;
}
