import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import CardList from './CardList.js';
import Header from './Header.js';
import InfoTooltip from './InfoTooltip.js';
import { apiInstance } from '../utils/Api.js';
import Footer from './Footer.js';

const App = () => {
    const [user, setUser] = useState({ _id: '', email: '' });
    const [loggedIn, setLoggedIn] = useState(false);
    const [infoTooltipData, setInfoTooltipData] = useState({ visibility: false, isError: false });

    const login = async ({ email, password }) => {
        try {
            const { token } = await apiInstance.authorize({ email, password });
            localStorage.setItem('token', token);
            setLoggedIn(true);
            return Promise.resolve();
        } catch {
            setInfoTooltipData({ visibility: true, isError: true });
        }
    };

    const register = async ({ email, password }) => {
        try {
            await apiInstance.register({ email, password });
            setInfoTooltipData({ visibility: true, isError: false });
        } catch {
            setInfoTooltipData({ visibility: true, isError: true });
            throw new Error('registrtion error');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    const checkToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        const { data } = await apiInstance.checkMe();
        if (data.email) {
            setLoggedIn(true);
            setUser(data);
        }
    };

    const handleInfoClose = () => {
        setInfoTooltipData({ isError: false, visibility: false });
    }

    useEffect(() => {
        checkToken();
    }, [loggedIn]);

    return (
        <div className="wrapper">
            <div className="page">
                <BrowserRouter>
                    {loggedIn && window.location.pathname !== '/' && <Navigate to='/' />}
                    <Header
                        onLogOut={logout}
                        email={user.email}
                    />
                    <div className="content">
                        <Routes>
                            <Route path="/sign-in" element={<>
                                <Login isLoggedId={loggedIn} onLogin={login} />
                            </>} />
                            <Route path="/sign-up" element={
                                <Register onRegister={register} />
                            } />
                            <Route path="/" element={
                                <ProtectedRoute loggedIn={loggedIn}>
                                    <CardList />
                                </ProtectedRoute>
                            } />
                        </Routes>
                        {infoTooltipData.visibility && <InfoTooltip isError={infoTooltipData.isError} isOpen={infoTooltipData.visibility} onClose={handleInfoClose} />}
                    </div>
                    <Footer />
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;