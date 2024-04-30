import { useGetFilters } from "@/hooks/useGetFilters";
import {
  getLocation,
  getLocationAssets,
  getLocationImages,
  getLocations,
  searchLocations,
} from "@/services/api";
import getQueryClient from "@/services/react-query/getQueryClient";
import {
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useRef } from "react";

const LOCATIONS_QUERY_KEY = "locations";
const SINGLE_LOCATION_QUERY_KEY = "location";
export const prefetchLocations = async (filters: Filter[]) => {
  console.log(filters)
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [LOCATIONS_QUERY_KEY, filters],
    queryFn: ({ queryKey }) =>
      getLocations({ page: 1, perPage: 18, filters: queryKey[1] as any }),
    initialPageParam: {
      page: 1,
      perPage: 18,
    },
    getNextPageParam: (last: { next: any; }, all: any) => {
      return last?.next ? { page: last.next, perPage: 12 } : undefined;
    },
  });

  return queryClient;
};

export const useGetLocations = () => {

  const filters = useGetFilters();
  const query = useInfiniteQuery({
    queryKey: [LOCATIONS_QUERY_KEY, filters],
    queryFn: ({ pageParam: { page, perPage }, queryKey }) => {
      return getLocations({ page, perPage, filters: queryKey[1] as any });
    },
    initialPageParam: {
      page: 1,
      perPage: 18,
    },
    getNextPageParam: (last, all) => {
      return last?.next ? { page: last.next, perPage: 12 } : undefined;
    },

  });

  return query
};

export const useGetLocationImages = (id: number) => {
  const query = useInfiniteQuery({
    queryKey: [SINGLE_LOCATION_QUERY_KEY, id],
    queryFn: ({ pageParam: { page, perPage } }) =>
      getLocationImages(id, { page, perPage }),
    initialPageParam: {
      page: 1,
      perPage: 3,
    },
    getNextPageParam: (last) => {
      return last?.next ? { page: last.next, perPage: 3 } : undefined;
    },
    select: (data) => {
      return data.pages;
    },

    enabled: false,
  });

  return query;
};

export const useSearchLocations = (search: string) => {
  const query = useQuery({
    queryKey: [LOCATIONS_QUERY_KEY, search],
    queryFn: () => searchLocations(search),
    enabled: !!search,
  });
  return query;
};

export const useGetLocation = (id: number) => {
  const query = useQuery({
    queryKey: [SINGLE_LOCATION_QUERY_KEY, id],
    queryFn: () => {
      return getLocation(id);
    },
  });

  return query;
};

export const useGetLocationAssets = (id: number) => {
  const query = useQuery({
    queryKey: ["assets", SINGLE_LOCATION_QUERY_KEY, id],
    queryFn: () => {
      return getLocationAssets(id);
    },
  });

  return query;
};

export const prefetchLocation = async (id: number) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [SINGLE_LOCATION_QUERY_KEY, id],
    queryFn: ({ queryKey }) => getLocation(id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["assets", SINGLE_LOCATION_QUERY_KEY, id],
    queryFn: ({ queryKey }) => getLocationAssets(id),
  });

  return queryClient;
};
