import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export const formattedDate = (
  timestampOrDateString: number | string
): string => {
  const date =
    typeof timestampOrDateString === "string"
      ? new Date(timestampOrDateString)
      : new Date(timestampOrDateString * 1000);
  const day = date.toLocaleDateString("en-GB", { weekday: "long" });
  const formatDate = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");

  return `${day} (${formatDate})`;
};

export const kelvinToCelsius = (kelvin: number): string => {
  const converter = 275.15;
  const celsius = kelvin - converter;
  return `${Math.floor(celsius)}\u00B0`;
};

export const getTime = (dateAndTime: string): string => {
  const time = dateAndTime.split(" ")[1].slice(0, -3);

  return time;
};

export const convertToKm = (visibility: number): string => {
  const kilometers = visibility / 1000;
  return `${kilometers}km`;
};

export const formattedTime = (seconds: number) => {
  const hours = Math.floor((seconds / 3600) % 24);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} `;
};
