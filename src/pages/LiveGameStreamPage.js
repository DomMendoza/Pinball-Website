/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import OBSWebSocket from 'obs-websocket-js';
import { io } from 'socket.io-client';
// import jwt from 'jsonwebtoken';

//LAYOUTS FOLDER
import BetHistory from '../layout/BetHistory';

//SERVICES API FOLDER
import TopUpModal from '../layout/TopUpModal';
import MobileResponsive from '../layout/MobileResponsive';
import DesktopResponsive from '../layout/DesktopResponsive';

//CONTEXT
import { ModalProvider } from '../context/AddCreditsModalContext';
import { LiveStreamProvider } from '../context/LiveStreamContext';

const LiveGameStreamPage = ({ userToken }) => {
    const [isOpen, setIsOpen] = useState(false); //modal state*
    const [userId, setUserId] = useState(''); //user id state*
    // const [rows, setRows] = useState([]); //bet history rows*
    const [totalCredits, setTotalCredits] = useState(0); //total credits amount*
    const [currentProgramScene, setCurrentProgramScene] = useState(); //*

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
                if (response.status === 200) {
                    setUserId(response.data.userSessionDets.user_id);
                } else {
                    console.log('User session is not active.');
                }
            })
            .catch((error) => {
                console.error('Error checking user session:', error);
                console.log('Error checking user session.');
            });
    }, []);

    // //FETCH USER WALLET BALANCE
    useEffect(() => {
        // console.log('userId changed:', userId);
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
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             //OBS websocket connection
    //             await obs.connect(obsAddress);
    //             console.log(`Connected to OBS`);

    //             //Scene change listener
    //             obs.on('CurrentProgramSceneChanged', onCurrentSceneChanged);
    //         } catch (error) {
    //             console.error('Failed to connect', error.code, error.message);
    //         }
    //     })();
    // }, []);

    return (
        <div className="h-full flex flex-col gap-10 items-center border-2 border-red-600">
            <ModalProvider userToken={userToken} isOpen={isOpen} setIsOpen={setIsOpen}>
                <TopUpModal />
            </ModalProvider>

            <LiveStreamProvider userToken={userToken} isOpen={isOpen} setIsOpen={setIsOpen} totalCredits={totalCredits}>
                <DesktopResponsive />
                <MobileResponsive />
            </LiveStreamProvider>

            <BetHistory userToken={userToken} />
        </div>
    );
};

export default LiveGameStreamPage;
