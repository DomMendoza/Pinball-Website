/* eslint-disable */
import React from 'react';
import { Alert, Button, ButtonGroup } from '@mui/material';

const ColorInputGrid = ({ selectedButton, colorHex, handleBetOnColor }) => {
    return (
        <div className="flex-1 grid grid-cols-4 gap-2 w-full ">
            <Button
                variant="contained"
                className="h-12 w-full"
                style={
                    selectedButton == 0
                        ? {
                              backgroundColor: colorHex[0],
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: colorHex[0]
                          }
                }
                onClick={() => handleBetOnColor(0)}
            >
                {/* {confirmedBetAmount} */}
            </Button>
            <Button
                variant="contained"
                className="h-12 w-full"
                style={
                    selectedButton == 1
                        ? {
                              backgroundColor: colorHex[1],
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: colorHex[1]
                          }
                }
                onClick={() => handleBetOnColor(1)}
            ></Button>
            <Button
                variant="contained"
                className="h-12 w-full"
                style={
                    selectedButton == 2
                        ? {
                              backgroundColor: colorHex[2],
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: colorHex[2]
                          }
                }
                onClick={() => handleBetOnColor(2)}
            ></Button>
            <Button
                variant="contained"
                className="h-12 w-full"
                style={
                    selectedButton == 3
                        ? {
                              backgroundColor: colorHex[3],
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: colorHex[3]
                          }
                }
                onClick={() => handleBetOnColor(3)}
            ></Button>
            <Button
                variant="contained"
                className="h-12 w-full"
                style={
                    selectedButton == 4
                        ? {
                              backgroundColor: colorHex[4],
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: colorHex[4]
                          }
                }
                onClick={() => handleBetOnColor(4)}
            ></Button>
            <Button
                variant="contained"
                className="h-12 w-full"
                style={
                    selectedButton == 5
                        ? {
                              backgroundColor: colorHex[5],
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: colorHex[5]
                          }
                }
                onClick={() => handleBetOnColor(5)}
            ></Button>
            <Button
                variant="contained"
                className="h-12 w-full"
                style={
                    selectedButton == 6
                        ? {
                              backgroundColor: colorHex[6],
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: colorHex[6]
                          }
                }
                onClick={() => handleBetOnColor(6)}
            ></Button>
            <Button
                variant="contained"
                className="h-12 w-full"
                style={
                    selectedButton == 7
                        ? {
                              backgroundColor: colorHex[7],
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: colorHex[7]
                          }
                }
                onClick={() => handleBetOnColor(7)}
            ></Button>
            <Button
                variant="contained"
                className="h-12 w-full"
                style={
                    selectedButton == 8
                        ? {
                              backgroundColor: colorHex[8],
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: colorHex[8]
                          }
                }
                onClick={() => handleBetOnColor(8)}
            ></Button>
            {/* <Button
                variant="contained"
                className="h-12 w-full col-span-4"
                style={
                    selectedButton == 8
                        ? {
                              backgroundColor: '#FFD700',
                              borderRadius: '100px',
                              color: 'black',
                              padding: 0,
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              borderColor: 'black'
                          }
                        : {
                              backgroundColor: '#FFD700',
                              borderRadius: '100px',
                              color: 'black',
                              padding: 0,
                              fontSize: '1.5rem',
                              fontWeight: 'bold'
                          }
                }
                onClick={() => handleBetOnColor(8)}
            >
                jackpot
            </Button> */}
            {/* {colorHex.map((color, key) => (
                                <Button
                                    key={key}
                                    variant="contained"
                                    className={color === '#FFD700' ? 'h-12 w-full col-span-4' : 'h-12 w-full'}
                                    // style={{
                                    //     backgroundColor: color,
                                    //     borderRadius: '100px'
                                    // }}
                                    style={
                                        color === '#FFD700'
                                            ? {
                                                  backgroundColor: '#FFD700',
                                                  borderRadius: '100px',
                                                  color: 'black',
                                                  padding: 0,
                                                  fontSize: '1.5rem',
                                                  fontWeight: 'bold'
                                              }
                                            : selectedButton === 8
                                            ? {
                                                  backgroundColor: '#FFD700',
                                                  borderRadius: '100px',
                                                  color: 'black',
                                                  padding: 0,
                                                  fontSize: '1.5rem',
                                                  fontWeight: 'bold',
                                                  borderStyle: 'solid',
                                                  borderWidth: '2px',
                                                  borderColor: 'black'
                                              }
                                            : selectedButton === key
                                            ? {
                                                  backgroundColor: color,
                                                  borderRadius: '50px',
                                                  borderStyle: 'solid',
                                                  borderWidth: '2px',
                                                  borderColor: 'black'
                                              }
                                            : {
                                                  backgroundColor: color,
                                                  borderRadius: '100px'
                                              }
                                    }
                                    // style={
                                    //     selectedButton === key
                                    //         ? {
                                    //               backgroundColor: color,
                                    //               borderRadius: '50px',
                                    //               borderStyle: 'solid',
                                    //               borderWidth: '2px',
                                    //               borderColor: 'black'
                                    //           }
                                    //         : {
                                    //               backgroundColor: color,
                                    //               borderRadius: '100px'
                                    //           }
                                    // }
                                    // onClick={() => handleBetOnColor(color, betAmount, key)}
                                    onClick={() => handleBetOnColor(key)}
                                >
                                    {color === '#FFD700'
                                        ? 'jackpot ' + (buttonLabels[key] || '')
                                        : buttonLabels[key] === ''
                                        ? ''
                                        : `PHP ${parseFloat(buttonLabels[key]).toLocaleString()}`}
                                </Button>
                            ))} */}
        </div>
    );
};

export default ColorInputGrid;
