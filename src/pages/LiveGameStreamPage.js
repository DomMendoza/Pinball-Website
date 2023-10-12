/* eslint-disable */
import React, { useState, useEffect } from 'react';
// import button from rea
import { Alert, Button, ButtonGroup } from '@mui/material';
import axios from 'axios';
import OBSWebSocket from 'obs-websocket-js';
import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken';

const LiveGameStreamPage = () => {
    const [selectedColorName, setSelectedColorName] = useState('');
    const [selectedColorHex, setSelectedColorHex] = useState('');
    // const [userId, setUserId] = useState('');
    // const [wallet, setWallet] = useState();
    const [betAmount, setBetAmount] = useState('');
    const [totalBet, setTotalBet] = useState('');
    const [totalCredits, setTotalCredits] = useState(0);
    const [currentProgramScene, setCurrentProgramScene] = useState();
    const numGroup1 = ['1', '2', '3'];
    const numGroup2 = ['4', '5', '6'];
    const numGroup3 = ['7', '8', '9'];
    const colorHex = ['#FF0000', '#008000', '#FFFF00', '#0000FF', '#800080', '#FFA500', '#FFC0CB', '#00FFFF'];
    const colorName = ['red', 'green', 'yellow', 'blue', 'violet', 'orange', 'pink', 'cyan', 'gold'];
    const userToken = Cookies.get('userToken');

    const obsAddress = 'ws://127.0.0.1:4455';
    const obs = new OBSWebSocket();

    console.log(userToken);

    // useEffect(() => {
    //     const baseUrl = process.env.REACT_APP_BACKEND_URL;
    //     const headers = {
    //         Authorization: `Bearer ${userToken}`
    //     };
    //     axios
    //         .get(`${baseUrl}/user/check/session`, { headers })
    //         .then((response) => {
    //             // Check the response and update the session status accordingly
    //             if (response.status === 200) {
    //                 // console.log(response.data.userSessionDets.user_id);
    //                 setUserId(response.data.userSessionDets.user_id);
    //             } else {
    //                 console.log('User session is not active.');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error checking user session:', error);
    //             console.log('Error checking user session.');
    //         });
    // }, [userToken]);


    useEffect(() => {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const headers = {
            Authorization: `Bearer ${userToken}`
        };
    
        axios
            .get(`${baseUrl}/user/wallet/amount`, {
                headers: headers,
                // data: data // Use the 'data' property to send the request body
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data.wallet.wallet_balance);
                    setTotalCredits(response.data.wallet.wallet_balance)
                } else {
                    console.log('Error:', response.status);
                }
            })
            .catch((error) => {
                console.error('Error getting wallet:', error);
            });
    }, []);
    

    useEffect(() => {
        (async () => {
            try {
                //OBS websocket connection
                await obs.connect(obsAddress);
                console.log(`Connected to OBS`);

                //Scene change listener
                obs.on('CurrentProgramSceneChanged', onCurrentSceneChanged);
            } catch (error) {
                console.error('Failed to connect', error.code, error.message);
            }
        })();
    }, []);

    //Scene change event handler
    const onCurrentSceneChanged = (event) => {
        const currentScene = event.sceneName;
        setCurrentProgramScene(currentScene);

        if (currentScene === 'Place your bet') {
            window.alert('Current scene changed to: ' + currentScene);
        }
        // window.alert('Current scene changed to: ' + currentScene);
        // console.log('Current scene changed to: ', currentScene);
    };

    obs.once('ExitStarted', () => {
        console.log('OBS started shutdown');

        // Just for example, not necessary should you want to reuse this instance by re-connect()
        obs.off('CurrentProgramSceneChanged', onCurrentSceneChanged);
    });

    //keypad input
    const handleButtonClick = (value) => {
        const newValue = betAmount + value;
        setBetAmount(newValue);
    };

    //keyboard input
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        setBetAmount(numericValue);
    };

    const handleConfirmBet = () => {
        const betAmountInteger = parseInt(betAmount);
        const totalCreditsInteger = parseInt(totalCredits);
        // console.log(betAmountInteger);
        // console.log(totalCreditsInteger);
        if (betAmountInteger !== 0 && betAmountInteger <= totalCreditsInteger) {
            setTotalBet(betAmount);

            const newCredit = totalCreditsInteger - betAmountInteger;
            setTotalCredits(newCredit.toString());

            setBetAmount('0');
        } else {
            alert('Invalid bet amount or insufficient credits');
            setBetAmount('0');
        }
    };

    const handleMaxButton = () => {
        setBetAmount(totalCredits);
    };

    const handleClearButton = () => {
        setBetAmount('0');
    };

    const handleColorButton = (color, index) => {
        setSelectedColorHex(color);
        setSelectedColorName(colorName[index]);
    };

    useEffect(() => {
        console.log(selectedColorName);
    }, [selectedColorName]);

    return (
        <div className="h-screen border-4 border-red-600">
            {/* <Header /> */}
            <div className="h-full flex flex-col items-center border-4 border-blue-600">
                <iframe
                    className="border-2 border-green-600"
                    frameborder="0"
                    allowfullscreen
                    width="1280"
                    height="720"
                    src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=9b1e7c55-1db0-40e9-b443-07f0b5290dd3&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
                ></iframe>
                <div className="flex-1 flex w-[1280px] h-auto border-2 border-red-600">
                    <div className="flex-1 flex flex-col border-2 border-blue-600">
                        <div className="grid grid-cols-3 place-items-center text-sm font-bold uppercase border-4 border-red-600 h-[15%]">
                            <p>
                                total bet:{' '}
                                <span className="text-[#E26226]">
                                    {totalBet !== '' ? `PHP ${parseFloat(totalBet).toLocaleString()}.00` : '0.00'}
                                </span>
                            </p>
                            <p>
                                credits:{' '}
                                <span className="text-[#E26226]">
                                    {totalCredits !== ''
                                        ? `PHP ${parseFloat(totalCredits).toLocaleString()}.00`
                                        : '0.00'}
                                </span>
                            </p>
                            <div className="flex items-center gap-2">
                                <p>color:</p>
                                <div
                                    className="w-16 h-5 rounded-full"
                                    style={{ backgroundColor: selectedColorHex }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex-1 p-2 grid grid-cols-4 gap-2 border-4 border-green-600">
                            {colorHex.map((color, key) => (
                                <Button
                                    key={key}
                                    variant="contained"
                                    className="h-full w-full"
                                    style={{
                                        backgroundColor: color,
                                        borderRadius: '100px'
                                    }}
                                    onClick={() => handleColorButton(color, key)}
                                ></Button>
                            ))}
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
                                onClick={() => handleColorButton('#FFD700', 8)}
                            >
                                jackpot
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 font-bold border-2 py-2 items-center border-green-600">
                        <div className="flex flex-col w-[70%] items-center ">
                            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full">
                                {numGroup1.map((number, index) => (
                                    <Button
                                        key={index}
                                        size="small"
                                        className="w-full"
                                        style={{
                                            border: '1px solid black',
                                            color: 'black'
                                        }}
                                        onClick={() => handleButtonClick(number)}
                                    >
                                        {number}
                                    </Button>
                                ))}
                            </ButtonGroup>
                            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full">
                                {numGroup2.map((number, index) => (
                                    <Button
                                        key={index}
                                        size="small"
                                        className="w-full"
                                        style={{
                                            border: '1px solid black',
                                            color: 'black'
                                        }}
                                        onClick={() => handleButtonClick(number)}
                                    >
                                        {number}
                                    </Button>
                                ))}
                            </ButtonGroup>
                            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full">
                                {numGroup3.map((number, index) => (
                                    <Button
                                        key={index}
                                        size="small"
                                        className="w-full"
                                        style={{
                                            border: '1px solid black',
                                            color: 'black'
                                        }}
                                        onClick={() => handleButtonClick(number)}
                                    >
                                        {number}
                                    </Button>
                                ))}
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
                                    onClick={() => handleClearButton()}
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
                                value={betAmount !== '' ? `PHP ${parseFloat(betAmount).toLocaleString()}` : 'PHP 0'}
                                className="text-2xl  mx-auto text-[#E26226]"
                                onChange={handleInputChange}
                                // onKeyDown={handleKeyDown}
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
};

export default LiveGameStreamPage;
