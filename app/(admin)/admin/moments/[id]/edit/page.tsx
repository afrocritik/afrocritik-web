import { EntityEditView } from "@/components/features/admin/crud/EntityEditView";
import { getEntity } from "@/components/features/admin/crud/entities";

export default function Page({ params }: { params: { id: string } }) {
  return <EntityEditView config={getEntity("moments")!} id={params.id} />;
}
