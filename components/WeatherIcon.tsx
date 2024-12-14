import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { WeatherIconTypes } from "@/app/types";

const WeatherIcon = ({ iconName, className }: WeatherIconTypes) => {
  return (
    <div className={cn("relative h-20 w-20 ", className)}>
      <Image
        alt="weather-icon"
        width={100}
        height={100}
        className="absolute h-full w-full z-10"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
      />
    </div>
  );
};

export default WeatherIcon;
