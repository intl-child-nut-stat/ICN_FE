import React from 'react'

function BMIChart(props) {
    let bmi = []
    bmi = props.data.map(screening => {
        return Math.round((screening.weight/(Math.pow(screening.height/100,2)))*100)/100
    })
    
    return (
        <div>
            {props.data}
        </div>
    )
}

export default BMIChart
