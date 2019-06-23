//dependencies
import React from 'react';
import {Route, Redirect} from 'react-router-dom'

//styling
import './App.scss'
import {fakeData} from './mock_data/mock_data'
import Header from './components/Header'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import SignUp from './views/SignUp'

//components


class App extends React.Component{
    state = {
        loggedIn: false
    }
    render(){
        return(
            <div className="app-container">
                <Route path="/" render={props => (<Header {...props} loggedIn={this.state.loggedIn}/>)} />
                <Route path = "/login" render={props => (<Login {...props} />)} />
                <Route path="/signup" render={props => (<SignUp {...props} />)} />
                <Route path = "/dashboard" render={props => (<Dashboard {...props} />)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn = state.login.loggedIn
})

const mapDispatchToProps = {
    
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render = {props => 
        localStorage.getItem("token") ? (<Component {...props}/>) : <Redirect to="/login"/>}
    />
}
export default App;
