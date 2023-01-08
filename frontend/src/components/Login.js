import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin({ email, password }).then(() => {
            navigate('/');
        })
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <form className="login" onSubmit={handleLogin}>
            <h2 className="login__welcome">Вход</h2>
            <input id="email" className="login__input" value={email} onChange={handleEmailChange} name="email" type="email" placeholder="Email" />
            <input id="password" className="login__input" value={password} onChange={handlePasswordChange} name="password" type="password" placeholder="Пароль" />
            <button type="submit" className="login__button">Войти</button>
        </form>
    )
}

export default Login;