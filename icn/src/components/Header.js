import React from 'react'
import {NavLink} from 'react-router-dom'
import Logo from './Logo'

function Header(props) {
    const login = props.loggedIn ? "Log out" : "Log in";
    return (
        <div className="header-container">
            <Logo />
            <nav className="header-nav">
                <NavLink to="/login" activeClassName="selected-navlink">{login}</NavLink>
                {props.loggedIn ? 
                    <NavLink to="/dashboard" activeClassName="selected-navlink">Home</NavLink>
                    :
                    <NavLink to="/signup" activeClassName="selected-navlink">Sign up</NavLink>}
            </nav>            
        </div>
    )
}

export default Header
