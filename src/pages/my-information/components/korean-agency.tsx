import { Button } from "@/components/common/button/button";
import { Status } from "@/components/common/status";
import { PageHeader } from "@/components/page-header";
import { useGetUser } from "@/hooks/use-get-user";
import dayjs from "dayjs";
import { Edit } from "lucide-react";
import { EditKoreanAgencyModal } from "./edit-korean-agency-modal";
import { useState } from "react";

export const KoreanAgency = () => {
  const agency: any = useGetUser();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader
        title="Korean Agency Information"
        description="Manage your korean agency information"
        actions={
          <div>
            <Button variant="outline" onClick={() => setOpen(true)}>
              <Edit />
            </Button>
          </div>
        }
      />
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-muted-foreground">
              Agency Name
            </label>
            <p className="text-base text-foreground mt-1">
              {agency.agencyName}
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold text-muted-foreground">
              Business Registration Number
            </label>
            <p className="text-base text-foreground mt-1">
              {agency.businessRegistrationNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-muted-foreground">
              Email
            </label>
            <p className="text-base text-foreground mt-1">{agency.email}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-muted-foreground">
              Status
            </label>
            <div className="mt-1">
              <Status
                label={agency.isVerified ? "Verified" : "Unverified"}
                variant={agency.isVerified ? "verified" : "unverified"}
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Representative Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-muted-foreground">
                Name
              </label>
              <p className="text-base text-foreground mt-1">
                {agency.representativeName}
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">
                Mobile Phone
              </label>
              <p className="text-base text-foreground mt-1">
                {agency.representativeMobilePhone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-semibold text-muted-foreground">
                Business Phone
              </label>
              <p className="text-base text-foreground mt-1">
                {agency.representativeBusinessPhone}
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">
                Address
              </label>
              <p className="text-base text-foreground mt-1">
                {agency.representativeAddress}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-muted-foreground">
                Member Since
              </label>
              <p className="text-base text-foreground mt-1">
                {dayjs(agency.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <EditKoreanAgencyModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
