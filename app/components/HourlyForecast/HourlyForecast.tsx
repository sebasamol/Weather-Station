import React from 'react';
import HourlyChart from '../HourlyChart/HourlyChart';

async function getData() {
    try {
        if (!process.env.API_HOURLY_FORECAST) {
            throw new Error('API_HOURLY_FORECAST environment variable is not defined');
        }

        const res = await fetch(process.env.API_HOURLY_FORECAST, {
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

export default async function HourlyForecast() {
    const data = await getData();
    const time = data.hourly.time.map((timestamp: string) => timestamp.split('T')[1].slice(0, -3) + ':00');
    return (
        <div className='w-1/2 h-1/2'>
            <HourlyChart
                xKey={time}
                yKey={data.hourly.temperature_2m}
                label="Temperatura zewnętrzna"
                borderColor="rgba(75, 192, 192, 0.8)"
                bgColor="rgba(75, 192, 192, 0.2)"
            />
        </div>
    );
}
