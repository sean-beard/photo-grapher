import { isEmpty, complement } from "ramda";

export const hasItems = complement(isEmpty);
