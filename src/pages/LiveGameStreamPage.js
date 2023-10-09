/* eslint-disable */
import React, { useState } from 'react';
// import button from rea
import { Button, ButtonGroup } from '@mui/material';

export default function LiveGameStreamPage() {
    const [betAmount, setBetAmount] = useState('');
    const [totalBet, setTotalBet] = useState('');
    const [totalCredits, setTotalCredits] = useState('50,000');

    const handleButtonClick = (value) => {
        setBetAmount((prevValue) => prevValue + value);
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        // Remove non-numeric characters
        const numericValue = inputValue.replace(/\D/g, '');
        setBetAmount(numericValue);
    };

    const handleKeyDown = (e) => {
        const isNumericKey = /^[0-9]$/i.test(e.key);
        if (!isNumericKey) {
            e.preventDefault();
        }
    };

    //HINDI PA TAPOS YUNG LOGIC NG CONFIRM BET
    const handleConfirmBet = () => {
        const intValue = parseInt(betAmount, 10);
        const creditsIntValue = parseInt(totalCredits, 10);

        if (!isNaN(intValue) && intValue <= creditsIntValue) {
            setTotalBet(intValue);

            const newCredit = creditsIntValue - intValue;
            setTotalCredits(newCredit);

            // Clear the input
            setBetAmount('');
        } else {
            alert('Invalid bet amount or insufficient credits');
        }
    };

    const handleMaxButton = () => {
        setBetAmount(totalCredits);
    };

    return (
        <div className="h-screen border-4 border-red-600">
            <div className="h-full flex flex-col items-center border-4 border-blue-600">
                <iframe
                    className="border-2 border-green-600"
                    frameborder="0"
                    allowfullscreen
                    width="1280"
                    height="720"
                    // src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=e21b17df-b105-413b-a830-92a49303e119"
                ></iframe>
                <div className="flex-1 flex w-[1280px] h-auto border-2 border-red-600">
                    <div className="flex-1 flex flex-col border-2 border-blue-600">
                        <div className="grid grid-cols-3 place-items-center text-sm font-bold uppercase border-4 border-red-600 h-[15%]">
                            <p>
                                total bet:{' '}
                                <span className="text-[#E26226]">{`PHP ${totalBet.toLocaleString()}.00`}</span>
                            </p>
                            <p>
                                credits:{' '}
                                <span className="text-[#E26226]">{`PHP ${totalCredits.toLocaleString()}.00`}</span>
                            </p>
                            <div className="flex items-center gap-2">
                                <p>color:</p>
                                <div className="bg-red-600 w-16 h-5 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex-1 p-2 grid grid-cols-4 gap-2 border-4 border-green-600">
                            <Button
                                variant="contained"
                                className="h-full w-full"
                                style={{
                                    backgroundColor: '#FF0000',
                                    borderRadius: '100px'
                                }}
                            ></Button>
                            <Button
                                variant="contained"
                                className="h-full w-full"
                                style={{
                                    backgroundColor: '#008000',
                                    borderRadius: '100px'
                                }}
                            ></Button>
                            <Button
                                variant="contained"
                                className="h-full w-full"
                                style={{
                                    backgroundColor: '#FFFF00',
                                    borderRadius: '100px'
                                }}
                            ></Button>
                            <Button
                                variant="contained"
                                className="h-full w-full"
                                style={{
                                    backgroundColor: '#0000FF',
                                    borderRadius: '100px'
                                }}
                            ></Button>
                            <Button
                                variant="contained"
                                className="h-full w-full"
                                style={{
                                    backgroundColor: '#800080',
                                    borderRadius: '100px'
                                }}
                            ></Button>
                            <Button
                                variant="contained"
                                className="h-full w-full"
                                style={{
                                    backgroundColor: '#FFA500',
                                    borderRadius: '100px'
                                }}
                            ></Button>
                            <Button
                                variant="contained"
                                className="h-full w-full"
                                style={{
                                    backgroundColor: '#FFC0CB',
                                    borderRadius: '100px'
                                }}
                            ></Button>
                            <Button
                                variant="contained"
                                className="h-full w-full"
                                style={{
                                    backgroundColor: '#00FFFF',
                                    borderRadius: '100px'
                                }}
                            ></Button>
                            <Button
                                variant="contained"
                                className="h-full w-full col-span-4"
                                style={{
                                    backgroundColor: '#FFD700',
                                    borderRadius: '100px',
                                    color: 'black',
                                    padding: 0,
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                jackpot
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 font-bold border-2 py-2 items-center border-green-600">
                        <div className="flex flex-col w-[70%] items-center ">
                            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full">
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('1')}
                                >
                                    1
                                </Button>
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('2')}
                                >
                                    2
                                </Button>
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('3')}
                                >
                                    3
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full">
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('4')}
                                >
                                    4
                                </Button>
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('5')}
                                >
                                    5
                                </Button>
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('6')}
                                >
                                    6
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full">
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('7')}
                                >
                                    7
                                </Button>
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('8')}
                                >
                                    8
                                </Button>
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('9')}
                                >
                                    9
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full">
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        backgroundColor: '#FFFF00',
                                        color: 'black'
                                    }}
                                >
                                    clear
                                </Button>
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                    onClick={() => handleButtonClick('0')}
                                >
                                    0
                                </Button>
                                <Button
                                    size="small"
                                    className="w-full"
                                    style={{
                                        border: '1px solid black',
                                        backgroundColor: '#FF0000',
                                        color: 'white'
                                    }}
                                    onClick={handleMaxButton}
                                >
                                    max
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="flex flex-1 w-[70%] items-center gap-4">
                            <p className="uppercase">bet amount:</p>
                            {/* <span className="text-2xl  mx-auto">PHP 5,000</span> */}
                            <input
                                type="text"
                                value={`PHP ${betAmount}`}
                                className="text-2xl  mx-auto text-[#E26226]"
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            ></input>
                        </div>
                        <div className="flex-1 border-2 w-[70%]">
                            <Button
                                variant="contained"
                                className="h-full w-full"
                                style={{
                                    backgroundColor: '#1FFF28',
                                    color: 'black'
                                }}
                                onClick={handleConfirmBet}
                            >
                                confirm
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
