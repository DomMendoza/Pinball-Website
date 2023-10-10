/* eslint-disable */
import React, { useState, useEffect } from 'react';
import OBSWebSocket from 'obs-websocket-js';
import { Button } from '@mui/material';

export default function Tester() {
    const obsAddress = 'ws://127.0.0.1:4455';
    const [sceneList, setSceneList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const obs = new OBSWebSocket();

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             await obs.connect(obsAddress);

    //             console.log(`Connected to OBS`);

    //             //GETTER
    //             const GetSceneList = await obs.call('GetSceneList');
    //             GetSceneList.scenes.map((scenes) => {
    //                 console.log(scenes.sceneName);
    //             });
    //             // const GetCurrentProgramScene = await obs.call('GetCurrentProgramScene');
    //             // console.log(GetCurrentProgramScene);

    //             //LISTENER
    //             obs.on('CurrentProgramSceneChanged', onCurrentSceneChanged);
    //         } catch (error) {
    //             console.error('Failed to connect', error.code, error.message);
    //         }
    //     })();
    // }, []);

    useEffect(() => {
        (async () => {
            try {
                await obs.connect(obsAddress);

                console.log(`Connected to OBS`);
                //SETTER
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Result and Rewards',
                    sceneItemId: 14,
                    sceneItemEnabled: isVisible
                });
                // console.log(SetSceneItemEnabled);
            } catch (error) {
                console.error('Failed to connect', error.code, error.message);
            }
        })();
    }, [isVisible]);

    function onCurrentSceneChanged(event) {
        console.log('Current scene changed to: ', event.sceneName);
    }

    obs.once('ExitStarted', () => {
        console.log('OBS started shutdown');

        // Just for example, not necessary should you want to reuse this instance by re-connect()
        obs.off('CurrentProgramSceneChanged', onCurrentSceneChanged);
    });

    return (
        <div>
            <div>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: isVisible ? 'green' : 'red',
                        color: 'white'
                    }}
                    onClick={() => setIsVisible(!isVisible)}
                >
                    {isVisible ? 'Visible' : 'Invisible'}
                </Button>
            </div>
        </div>
    );
}
