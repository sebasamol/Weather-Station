'use client'
import React, { useState, useEffect } from 'react';
import HourlyChart from '../HourlyChart/HourlyChart';
import DoubleHourlyChart from '../DoubleHourlyChart/DoubleHourlyChart';
export default function ForecastChartsPanel() {
    const [activeChart, setActiveChart] = useState<number>(0);
    const [chartData, setChartData] = useState<any | null>(null);
    const url: string = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,wind_speed_10m,wind_gusts_10m,uv_index,uv_index_clear_sky&forecast_hours=24"
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setChartData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleTabChange = (tabIndex: number) => {
        setActiveChart(tabIndex);
    };

    const renderContent = () => {
        switch (activeChart) {
            case 0:
                return (
                    <div>
                        {chartData && (
                            <DoubleHourlyChart
                                xKey={chartData.hourly.time}
                                yKeyFirst={chartData.hourly.temperature_2m}
                                yKeySecond={chartData.hourly.apparent_temperature}
                                labelFirst="Temperatura zewnętrzna"
                                labelSecond="Temperatura odczuwalna"
                                borderColorFirst="rgba(75, 192, 192, 0.8)"
                                borderColorSecond="rgba(255, 99, 132, 0.8)"
                                bgColorFirst="rgba(75, 192, 192, 0.2)"
                                bgColorSecond="rgba(255, 99, 132, 0.2)"
                                options={{
                                    scales: {
                                        y: {
                                            title: {
                                                display: true,
                                                text: '[ °C ]',
                                                color: '#354A5F',
                                                font: {
                                                    size: 16,
                                                    weight: 'bold'
                                                }
                                            }
                                        }
                                    }
                                }} 
                            />
                        )}
                    </div>
                );
            case 1:
                return (
                    <div>
                        {chartData && (
                            <HourlyChart
                                xKey={chartData.hourly.time}
                                yKey={chartData.hourly.precipitation_probability}
                                label="Szansa opadów"
                                borderColor="rgba(75, 192, 192, 0.8)"
                                bgColor="rgba(75, 192, 192, 0.2)"
                                options={{
                                    scales: {
                                        y: {
                                            title: {
                                                display: true,
                                                text: '[ % ]',
                                                color: '#354A5F',
                                                font: {
                                                    size: 16,
                                                    weight: 'bold'
                                                }
                                            }
                                        }
                                    }
                                }} 
                            />
                        )}
                    </div>
                );
            case 2:
                return (
                    <div>
                        {chartData && (
                            <DoubleHourlyChart
                                xKey={chartData.hourly.time}
                                yKeyFirst={chartData.hourly.wind_speed_10m}
                                yKeySecond={chartData.hourly.wind_gusts_10m}
                                labelFirst="Prędkość wiatru"
                                labelSecond="Podmuch wiatru"
                                borderColorFirst="rgba(75, 192, 192, 0.8)"
                                borderColorSecond="rgba(255, 99, 132, 0.8)"
                                bgColorFirst="rgba(75, 192, 192, 0.2)"
                                bgColorSecond="rgba(255, 99, 132, 0.2)"
                                options={{
                                    scales: {
                                        y: {
                                            title: {
                                                display: true,
                                                text: '[ km/h ]',
                                                color: '#354A5F',
                                                font: {
                                                    size: 16,
                                                    weight: 'bold'
                                                }
                                            }
                                        }
                                    }
                                }} 
                            />
                        )}
                    </div>
                )
            case 3:
                return (
                    <div><DoubleHourlyChart
                                xKey={chartData.hourly.time}
                                yKeyFirst={chartData.hourly.uv_index}
                                yKeySecond={chartData.hourly.uv_index_clear_sky}
                                labelFirst="Wskaźnik UV"
                                labelSecond="Wskaźnik UV bez chmur"
                                borderColorFirst="rgba(75, 192, 192, 0.8)"
                                borderColorSecond="rgba(255, 99, 132, 0.8)"
                                bgColorFirst="rgba(75, 192, 192, 0.2)"
                                bgColorSecond="rgba(255, 99, 132, 0.2)"
                            /></div>
                );
            default:
                return null;
        }
    };
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="flex border-b border-gray-200">
                {['Temperatura', 'Opady', 'Wiatr', 'UV'].map((label, index) => (
                    <div
                        key={index}
                        className={`px-6 py-3 text-center cursor-pointer transition-colors duration-200 ${activeChart === index
                            ? 'text-green-600 border-b-2 border-green-600'
                            : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                            }`}
                        onClick={() => handleTabChange(index)}
                    >
                        <p className="font-medium">{label}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 p-4  rounded-lg shadow-sm">{renderContent()}</div>
        </div>
    );
}
