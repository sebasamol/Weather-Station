import React from 'react';
import WeatherStatus from '../WeatherStatus/WeatherStatus';
import DailyForecast from '../DailyForecast/DailyForecast';

export default function ActualWeather() {
    return (
        <main className="min-h-screen p-8">

            <div className="flex flex-col gap-4 bg-blue-500/10 backdrop-blur-md rounded-lg p-4 shadow-lg max-w-4xl mx-auto">
                <p className="text-xs  text-left mb-4">Aktualna pogoda w Poznaniu</p>
                <WeatherStatus />
                <DailyForecast />
            </div>
        </main>
    );
}
