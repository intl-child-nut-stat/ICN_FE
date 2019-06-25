import React, { Component } from 'react'
import {connect} from 'react-redux'
import {message} from 'antd';
import {getCountries} from '../actions'
import CountryTable from '../components/CountryTable'

class CountryView extends Component {
    
    componentDidMount() {
        this.props.getCountries(this.props.isAdmin, this.props.country_id)
    }
    
    confirmDelete = (record) => {
        message.error(`You deleted ${record.countries}`)
    }

    cancelDelete = (record) => {
        message.success(`You saved ${record.countries}`)
    }

    render() {
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
