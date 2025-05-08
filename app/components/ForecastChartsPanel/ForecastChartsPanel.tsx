'use client'
import React, { useState, useEffect } from 'react';
import HourlyForecast from '../HourlyForecast/HourlyForecast';

export default function ForecastChartsPanel() {
    const [activeChart, setActiveChart] = useState<number>(0);

    const handleTabChange = (tabIndex: number) => {
        setActiveChart(tabIndex);
    };
    const renderContent = () => {
        switch (activeChart) {
            case 0:
                return (
                    <div>tab 1</div>
                );
            case 1:
                return (
                    <div>tab 2</div>
                );
            case 2:
                return (
                    <div>tab 3</div>
                )
            case 3:
                return (
                    <div><HourlyForecast /></div>
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
                        className={`px-6 py-3 text-center cursor-pointer transition-colors duration-200 ${
                            activeChart === index 
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                            : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        onClick={() => handleTabChange(index)}
                    >
                        <p className="font-medium">{label}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">{renderContent()}</div>
        </div>
    );
}
