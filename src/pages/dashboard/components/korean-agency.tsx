import { Tabs } from "@/components/common/tabs";
import { PageHeader } from "@/components/page-header";
import { AllGetAgencies } from "./all-agency";

export const KoreanAgencyDashboard = () => {
  return (
    <section>
      <PageHeader
        title="Dashboard"
        description="Here you can see your dashboard."
      />
      <div>
        <Tabs
          items={[
            {
              label: "All",
              value: "all",
              content: <AllGetAgencies />,
            },
            {
              label: "Verified",
              value: "verified",
              content: <AllGetAgencies status="verified" />,
            },
            {
              label: "Unverified",
              value: "unverified",
              content: <AllGetAgencies status="unverified" />,
            },
          ]}
          defaultValue="all"
        />
      </div>
    </section>
  );
};
