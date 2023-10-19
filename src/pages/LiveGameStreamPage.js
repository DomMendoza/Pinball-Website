/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OBSWebSocket from 'obs-websocket-js';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
// import jwt from 'jsonwebtoken';

import { Alert, Button, ButtonGroup, IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

//LAYOUTS FOLDER
import ColorInputs from '../layout/ColorInputs';
import NumberInput from '../layout/NumberInput';
import BetHistory from '../layout/BetHistory';
import ColorInputGrid from '../layout/ColorInputGrid';
import LiveStreamFrame from '../layout/LiveStreamFrame';

//SERVICES API FOLDER
import { postBet } from '../services/postBet';
import { getBetHistory } from '../services/getBetHistory';
import ChildModal from '../layout/ChildModal';

const LiveGameStreamPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTopUpButton, setSelectedTopUpButton] = useState(null);
    const [topUpAmount, setTopUpAmount] = useState('');

    const [selectedColorName, setSelectedColorName] = useState('');
    const [selectedColorHex, setSelectedColorHex] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);
    const [userId, setUserId] = useState('');
    const [rows, setRows] = useState([]);
    // const [wallet, setWallet] = useState();
    // const [confirmedBetAmount, setConfirmedBetAmount] = useState('');

    const [betAmount, setBetAmount] = useState('');
    const [totalBet, setTotalBet] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);

    const [currentProgramScene, setCurrentProgramScene] = useState();

    const betButtons = ['₱5', '₱10', '₱20', '₱50', '₱100'];
    const topUpValue = ['₱100', '₱200', '₱500', '₱1000', '₱2000'];
    const numGroup1 = ['1', '2', '3'];
    const numGroup2 = ['4', '5', '6'];
    const numGroup3 = ['7', '8', '9'];
    const colorHex = [
        '#ED3130',
        '#276ADD',
        '#F4FF63',
        '#56DE33',
        '#FFD700',
        '#9A3FBC',
        '#F08F40',
        '#DC63D0',
        '#33C5ED'
    ];
    const colorName = ['Red', 'Blue', 'Yellow', 'Green', 'Gold', 'Violet', 'Orange', 'Pink', 'Cyan'];

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

    //GET BET HISTORY OF THE PLAYER
    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching history...');
            try {
                const response = await getBetHistory(userToken);
                // console.log('Response front:', response);
                const updatedRows = response.map((item) => {
                    return {
                        date: item.createdAt.slice(0, 10),
                        gameId: item.game_id,
                        bet: item.bet_data,
                        betAmount: item.amount,
                        winLose: item.status,
                        result: ''
                    };
                });

                setRows(updatedRows);
            } catch (error) {
                console.error('Error:', error.message);
                window.alert('An error occurred while placing the bet. Please try again later.');
            }
        };

        fetchData(); // Call the fetchData function
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

    const handleInputButtonClick = (buttonText) => {
        setBetAmount(buttonText.substring(1));
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
                if (totalCredits > 0) {
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
                    window.alert('Insufficient Credits. Please add credits to bet.');
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

    const handleTopUpButton = (button) => {
        setTopUpAmount(button.substring(1)); //set top up amount
        setSelectedTopUpButton(button); //set the button border color to orange
    };

    // const handleInputButtonClick = (buttonText) => {
    //     setBetAmount(buttonText.substring(1));
    // };

    const handleTopUpInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        setTopUpAmount(numericValue);
        setSelectedTopUpButton(null);
    };

    useEffect(() => {
        // console.log(selectedColorName);
        // console.log(selectedColorHex);
        // console.log(betOnColor);
        // console.log('Bet Amount: ', betAmount);
        // console.log(buttonLabels);
        // console.log('Total Bet: ', totalBet);
        // console.log(selectedButton);
        // console.log(rows);
    }, [selectedColorName, selectedColorHex, betAmount, totalBet, selectedButton, rows]);

    return (
        <div className="h-full flex flex-col gap-10 items-center border-2 border-red-600">
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex items-center justify-center"
            >
                <Box className="bg-white rounded-md flex flex-col items-center p-5 ">
                    <p className="text-xl uppercase font-bold font-['Poppins']">top up your credits</p>
                    <div className="flex flex-col gap-4  py-2">
                        <div className="">
                            <p className="capitalize text-sm font-['Poppins']">cash in value:</p>
                            <div className=" grid grid-cols-3 gap-2 text-center">
                                {topUpValue.map((button, key) => (
                                    <div
                                        key={key}
                                        className={`p-2 border-2 ${
                                            selectedTopUpButton === button ? 'border-[#E26226]' : 'border-grey'
                                        } cursor-pointer`}
                                        onClick={() => handleTopUpButton(button)}
                                    >
                                        <p className="text-dynamicSmall ">{button}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="">
                            <p className="capitalize text-sm font-['Poppins']">input amount:</p>
                            <div className="flex items-center justify-center px-2 ">
                                <input
                                    type="text"
                                    value={topUpAmount !== '' ? `₱ ${parseFloat(topUpAmount).toLocaleString()}` : '₱ 0'}
                                    className="text-dynamicMid w-full mx-auto text-[#E26226] outline-none border-none"
                                    onChange={handleTopUpInputChange}
                                    // onKeyDown={handleKeyDown}
                                />
                                {/* <p onClick={() => handleClearButton()} style={{ fontWeight: 100, fontSize: '.75rem' }}>
                                clear
                            </p> */}
                            </div>
                        </div>
                        <div className="flex items-center justify-between pr-2">
                            <p className="capitalize text-sm font-bold font-['Poppins']">total payment:</p>
                            <p className="capitalize text-xl text-[#E26226] font-bold font-['Poppins']">
                                {topUpAmount !== '' ? `₱ ${parseFloat(topUpAmount).toLocaleString()}` : '₱ 0'}
                            </p>
                        </div>
                    </div>
                    <ChildModal />
                </Box>
            </Modal>
            <div className="lg:hidden lg:gap-0 gap-4 py-14 h-auto w-full flex flex-col items-center border-4 border-blue-600">
                <div className="relative w-full pb-[56.25%] border-2 border-yellow-600">
                    <iframe
                        //We'll use the padding bottom technique to maintain 16:9 ratio
                        className=" absolute w-full h-full"
                        frameborder="0"
                        allowfullscreen
                        // width="1280"
                        // height="720"
                        src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=9b1e7c55-1db0-40e9-b443-07f0b5290dd3&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
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
            <div className="hidden h-screen w-dynamicBorder lg:flex flex-col items-center border-2 border-blue-600">
                <LiveStreamFrame />
                <div className="flex-1 flex flex-col w-full h-auto ">
                    <ColorInputs
                        selectedButton={selectedButton}
                        colorHex={colorHex}
                        handleBetOnColor={handleBetOnColor}
                    />
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
                            <div className="w-[90%] grid grid-cols-2 gap-8 text-dynamicLarge ">
                                <div className="flex flex-col items-end gap-4">
                                    <div className="flex items-center justify-center">
                                        <IconButton
                                            aria-label="delete"
                                            color="primary"
                                            size="small"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            <AddCircleRoundedIcon />
                                        </IconButton>
                                        <p className="font-['Poppins']">credits: </p>
                                    </div>
                                    <p className="font-['Poppins']">Bet Amount: </p>
                                    <p className="font-['Poppins']">color: </p>
                                </div>
                                <div className="flex flex-col gap-4 ">
                                    <div className="text-[#E26226] font-['Poppins']">
                                        {totalCredits !== 0
                                            ? `₱ ${parseFloat(totalCredits).toLocaleString()}.00`
                                            : '0.00'}
                                    </div>
                                    <div className="text-[#E26226] font-['Poppins']">
                                        {/* {totalBet !== '' ? `₱ ${parseFloat(totalBet).toLocaleString()}.00` : '0.00'} */}
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
                                </div>
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
            <div className="w-full lg:w-dynamicBorder flex items-center justify-center h-auto ">
                <div className="w-[90%] lg:w-full flex flex-col gap-6">
                    <h1 className="text-center text-dynamicMid font-bold uppercase font-['Poppins']">bet history</h1>
                    <BetHistory rows={rows} />
                </div>
            </div>
        </div>
    );
};

export default LiveGameStreamPage;
