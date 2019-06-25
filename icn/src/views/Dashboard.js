import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"

import {logout, getCountries} from '../actions'
import CountryView from './CountryView'
import CommunityView from './CommunityView'
import ChildrenView from './ChildrenView'
import ChildView from './ChildView'
import getCountryCode from "../mock_data/ISO"

export class Dashboard extends Component {
    state = {
        userName: '',
    }
    componentDidMount() {
        let userName = localStorage.getItem("username")
        let isAdmin = localStorage.getItem("isAdmin")
        let country_id = localStorage.getItem("country_id")
        this.props.getCountries(isAdmin, country_id)
        this.setState({
            userName,
            isAdmin,
            country_id
        })
        
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.countries !== this.props.countries)
            this.createMap()
    }
    
    createMap = () => {
        let countryCodes = this.props.countries.map(country => getCountryCode(country.country))
        console.log(countryCodes)
        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("lightgray");

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");

        //Exclude countries:
        polygonSeries.exclude = ["AQ"]

        //Change colors of countries we have done:
        polygonSeries.data = countryCodes.map(code => {
            return ({
                "id": code.key,
                "name": code.countryName,
                "value": Math.random()*60+20,
            })
        })

        polygonSeries.heatRules.push({
            "property": "fill",
            "target": polygonSeries.mapPolygons.template,
            "min": am4core.color("#ffffff"),
            "max": am4core.color("#AAAA00")
          });
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
                <div id="chartdiv" style={{width:'100%', height: '500px'}}></div>
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
    countries: state.data.countries
})

const mapDispatchToProps = {
    logout,
    getCountries
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)




