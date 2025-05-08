import React from 'react';
import { AIR_QUALITY_PARAMS } from '@/utility/airQuality';
import Image from 'next/image';

interface AirQualityData {
    current: {
        european_aqi: number;
        pm10: number;
        pm2_5: number;
        nitrogen_dioxide: number;
        sulphur_dioxide: number;
        carbon_monoxide: number;
        ozone: number;
        time: string;
    }
}



async function getData(): Promise<AirQualityData> {
    try {
        if (!process.env.API_AIR_QUALITY) {
            throw new Error('API_AIR_QUALITY environment variable is not defined');
        }

        const res = await fetch(process.env.API_AIR_QUALITY, {
            
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        throw error;
    }
}

const getColor = (key: string, value: number): string => {
    if (key === 'pm2_5' || key === 'pm10') {
        if (value < 12) return 'green'; // Good air quality
        if (value < 35.4) return '#FFD700'; // Moderate air quality
        if (value < 55.4) return 'orange'; // Unhealthy for sensitive groups
        if (value < 150.4) return 'red'; // Unhealthy
        return '#660032'; // Very Unhealthy
    } else if (key === 'nitrogen_dioxide' || key === 'sulphur_dioxide' || key === 'carbon_monoxide') {
        if (value < 50) return 'green'; // Good air quality
        if (value < 100) return '#FFC700'; // Moderate air quality
        if (value < 150) return 'orange'; // Unhealthy for sensitive groups
        if (value < 200) return 'red'; // Unhealthy
        return '#660032'; // Very Unhealthy
    } else if (key === 'european_aqi') {
        if (value <= 25) return 'green'; // Good air quality
        if (value <= 50) return '#FFD700'; // Better yellow for moderate air quality
        if (value <= 75) return 'orange'; // Unhealthy for sensitive groups
        if (value <= 100) return 'red'; // Unhealthy
        return '#660032'; // Very Unhealthy
    } else if (key === 'ozone') {
        if (value < 50) return 'green'; // Good air quality
        if (value < 100) return '#FFD700'; // Moderate air quality
        if (value < 150) return 'orange'; // Unhealthy for sensitive groups
        if (value < 200) return 'red'; // Unhealthy
        return '#660032'; // Very Unhealthy
    } else {
        // Default case for any other parameters
        if (value < 50) return 'green'; // Good air quality
        if (value < 100) return '#FFD700'; // Moderate air quality
        if (value < 150) return 'orange'; // Unhealthy for sensitive groups
        if (value < 200) return 'red'; // Unhealthy
        return '#660032'; // Very Unhealthy
    }
};

export function AirQualityClient({ data }: { data: any }) {

    const time = new Date(data.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className='max-w-md mx-auto'>

            <div className='grid grid-cols-4 gap-2 '>
                {AIR_QUALITY_PARAMS.map(param => {
                    const value = data.current[param.key];
                    const color = getColor(param.key, value);

                    return (
                        <div key={param.id} className='bg-white/10 backdrop-blur-md rounded-lg p-2 max-w-[100px] border-2 border-white/5'>
                            <div className='flex flex-col gap-0.5'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-s font-medium'>{param.name}</span>
                                    <span className='cursor-help'>
                                        <Image src={'/question.png'} alt='info' width={10} height={10} />
                                    </span>
                                </div>
                                <div className='flex items-baseline gap-1'>
                                    <span className='text-[16px] font-bold' style={{ color }}>{value}</span>
                                    <span className='text-[12px] text-gray-300'>{param.unit}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='mt-4 text-center'>
                <div className='text-xs text-gray-400 italic'>
                    <span>Stan na godzinę </span>
                    <span>{time}</span>
                </div>
            </div>

        </div>
    );
}

// Create a server component version for testing
export default async function AirQuality() {
    const data = await getData();
    return <AirQualityClient data={data} />
}
