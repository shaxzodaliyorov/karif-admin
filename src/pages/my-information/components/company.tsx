import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Phone, User, Users } from "lucide-react";
import { InfoCard } from "./info-card";
import { DocumentItem } from "./document-item";
import { useGetUser } from "@/hooks/use-get-user";
import { Image } from "@/components/common/image";
import { Status } from "@/components/common/status";

export const CompanyMyInformation = () => {
  const companyData: any = useGetUser();
  return (
    <div>
      <PageHeader
        title="Company Information"
        description="Manage your company information"
      />
      <div>
        <Card className="mb-8 border shadow-none">
          <CardHeader className="border-b border-border pb-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-foreground">
                    {companyData?.companyName}
                  </h2>
                  <Status
                    label={companyData?.isVerified ? "Verified" : "Unverified"}
                    variant={
                      companyData?.isVerified ? "verified" : "unverified"
                    }
                  />
                </div>
                <p className="mt-2 text-muted-foreground">
                  {companyData?.mainService} • {companyData?.mainProduct}
                </p>
              </div>
              {companyData?.photoRegistration && (
                <Image
                  src={companyData?.photoRegistration || "/placeholder.svg"}
                  alt={companyData?.companyName}
                  className="h-24 w-24 rounded-lg object-cover cursor-pointer"
                  isPreview
                />
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <InfoCard
                    icon={<Building2 className="h-5 w-5" />}
                    title="Business Details"
                    items={[
                      {
                        label: "Registration Number",
                        value: companyData?.businessRegistrationNumber,
                      },
                      {
                        label: "Management Business Number",
                        value: companyData?.managementBusinessNumber,
                      },
                      {
                        label: "Main Product",
                        value: companyData?.mainProduct,
                      },
                      {
                        label: "Main Service",
                        value: companyData?.mainService,
                      },
                    ]}
                  />

                  <InfoCard
                    icon={<Users className="h-5 w-5" />}
                    title="Organization Info"
                    items={[
                      {
                        label: "Total Employees",
                        value: companyData?.employeesCount.toString(),
                      },
                      { label: "Region", value: companyData?.region },
                      { label: "Status", value: companyData?.documentStatus },
                      {
                        label: "Founded",
                        value: new Date(
                          companyData.createdAt
                        ).toLocaleDateString(),
                      },
                    ]}
                  />
                </div>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <InfoCard
                    icon={<User className="h-5 w-5" />}
                    title="Representative"
                    items={[
                      { label: "Name", value: companyData?.representativeName },
                      {
                        label: "Mobile Phone",
                        value: companyData?.representativeMobilePhone,
                      },
                    ]}
                  />

                  <InfoCard
                    icon={<Phone className="h-5 w-5" />}
                    title="Business Contact"
                    items={[
                      { label: "Email", value: companyData?.email },
                      {
                        label: "Phone",
                        value: companyData?.businessPhoneNumber,
                      },
                      { label: "Fax", value: companyData?.fax },
                    ]}
                  />
                </div>

                <Card className="border-l-4 border-l-primary bg-primary/5">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Address</h3>
                      <p className="mt-1 text-muted-foreground">
                        {companyData?.address}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-4">
                <div className="grid gap-4">
                  <DocumentItem
                    title="Business Registration Certificate"
                    url={companyData?.businessRegistrationCertificate}
                  />
                  <DocumentItem
                    title="Management Business Registration Certificate"
                    url={companyData?.managementBusinessRegistrationCertificate}
                  />
                  <DocumentItem
                    title="Small and Medium Business Confirmation Certificate"
                    url={
                      companyData?.smallAndMediumSizedBusinessConfirmationCertificate
                    }
                  />
                  <DocumentItem
                    title="Local Tax Payment Certificate"
                    url={companyData?.localTaxPaymentCertificate}
                  />
                  <DocumentItem
                    title="National Tax Payment Certificate"
                    url={companyData?.nationalTaxPaymentCertificate}
                  />
                  <DocumentItem
                    title="Insurance Certificate"
                    url={companyData?.insuranceCertificate}
                  />
                  <DocumentItem
                    title="Employment Status Inquiry Form"
                    url={companyData?.employmentStatusInquiryForm}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
