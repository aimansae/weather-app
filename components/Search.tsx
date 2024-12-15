"use client";

import { SearchType } from "@/app/types";
import { cn } from "@/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import SuggestionBox from "./SuggestionBox";

const Search = ({ className, disableSearch }: SearchType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>(
    disableSearch ? "" : searchParams.get("search") || ""
  );

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  //search input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    if (inputValue.length >= 3) {
      fetchLocation(inputValue);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
      setError("");
    }
  };
  // submit form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearch(search);

    const sanitizedSearch = typeof search === "string" ? search : "";
    router.push(
      `/?search=${encodeURIComponent(sanitizedSearch.toLocaleLowerCase())}`
    );
    setSearch("");
  };

  //Close the suggestion div on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchLocation = async (place: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${place}&APPID=ee3fd101c160c0b64c3249db78ef7c0d`
      );

      const data = await res.json();

      if (data.list && data.list.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const locationNames = data.list.map((item: any) => item.name);
        setSuggestions(locationNames);
        setError("");
      } else {
        setSuggestions([]);
        setError("No Location Found");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to fetch locations");
    }
  };
  const disableSubmitButton = () => {
    return !search.trim() || Boolean(error);
  };
  const handleSuggestionClick = (value: string) => {
    setSearch(value);
    setShowSuggestions(false);
  };
  return (
    <div className="relative w-full">
      <form
        className={cn("flex items-center justify-center ", className)}
        onSubmit={handleSubmit}
      >
        <label htmlFor="search" className="sr-only">
          Search location
        </label>
        <input
          value={search}
          type="text"
          id="search"
          name="search"
          placeholder="Search location..."
          className="w-full h-10 outline-none p-1 border rounded-l  border-r-blue-500"
          onChange={handleChange}
        />
        <button
          disabled={disableSubmitButton()}
          type="submit"
          className={cn(
            " px-2 rounded-r  h-10",
            disableSubmitButton()
              ? "bg-gray-500"
              : "bg-blue-500 hover:bg-opacity-90"
          )}
        >
          <IoMdSearch className="text-white " />
        </button>
      </form>
      {showSuggestions && (
        <SuggestionBox
          containerRef={containerRef}
          error={error}
          suggestions={suggestions}
          location={search}
          handleSuggestionClick={handleSuggestionClick}
        ></SuggestionBox>
      )}
    </div>
  );
};

export default Search;
