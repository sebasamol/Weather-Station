import React from "react";
import Image from 'next/image'
import DailyForecastBox from "../DailyForecastBox/DailyForecastBox";
import { WEATHER_CODES } from '../../../utility/weatherCodes'

async function getData() {
    try {
        if (!process.env.API_FORECAST_WEATHER) {
            throw new Error('API_CURRENT_WEATHER environment variable is not defined');
        }

        const res = await fetch(process.env.API_FORECAST_WEATHER, {
            cache: 'no-store',
        })

        if (!res.ok) {
            throw new Error('Failed to fetch weather data')
        }

        return await res.json()
    } catch (error) {
        console.error('Error fetching open meteo api:', error)
        throw error
    }
}

export default async function DailyForecast() {
    const data = await getData();
    const weatherCodes = data.daily.weather_code;
    const dates = data.daily.time.map((dateString: string) => new Date(dateString).toLocaleDateString([], { day: '2-digit', month: '2-digit' }));
    return (
        <div className='flex flex-row gap-3 max-w-lg p-4 '>
            {weatherCodes.map((code: number, index: number) => {
                const found = WEATHER_CODES.find((element) => element.code === code);
                return found ? (
                    <DailyForecastBox
                        key={index}
                        date={dates[index]}
                        weather_code={found.icon}
                        temperature_min={data.daily.temperature_2m_min[index]}
                        temperature_max={data.daily.temperature_2m_max[index]}
                        precipitation={data.daily.precipitation_probability_max[index]}
                    />
                ) : null;
            })}
        </div>
    );
}