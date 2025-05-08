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
        <div className="max-w-lg mx-auto flex flex-row items-center p-6 bg-white/10 backdrop-blur-md rounded-xl gap-6 border-2 border-white/5 ">
            <div className="flex flex-row items-center gap-8">
                <Image 
                    src="/home.png" 
                    alt="Home environment" 
                    width={40} 
                    height={40}
                    className="drop-shadow-lg" 
                />
                <div className="flex items-center gap-3">
                    <span className="text-lg font-medium text-gray-200">Temperatura:</span>
                    <span className="text-3xl font-bold">{Math.round(data.current.temperature_2m)}°C</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-medium text-gray-200">Wilgotność:</span>
                    <span className="text-3xl font-bold">{Math.round(data.current.relative_humidity_2m)}%</span>
                </div>
            </div>
        </div>
    );
}

export default async function HomeData() {
    const data = await getData();
    return <HomeDataClient data={data} />;
}
