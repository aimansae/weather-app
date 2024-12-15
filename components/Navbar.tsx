"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdSunny } from "react-icons/io";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Search from "./Search";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Navbar = ({ location }: { location: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [userLocation, setUserLocation] = useState<string | null>(location); // State to store location
  const [searchLocation, setSearchLocation] = useState<string | null>(null); // State to store searched location
  const [isGeolocationSelected, setIsGeolocationSelected] = useState(false);
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchLocation(searchQuery);
    } else {
      setSearchLocation(searchQuery);
    }
  }, [searchParams]);
  const handleGeolocation = async () => {
    console.log("locationClicked");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
            );
            const data = await res.json();

            if (data && data.name) {
              setUserLocation(data.name);
              setIsGeolocationSelected(true);
              const newSearchParams = new URLSearchParams(
                searchParams.toString()
              );
              newSearchParams.set("search", data.name);
              router.push(`/?${newSearchParams.toString()}`);
              console.log("Logging user Location", userLocation);
            }
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
        (error) => {
          // Handle errors (e.g., user denies access)
          console.error("Error getting location:", error.message);
          if (error.code === 1) {
            alert(
              "Location access denied. Please enable it to use this feature."
            );
          } else if (error.code === 2) {
            alert("Location unavailable. Please try again.");
          } else if (error.code === 3) {
            alert("Request timed out. Please try again.");
          }
        },
        {
          enableHighAccuracy: true, // Use high accuracy for better results
          timeout: 10000, // Timeout in milliseconds
          maximumAge: 0, // Do not use cached location
        }
      );
    } else {
      console.log("Geolocation not available");
    }
  };
  const displayLocation = searchLocation || userLocation;

  return (
    <>
      <header className="sticky top-0 bg-white z-50">
        <nav className="flex justify-between items-center mx-auto px-2 py-3 w-full gap-2 max-w-7xl">
          <div className="flex flex-row items-center justify-center gap-1 md:gap-2 ">
            <Link href="/" className="text-2xl md:text-4xl text-gray-700">
              <span>Weather</span>
            </Link>
            <span>
              <IoMdSunny className="text-yellow-400 text-xl md:text-3xl" />
            </span>
          </div>
          <div className="flex justify-center gap-2 items-center ">
            <span>
              <FaLocationCrosshairs
                onClick={handleGeolocation}
                className="text-gray-400 cursor-pointer hover:text-opacity-60"
              />
            </span>
            <span>
              <FaLocationDot />
            </span>
            <p className="text-slate-800   whitespace-nowrap sm:block">
              {displayLocation}
            </p>
            <Search disableSearch={isGeolocationSelected} />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
