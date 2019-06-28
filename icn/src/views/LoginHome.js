import React from 'react'
import {Route, NavLink} from 'react-router-dom'

import SignUp from './SignUp'
import Login from './Login'
import styled from 'styled-components'
function LoginHome(props) {
    return (
        <div style={{textAlign: 'center'}}>
            <NavDiv>
                <div>
                <span>ICN</span>
                <NavLink to="/home/login" activeStyle={{textDecoration: `underline`}}>Log In</NavLink>
                <NavLink to="/home/signup" activeStyle={{textDecoration: `underline`}}>Sign Up</NavLink>
                </div>
            </NavDiv>
            <Route exact path ='/home/login' render={props => (<Login {...props} />)} />
            <Route exact path="/home/signup" render={props => (<SignUp {...props} />)} />
        </div>
    )
}

export default LoginHome


const NavDiv = styled.div`
    background: #1890ff;
    color: white
    font-size: 1.5rem;
    height: 5vh;
    margin-bottom: 50px;
    
    div{
        width: 1000px;
        margin: 0 auto;
        display: flex;
        justify-content: space-evenly;

       span{
           font-size: 4rem;
           padding-top: 5px;
           line-height: 5vh;
           font-family: 'Scheherazade', serif;
       }
    }

    a{
        color: white;
        text-decoration: none;
        font-size; 2rem;

        &:hover{
            text-decoration: underline
        }
    }
`