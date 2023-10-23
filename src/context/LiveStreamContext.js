/* eslint-disable */
import React, { useState, createContext, useContext } from 'react';

import { postBet } from '../services/postBet';

const initialState = {
    userToken: null,
    isOpen: null,
    colorName: [],
    colorHex: [],
    numGroup1: [],
    numGroup2: [],
    numGroup3: [],
    totalCredits: null,
    betAmount: '',
    selectedButton: null,
    selectedColorName: '',
    selectedColorHex: '',
    betButtons: [],
    setIsOpen: () => {},
    setSelectedColorName: () => {},
    setSelectedColorHex: () => {},
    handleInputChange: () => {},
    handleConfirmBet: () => {},
    handleBetOnColor: () => {},
    handleButtonClick: () => {},
    handleClearButton: () => {},
    handleMaxButton: () => {},
    handleInputButtonClick: () => {}
};

//create initial context
const LiveStreamContext = createContext(initialState);

export const LiveStreamProvider = ({ children, userToken, isOpen, setIsOpen, totalCredits }) => {
    const colorName = ['Red', 'Blue', 'Yellow', 'Green', 'Gold', 'Violet', 'Orange', 'Pink', 'Cyan'];
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
    const numGroup1 = ['1', '2', '3'];
    const numGroup2 = ['4', '5', '6'];
    const numGroup3 = ['7', '8', '9'];
    const betButtons = ['₱5', '₱10', '₱20', '₱50', '₱100'];
    const [selectedColorName, setSelectedColorName] = useState('');
    const [selectedColorHex, setSelectedColorHex] = useState('');
    const [betAmount, setBetAmount] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);

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

    const handleBetOnColor = (key) => {
        setSelectedButton(key);

        //console logs
        setSelectedColorHex(colorHex[key]);
        setSelectedColorName(colorName[key]);
    };

    return (
        <LiveStreamContext.Provider
            value={{
                isOpen,
                colorHex,
                numGroup1,
                numGroup2,
                numGroup3,
                totalCredits,
                betAmount,
                selectedButton,
                betButtons,
                setIsOpen,
                handleInputChange,
                handleConfirmBet,
                handleBetOnColor,
                handleButtonClick,
                handleClearButton,
                handleMaxButton,
                handleInputButtonClick
            }}
        >
            {children}
        </LiveStreamContext.Provider>
    );
};

//create the useContext
const useLiveStream = () => {
    const context = useContext(LiveStreamContext);

    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export default useLiveStream;
