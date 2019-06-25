import React, { Component } from 'react'
import {connect} from 'react-redux'
import {message} from 'antd';
import {getCountries} from '../actions'
import CountryTable from '../components/CountryTable'

class CountryView extends Component {
    
    componentDidMount() {
        let country_id = localStorage.getItem("country_id")
        this.props.getCountries(this.props.isAdmin, country_id)
    }
    
    confirmDelete = (record) => {
        message.error(`You deleted ${record.countries}`)
        console.log(`You deleted ${record.countries} `)
    }

    cancelDelete = (record) => {
        message.success(`You saved ${record.countries}`)
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <CountryTable 
                    countries={this.props.countries}
                    confirmDelete = {this.confirmDelete}
                    cancelDelete = {this.cancelDelete}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    countries: state.data.countries
})

const mapDispatchToProps = {
    getCountries
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryView)
