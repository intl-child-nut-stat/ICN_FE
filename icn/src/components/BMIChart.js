import React from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";


class BMIChart extends React.Component {
    componentDidMount() {
        this.displayGraph()
    }


    displayGraph = () => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
    let bmi = []
    bmi = this.props.data.map((screening, index) => {
        return {value: Math.round((screening.weight/(Math.pow(screening.height/100,2)))*100)/100, screening: ++index}
    })
    
    chart.data = bmi;
    // Create axes
    let valueXAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueXAxis.title.text="Screening"
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "BMI"
    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.valueX = "screening";
    series.tooltipText = "{value}"
    
    series.tooltip.pointerOrientation = "vertical";
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = valueXAxis;
    
    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();
    }
    
    
    render(){
        return (
            <div id="chartdiv" style={{width:'100%', height: '500px'}}></div>
        )
    }
}

export default BMIChart