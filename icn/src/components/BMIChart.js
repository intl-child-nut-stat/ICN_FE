import React from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import moment from 'moment'

class BMIChart extends React.Component {
    componentDidMount() {
        this.displayGraph()
    }

    componentDidUpdate(prevProps, prevState) {
        this.displayGraph()
    }
    

    displayGraph = () => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        let bmi = this.props.data.sort((a,b) => {
            let aDate = new Date(a.date)
            let bDate = new Date(b.date)
            return aDate>bDate?-1 :1
        }).map((screening, index) => {
            let dateToUse = moment.utc(screening.date).format(`MM-DD-YYYY`)
            return {value: Math.round((screening.weight/(Math.pow(screening.height/100,2)))*100)/100, date:new Date(dateToUse)}
        })
        
        chart.data = bmi;
        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.title.text="Screening Date"
        dateAxis.dateFormats.setKey('day','dd-MM-yyyy')
        dateAxis.periodChangeDateFormats.setKey("month", "[bold]MMM")
        dateAxis.renderer.axisFills.template.disabled = false;
        dateAxis.renderer.axisFills.template.fill = am4core.color("#D2D68D");
        dateAxis.renderer.axisFills.template.fillOpacity = 0.2;
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "BMI"
        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"
        
        series.tooltip.pointerOrientation = "vertical";
        
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.snapToSeries = series;
        chart.cursor.xAxis = dateAxis;
        
    }
    
    
    render(){
        return (
            <div id="chartdiv" style={{width:'100%', height: '500px'}}></div>
        )
    }
}

export default BMIChart