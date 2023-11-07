/* eslint-disable */
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import LiveGameStreamPage from '../pages/LiveGameStreamPage';

const ProtectedRoute = () => {
    const userToken = Cookies.get('userToken');

    // USER LOGIN CREDENTIAL
    useEffect(() => {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const headers = {
            Authorization: `Bearer ${userToken}`
        };
        axios
            .get(`${baseUrl}/user/check/session`, { headers })
            .then((response) => {
                if (response.status === 200) {
                    // setUserId(response.data.userSessionDets.user_id);
                    console.log('User is still logged in.');
                } else {
                    console.log('User session is not active.');
                }
            })
            .catch((error) => {
                console.error('Error checking user session:', error);
                console.log('Error checking user session.');
            });
    }, [userToken]);

    if (userToken) {
        return <LiveGameStreamPage userToken={userToken} />;
    }
    return <Navigate to="/" />;
};

export default ProtectedRoute;
