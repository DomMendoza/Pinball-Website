/* eslint-disable */
import React from 'react';

export default function LiveGameStreamPage() {
    return (
        <div className="flex h-screen border-4 border-red-600">
            <div className="flex-1 h-full flex flex-col items-center border-4 border-blue-600">
                <iframe
                    className="border-2 border-green-600"
                    frameborder="0"
                    allowfullscreen
                    width="1280"
                    height="720"
                    // src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=fdfff19e-6738-4822-b832-ac490b8e5851&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
                ></iframe>
                <div className="flex-1 w-[1280px] h-auto border-2 border-yellow-600"></div>
            </div>
        </div>
    );
}
