import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from "react-redux"


import {logout, getData} from '../actions'
import DataView from './DataView'
import ScreeningView from './ScreeningView'
import Map from '../components/Map'


export class Dashboard extends Component {
    state = {
        userName: '',
    }
    componentDidMount() {
        let userName = localStorage.getItem("username")
        let isAdmin = localStorage.getItem("isAdmin") ==="true" 
        let country_id = localStorage.getItem("country_id")
        this.props.getData("/api/countrylist", "country")
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
                <NavLink to={this.state.isAdmin ? "/dashboard" : `/dashboard/country/${localStorage.getItem("country_id")}`}>Home</NavLink>
                {this.state.isAdmin && <NavLink to="/dashboard/countries">Country Display</NavLink>}
                <NavLink to="/Home/login" onClick={this.logout}>Log out</NavLink>
                
                {this.state.isAdmin && <Route exact path ="/dashboard" render ={props => (
                    <Map 
                        {...props}
                        countries={this.props.countries}
                    />
                )} />}
                <Route  exact path="/dashboard/countries/" render={props => (
                    <DataView
                        {...props}
                        url={`/api/countrylist`} 
                        postUrl={`/api/country/`}
                        isAdmin = {this.state.isAdmin}
                        name={`Country`}
                        item={`country`}
                        param={false}
                        link={`/dashboard/countries/community`}
                    />
                )} />
                <Route exact path="/dashboard/countries/community/:id" render={props => (
                    <DataView
                        {...props}
                        url={`/api/community/`}
                        isAdmin = {this.state.isAdmin}
                        name={`Community`}
                        item={`community`}
                        filter={'country_id'}
                        param={false}
                        link={`/dashboard/countries/community/children`}
                    />
                )} />
                <Route exact path="/dashboard/countries/community/children/:id" render={props => (
                    <DataView
                        {...props}
                        url={`/api/children/`}
                        isAdmin = {this.state.isAdmin}
                        name={`Child`}
                        item={'children'}
                        extra={`name`}
                        filter={`community_id`}
                        param={true}
                        link={`/dashboard/countries/community/children/screening`}
                    />
                )} />
                <Route exact path="/dashboard/countries/community/children/screening/:id" render={props => (
                    <ScreeningView
                        {...props}
                        url={`/api/screening/`} 
                        isAdmin = {this.state.isAdmin}
                        name={`Screening`}
                        item={`screening`}
                        filter={`children_id`}
                        param={true}
                    />
                )} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    countries: state.data.country,
    communities: state.data.communities,
    children: state.data.children
})

const mapDispatchToProps = {
    logout,
    getData,
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)




