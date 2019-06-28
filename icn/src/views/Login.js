import React from 'react'
import {connect} from 'react-redux'


import './Login.scss'

import {attemptLogin} from '../actions'
import LoginForm from '../components/LoginForm'

class Login extends React.Component {
    componentDidMount() {
        if(localStorage.getItem("token"))
            if(localStorage.getItem("isAdmin") === "true")
                this.props.history.push("/dashboard")
    }
    
    handleSubmit = values => {
        this.props.attemptLogin(values)
            .then(res => {
                if(res)
                    if(localStorage.getItem("isAdmin") === "true")
                        this.props.history.push("/dashboard")
                    else 
                        this.props.history.push(`/dashboard/countries/community/${localStorage.getItem("country_id")}`)
            })
    }

    render() {
        return (
            <div className="login-container">
                <LoginForm 
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    attemptLogin
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
