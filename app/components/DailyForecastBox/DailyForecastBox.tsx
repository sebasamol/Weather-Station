import React from "react";
import Image from "next/image";

interface DailyForecastBoxProps {
    date: string;
    weather_code: string;
    temperature_min: number;
    temperature_max: number;
    precipitation: number;
}

export default function DailyForecastBox({ date, weather_code, temperature_min, temperature_max, precipitation }: DailyForecastBoxProps) {

    return (
        <div className='flex flex-col items-center p-1.5 bg-white/10 backdrop-blur-md rounded-lg'>
            <div className='text-base font-semibold mb-1.5'>
                {date}
            </div>
            <div className='flex flex-col items-center gap-1.5'>
                <div className='p-1.5 bg-white/20 rounded-full'>
                    <Image src={weather_code} alt="weather_code" width={32} height={32} />
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-base font-medium'>
                        {temperature_max}°C
                    </div>
                    <div className='text-xs text-gray-300'>
                        {temperature_min}°C
                    </div>

                </div>
                <div className='flex items-center gap-1 text-xs'>
                    <Image src="/chance_rain.png" alt="rain" width={16} height={16} />
                    {precipitation}%
                </div>
            </div>

        </div>
    );
}