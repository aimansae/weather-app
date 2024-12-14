export type WeatherDetailType = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export type WeatherDataType = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetailType[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type WeatherIconTypes = { iconName: string; className?: string };
export type SingleWeatherDetailType = {
  information: string;
  icon: React.ReactNode;
  value: string;
};

export type WeatherDetailTypes = {
  visibility: string;
  humidity: string;
  windSpeed: string;
  sunrise: string;
  sunset: string;
  airPressure: string;
};
export type ForecastWeatherDetailType = {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
  visibility: string;
  humidity: string;
  windSpeed: string;
  sunrise: string;
  sunset: string;
  airPressure: string;
};
export type SearchType = {
  className?: string;
  disableSearch: boolean;
};
