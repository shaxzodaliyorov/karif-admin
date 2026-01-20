import { AddWorkerForm } from "@/components";
import { PageHeader } from "@/components/page-header";

export const AddWorkerPage = () => (
  <section>
    <PageHeader
      title="Add Worker"
      description="Add a new worker to your agency"
    />
    <AddWorkerForm />
  </section>
);
