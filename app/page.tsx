import Image from "next/image";
import ActualWeather from "./components/ActualWeather/ActualWeather";
import HomeData from "./components/HomeData/HomeData";
export default function Home() {
  return (
    <div>
      <ActualWeather />
      <HomeData />
    </div>
  );
}
