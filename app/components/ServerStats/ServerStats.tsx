import React from 'react';
import Image from 'next/image';



export function ServerStats() {
    return (
        <div className="flex flex-row gap-2 sm:gap-4">
            <Image src="/cpu.png" alt="Server" width={36} height={36} /><p>4%</p>
            <Image src="/ram-memory.png" alt="Server" width={36} height={36} /><p>1,66 GB / 7,64 GB</p>
        </div>
    )
}
