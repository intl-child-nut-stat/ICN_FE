import React from 'react'
import getCountryCode from "../mock_data/ISO"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh"


class Map extends React.Component {
    componentDidMount() {
        this.displayMap()
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.countries !== this.props.countries){
            this.displayMap()
        }
    }

    displayMap = () => {
        let countryCodes = this.props.countries.map(country => getCountryCode(country.country))
        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldHigh;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";   
        polygonTemplate.events.on("hit", (ev) => {
           this.clickedCountry(ev.target.dataItem.dataContext.name)
        })
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
                "fill": am4core.color("#5C5CFF")
            })
        })

        polygonTemplate.propertyFields.fill = "fill"
    }
    
    clickedCountry = (countryClicked) => {
        let desiredCountry = this.props.countries.filter(country => country.country === countryClicked)
        if(desiredCountry.length)
            this.props.history.push(`/dashboard/country/${desiredCountry[0].id}`)
    }
    render(){
        return (
            <div id="chartdiv" style={{width:'100%', height: '500px'}}></div>
        )
    }
}

export default Map
