import Container from "@/components/Container";
import React from "react";
import WeatherIcon from "./WeatherIcon";
import { ForecastWeatherDetailType } from "@/app/types";
import { kelvinToCelsius } from "@/utils/cn";
import WeatherDetails from "./WeatherDetails";

const ForecastWeatherDetail = ({
  weatherIcon,
  date,
  day,
  temp,
  feels_like,
  description,
  visibility,
  humidity,
  windSpeed,
  sunrise,
  sunset,
  airPressure,
}: ForecastWeatherDetailType) => {
  return (
    <Container className="gap-4">
      <section className="flex gap-4 items-center justify-center px-4">
        <div className=" items-center justify-center flex flex-col ">
          <WeatherIcon iconName={weatherIcon} />
          <p className="text-center ">{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        <div className=" flex flex-col px-4 items-center justify-center">
          <span className="text-lg">{kelvinToCelsius(temp)}</span>
          <p className=" space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>{kelvinToCelsius(feels_like)}</span>
          </p>
          <p className="capitalize text-md whitespace-nowrap">{description}</p>
        </div>
      </section>
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails
          visibility={visibility}
          humidity={humidity}
          windSpeed={windSpeed}
          sunrise={sunrise}
          sunset={sunset}
          airPressure={airPressure}
        ></WeatherDetails>
      </section>
    </Container>
  );
};

export default ForecastWeatherDetail;
