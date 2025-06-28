import type { ResultLab } from "@/types/lab"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findPercent = (
  results: ResultLab[]
): {
  gluPercent: number;
  cholPercent: number;
  bloodPercent: number;
  bloodPrev: number | null;
  cholNow: number;
  sysNow: number;
  diasNow: number;
} => {
  const resultNow = results[0]?.results;
  const resultPrev = results[1]?.results;

  const gluNow = resultNow?.glucose ?? 0;
  const gluPrev = resultPrev?.glucose ?? 1; // untuk hindari division by 0

  const cholNow = resultNow?.cholesterol?.total ?? 0;
  const cholPrev = resultPrev?.cholesterol?.total ?? 1;

  const sysNow = resultNow?.bloodPressure?.systolic ?? 0;
  const diasNow = resultNow?.bloodPressure?.diastolic ?? 1; // hindari 0
  const sysPrev = resultPrev?.bloodPressure?.systolic ?? 0;
  const diasPrev = resultPrev?.bloodPressure?.diastolic ?? 1;

  const bloodNow = sysNow / diasNow;
  const bloodPrev = diasPrev !== 0 ? sysPrev / diasPrev : null;

  const gluPercent =
    gluPrev !== 0 ? ((gluNow - gluPrev) / gluPrev) * 100 : 0;
  const cholPercent =
    cholPrev !== 0 ? ((cholNow - cholPrev) / cholPrev) * 100 : 0;
  const bloodPercent =
    bloodPrev && bloodPrev !== 0
      ? ((bloodNow - bloodPrev) / bloodPrev) * 100
      : 0;

  return {
    gluPercent,
    cholPercent,
    bloodPercent,
    bloodPrev,
    cholNow,
    sysNow,
    diasNow,
  };
};
