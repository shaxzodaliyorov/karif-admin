import { Tabs } from "@/components/common/tabs";
import { PageHeader } from "@/components/page-header";
import { Companies } from "./companies";
import { ForeignAgencies } from "./foreign-agencies";
import { Workers } from "./workers";
import { KoreanAgencies } from "./korean-agencies";

export const AdminDashboard = () => {
  return (
    <section>
      <PageHeader
        title="Dashboard"
        description="This is a simple example of a dashboard page."
      />
      <div>
        <Tabs
          items={[
            {
              label: "Companies",
              value: "Companies",
              content: <Companies />,
            },
            {
              label: "Korean Agencies",
              value: "Korean Agencies",
              content: <KoreanAgencies />,
            },
            {
              label: "Foreign Agencies",
              value: "Foreign Agencies",
              content: <ForeignAgencies />,
            },
            {
              label: "Workers",
              value: "Workers",
              content: <Workers />,
            },
          ]}
          defaultValue="Companies"
        />
      </div>
    </section>
  );
};
