import React from 'react';
import Image from 'next/image';
async function getData() {
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

export function HomeDataClient({ data }: { data: any }) {
    return (
        <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2 sm:gap-4 border border-white/5">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                <Image 
                    src="/home.png" 
                    alt="Home" 
                    width={24} 
                    height={24}
                    className="drop-shadow-md sm:w-[32px] sm:h-[32px]" 
                />
                <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-sm font-medium text-gray-200">Temperatura:</span>
                    <span className="text-sm sm:text-xl font-bold">{Math.round(data.current.temperature_2m)}°C</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-sm font-medium text-gray-200">Wilgotność:</span>
                    <span className="text-sm sm:text-xl font-bold">{Math.round(data.current.relative_humidity_2m)}%</span>
                </div>
            </div>
        </div>
    );
}

export default async function HomeData() {
    const data = await getData();
    return <HomeDataClient data={data} />;
}
