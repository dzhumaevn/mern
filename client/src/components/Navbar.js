import {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export const Navbar = () => {
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
    }

    return (
        <nav>
            <div className="container">
                    <div className="nav-wrapper">
                        <span className="brand-logo">Сокращение ссылок</span>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/links">Ссылки</NavLink></li>
                            <li><a href="/#" onClick={logoutHandler}>Выйти</a></li>
                        </ul>
                    </div>
            </div>
        </nav>
    )
}