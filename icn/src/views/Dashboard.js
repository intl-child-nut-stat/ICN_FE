import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from "react-redux"

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
        this.setState({
            userName,
            isAdmin,
        })
    }
    
    render() {
        const {location} = this.props.location
        return (
            <div>
                {`Welcome ${this.state.userName}`}
                <NavLink to="/dashboard/countries">Country Display</NavLink>
               
                <Route  path="/dashboard/countries" render={props => (
                    <CountryView
                        {...props} 
                        isAdmin = {this.state.isAdmin}
                    />
                )} />
                <Route exact path="/dashboard/:country" render={props => (
                    <CommunityView
                        {...props} 
                        isAdmin = {this.state.isAdmin}
                    />
                )} />
                <Route exact path="/dashboard/:community" render={props => (
                    <ChildrenView
                        {...props} 
                        isAdmin = {this.state.isAdmin}
                    />
                )} />
                <Route exact path="/dashboard/:child" render={props => (
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
    
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)




