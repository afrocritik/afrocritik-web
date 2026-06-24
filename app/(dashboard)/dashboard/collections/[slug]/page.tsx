import { CollectionDetailView } from "@/components/features/dashboard/CollectionDetailView";

export default function CollectionDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <CollectionDetailView slug={params.slug} />
    </div>
  );
}
