/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OBSWebSocket from 'obs-websocket-js';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
// import jwt from 'jsonwebtoken';

import { Alert, Button, ButtonGroup, IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

//LAYOUTS FOLDER
import ColorInputs from '../layout/ColorInputs';
import NumberInput from '../layout/NumberInput';
import BetHistory from '../layout/BetHistory';
import ColorInputGrid from '../layout/ColorInputGrid';
import LiveStreamFrame from '../layout/LiveStreamFrame';

//SERVICES API FOLDER
import { postBet } from '../services/postBet';
import { postAddCredits } from '../services/postAddCredits';
import { getBetHistory } from '../services/getBetHistory';
import TopUpModal from '../layout/TopUpModal';
// import MobileResponsive from '../layout/MobileResponsive';
import MobileResponsive from '../layout/MobileResponsive';
import DesktopResponsive from '../layout/DesktopResponsive';

//CONTEXT
import { ModalProvider } from '../context/AddCreditsModalContext';
import { LiveStreamProvider } from '../context/LiveStreamContext';

const LiveGameStreamPage = () => {
    const [isOpen, setIsOpen] = useState(false); //modal state*
    const [userId, setUserId] = useState(''); //user id state*
    const [rows, setRows] = useState([]); //bet history rows*
    const [totalCredits, setTotalCredits] = useState(0); //total credits amount*
    const [currentProgramScene, setCurrentProgramScene] = useState(); //*

    const userToken = Cookies.get('userToken'); //*

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

    return (
        <div className="h-full flex flex-col gap-10 items-center border-2 border-red-600">
            <ModalProvider userToken={userToken} isOpen={isOpen} setIsOpen={setIsOpen}>
                <TopUpModal />
            </ModalProvider>

            <LiveStreamProvider userToken={userToken} isOpen={isOpen} setIsOpen={setIsOpen} totalCredits={totalCredits}>
                <DesktopResponsive />
                <MobileResponsive />
            </LiveStreamProvider>

            <BetHistory rows={rows} />
        </div>
    );
};

export default LiveGameStreamPage;
