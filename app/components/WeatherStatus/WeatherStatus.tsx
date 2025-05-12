import React from 'react';
import { WEATHER_CODES } from '../../../utility/weatherCodes';
import Image from 'next/image';

export async function getData() {
    try {
        if (!process.env.API_CURRENT_WEATHER) {
            throw new Error('API_CURRENT_WEATHER environment variable is not defined');
        }

        const res = await fetch(process.env.API_CURRENT_WEATHER)
        

        if (!res.ok) {
            throw new Error('Failed to fetch weather data')
        }

        return await res.json()
    } catch (error) {
        console.error('Error fetching open meteo api:', error)
        throw error
    }
}

export function WeatherStatusClient({ data }: { data: any }) {
    const found = WEATHER_CODES.find((element) => element.code === data.current.weather_code)

    if (!found) {
        return <div className="text-red-500 text-center p-4">Unknown weather condition</div>
    }

    return (
            <div className="max-w-lg mx-auto flex flex-row items-center p-4 bg-white/10 backdrop-blur-md rounded-lg gap-3 border-2 border-white/5">
                <Image 
                    src={found.icon} 
                    alt="Weather station" 
                    width={48} 
                    height={48} 
                    className="drop-shadow-lg"
                />
                <p className="text-4xl font-bold">
                    {Math.round(data.current.temperature_2m)}°C
                </p>
                <p className="text-4xl font-bold">
                    {Math.round(data.current.relative_humidity_2m)}%
                </p>
                <div className="flex flex-col ml-2">
                    <p className="text-xs font-medium">
                        {found.description}
                    </p>
                    <p className="text-[12px] text-gray-300">
                        Temperatura odczuwalna {Math.round(data.current.apparent_temperature)}°C
                    </p>
                </div>
            </div>
    )
}

// Server component
export default async function WeatherStatus() {
    const data = await getData()
    return <WeatherStatusClient data={data} />
}