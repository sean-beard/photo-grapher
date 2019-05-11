import { Location } from "types/map";

export const getBounds = (locationsInDegrees: Location[]) => {
  const numberOfCoordinates = locationsInDegrees.length;
  const LAT_INDEX = 0;
  const LONG_INDEX = 1;

  let maxLat: number | null = null;
  let minLat: number | null = null;
  let maxLong: number | null = null;
  let minLong: number | null = null;

  for (let i = 0; i < numberOfCoordinates; i++) {
    const lat = locationsInDegrees[i][LAT_INDEX];
    const long = locationsInDegrees[i][LONG_INDEX];
    if (!maxLat || lat > maxLat) {
      maxLat = lat;
    }
    if (!minLat || lat < minLat) {
      minLat = lat;
    }
    if (!maxLong || long > maxLong) {
      maxLong = long;
    }
    if (!minLong || long < minLong) {
      minLong = long;
    }
  }

  if (maxLat && minLat && maxLong && minLong) {
    const topLeftCorner: Location = [minLat, maxLong];
    const bottomRightCorner: Location = [maxLat, minLong];
    return [topLeftCorner, bottomRightCorner];
  }
  return undefined;
};
