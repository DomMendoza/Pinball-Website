/* eslint-disable */
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const getBetHistory = async (userToken) => {
    const headers = {
        Authorization: `Bearer ${userToken}`
    };

    try {
        const response = await axios.get(`${baseUrl}/user/bet/history`, { headers });
        // console.log('Response api:', response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating a bet. Please try again later.');
    }
};
