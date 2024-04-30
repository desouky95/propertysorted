import { api } from "..";
import parseLinks from "parse-link-header";
import {
  GET_LOCATIONS_PAGINATED_ENDPOINT,
  GET_LOCATION_ASSETS_ENDPOINT,
  GET_LOCATION_ENDPOINT,
  GET_LOCATION_IMAGES_ENDPOINT,
  SEARCH_LOCATIONS_ENDPOINT,
} from "./endpoints";
import { getPagination } from "@/utils/getPagination";

export async function getLocations(
  params: PageParam
): Promise<PaginateResponse<Compound>> {
  const locations = await api.get<Compound[]>(
    GET_LOCATIONS_PAGINATED_ENDPOINT(params)
  );

  const links = getPagination(locations.headers);
  return { ...links, data: locations.data };
}

export async function getLocationImages(
  id: number,
  params: PageParam
): Promise<PaginateResponse<Asset>> {
  const locations = await api.get<Asset[]>(
    GET_LOCATION_IMAGES_ENDPOINT(id, params)
  );
  const links = getPagination(locations.headers);
  return { ...links, data: locations.data };
}

export async function searchLocations(search: string) {
  const locations = await api.get<Compound[]>(
    SEARCH_LOCATIONS_ENDPOINT(search)
  );
  return locations.data;
}

export async function getLocation(id: number) {
  const location = await api.get<Compound>(GET_LOCATION_ENDPOINT(id));
  return location.data;
}

export async function getLocationAssets(id: number) {
  const assets = await api.get<Asset[]>(GET_LOCATION_ASSETS_ENDPOINT(id));
  return assets.data;
}
