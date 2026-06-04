import { EntityFormView } from "@/components/features/admin/crud/EntityFormView";
import { getEntity } from "@/components/features/admin/crud/entities";

export default function Page({ params }: { params: { id: string } }) {
  const config = getEntity("users")!;
  const record = config.sample.find((r) => r.id === params.id);
  return <EntityFormView config={config} record={record} />;
}
