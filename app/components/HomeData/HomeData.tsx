import React from 'react';
import Image from 'next/image';
async function getData() {
    try {
        if (!process.env.API_BME) {
            throw new Error('API_BME environment variable is not defined');
        }

        const res = await fetch(process.env.API_BME, {
            cache: 'no-store',
        })

        if (!res.ok) {
            throw new Error('Failed to fetch home data')
        }

        return await res.json()
    } catch (error) {
        console.error('Error fetching bme data:', error)
        throw error
    }
}

export function HomeDataClient({ data }: { data: any }) {
    return (
        <div className="max-w-md mx-auto flex flex-col  items-center p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2 sm:gap-4 border border-white/5">
            <div className="flex flex-row items-center gap-2 sm:gap-4 w-full">
                <Image
                    src="/home.png"
                    alt="Home"
                    width={24}
                    height={24}
                    className="drop-shadow-md sm:w-[32px] sm:h-[32px]"
                />
                <div className="flex flex-row flex-wrap w-full items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-sm font-medium text-gray-200">Temperatura:</span>
                        <span className="text-sm sm:text-xl font-bold">{Math.round(data.temperature)}°C</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-sm font-medium text-gray-200">Wilgotność:</span>
                        <span className="text-sm sm:text-xl font-bold">{Math.round(data.humidity)}%</span>
                        <div>
                            <a href="/home-data">
                                <Image 
                                    src="/redirect.png" 
                                    alt="Home" 
                                    width={16} 
                                    height={16} 
                                    className="cursor-pointer"
                                />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default async function HomeData() {
    const data = await getData();
    return <HomeDataClient data={data} />;
}
