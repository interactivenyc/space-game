import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="nav">
            <h3>Space Game!</h3>
            <div className="navLinks">
                <NavLink className="navLink" exact activeClassName="active" to="/">
                    Home
                </NavLink>
                <NavLink className="navLink" exact activeClassName="active" to="/game">
                    Game
                </NavLink>
            </div>
        </nav>
    );
};

export default Nav;
