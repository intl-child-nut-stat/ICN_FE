import React, { Component } from 'react'
import {connect} from "react-redux"
import { Table, Popconfirm, message, Icon} from 'antd';

import {getCountries} from '../actions'


export class Dashboard extends Component {
    state={
        username: '',
        data: []
    }
    componentDidMount() {
        let userName = localStorage.getItem("username")
        let isAdmin = localStorage.getItem("isAdmin")
        let country_id = localStorage.getItem("country_id")
        this.props.getCountries(isAdmin, country_id)
        this.setState({
            userName,
            isAdmin,
            country_id,
            data: this.props.countries
        })
    }
    
    confirmDelete = (record) => {
        message.error(`You deleted ${record.countries}`)
        console.log(`You deleted ${record.countries} `)
    }

    cancelDelete = (record) => {
        message.success(`You saved ${record.countries}`)
    }
    render() {
        const columns = [
            {
              title: 'Countries',
              dataIndex: 'countries',
              key: 'countries',
              render: text => <a href="javascript:;">{text}</a>,
              width: `80%`
            },  
            {
              title: 'Manage',
              key: 'manage',
              width: `20%`,
              render: (text, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this country?"
                    onConfirm={() => this.confirmDelete(record)}
                    onCancel = {() => this.cancelDelete(record)}
                    okText="Yes"
                    cancelText="No"
                >
                <a href='#'>Delete</a>
                </Popconfirm>
              ),
            },
          ];
          const data = this.props.countries.map(country => {
              return {
                  key: country.id,
                  countries: country.country
              }
          }).sort((a,b) => a.countries.localeCompare(b.countries))
        
        return (
            <div>
                {`Welcome ${this.state.userName}`}
                <Table columns={columns} dataSource={data} pagination={true}/>
                
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

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)




