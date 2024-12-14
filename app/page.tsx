import { WeatherDataType } from "./types";
import { Suspense } from "react";
import {
  convertToKm,
  formattedDate,
  formattedTime,
  getTime,
  kelvinToCelsius,
} from "@/utils/cn";
import Container from "@/components/Container";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherDetails from "@/components/WeatherDetails";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import Navbar from "@/components/Navbar";
import LoadingSkeleton from "./loading";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const location = Array.isArray(searchParams?.search)
    ? searchParams?.search[0] || "London"
    : searchParams?.search || "London";

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
  );

  const data: WeatherDataType = await res.json();
  if (!data?.list || data.list.length === 0) {
    // If the list is empty or undefined, you can show a fallback
    return <div>No weather data available</div>;
  }
  const firstData = data?.list[0];
  console.log("DATE", typeof firstData.dt_txt);
  console.log("VISIBILITY TYPE", typeof firstData.visibility);
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (item) => new Date(item.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDateForEachDate = uniqueDates.map((date) => {
    return data?.list.find((item) => {
      const entryDate = new Date(item.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(item.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Navbar location={location} />
      <main className="z-10 px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pt-4 pb-10">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-center">
              {formattedDate(firstData.dt_txt)}
            </h2>
          </div>
          <Container className="gap-10 px-6 items-center">
            <div className=" px-4 flex flex-col items-center justify-center">
              <span className="text-5xl">
                {kelvinToCelsius(firstData.main.temp)}
              </span>
              <span className="text-xs space-x-1 whitespace-nowrap">
                Feels like {kelvinToCelsius(firstData.main.feels_like)}
              </span>
              <p className="text-xs space-x-2">
                <span>{kelvinToCelsius(firstData.main.temp_min)}↓</span>
                <span>{kelvinToCelsius(firstData.main.temp_max)}↑</span>
              </p>
            </div>
            {/*time and icon*/}
            <div
              className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3
          "
            >
              {data.list.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-xs gap-2 justify-between"
                >
                  <span>{getTime(item.dt_txt)}</span>
                  <WeatherIcon iconName={item.weather[0].icon} />
                  <span>{kelvinToCelsius(item.main.temp)}</span>
                </div>
              ))}
            </div>
          </Container>

          <div className="flex gap-4">
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-nowrap ">
                {firstData.weather[0].description}
              </p>
              <WeatherIcon iconName={firstData.weather[0].icon ?? ""} />
            </Container>
            <Container className="bg-yellow-300 opacity-80 p-6 gap-4 justify-between overflow-x-auto z-10 ">
              <WeatherDetails
                visibility={convertToKm(firstData.visibility)}
                humidity={`${firstData.main.humidity.toString()}%`}
                windSpeed={`${firstData.wind.speed.toString()} km/h`}
                sunrise={formattedTime(data.city.sunrise)}
                sunset={formattedTime(data.city.sunset)}
                airPressure={`${firstData.main.pressure} hPa`}
              ></WeatherDetails>
            </Container>
          </div>
        </section>
      </main>
      <section className="flex w-full flex-col gap-4">
        <p className="text-2xl my-2  ">Forecast 7 day</p>
        <div>
          {firstDateForEachDate.map((d, i) => (
            <ForecastWeatherDetail
              key={i}
              description={d?.weather[0].description ?? ""}
              weatherIcon={d?.weather[0].icon ?? "01d"}
              date=""
              day={d ? formattedDate(d.dt_txt).split(" ")[0] : ""}
              feels_like={d?.main.feels_like ?? 0}
              temp={d?.main.temp ?? 0}
              temp_max={d?.main.temp_max ?? 0}
              temp_min={d?.main.temp_min ?? 0}
              airPressure={`${d?.main.pressure} hPa `}
              humidity={`${d?.main.humidity}% `}
              sunrise={formattedTime(data.city.sunrise)}
              sunset={formattedTime(data.city.sunset)}
              visibility={`${convertToKm(d?.visibility ?? 10000)} `}
              windSpeed={`${d?.wind.speed ?? 1.64} `}
            />
          ))}
        </div>
      </section>
    </Suspense>
  );
}
