/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const baseUrl = process.env.REACT_APP_BACKEND_URL;

        try {
            const login = await axios.post(`${baseUrl}/user/authentication/login`, {
                identifier: identifier,
                password: password
            });
            if (login.data) {
                alert('User Login Successfully');
                const userToken = login.data.token;
                Cookies.set('userToken', userToken);
                navigate('/game/pinball');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Please check your credentials or verify your account');
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="lg:w-1/5 md:w-1/4 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                            Email or Username
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="w-full border rounded-lg p-2"
                            placeholder="Enter Email or Username"
                            onChange={(e) => {
                                setIdentifier(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border rounded-lg p-2"
                            placeholder="Enter Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600"
                        type="submit"
                        onClick={handleLogin}
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
