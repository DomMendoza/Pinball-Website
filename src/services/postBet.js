/* eslint-disable */
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const postBet = async (selectedButton, confirmedBetAmount, userToken) => {
    const headers = {
        Authorization: `Bearer ${userToken}`
    };
    const body = [
        {
            bet_data: selectedButton,
            amount: confirmedBetAmount,
            game_name: 'pin_ball'
        }
    ];

    try {
        const response = await axios.post(`${baseUrl}/user/create/bet`, body, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating a bet. Please try again later.');
    }
};
