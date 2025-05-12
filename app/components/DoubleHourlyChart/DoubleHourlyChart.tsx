'use client';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

export const optionsChart = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                font: {
                    size: 15,
                },
                color: 'white'
            }
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            border: {
                display: true
            },
            grid: {
                display: true,
                drawOnChartArea: true,
                drawTicks: true,
                color: "rgba(176, 199, 209, 0.2)", // Made more transparent
            },
            ticks: {
                color: "#354A5F",
                size: 16,
                stepSize: 1,
            }

        },
        y: {
            border: {
                display: true
            },
            grid: {
                display: true,
                drawOnChartArea: true,
                drawTicks: true,
                color: "rgba(176, 199, 209, 0.2)", // Made more transparent
                borderDash: [5, 5]
            },
            ticks: {
                color: '#354A5F',
                size: 16,
                stepSize: 1,
            }
        }
    }
};

interface DoubleHourlyChartProps {
    labelFirst: string;
    labelSecond: string;
    borderColorFirst: string;
    borderColorSecond: string;
    bgColorFirst: string;
    bgColorSecond: string;
    xKey: string[];
    yKeyFirst: string[];
    yKeySecond: string[];
    options?: object;
}

export default function DoubleHourlyChart({
    labelFirst, labelSecond, borderColorFirst, borderColorSecond, bgColorFirst, bgColorSecond, xKey, yKeyFirst, yKeySecond, 
    options = optionsChart
}: DoubleHourlyChartProps) {

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getDataStep = () => {
        if (windowWidth < 640) return 4; // Show every 3rd point on mobile
        if (windowWidth < 768) return 2; // Show every 2nd point on tablet
        return 1; // Show all points on desktop
    };

    const filterData = (data: any[]) => {
        const step = getDataStep();
        return data.filter((_, index) => index % step === 0);
    };

    const formattedXKey = Array.isArray(xKey)
        ? filterData(xKey).map((time: string) => {
            const date = new Date(time);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        })
        : [];

    const formattedYKeyFirst = Array.isArray(yKeyFirst)
        ? filterData(yKeyFirst).map((value: string | number) => {
            if (typeof value === 'string') {
                return parseFloat(value);
            }
            return value;
        })
        : [];

    const formattedYKeySecond = Array.isArray(yKeySecond)
        ? filterData(yKeySecond).map((value: string | number) => {
            if (typeof value === 'string') {
                return parseFloat(value);
            }
            return value;
        })
        : [];

    const data = {
        labels: formattedXKey,
        datasets: [
            {
                label: labelFirst,
                backgroundColor: bgColorFirst,
                borderColor: borderColorFirst,
                pointBorderColor: '#2E86C1',
                pointBackgroundColor: '#27AE60',
                pointHoverBackgroundColor: '#E74C3C',
                pointHoverBorderColor: '#8E44AD',
                data: formattedYKeyFirst,
                tension: 0.3,
                pointRadius: 5.5,
            },
            {
                label: labelSecond,
                backgroundColor: bgColorSecond,
                borderColor: borderColorSecond,
                pointBorderColor: '#2E86C1',
                pointBackgroundColor: '#27AE60',
                pointHoverBackgroundColor: '#E74C3C',
                pointHoverBorderColor: '#8E44AD',
                data: formattedYKeySecond,
                tension: 0.3,
                pointRadius: 5.5,
            }

        ],
    };

    return (
        <div className='w-full h-[400px] sm:h-[400px] md:h-[500px] '>
            <Chart 
                type="line" 
                data={data} 
                options={{
                    ...options,
                    responsive: true,
                    maintainAspectRatio: false
                }} 
            />
        </div>
    );
}