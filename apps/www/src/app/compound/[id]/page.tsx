import { Location } from "@/components/views/single-location/Location";
import { prefetchLocation } from "@/services/actions/locations";
import { getLocation } from "@/services/api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";


type Props = {
  params: { id: number }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {

  const id = params.id
  const compound = await getLocation(id);

  return {
    title: compound.name,
    description: compound.name,
  }
}

export default async function CompoundPage({
  params: { id },
}: {
  params: { id: number };
}) {

  const queryClient = await prefetchLocation(id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Location />
    </HydrationBoundary>
  );
}
