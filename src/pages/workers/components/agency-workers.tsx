import { Button } from "@/components/common/button/button";
import { Tabs } from "@/components/common/tabs";
import { PageHeader } from "@/components/page-header";
import { FaFileExcel, FaPlus } from "react-icons/fa6";
import { WorkersLists } from "./workers-list";

export const AgencyWorkers = () => (
  <section>
    <PageHeader
      title="Workers"
      description="Here you can manage your workers."
      actions={
        <div className="flex gap-x-2">
          <Button variant={"outline"}>
            Download exel <FaFileExcel />
          </Button>
          <Button>
            Add worker <FaPlus />
          </Button>
        </div>
      }
    />
    <Tabs
      items={[
        {
          label: "All",
          value: "all",
          content: <WorkersLists />,
        },
        {
          label: "Active",
          value: "active",
          content: <WorkersLists status="verified" />,
        },
        {
          label: "Inactive",
          value: "inactive",
          content: <WorkersLists status="unverified" />,
        },
      ]}
    />
  </section>
);
