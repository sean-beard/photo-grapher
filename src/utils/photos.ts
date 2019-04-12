import { filter, keys, prop } from "ramda";

import { Photo } from "types/api";
import {
  exifDateTimeToDate,
  weekDayCount,
  getUniqueDates,
  getHoursFromDates
} from "./time";
import { DayOfTheWeek } from "types/time";
import { format } from "date-fns";

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

export const countPerHour = (photos: Photo[]) => {
  const dates = getDatesFromPhotos(photos);
  const hours = getHoursFromDates(dates);
  let hourCountArray = new Array(24).fill(0);
  hours.forEach(hour => {
    hourCountArray[hour] = hourCountArray[hour] + 1;
  });
  return hourCountArray.map((count, hour) => ({
    hour: format(new Date(`1/1/1999 ${hour}:00:00`), "h A"),
    count
  }));
};
