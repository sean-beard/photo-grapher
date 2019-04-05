import {
  pipe,
  join,
  split,
  replace,
  reduce,
  map,
  reject,
  isNil,
  uniqBy
} from "ramda";
import { DayOfTheWeekCount, DayOfTheWeek } from "types/time";

const newDate = (date: string): Date => new Date(date);

const formatDateTimeStrings = ([date, time]: string[]): [string, string] => [
  replace(/:/g, "-", date),
  time
];

export const exifDateTimeToDate = (exifDateTime: string): Date =>
  pipe(
    split(" "),
    formatDateTimeStrings,
    join("T"),
    newDate
  )(exifDateTime);

const initDayOfTheWeekCount = Object.freeze({
  [DayOfTheWeek.MONDAY]: 0,
  [DayOfTheWeek.TUESDAY]: 0,
  [DayOfTheWeek.WEDNESDAY]: 0,
  [DayOfTheWeek.THURSDAY]: 0,
  [DayOfTheWeek.FRIDAY]: 0,
  [DayOfTheWeek.SATURDAY]: 0,
  [DayOfTheWeek.SUNDAY]: 0
});

const getDayOfTheWeek = (date: Date): DayOfTheWeek | null => {
  switch (date.getDay()) {
    case 0:
      return DayOfTheWeek.SUNDAY;
    case 1:
      return DayOfTheWeek.MONDAY;
    case 2:
      return DayOfTheWeek.TUESDAY;
    case 3:
      return DayOfTheWeek.WEDNESDAY;
    case 4:
      return DayOfTheWeek.THURSDAY;
    case 5:
      return DayOfTheWeek.FRIDAY;
    case 6:
      return DayOfTheWeek.SATURDAY;
    default:
      return null;
  }
};

const countDayOfTheWeek = (
  count: DayOfTheWeekCount,
  currentDay: DayOfTheWeek
) => {
  const existingCount = count[currentDay];
  return { ...count, ...{ [currentDay]: existingCount + 1 } };
};

const countDayOfWeekReducer = (daysOfTheWeek: DayOfTheWeek[]) =>
  reduce(countDayOfTheWeek, initDayOfTheWeekCount, daysOfTheWeek);

export const weekDayCount = (dates: Date[]) =>
  pipe(
    map(getDayOfTheWeek),
    reject(isNil),
    countDayOfWeekReducer
  )(dates);

export const getUniqueDates = (dates: Date[]) =>
  uniqBy(
    date => `${date.getDay()} ${date.getMonth()} ${date.getFullYear()}`,
    dates
  );
