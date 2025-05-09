import ActualWeather from "./components/ActualWeather/ActualWeather";
import ForecastChartsPanel from "./components/ForecastChartsPanel/ForecastChartsPanel";

export default function Home() {
  return (
    <div className="flex flex-col items-center  min-h-screen">
      <ActualWeather />
      <ForecastChartsPanel />
    </div>
  );
}
