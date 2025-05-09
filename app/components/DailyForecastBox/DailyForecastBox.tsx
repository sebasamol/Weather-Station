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
        <div className='flex flex-col items-center p-1 sm:p-1.5 bg-white/10 backdrop-blur-md rounded-lg border-2 border-white/5'>
            <div className='text-sm sm:text-base font-semibold mb-1 sm:mb-1.5'>
                {date}
            </div>
            <div className='flex flex-col items-center gap-1 sm:gap-1.5'>
                <div className='p-1 sm:p-1.5 bg-white/20 rounded-full'>
                    <Image src={weather_code} alt="weather_code" width={24} height={24} className="sm:w-[32px] sm:h-[32px]" />
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-xs sm:text-s font-medium'>
                        {temperature_max}°C
                    </div>
                    <div className='text-[10px] sm:text-xs text-gray-300'>
                        {temperature_min}°C
                    </div>
                </div>
                <div className='flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs'>
                    <Image src="/chance_rain.png" alt="rain" width={12} height={12} className="sm:w-4 sm:h-4" />
                    {precipitation}%
                </div>
            </div>
        </div>
    );
}