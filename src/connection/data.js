/* eslint-disable */
const Data = [
    [
        {
            source: {
                //GROUP OF STREAMS
                group: {
                    id: '9b1e7c55-1db0-40e9-b443-07f0b5290dd3',
                    apiurl: 'https://bintu.nanocosmos.de',
                    // id: '6144a573-d337-4e7c-a7bb-845e08e5f962',
                    // apiurl: 'https://bintu-dev-k8s.nanocosmos.de',
                    startQuality: 'medium-low'
                },
                startIndex: 0,
                options: {
                    adaption: {
                        rule: 'deviationOfMean2' // enable ABR
                    },
                    switch: {
                        method: 'server',
                        pauseOnError: false,
                        forcePlay: true,
                        fastStart: false,
                        timeout: 10
                    }
                }
            },
            playback: {
                autoplay: true,
                automute: true,
                muted: true,
                latencyControlMode: 'classic',
                // metadata: true,

                //Default values for reconnection
                reconnect: {
                    minDelay: 2,
                    maxDelay: 10,
                    delaySteps: 10,
                    maxRetries: 10
                },

                //Default values for timeouts
                timeouts: {
                    connecting: 5,
                    loading: 20,
                    buffering: 20
                }
            },
            style: {
                displayMutedAutoplay: true,
                width: 'auto',
                height: 'auto'

                // symbolColor: '#ed7d0e',
                // controlBarColor: '#000000FF'

                // poster: 'https://[yourdomain]/assets/niceimage.png' //img to be displayed while loading
            },
            events: {}
        }
    ]
];
export default Data;
