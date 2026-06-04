import { Suspense } from "react";
import { EntityListView } from "@/components/features/admin/crud/EntityListView";
import { getEntity } from "@/components/features/admin/crud/entities";

export default function Page() {
  return (
    <Suspense>
      <EntityListView config={getEntity("moments")!} />
    </Suspense>
  );
}
