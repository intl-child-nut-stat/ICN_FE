import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from "react-redux"

import {logout} from '../actions'
import CountryView from './CountryView'
import CommunityView from './CommunityView'
import ChildrenView from './ChildrenView'
import ChildView from './ChildView'

export class Dashboard extends Component {
    state = {
        userName: '',
    }
    componentDidMount() {
        let userName = localStorage.getItem("username")
        let isAdmin = localStorage.getItem("isAdmin")
        let country_id = localStorage.getItem("country_id")
        this.setState({
            userName,
            isAdmin,
            country_id
        })
    }
    
    logout = () => {
        localStorage.clear()
        this.props.logout()
    }
    render() {
        return (
            <div>
                {`Welcome ${this.state.userName}`}
                <NavLink to="/dashboard/countries">Country Display</NavLink>
                <NavLink to="/Home/login" onClick={this.logout}>Log out</NavLink>
                <Route  path="/dashboard/countries" render={props => (
                    <CountryView
                        {...props} 
                        isAdmin = {this.state.isAdmin}
                        country_id = {this.state.country_id}
                    />
                )} />
                <Route exact path="/dashboard/country/:country" render={props => (
                    <CommunityView
                        {...props} 
                        isAdmin = {this.state.isAdmin}
                        country_id = {this.state.country_id}
                    />
                )} />
                <Route exact path="/dashboard/community/:community" render={props => (
                    <ChildrenView
                        {...props} 
                        isAdmin = {this.state.isAdmin}
                    />
                )} />
                <Route exact path="/dashboard/children/:child" render={props => (
                    <ChildView
                        {...props} 
                        isAdmin = {this.state.isAdmin}
                    />
                )} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    logout
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)




