import logo from '../images/Vector.svg';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

function Header({ onLogOut, email }) {
    return (
        <header className="header">
            <img className="header__logo" alt="Место" src={logo} />
            <div className='header__action-wrapper'>
                <Routes>
                    <Route path="/" element={<div className='header__action-logged'>
                        <div className='header__action-email'> {email}</div>
                        <Link onClick={onLogOut} to="/sign-in" className="header__action-text">Выйти</Link>
                    </div>} />
                    <Route path="/sign-in" element={<Link to="/sign-up" className="header__action-text">Регистрация</Link>} />
                    <Route path="/sign-up" element={<Link to="/" className="header__action-text">Войти</Link>} />
                </Routes>
            </div>
        </header>
    )
}

export default Header;