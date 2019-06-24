//dependencies
import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom'

//styling
import './App.scss'
import LoginHome from './views/LoginHome'
import Dashboard from './views/Dashboard'


//components


class App extends React.Component{
    componentDidMount() {
        if(localStorage.getItem("token"))
            this.props.history.push("/dashboard")
        this.props.history.push("/home/login")
    }
    
    render(){
        return(
            <div className="app-container">
                <Route path="/home" render={props => (<LoginHome {...props}/>)} />
                <PrivateRoute path = "/dashboard" render={props => (<Dashboard {...props} />)} />
            </div>
        )
    }
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render = {props => 
        localStorage.getItem("token") ? (<Component {...props}/>) : <Redirect to="/login"/>}
    />
}
export default (withRouter(App));
