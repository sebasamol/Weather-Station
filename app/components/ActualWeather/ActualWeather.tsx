import React from 'react';
import WeatherStatus from '../WeatherStatus/WeatherStatus';
import DailyForecast from '../DailyForecast/DailyForecast';
import AirQuality from '../AirQuality/AirQuality';
import HomeData from '../HomeData/HomeData';
import { ServerStats } from '../ServerStats/ServerStats';

export default function ActualWeather() {
    return (
            <div className="flex flex-col gap-2 sm:gap-4 bg-blue-500/10 backdrop-blur-md rounded-lg p-2 sm:p-4 shadow-lg max-w-6xl w-full mx-auto">
                <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 pl-2 sm:pl-4">
                    <p className="text-xs sm:text-sm text-left mb-2 sm:mb-4">Aktualna pogoda w Poznaniu</p>
                    <ServerStats />
                </div>
                <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 lg:gap-6">
                    <div className="w-full lg:w-1/2">
                        <WeatherStatus />
                        <div className="flex justify-center">
                            <DailyForecast />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
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
