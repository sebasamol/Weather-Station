'use client';
import React, { useState, useEffect } from 'react'
import HourlyChartHome from '../HourlyChartHome/HourlyChartHome';
import { optionsChart } from '../DoubleHourlyChart/DoubleHourlyChart';

export default function HomeCharts() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getData() {
            try {
                
                const res = await fetch('/api/bme-hourly', {
                    cache: 'no-store',
                })

                if (!res.ok) {
                    throw new Error('Failed to fetch home data')
                }

                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching bme data:', error)
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    if (loading) {
        return (
            <div className="max-w-md mx-auto flex flex-col items-center p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2 sm:gap-4 border border-white/5">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto flex flex-col items-center p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2 sm:gap-4 border border-white/5">
                <div className="text-red-400">Error: {error}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="max-w-md mx-auto flex flex-col items-center p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2 sm:gap-4 border border-white/5">
                <div className="text-white">No data available</div>
            </div>
        );
    }

    return (
        <div className="max-w- mx-auto flex flex-col  items-center p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2 sm:gap-4 border border-white/5">
            <HourlyChartHome 
                xKey={data.timestamp}
                yKey={data.temperature}
                label="Temperatura"
                borderColor="rgba(75, 192, 192, 0.8)"
                bgColor="rgba(75, 192, 192, 0.2)"
                options={{
                    ...optionsChart,
                    scales: {
                        ...optionsChart.scales,
                        y: {
                            ...optionsChart.scales.y,
                            title: {
                                display: true,
                                text: '[ °C ]',
                                color: '#4A6279',
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }}
            />
            <HourlyChartHome 
                xKey={data.timestamp}
                yKey={data.humidity}
                label="Wilgotność"
                borderColor="rgba(75, 192, 192, 0.8)"
                bgColor="rgba(75, 192, 192, 0.2)"
                options={{
                    ...optionsChart,
                    scales: {
                        ...optionsChart.scales,
                        y: {
                            ...optionsChart.scales.y,
                            title: {
                                display: true,
                                text: '[ % ]',
                                color: '#4A6279',
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }}
            />
            <HourlyChartHome 
                xKey={data.timestamp}
                yKey={data.pressure}
                label="Ciśnienie"
                borderColor="rgba(75, 192, 192, 0.8)"
                bgColor="rgba(75, 192, 192, 0.2)"
                options={{
                    ...optionsChart,
                    scales: {
                        ...optionsChart.scales,
                        y: {
                            ...optionsChart.scales.y,
                            title: {
                                display: true,
                                text: '[ hPa ]',
                                color: '#4A6279',
                                font: {
                                    size: 18,
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    )
}