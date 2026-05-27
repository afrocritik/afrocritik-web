import { DashboardPlaceholder } from "@/components/features/dashboard/DashboardPlaceholder";
import { COLLECTIONS } from "@/components/features/dashboard/constants";

export default function CollectionDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);

  return (
    <DashboardPlaceholder
      title={collection?.name ?? "Collection"}
      description={
        collection
          ? `${collection.count} items in this collection.`
          : "This collection's works will appear here."
      }
    />
  );
}
