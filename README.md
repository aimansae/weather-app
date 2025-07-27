# Weather App 

This is a modern weather application built with  **TypeScript**, **Next.js**, and **TailwindCSS**. The app provides real-time weather updates, location-based searches, and an interactive user interface.

![Weather App preview](/public/appPreview.PNG)

Please find the live site [here](https://weather-app-x8x8.vercel.app/)
My Github Repo can be found [here](https://github.com/aimansae/weather-app)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Challenges & Learnings](#challenges--learnings)
- [Future Features](#future-features)
- [Credits](#credits)

## Features

- **Geolocation Support**: Automatically detects your location to provide weather details.
- **Search Functionality**: Search for weather updates by city name.
-**Responsive Design**: Fully optimized for mobile, tablet, and desktop devices using TailwindCSS.
-**Fast Performance**: Built on Next.js for server-side rendering and fast client-side navigation.

## Technologies Used

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [React](https://react.dev/)
- [TypeScript](https://nextjs.org/docs/pages/api-reference/config/typescript)
- [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or newer)
- A package manager like `npm`, `yarn`, `pnpm`, or `bun`

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/aimansae/weather-app
cd weather-app
npm install
# or
yarn install
npm run dev
Run locally: http://localhost:3000
```

## Deployment

You can deploy the app using [Vercel](https://vercel.com/):

- Push your code to a GitHub repository.
- Connect the repository to your Vercel account.
- Add the required environment variable:
NEXT_PUBLIC_WEATHER_KEY (your OpenWeatherMap API key).
- Deploy and access your app at the provided URL.
For full details, refer to the Next.js Deployment Docs.

## Challenges

1. Fetching Weather in page.tsx (Server-Side)
Weather data is fetched on the server using fetch in the page.tsx file, which improves SEO and initial load:

```bash
const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
);
const data = await res.json();
```
2. Using Set() to Filter Unique Values
To display unique city suggestions without duplicates, I used:

```bash
const uniqueCities = Array.from(new Set(cityList.map(item => item.name)));
```
This removes repetition and cleans the UI suggestions.

3. Search Param Handling
I used Next.js [useSearchParams method](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination) to dynamically fetch data based on user input:

```bash
export default async function Page({ searchParams }: { searchParams: { city?: string } }) {
  const city = searchParams.city || "Amsterdam";
  const weatherData = await getWeatherData(city);
}
```
This makes URLs shareable and improves routing logic.

4. Skeleton & Suspense for Loading States
Instead of displaying blank UI during API calls, I used a Skeleton Loader with React.Suspense to improve UX:

```bash
<Suspense fallback={<WeatherSkeleton />}>
  <WeatherCard city={city} />
</Suspense>

```
5. Reusable Components + Prop Passing
Weather display elements are built as modular components. Props like city, temperature, condition, etc., are passed down cleanly:

 
This keeps the code clean and scalable.

In the beginning, I found it quite challenging to understand how easy it actually is to use fetch in the Next.js App Router. At first, I struggled with how to set up API access and retrieve the data properly. Creating the API endpoint and calling it using fetch wasn’t too hard, but accessing and reading the returned data correctly took some time to figure out.

One of the trickiest parts was understanding how the structure of the response worked and how to extract the necessary values from it. However, once I got it working, it all started to make sense.

Another challenging area was implementing the search functionality. Initially, it was returning multiple results even when I only wanted the first match. After some adjustments, I managed to make it return just the first matching result, which made the experience much smoother and more precise.

🔮 Future Features
Planned improvements include:

7-day forecast view with daily breakdown

Hourly weather timeline

Dark mode toggle

Enhanced responsive layout and dropdown UX

Weather animations/icons based on condition

Auto-refresh for live updates

Favorites list

Better loading experience

Temperature unit toggle (°C/°F)

Multi-language support

Unit testing with Jest

 

## Credits

This app was made by coding along with Free Code Camp [Beginner Web Dev Project Tutorial – Weather App with Next.js, Tailwind CSS, and TypeScript](https://www.youtube.com/watch?v=KkC_wYM_Co4&t=7398s)

