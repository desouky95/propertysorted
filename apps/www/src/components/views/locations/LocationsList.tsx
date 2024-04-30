"use client";
import { useGetLocations } from "@/services/actions/locations";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CompoundCard } from "../../containers/compound-card/CompoundCard";
import { getLocations } from "@/services/api";

type LocationsListProps = {
  locations?: PaginateResponse<Compound>[];
};
export const LocationsList = ({ locations }: LocationsListProps) => {
  console.log(locations?.flatMap(_ => _.data).length)
  const { ref, inView } = useInView();
  const { fetchNextPage, hasNextPage, } = useGetLocations();

  useEffect(() => {

    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <Suspense fallback={null}>
        {locations?.map((page, index) => {
          return page.data.map((location) => {
            if (page.data.length === index + 1) return;
            return (
              <CompoundCard
                key={location.id}
                compound={location}
              />
            );
          });
        })}
        <div ref={ref} />
      </Suspense>
    </>
  );
};
