import ActualWeather from "./components/ActualWeather/ActualWeather";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ActualWeather />
      <HourlyForecast />
    </div>
  );
}
