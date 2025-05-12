import ActualWeather from "./components/ActualWeather/ActualWeather";
import ForecastChartsPanel from "./components/ForecastChartsPanel/ForecastChartsPanel";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-2 sm:px-4 md:px-6 py-2 sm:py-4 overflow-x-hidden">
      <ActualWeather />
      
      <ForecastChartsPanel />
    </div>
  );
}
