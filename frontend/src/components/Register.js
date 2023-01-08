import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        onRegister({ email, password }).then(() => {
            navigate('/sign-in');
        })
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
            <form className="login" onSubmit={handleRegister}>
                <h2 className="login__welcome">Регистрация</h2>
                <input id="email" className="login__input" value={email} onChange={handleEmailChange} name="email" type="email" placeholder="Email" />
                <input id="password" className="login__input" value={password} onChange={handlePasswordChange}  name="password" type="password" placeholder="Пароль" />
                <button type="submit" className="login__button">Зарегистрироваться</button>
                <Link to='/sign-in' className="login__entry">Уже зарегистрированы? Войти</Link>
            </form>
    )
}

export default Register;