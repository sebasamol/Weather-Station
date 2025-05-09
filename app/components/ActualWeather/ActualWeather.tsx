import React from 'react';
import WeatherStatus from '../WeatherStatus/WeatherStatus';
import DailyForecast from '../DailyForecast/DailyForecast';
import AirQuality from '../AirQuality/AirQuality';
import HomeData from '../HomeData/HomeData';

export default function ActualWeather() {
    return (
        <main className="p-2 sm:p-4">
            <div className="flex flex-col gap-2 sm:gap-4 bg-blue-500/10 backdrop-blur-md rounded-lg p-2 sm:p-4 shadow-lg max-w-6xl mx-auto">
                <p className="text-xs text-left mb-2 sm:mb-4">Aktualna pogoda w Poznaniu</p>
                <div className="flex flex-col lg:flex-row gap-2 sm:gap-9">
                    <div className="w-full lg:w-1/2">
                        <WeatherStatus />
                        <div className="mr-0 lg:mr-8 mt-2 sm:mt-4">
                            <DailyForecast />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-2 sm:space-y-4">
                        <AirQuality />
                        <HomeData />
                    </div>
                </div>
            </div>
        </main>
    );
}
