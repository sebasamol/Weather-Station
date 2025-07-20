'use client';
import React from 'react';
import HomeCharts from '../app/components/HomeCharts/HomeCharts';
import Image from 'next/image';
import '../app/globals.css';
export default function HomeData() {
    return (
        <div className="flex flex-col items-center justify-center w-screen px-2 sm:px-4 md:px-6 py-2 sm:py-4 overflow-x-hidden">
            <div className="w-full max-w-1xl ">
                <a href="/">
                    <Image
                        src="/home.png"
                        alt="Home"
                        width={36}
                        height={36}
                        className="cursor-pointer"
                    />
                </a>
            </div>
            <div className="w-full max-w-6xl">
                <HomeCharts />
            </div>
        </div>
    );
}
