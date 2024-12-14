import React from "react";
type SuggestionProps = {
  containerRef: React.LegacyRef<HTMLDivElement> | undefined;
  error: string;
  suggestions: string[];
  location: string;
  handleSuggestionClick: (location: string) => void;
};
const SuggestionBox = ({
  containerRef,
  error,
  suggestions,
  handleSuggestionClick,
}: SuggestionProps) => {
  return (
    <div
      ref={containerRef}
      className="absolute top-10 bg-white shadow p-2 w-full h-auto z-50"
    >
      {error ? (
        <div>{error}</div>
      ) : (
        <ul className="mb-2">
          {suggestions.map((location, index) => (
            <li
              onClick={() => handleSuggestionClick(location)}
              className="hover:bg-slate-200 cursor-pointer my-2"
              key={index}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionBox;
