import React from 'react'
import {Route, NavLink} from 'react-router-dom'

import SignUp from '../components/SignUp'
import Login from '../components/Login'

function LoginHome(props) {
    return (
        <div>
            Some stylistic design<br></br>
            <NavLink to="/home/login" activeStyle={{textDecoration: `underline`}}>Log In</NavLink>
            <NavLink to="/home/signup" activeStyle={{textDecoration: `underline`}}>Sign Up</NavLink>
            <Route exact path ='/home/login' render={props => (<Login {...props} />)} />
            <Route exact path="/home/signup" render={props => (<SignUp {...props} />)} />
        </div>
    )
}

export default LoginHome
