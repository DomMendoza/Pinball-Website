/* eslint-disable */
import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import Player from './components/Player';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LiveGameStreamPage from './pages/LiveGameStreamPage';
import Login from './pages/LoginPage';
// import AdminPage from './pages/AdminPage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/game/pinball" element={<LiveGameStreamPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
