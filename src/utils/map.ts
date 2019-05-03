import { Location } from "types/map";

const rad2degr = (rad: number) => (rad * 180) / Math.PI;
const degr2rad = (degr: number) => (degr * Math.PI) / 180;

export const getLatLongCenter = (latLongInDegrees: Location[]): Location => {
  const LAT_INDEX = 0;
  const LONG_INDEX = 1;
  var sumX = 0;
  var sumY = 0;
  var sumZ = 0;

  for (var i = 0; i < latLongInDegrees.length; i++) {
    const lat = degr2rad(latLongInDegrees[i][LAT_INDEX]);
    const long = degr2rad(latLongInDegrees[i][LONG_INDEX]);
    // sum of cartesian coordinates
    sumX += Math.cos(lat) * Math.cos(long);
    sumY += Math.cos(lat) * Math.sin(long);
    sumZ += Math.sin(lat);
  }

  const avgX = sumX / latLongInDegrees.length;
  const avgY = sumY / latLongInDegrees.length;
  const avgZ = sumZ / latLongInDegrees.length;

  // convert average x, y, z coordinate to latitude and longtitude
  const longtitude = Math.atan2(avgY, avgX);
  const hypotenuse = Math.sqrt(avgX * avgX + avgY * avgY);
  const latitude = Math.atan2(avgZ, hypotenuse);

  return [rad2degr(latitude), rad2degr(longtitude)];
};
