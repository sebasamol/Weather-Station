import React from 'react';
import { WEATHER_CODES } from '../../../utility/weatherCodes';
import Image from 'next/image';

export async function getData() {
    try {
        if (!process.env.API_CURRENT_WEATHER) {
            throw new Error('API_CURRENT_WEATHER environment variable is not defined');
        }

        const res = await fetch(process.env.API_CURRENT_WEATHER, {
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

export function WeatherStatusClient({ data }: { data: any }) {
    const found = WEATHER_CODES.find((element) => element.code === data.current.weather_code)

    if (!found) {
        return <div className="text-red-500 text-center p-4">Unknown weather condition</div>
    }

    return (
        <div className="max-w-lg mx-auto">
            <div className="flex flex-row items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2">
                <Image 
                    src={found.icon} 
                    alt="Weather station" 
                    width={48} 
                    height={48} 
                    className="drop-shadow-lg"
                />
                <p className="text-4xl font-bold">
                    {data.current.temperature_2m}°C
                </p>
                <div className="flex flex-col">
                    <p className="text-xs font-medium">
                        {found.description}
                    </p>
                    <p className="text-xs text-gray-300">
                        Temperatura odczuwalna {data.current.apparent_temperature}°C
                    </p>
                </div>
            </div>
        </div>
    )
}

// Server component
export default async function WeatherStatus() {
    const data = await getData()
    return <WeatherStatusClient data={data} />
}