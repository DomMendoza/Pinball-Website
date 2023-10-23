/* eslint-disable */
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const postAddCredits = async (topUpAmount, userToken) => {
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json'
    };
    const body = {
        transaction_type: 'cashin',
        transaction_amount: topUpAmount
    };

    try {
        const response = await axios.post(`${baseUrl}/user/add/credits`, body, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while adding credits. Please try again later.');
    }
};
