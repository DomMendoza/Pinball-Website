/* eslint-disable */
import React from 'react';

import ColorInputGrid from './ColorInputGrid';
import useLiveStream from '../context/LiveStreamContext';

function MobileResponsive() {
    const {
        isOpen,
        colorHex,
        numGroup1,
        numGroup2,
        numGroup3,
        totalCredits,
        betAmount,
        selectedButton,
        betButtons,
        setIsOpen,
        handleInputChange,
        handleConfirmBet,
        handleBetOnColor,
        handleButtonClick,
        handleClearButton,
        handleMaxButton,
        handleInputButtonClick
    } = useLiveStream();
    return (
        <div className="lg:hidden lg:gap-0 gap-4 py-14 h-auto w-full flex flex-col items-center border-4 border-blue-600">
            <div className="relative w-full pb-[56.25%] border-2 border-yellow-600">
                <iframe
                    //We'll use the padding bottom technique to maintain 16:9 ratio
                    className=" absolute w-full h-full"
                    allow="fullscreen"
                    // width="1280"
                    // height="720"
                    // src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=9b1e7c55-1db0-40e9-b443-07f0b5290dd3&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
                ></iframe>
            </div>
            <div className="flex w-[90%] h-auto uppercase text-dynamicSmall font-semibold ">
                <div className="flex flex-2 items-center justify-between gap-2 ">
                    <p className="w-full">credits:</p>
                    <div className="text-[#E26226] font-['Poppins'] ">
                        {totalCredits !== 0 ? ` ${parseFloat(totalCredits).toLocaleString()}.00` : '0.00'}
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-end gap-2 ">
                    <p>color:</p>
                    <div className="w-16 h-8 " style={{ backgroundColor: colorHex[selectedButton] }}></div>
                </div>
            </div>
            <div className="flex flex-col-reverse w-[90%] p-2 gap-2 rounded-lg ">
                <div className="uppercase text-dynamicSmall font-semibold flex flex-col items-center justify-center gap-2">
                    <p>enter bet amount:</p>
                    <div className="flex items-center justify-center px-2 py-2 border-2 border-black">
                        <input
                            type="text"
                            value={betAmount !== '' ? `₱ ${parseFloat(betAmount).toLocaleString()}` : '₱ 0'}
                            className="text-dynamicMid text-center w-full mx-auto text-[#E26226] outline-none border-none"
                            onChange={handleInputChange}
                            // onKeyDown={handleKeyDown}
                        />
                        <p onClick={() => handleClearButton()} style={{ fontWeight: 100, fontSize: '.75rem' }}>
                            clear
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 w-full text-center">
                        {betButtons.map((button, key) => (
                            <div
                                key={key}
                                className="p-2 rounded-full border-2 border-black"
                                onClick={() => handleInputButtonClick(button)}
                            >
                                <p className="text-dynamicMid">{button}</p>
                            </div>
                        ))}
                        <div
                            className="flex items-center justify-center rounded-full bg-[#00FF19]"
                            onClick={handleConfirmBet}
                        >
                            <p>confirm</p>
                        </div>
                    </div>
                </div>
                <div className="uppercase text-dynamicSmall font-semibold flex flex-col items-center justify-center gap-2 ">
                    <p>select a color:</p>
                    <ColorInputGrid
                        selectedButton={selectedButton}
                        colorHex={colorHex}
                        handleBetOnColor={handleBetOnColor}
                    />
                </div>
            </div>
        </div>
    );
}

export default MobileResponsive;
