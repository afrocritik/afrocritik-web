import { EntityFormView } from "@/components/features/admin/crud/EntityFormView";
import { getEntity } from "@/components/features/admin/crud/entities";

export default function Page() {
  return <EntityFormView config={getEntity("people")!} />;
}
