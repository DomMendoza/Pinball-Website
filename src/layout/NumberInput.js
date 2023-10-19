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
    const numStyle = {
        color: 'black',
        fontSize: 'clamp(1.75rem, 1.25rem + 0.7813vw, 2.5rem)',
        fontFamily: 'Poppins',
        fontWeight: 'bold'
    };

    return (
        <div className="flex flex-col w-full h-full items-center">
            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full h-full">
                {numGroup1.map((number, index) => (
                    <Button
                        key={index}
                        // size="large"
                        className="w-full h-full"
                        style={{ border: '1px solid black', position: 'relative' }}
                        onClick={() => handleButtonClick(number)}
                    >
                        <p style={numStyle} className="absolute">
                            {number}
                        </p>
                    </Button>
                ))}
            </ButtonGroup>
            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full h-full">
                {numGroup2.map((number, index) => (
                    <Button
                        key={index}
                        size="large"
                        className="w-full h-full"
                        style={{ border: '1px solid black', position: 'relative' }}
                        onClick={() => handleButtonClick(number)}
                    >
                        <p style={numStyle} className="absolute">
                            {number}
                        </p>
                    </Button>
                ))}
            </ButtonGroup>
            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full h-full">
                {numGroup3.map((number, index) => (
                    <Button
                        key={index}
                        size="large"
                        className="w-full h-full"
                        style={{ border: '1px solid black', position: 'relative' }}
                        onClick={() => handleButtonClick(number)}
                    >
                        <p style={numStyle} className="absolute">
                            {number}
                        </p>
                    </Button>
                ))}
            </ButtonGroup>
            <ButtonGroup variant="outlined" aria-label="outlined button group" className="w-full h-full">
                <Button
                    size="large"
                    className="w-full h-full"
                    style={{
                        border: '1px solid black',
                        backgroundColor: '#FFFF00',
                        color: 'black',
                        fontSize: 'clamp(1.5rem, 1.5rem + 0vw, 1.5rem)',
                        fontFamily: 'Poppins',
                        fontWeight: 'bold'
                    }}
                    onClick={() => handleClearButton()}
                >
                    clear
                </Button>
                <Button
                    size="large"
                    className="w-full h-full"
                    style={{
                        border: '1px solid black',
                        color: 'black',
                        fontSize: 'clamp(1.75rem, 1.25rem + 0.7813vw, 2.5rem)',
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        position: 'relative'
                    }}
                    onClick={() => {
                        if (betAmount !== '') {
                            handleButtonClick('0');
                        }
                    }}
                >
                    <p className="absolute">0</p>
                </Button>
                <Button
                    size="large"
                    className="w-full h-full"
                    style={{
                        border: '1px solid black',
                        backgroundColor: '#FF0000',
                        color: 'white',
                        fontSize: 'clamp(1.5rem, 1.5rem + 0vw, 1.5rem)',
                        fontFamily: 'Poppins',
                        fontWeight: 'bold'
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
