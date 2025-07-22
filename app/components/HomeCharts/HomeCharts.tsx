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
            <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center p-2 sm:p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2 sm:gap-4 border border-white/5">
                <div className="text-white text-sm sm:text-base">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center p-2 sm:p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2 sm:gap-4 border border-white/5">
                <div className="text-red-400 text-sm sm:text-base">Error: {error}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center p-2 sm:p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-lg gap-2 sm:gap-4 border border-white/5">
                <div className="text-white text-sm sm:text-base">No data available</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] mx-auto bg-blue-500/10 backdrop-blur-md flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-lg border border-white/5">
            <div className="w-full mb-4 sm:mb-6 md:mb-8">
                <HourlyChartHome 
                    xKey={data.timestamp}
                    yKey={data.temperature}
                    label="Temperatura"
                    borderColor="rgba(75, 192, 192, 0.8)"
                    bgColor="rgba(75, 192, 192, 0.2)"
                    options={{
                        ...optionsChart,
                        maintainAspectRatio: true,
                        responsive: true,
                        scales: {
                            ...optionsChart.scales,
                            x: {
                                ...optionsChart.scales.x,
                                ticks: {
                                    ...optionsChart.scales.x.ticks,
                                    color: "#FFFFFF",
                                    font: {
                                        size: 10,
                                        '@media (min-width: 640px)': {
                                            size: 12
                                        }
                                    }
                                }
                            },
                            y: {
                                ...optionsChart.scales.y,
                                ticks: {
                                    ...optionsChart.scales.y.ticks,
                                    color: "#00FF00",
                                    font: {
                                        size: 10,
                                        '@media (min-width: 640px)': {
                                            size: 12
                                        }
                                    }
                                },
                                title: {
                                    display: true,
                                    text: '[ °C ]',
                                    color: '#4A6279',
                                    font: {
                                        size: 12,
                                        weight: 'bold',
                                        '@media (min-width: 640px)': {
                                            size: 16
                                        }
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>
            <div className="w-full mb-4 sm:mb-6 md:mb-8">
                <HourlyChartHome 
                    xKey={data.timestamp}
                    yKey={data.humidity}
                    label="Wilgotność"
                    borderColor="rgba(75, 192, 192, 0.8)"
                    bgColor="rgba(75, 192, 192, 0.2)"
                    options={{
                        ...optionsChart,
                        maintainAspectRatio: true,
                        responsive: true,
                        scales: {
                            ...optionsChart.scales,
                            x: {
                                ...optionsChart.scales.x,
                                ticks: {
                                    ...optionsChart.scales.x.ticks,
                                    color: "#FFFFFF",
                                    font: {
                                        size: 10,
                                        '@media (min-width: 640px)': {
                                            size: 12
                                        }
                                    }
                                }
                            },
                            y: {
                                ...optionsChart.scales.y,
                                ticks: {
                                    ...optionsChart.scales.y.ticks,
                                    color: "#00FF00",
                                    font: {
                                        size: 10,
                                        '@media (min-width: 640px)': {
                                            size: 12
                                        }
                                    }
                                },
                                title: {
                                    display: true,
                                    text: '[ % ]',
                                    color: '#4A6279',
                                    font: {
                                        size: 12,
                                        weight: 'bold',
                                        '@media (min-width: 640px)': {
                                            size: 16
                                        }
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>
            <div className="w-full">
                <HourlyChartHome 
                    xKey={data.timestamp}
                    yKey={data.pressure}
                    label="Ciśnienie"
                    borderColor="rgba(75, 192, 192, 0.8)"
                    bgColor="rgba(75, 192, 192, 0.2)"
                    options={{
                        ...optionsChart,
                        maintainAspectRatio: true,
                        responsive: true,
                        scales: {
                            ...optionsChart.scales,
                            x: {
                                ...optionsChart.scales.x,
                                ticks: {
                                    ...optionsChart.scales.x.ticks,
                                    color: "#FFFFFF",
                                    font: {
                                        size: 10,
                                        '@media (min-width: 640px)': {
                                            size: 12
                                        }
                                    }
                                }
                            },
                            y: {
                                ...optionsChart.scales.y,
                                ticks: {
                                    ...optionsChart.scales.y.ticks,
                                    color: "#00FF00",
                                    font: {
                                        size: 10,
                                        '@media (min-width: 640px)': {
                                            size: 12
                                        }
                                    }
                                },
                                title: {
                                    display: true,
                                    text: '[ hPa ]',
                                    color: '#4A6279',
                                    font: {
                                        size: 12,
                                        weight: 'bold',
                                        '@media (min-width: 640px)': {
                                            size: 18
                                        }
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}