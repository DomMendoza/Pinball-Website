/* eslint-disable */
import React, { useState, useEffect } from 'react';
import OBSWebSocket from 'obs-websocket-js';
import { Button } from '@mui/material';

export default function AdminPage() {
    const obsAddress = 'ws://127.0.0.1:4455';
    // const [sceneList, setSceneList] = useState([]);
    // const [isVisible, setIsVisible] = useState(false);
    const obs = new OBSWebSocket();

    const colors = ['red', 'green', 'yellow', 'blue', 'violet', 'orange', 'pink', 'cyan', 'gold'];
    const [redButton, setRedButton] = useState(false);
    const [greenButton, setGreenButton] = useState(false);
    const [yellowButton, setYellowButton] = useState(false);
    const [blueButton, setBlueButton] = useState(false);
    const [violetButton, setVioletButton] = useState(false);
    const [orangeButton, setOrangeButton] = useState(false);
    const [pinkButton, setPinkButton] = useState(false);
    const [cyanButton, setCyanButton] = useState(false);
    const [goldButton, setGoldButton] = useState(false);

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

                //red button
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Results n Rewards',
                    sceneItemId: 4,
                    sceneItemEnabled: redButton
                });
                //green button
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Results n Rewards',
                    sceneItemId: 5,
                    sceneItemEnabled: greenButton
                });
                //yellow button
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Results n Rewards',
                    sceneItemId: 6,
                    sceneItemEnabled: yellowButton
                });
                //blue button
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Results n Rewards',
                    sceneItemId: 7,
                    sceneItemEnabled: blueButton
                });
                //violet button
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Results n Rewards',
                    sceneItemId: 8,
                    sceneItemEnabled: violetButton
                });
                //orange button
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Results n Rewards',
                    sceneItemId: 9,
                    sceneItemEnabled: orangeButton
                });
                //pink button
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Results n Rewards',
                    sceneItemId: 10,
                    sceneItemEnabled: pinkButton
                });
                //cyan button
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Results n Rewards',
                    sceneItemId: 11,
                    sceneItemEnabled: cyanButton
                });
                //gold button
                await obs.call('SetSceneItemEnabled', {
                    sceneName: 'Results n Rewards',
                    sceneItemId: 12,
                    sceneItemEnabled: goldButton
                });
            } catch (error) {
                console.error('Failed to connect', error.code, error.message);
            }
        })();
    }, [redButton, greenButton, yellowButton, blueButton, violetButton, orangeButton, pinkButton, cyanButton]);

    // const onCurrentSceneChanged = (event) => {
    //     console.log('Current scene changed to: ', event.sceneName);
    // };

    const buttonVisibilityHandler = (color) => {
        switch (color) {
            case 'red':
                setRedButton(!redButton);
                // console.log(color);
                break;
            case 'green':
                setGreenButton(!greenButton);
                break;
            case 'yellow':
                setYellowButton(!yellowButton);
                break;
            case 'blue':
                setBlueButton(!blueButton);
                break;
            case 'violet':
                setVioletButton(!violetButton);
                break;
            case 'orange':
                setOrangeButton(!orangeButton);
                break;
            case 'pink':
                setPinkButton(!pinkButton);
                break;
            case 'cyan':
                setCyanButton(!cyanButton);
                break;
            case 'gold':
                setGoldButton(!goldButton);
                break;
            default:
                break;
        }
    };

    obs.once('ExitStarted', () => {
        console.log('OBS started shutdown');

        // Just for example, not necessary should you want to reuse this instance by re-connect()
        obs.off('CurrentProgramSceneChanged', onCurrentSceneChanged);
    });

    return (
        <div>
            <div>
                {colors.map((color, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        style={{
                            backgroundColor: color,
                            color: 'white'
                        }}
                        onClick={() => buttonVisibilityHandler(color)}
                    >
                        {color}
                    </Button>
                ))}
            </div>
        </div>
    );
}
