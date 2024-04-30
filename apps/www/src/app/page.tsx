import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { prefetchLocations } from "@/services/actions/locations";
import Locations from "@/components/views/locations";
import { parseFilters } from "@/utils/parseFilters";
import { Suspense } from "react";



export default async function Home({ searchParams }: WithSearchParams) {
  const filters = parseFilters(searchParams);
  const queryClient = await prefetchLocations(filters);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>

        <Locations />
      </Suspense>
    </HydrationBoundary>
  );
}
