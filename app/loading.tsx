import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Skeleton for Navbar */}
      <div className="h-12 bg-gray-300 rounded w-full"></div>

      {/* Skeleton for Main Content */}
      <main className="z-10 px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pt-4 pb-10">
        <section className="space-y-4">
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-40"></div>
          </div>
          <div className="gap-10 px-6 items-center flex flex-col">
            <div className="px-4 flex flex-col items-center justify-center">
              <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-32 bg-gray-300 rounded mt-2"></div>
              <div className="h-4 w-24 bg-gray-300 rounded mt-2"></div>
            </div>
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-xs gap-2 justify-between"
                >
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                  <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-fit justify-center flex-col items-center px-4">
              <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-12 w-12 bg-gray-300 rounded-full mb-2"></div>
            </div>
            <div className="bg-yellow-300 opacity-80 p-6 gap-4 justify-between overflow-x-auto">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-48 bg-gray-300 rounded mb-2"
                ></div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <section className="flex w-full flex-col gap-4">
        <p className="h-6 w-32 bg-gray-300 rounded mb-2"></p>
        <div className="flex gap-4">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-12 w-12 bg-gray-300 rounded-full mb-2"></div>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default LoadingSkeleton;
