"use client";
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { LocationsList } from "./LocationsList";
import { getLocations } from "@/services/api";
import { useGetLocations } from "@/services/actions/locations";

export const Locations = () => {
  const { data } = useGetLocations();

  return (
    <main className="site-content">
      <div className="px-5 md:px-20 mt-4 md:mt-6 mb-12">
        <div className="grid text-sm grid-flow-dense auto-rows-[var(--breakpoint-grid_auto-rows,minmax(min-content,max-content))] grid-cols-1 md:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6 gap-x-6 gap-y-10 ">
          <LocationsList locations={data?.pages} />
        </div>
      </div>
    </main>
  );
};
