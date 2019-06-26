import React from 'react'
import {Link} from 'react-router-dom'
import {Table, Popconfirm} from 'antd'

function DataTable(props) {
    const columnHeader = props.name
    const columns = [
        {
          title: columnHeader,
          dataIndex: 'key',
          key: 'key',
          render: text=>(text),
          width: `15%`
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: text=>(text),
            width: `15%`
        }, 
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: text=>(text),
            width: `15%`
        }, 
        {
            title: "Height",
            dataIndex: 'height',
            key: 'height',
            render: text=>(text),
            width: `15%`
        },
        {
            title: "Weight",
            dataIndex: 'weight',
            key: 'weight',
            render: text=>(text),
            width: `15%`
        },      
        {
          title: 'Manage',
          key: 'manage',
          width: `20%`,
          render: (text, record) => (
            <Popconfirm
                title={`Are you sure you want to delete this ${props.item}?`}
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

    let data = props.data.map(item => {
            return {
                key: item.id,
                date: item.date,
                age: item.age,
                height: item.height,
                weight: item.weight
            }
    }).sort((a,b) => a.date.localeCompare(b.date))
    

    

    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={true}/>
        </div>
    )
}

DataTable.defaultProps={
    data: []
}
export default DataTable
