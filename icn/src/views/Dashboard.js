import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from "react-redux"


import {logout, getCountries, getCommunities, getChildren, addCountry, addCommunity, addChild} from '../actions'
import DataView from './DataView'
import Map from '../components/Map'

export class Dashboard extends Component {
    state = {
        userName: '',
    }
    componentDidMount() {
        let userName = localStorage.getItem("username")
        let isAdmin = localStorage.getItem("isAdmin") ==="true" 
        let country_id = localStorage.getItem("country_id")
        this.props.getCountries(isAdmin, country_id)
        this.props.getCommunities()
        this.props.getChildren()
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
                <NavLink to="/dashboard">Home</NavLink>
                <NavLink to="/dashboard/countries">Country Display</NavLink>
                <NavLink to="/Home/login" onClick={this.logout}>Log out</NavLink>
               
                {this.state.isAdmin && <Route exact path ="/dashboard" render ={props => (
                    <Map 
                        {...props}
                        countries={this.props.countries}
                    />
                )} />}
                <Route  path="/dashboard/countries" render={props => (
                    <DataView
                        {...props} 
                        data={this.props.countries}
                        isAdmin = {this.state.isAdmin}
                        addFunction = {this.props.addCountry}
                        name={`Country`}
                        item={`country`}
                    />
                )} />
                <Route exact path="/dashboard/country/:id" render={props => (
                    <DataView
                        {...props}
                        data={this.props.communities}
                        isAdmin = {this.state.isAdmin}
                        addFunction = {this.props.addCommunity}
                        name={`Community`}
                        item={`community`}
                        filter={'country_id'}
                    />
                )} />
                <Route exact path="/dashboard/community/:id" render={props => (
                    <DataView
                        {...props}
                        data={this.props.children}
                        isAdmin = {this.state.isAdmin}
                        addFunction={this.props.addChild}
                        name={`Child`}
                        item={'name'}
                        filter={`community_id`}
                    />
                )} />
                <Route exact path="/dashboard/children/:id" render={props => (
                    <DataView
                        {...props} 
                        isAdmin = {this.state.isAdmin}
                    />
                )} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    countries: state.data.countries,
    communities: state.data.communities,
    children: state.data.children
})

const mapDispatchToProps = {
    logout,
    getCountries,
    getCommunities,
    getChildren,
    addCountry,
    addCommunity,
    addChild
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)




