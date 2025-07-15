import { NextResponse } from 'next/server';

export async function GET() {
    try {
        if (!process.env.API_BME_HOURLY) {
            return NextResponse.json(
                { error: 'API_BME_HOURLY environment variable is not defined' },
                { status: 500 }
            );
        }

        const res = await fetch(process.env.API_BME_HOURLY, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch home data');
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching bme data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
} 