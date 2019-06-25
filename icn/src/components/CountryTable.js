import React from 'react'
import {Link} from 'react-router-dom'
import {Table, Popconfirm} from 'antd'

function CountryTable(props) {
    const columns = [
        {
          title: 'Countries',
          dataIndex: 'countries',
          key: 'countries',
          render: (text,record) => (<Link to={`/dashboard/country/${record.key}`}>{text}</Link>),
          width: `80%`
        },  
        {
          title: 'Manage',
          key: 'manage',
          width: `20%`,
          render: (text, record) => (
            <Popconfirm
                title="Are you sure you want to delete this country?"
                onConfirm={() => props.confirmDelete(record)}
                onCancel = {() => props.cancelDelete(record)}
                okText="Yes"
                cancelText="No"
            >
            <a href='#'>Delete</a>
            </Popconfirm>
          ),
        },
      ];
      const data = props.countries.map(country => {
          return {
              key: country.id,
              countries: country.country
          }
      }).sort((a,b) => a.countries.localeCompare(b.countries))
    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={true}/>
        </div>
    )
}

CountryTable.defaultProps={
    countries: []
}
export default CountryTable
