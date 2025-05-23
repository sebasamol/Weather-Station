'use client';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
const optionsChart = {
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

interface HourlyChartProps {
    label: string;
    borderColor: string;
    bgColor: string;
    xKey: string[];
    yKey: string[];
    options?: object;
}

export default function HourlyChart({ label, borderColor, bgColor, xKey, yKey, options = optionsChart }: HourlyChartProps) {

    const formattedXKey = Array.isArray(xKey)
        ? xKey.map((time: string) => {
            const date = new Date(time);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        })
        : [];

    const formattedYKey = Array.isArray(yKey)
        ? yKey.map((value: string | number) => {
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
                label: label,
                backgroundColor: bgColor,
                borderColor: borderColor,
                pointBorderColor: '#2E86C1',
                pointBackgroundColor: '#27AE60',
                pointHoverBackgroundColor: '#E74C3C',
                pointHoverBorderColor: '#8E44AD',
                data: formattedYKey,
                tension: 0.3,
                pointRadius: 5.5,
            },
        ],
    };

    return (
        <div>
            <Chart
                type="line"
                data={data}
                options={options}
            />
        </div>
    );
};