import { getFiltersString } from "@/utils/getFiltersString";

export const GET_LOCATIONS_PAGINATED_ENDPOINT = (params: PageParam) => {
  return `locations?_page=${params?.page ?? 1}&_limit=${params?.perPage ?? 18
  }${getFiltersString(params?.filters ?? [])}`;
}

export const GET_LOCATION_IMAGES_ENDPOINT = (id: number, params: PageParam) =>
  `assets?location_id=${id}&_page=${params?.page ?? 1}&_limit=${params?.perPage ?? 10
  }`;

export const SEARCH_LOCATIONS_ENDPOINT = (search: string) =>
  `locations/?name_like=${search}`;

export const GET_LOCATION_ENDPOINT = (id: number) => `locations/${id}`;
export const GET_LOCATION_ASSETS_ENDPOINT = (id: number) => `assets?location_id=${id}`;
