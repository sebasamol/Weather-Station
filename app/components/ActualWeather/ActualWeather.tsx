import React from 'react';
import WeatherStatus from '../WeatherStatus/WeatherStatus';
import DailyForecast from '../DailyForecast/DailyForecast';
import AirQuality from '../AirQuality/AirQuality';
import HomeData from '../HomeData/HomeData';

export default function ActualWeather() {
    return (
        <main className="min-h-screen p-8">
            <div className="flex flex-col gap-4 bg-blue-500/10 backdrop-blur-md rounded-lg p-4 shadow-lg max-w-6xl mx-auto">
                <p className="text-xs text-left mb-4">Aktualna pogoda w Poznaniu</p>
                <div className="flex ">
                    <div className="flex-1">
                        <WeatherStatus />
                        <div className="mr-8">
                            <DailyForecast />
                        </div>
                    </div>
                    <div className="flex-2">
                        <AirQuality />
                        <HomeData />
                    </div>
                </div>
                
            </div>
        </main>
    );
}
