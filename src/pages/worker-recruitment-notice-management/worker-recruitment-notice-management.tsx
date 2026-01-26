import { Tabs } from "@/components/common/tabs";
import { PageHeader } from "@/components/page-header";
import { FirstStep } from "./first-step";
import { SecondStep } from "./second-step";

export const WorkerRecruitmentNoticeManagementPage = () => {
  return (
    <section>
      <PageHeader
        title="Worker Recruitment Notice Management"
        description="A page where workers can manage the job notices they have applied for."
      />
      <Tabs
        defaultValue="first"
        items={[
          {
            label: "First step",
            value: "first",
            content: <FirstStep />,
          },
          {
            label: "Second step",
            content: <SecondStep />,
            value: "second",
          },
        ]}
      />
    </section>
  );
};
