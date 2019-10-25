import { FitBoundsOptions } from "leaflet";
import { pluck } from "ramda";
import { MapProps } from "react-leaflet";

import { Photo } from "types/api";
import { Location } from "types/map";
import { getLocations } from "./photos";

const maxReducer = (acc: number | null, next: number) =>
  acc ? (next > acc ? next : acc) : next;

const minReducer = (acc: number | null, next: number) =>
  acc ? (next < acc ? next : acc) : next;

export const getBounds = (locations: Location[]) => {
  const latitudes = pluck(0, locations);
  const longitudes = pluck(1, locations);

  const maxLat = latitudes.reduce(maxReducer, 0);
  const minLat = latitudes.reduce(minReducer, 0);
  const maxLong = longitudes.reduce(maxReducer, 0);
  const minLong = longitudes.reduce(minReducer, 0);

  if (maxLat && minLat && maxLong && minLong) {
    const topLeftCorner: Location = [minLat, maxLong];
    const bottomRightCorner: Location = [maxLat, minLong];
    return [topLeftCorner, bottomRightCorner];
  }
  return undefined;
};

export const getLeafletProps = (photos: Photo[]): Partial<MapProps> => {
  const locations = getLocations(photos);

  const bounds = getBounds(locations);
  const boundsOptions: FitBoundsOptions = { padding: [45, 45] };

  return {bounds, boundsOptions}
}
