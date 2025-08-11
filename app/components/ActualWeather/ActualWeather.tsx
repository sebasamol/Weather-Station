import React from 'react';
import WeatherStatus from '../WeatherStatus/WeatherStatus';
import DailyForecast from '../DailyForecast/DailyForecast';
import AirQuality from '../AirQuality/AirQuality';
import HomeData from '../HomeData/HomeData';

export default function ActualWeather() {
    return (
        <div className="flex flex-col gap-1 sm:gap-4 bg-blue-500/10 backdrop-blur-md rounded-lg p-2 sm:p-4 shadow-lg max-w-5xl w-full mx-auto">
            <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 pl-2 sm:pl-4">
                <p className="text-base sm:text-[14px] md:text-l font-bold mb-3">Aktualna pogoda w Poznaniu</p>
                
            </div>
            <div className="flex flex-col lg:flex-row gap-1 sm:gap-4 lg:gap-4">
                <div className="w-full lg:w-5/12 p-2 sm:p-4">
                        <WeatherStatus />
                    <div className="mt-2 sm:mt-3">
                        <DailyForecast />
                    </div>
                </div>
                <div className="w-full lg:w-1/2  p-2 sm:p-4">
                    <div className="space-y-2 sm:space-y-3">
                        <AirQuality />
                    </div>
                    <div className="mt-2 sm:mt-3 p-1 sm:p-2 md:p-3 mx-0 sm:mx-2">
                        <HomeData />
                    </div>
                </div>
            </div>
        </div>
    );
}
