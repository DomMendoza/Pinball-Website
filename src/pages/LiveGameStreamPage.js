/* eslint-disable */
import React, { useState, useEffect } from 'react';
// import button from rea
import { Alert, Button, ButtonGroup } from '@mui/material';
import axios from 'axios';
import OBSWebSocket from 'obs-websocket-js';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
// import jwt from 'jsonwebtoken';

import ColorInputs from '../layout/ColorInputs';
import NumberInput from '../layout/NumberInput';
import { postBet } from '../services/postBet';
import BetHistory from '../layout/BetHistory';

const LiveGameStreamPage = () => {
    const [selectedColorName, setSelectedColorName] = useState('');
    const [selectedColorHex, setSelectedColorHex] = useState('');
    const [selectedButton, setSelectedButton] = useState(null); //button selected by the user
    const [userId, setUserId] = useState('');
    // const [wallet, setWallet] = useState();
    // const [confirmedBetAmount, setConfirmedBetAmount] = useState('');
    const [betAmount, setBetAmount] = useState('');
    const [totalBet, setTotalBet] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);

    const [currentProgramScene, setCurrentProgramScene] = useState();
    const numGroup1 = ['1', '2', '3'];
    const numGroup2 = ['4', '5', '6'];
    const numGroup3 = ['7', '8', '9'];
    const colorHex = [
        '#FF0000',
        '#008000',
        '#FFFF00',
        '#0000FF',
        '#800080',
        '#FFA500',
        '#FFC0CB',
        '#00FFFF',
        '#FFD700'
    ];
    const colorName = ['red', 'green', 'yellow', 'blue', 'violet', 'orange', 'pink', 'cyan', 'gold'];

    const userToken = Cookies.get('userToken');
    // console.log('user token: ', userToken);

    // const [isConfirmed, setIsConfirmed] = useState(false);
    // const [buttonLabels, setButtonLabels] = useState(new Array(9).fill(''));
    // const [betOnColor, setBetOnColor] = useState('');

    const obsAddress = 'ws://127.0.0.1:4455';
    const obs = new OBSWebSocket();

    //USER LOGIN CREDENTIAL
    useEffect(() => {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const headers = {
            Authorization: `Bearer ${userToken}`
        };
        axios
            .get(`${baseUrl}/user/check/session`, { headers })
            .then((response) => {
                // Check the response and update the session status accordingly
                if (response.status === 200) {
                    // console.log(response.data.userSessionDets.user_id);
                    setUserId(response.data.userSessionDets.user_id);
                } else {
                    console.log('User session is not active.');
                }
            })
            .catch((error) => {
                console.error('Error checking user session:', error);
                console.log('Error checking user session.');
            });
    }, [userToken]);

    //FETCH USER WALLET BALANCE
    useEffect(() => {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const socket = io(baseUrl, { query: { userId } });

        socket.on('walletUpdate', (data) => {
            // Update the totalCredits state with the wallet balance
            console.log('Received wallet update:', data.balance);
            setTotalCredits(data.balance);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    //INITIALIZE OBS CONNECTION
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

    const handleConfirmBet = async () => {
        //OLD LOGIC DONT ERASE YET
        // if (buttonLabels.every((element) => element !== '')) {
        //     const sum = buttonLabels.reduce((accumulator, currentValue) => {
        //         const num = parseInt(currentValue, 10); // Convert to number
        //         return isNaN(num) ? accumulator : accumulator + num; // Add only if it's a number
        //     }, 0);
        //     setTotalBet(sum);

        //     //Lock in all the values making them uneditable
        //     setIsConfirmed(true);
        // }

        if (selectedButton !== null) {
            const betAmountInt = parseInt(betAmount);
            if (!isNaN(betAmountInt) && betAmountInt > 0) {
                if (totalCredits > betAmountInt) {
                    try {
                        await postBet(selectedColorName, betAmountInt, userToken);
                        //reset
                        setSelectedButton(null);
                        setBetAmount('');
                    } catch (error) {
                        console.error('Error:', error.message);
                        window.alert('An error occurred while placing the bet. Please try again later.');
                    }
                } else {
                    window.alert('Insufficient Credits. Please enter a valid number.');
                }
            } else {
                window.alert('Invalid bet amount. Please enter a valid number.');
            }
        } else {
            window.alert('Select a color bet first');
        }
    };

    const handleMaxButton = () => {
        setBetAmount(totalCredits);
    };

    const handleClearButton = () => {
        setBetAmount('');
    };

    // const handleResetBet = () => {
    //     setButtonLabels(new Array(9).fill(''));
    // };

    // const handleBetOnColor = (color, betAmount, index) => {
    //     //OLD LOGIC DONT ERASE YET
    //     if (betAmount !== '' || betAmount === '0') {
    //         setSelectedColorHex(color);
    //         setSelectedColorName(colorName[index]);
    //         //mutable array of bets per color
    //         const newButtonLabels = [...buttonLabels];
    //         // console.log(newButtonLabels);
    //         newButtonLabels[index] = betAmount;
    //         setButtonLabels(newButtonLabels);
    //         setBetAmount(''); //reset the bet amount every bet color
    //     } else {
    //         window.alert('Enter the amount of bet first');
    //     }
    // };

    const handleBetOnColor = (key) => {
        setSelectedButton(key);

        //console logs
        setSelectedColorHex(colorHex[key]);
        setSelectedColorName(colorName[key]);
    };

    useEffect(() => {
        // console.log(selectedColorName);
        // console.log(selectedColorHex);
        // console.log(betOnColor);
        // console.log('Bet Amount: ', betAmount);
        // console.log(buttonLabels);
        // console.log('Total Bet: ', totalBet);
        // console.log(selectedButton);
    }, [selectedColorName, selectedColorHex, betAmount, totalBet, selectedButton]);

    return (
        <div className="h-full flex flex-col gap-6 items-center border-4 border-red-600">
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
                        <div className="flex justify-around items-center text-sm font-bold uppercase border-4 border-red-600 h-[15%]">
                            {/* <div
                                // className="text-xs font-normal capitalize px-4 py-1 bg-yellow-300 rounded-sm"
                                className={
                                    isConfirmed
                                        ? 'text-xs font-normal capitalize px-4 py-1 bg-gray-600 rounded-sm'
                                        : 'text-xs font-normal capitalize px-4 py-1 bg-yellow-300 rounded-sm'
                                }
                                onClick={() => handleResetBet()}
                            >
                                Reset Bet
                            </div> */}

                            <p>
                                credits:{' '}
                                <span className="text-[#E26226]">
                                    {totalCredits !== 0
                                        ? `PHP ${parseFloat(totalCredits).toLocaleString()}.00`
                                        : '0.00'}
                                </span>
                            </p>
                            <p>
                                total bet:{' '}
                                <span className="text-[#E26226]">
                                    {totalBet !== '' ? `PHP ${parseFloat(totalBet).toLocaleString()}.00` : '0.00'}
                                </span>
                            </p>
                            <div className="flex items-center gap-2">
                                <p>color:</p>
                                <div
                                    className="w-16 h-5 rounded-full"
                                    style={{ backgroundColor: colorHex[selectedButton] }}
                                ></div>
                            </div>
                        </div>
                        <ColorInputs
                            selectedButton={selectedButton}
                            colorHex={colorHex}
                            handleBetOnColor={handleBetOnColor}
                        ></ColorInputs>
                    </div>
                    <div className="flex flex-col flex-1 font-bold border-2 py-2 items-center border-green-600">
                        <NumberInput
                            numGroup1={numGroup1}
                            numGroup2={numGroup2}
                            numGroup3={numGroup3}
                            betAmount={betAmount}
                            handleButtonClick={handleButtonClick}
                            handleClearButton={handleClearButton}
                            handleMaxButton={handleMaxButton}
                        />
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
            <div className="w-[1280px] h-auto border-2 border-green-600">
                <h1 className="text-center text-3xl font-bold uppercase">bet history</h1>
                <BetHistory />
            </div>
        </div>
    );
};

export default LiveGameStreamPage;
