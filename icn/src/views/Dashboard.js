import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from "react-redux"

import {logout, getData} from '../actions'
import DataView from './DataView'
import ScreeningView from './ScreeningView'
import Map from '../components/Map'
import styled from 'styled-components'

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
                <NavDiv>
                    <div>
                    {`Welcome ${this.state.userName}`}
                    <NavLink exact to={this.state.isAdmin ? "/dashboard" : `/dashboard/countries/community/${localStorage.getItem("country_id")}`} activeStyle={{textDecoration: `underline`}}>Home</NavLink>
                    {this.state.isAdmin && <NavLink exact to="/dashboard/countries" activeStyle={{textDecoration: `underline`}}>List Countries</NavLink>}
                    <NavLink to="/Home/login" onClick={this.logout} activeStyle={{textDecoration: `underline`}}>Log out</NavLink>
                    </div>
                </NavDiv>
                {this.state.isAdmin && <Route exact path ="/dashboard" render ={props => (
                    <MapDiv>
                    <Map 
                        {...props}
                        countries={this.props.countries}
                    />
                    </MapDiv>
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

const NavDiv = styled.div`
    background: #1890ff;
    color: white
    font-size: 1.5rem;
    height: 5vh;
    
    
    div{
        width: 1000px;
        margin: 0 auto;
        display: flex;
        justify-content: space-evenly;
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

const MapDiv = styled.div`
    margin-top: 100px;
`
