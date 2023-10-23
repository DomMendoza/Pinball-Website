/* eslint-disable */
import React from 'react';

import { Alert, Button, ButtonGroup, IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import ColorInputs from './ColorInputs';
import NumberInput from './NumberInput';
import LiveStreamFrame from './LiveStreamFrame';
import useLiveStream from '../context/LiveStreamContext';

function DesktopResponsive() {
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
        <div className="hidden h-screen w-dynamicBorder lg:flex flex-col items-center border-2 border-blue-600">
            <LiveStreamFrame />
            <div className="flex-1 flex flex-col w-full h-auto ">
                <ColorInputs selectedButton={selectedButton} colorHex={colorHex} handleBetOnColor={handleBetOnColor} />
                <div className=" flex-1 grid grid-cols-3">
                    <div className="numpad ">
                        <NumberInput
                            numGroup1={numGroup1}
                            numGroup2={numGroup2}
                            numGroup3={numGroup3}
                            betAmount={betAmount}
                            handleButtonClick={handleButtonClick}
                            handleClearButton={handleClearButton}
                            handleMaxButton={handleMaxButton}
                        />
                    </div>

                    <div className="bet-info  flex flex-col gap-2 items-center justify-center uppercase font-extrabold">
                        <div className=" w-[90%] text-dynamicLarge ">
                            <div className=" flex flex-col items-center gap-4 ">
                                <div className="relative flex items-center justify-between w-4/5 ">
                                    <div className="absolute right-0">
                                        <IconButton
                                            aria-label="delete"
                                            color="primary"
                                            size="small"
                                            onClick={() => {
                                                setIsOpen(!isOpen);
                                                // console.log(isOpen);
                                            }}
                                        >
                                            <AddCircleRoundedIcon />
                                        </IconButton>
                                    </div>
                                    <p className="font-['Poppins']">credits: </p>
                                    <div className="flex items-center  text-[#E26226] font-['Poppins'] w-1/2">
                                        {totalCredits !== 0
                                            ? `₱ ${parseFloat(totalCredits).toLocaleString()}.00`
                                            : '0.00'}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-4/5 ">
                                    <p className="font-['Poppins']">Bet Amount: </p>
                                    <div className="text-[#E26226] w-1/2 font-['Poppins']">
                                        <input
                                            type="text"
                                            value={
                                                betAmount !== '' ? `₱ ${parseFloat(betAmount).toLocaleString()}` : '₱ 0'
                                            }
                                            className="text-dynamicLarge w-full text-[#E26226] border-2"
                                            onChange={handleInputChange}
                                            // onKeyDown={handleKeyDown}
                                        ></input>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-4/5 ">
                                    <p className="font-['Poppins']">color: </p>
                                    <div
                                        className="w-1/2 h-5 "
                                        style={{ backgroundColor: colorHex[selectedButton] }}
                                    ></div>
                                </div>
                            </div>
                            {/* <div className="flex flex-col gap-4 border-2 border-blue-600">
                                    <div className="text-[#E26226] font-['Poppins']">
                                        {totalCredits !== 0
                                            ? `₱ ${parseFloat(totalCredits).toLocaleString()}.00`
                                            : '0.00'}
                                    </div>
                                    <div className="text-[#E26226] font-['Poppins']">
                                        <input
                                            type="text"
                                            value={
                                                betAmount !== '' ? `₱ ${parseFloat(betAmount).toLocaleString()}` : '₱ 0'
                                            }
                                            className="text-dynamicLarge w-full mx-auto text-[#E26226] border-2"
                                            onChange={handleInputChange}
                                            // onKeyDown={handleKeyDown}
                                        ></input>
                                    </div>
                                    <div
                                        className="w-full h-5 "
                                        style={{ backgroundColor: colorHex[selectedButton] }}
                                    ></div>
                                </div> */}
                        </div>
                        <Button
                            variant="contained"
                            className="w-[90%]"
                            style={{
                                backgroundColor: '#14C61B',
                                color: 'white',
                                // border: '2px solid magenta',
                                fontSize: '1rem',
                                paddingTop: '3%',
                                paddingBottom: '3%',
                                fontFamily: 'Poppins',
                                fontWeight: 'bold'
                            }}
                            onClick={handleConfirmBet}
                        >
                            confirm
                        </Button>
                        {/* <div className="bg-[#14C61B] w-[90%] py-2 text-lg text-center font-semibold">confirm</div> */}
                    </div>
                    <div className="chat-feed border-2 border-black"></div>
                </div>
            </div>
        </div>
    );
}

export default DesktopResponsive;
