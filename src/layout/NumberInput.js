/* eslint-disable */
import React from 'react';
import { Alert, Button, ButtonGroup } from '@mui/material';

const NumberInput = ({
    numGroup1,
    numGroup2,
    numGroup3,
    betAmount,
    handleButtonClick,
    handleClearButton,
    handleMaxButton
}) => {
    return (
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
                    onClick={() => {
                        if (betAmount !== '') {
                            handleButtonClick('0');
                        }
                    }}
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
    );
};

export default NumberInput;
