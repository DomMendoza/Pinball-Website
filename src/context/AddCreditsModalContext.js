/* eslint-disable */
import React, { useState, createContext, useContext } from 'react';

import { postAddCredits } from '../services/postAddCredits';

const initialState = {
    userToken: null,
    isOpen: null,
    topUpValue: [],
    topUpAmount: '',
    selectedTopUpButton: null,
    setIsOpen: () => {},
    setSelectedTopUpButton: () => {},
    setTopUpAmount: () => {},
    handleTopUpButton: () => {},
    handleTopUpInputChange: () => {},
    handleAddCreditsButton: () => {}
};

//create initial context
const ModalContext = createContext(initialState);

//create provider
export const ModalProvider = ({ children, userToken, isOpen, setIsOpen }) => {
    const topUpValue = ['₱100', '₱200', '₱500', '₱1000', '₱2000'];
    const MAX_TOP_UP_VALUE = 500000;

    const [topUpAmount, setTopUpAmount] = useState('');
    const [selectedTopUpButton, setSelectedTopUpButton] = useState(null);

    const handleTopUpButton = (button) => {
        setTopUpAmount(button.substring(1)); //set top up amount
        setSelectedTopUpButton(button); //set the button border color to orange
    };

    const handleTopUpInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        setTopUpAmount(numericValue);
        setSelectedTopUpButton(null);
    };

    const handleAddCreditsButton = async () => {
        const topUpInt = parseInt(topUpAmount);
        const isValidTopUp = !isNaN(topUpInt) && topUpInt > 0;
        if (isValidTopUp) {
            if (topUpInt < MAX_TOP_UP_VALUE) {
                try {
                    await postAddCredits(topUpAmount, userToken);
                    //reset input selections
                    setSelectedTopUpButton(null);
                    setTopUpAmount('');
                } catch (error) {
                    console.error('Error:', error.message);
                    window.alert('An error occurred while placing the bet. Please try again later.');
                }
            } else {
                window.alert('The amount you have entered exceed the maximum top up amount of P500,000');
            }
        } else {
            window.alert('Invalid top up amount. Please enter a valid amount.');
        }
    };

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                topUpValue,
                topUpAmount,
                selectedTopUpButton,
                setSelectedTopUpButton,
                setTopUpAmount,
                handleTopUpButton,
                handleTopUpInputChange,
                handleAddCreditsButton
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

//create the useContext
const useModal = () => {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export default useModal;
