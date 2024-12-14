import { SingleWeatherDetailType, WeatherDetailTypes } from "@/app/types";
import React from "react";
import { FiDroplet } from "react-icons/fi";
import { LuEye } from "react-icons/lu";

const WeatherDetails = ({
  visibility,
  humidity,
  windSpeed,
  sunrise,
  airPressure,
  sunset,
}: WeatherDetailTypes) => {
  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information="Visibility"
        value={visibility}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Wind speed"
        value={windSpeed}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Sunrise"
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Sunset"
        value={sunset}
      />

      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Air Pressure"
        value={airPressure}
      />
    </>
  );
};

export default WeatherDetails;

function SingleWeatherDetail({
  information,
  value,
  icon,
}: SingleWeatherDetailType) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 text-xs font-semibold test-black">
      <p className="whitespace-nowrap">{information}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
  );
}
