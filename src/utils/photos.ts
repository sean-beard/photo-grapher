import { filter, keys, prop } from "ramda";

import { Photo } from "types/api";
import { exifDateTimeToDate, weekDayCount, getUniqueDates } from "./time";
import { DayOfTheWeek } from "types/time";

export const getPhotosWithLocation = (photos: Photo[]) =>
  filter(
    ({ imageMediaMetadata }: Photo) => !!imageMediaMetadata.location,
    photos
  );

export const getDatesFromPhotos = (photos: Photo[]) =>
  photos
    .map(photo => {
      const time = photo.imageMediaMetadata.time;
      return time ? exifDateTimeToDate(time) : null;
    })
    .filter(date => !!date) as Date[];

export const avgCountPerWeekDay = (photos: Photo[]) => {
  const dates = getDatesFromPhotos(photos);
  const dayCount = weekDayCount(dates);
  const uniqueDates = getUniqueDates(dates);
  const uniqueDayCount = weekDayCount(uniqueDates);

  return keys(dayCount).map(day => {
    const avg = prop(day, dayCount) / prop(day, uniqueDayCount);
    return [day, isNaN(avg) ? 0 : avg] as [DayOfTheWeek, number];
  });
};
