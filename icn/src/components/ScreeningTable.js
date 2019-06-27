import React from 'react'
import {Link} from 'react-router-dom'
import {Table, Popconfirm} from 'antd'
import moment from 'moment'
import { setBMI } from '../actions';

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
            title: "BMI",
            dataIndex: 'bmi',
            key: 'bmi',
            width: '10%',
            render: text =>  (text)
        },      
        {
          title: 'Manage',
          key: 'manage',
          width: `10%`,
          render: (text, record) => (
              <>
            <Link to="#" onClick={() => props.edit(text, "edit")} style={{paddingRight: "10px"}}>Edit</Link>
            <Popconfirm
                title={`Are you sure you want to delete this ${props.item}?`}
                onConfirm={() => props.confirmDelete(record)}
                onCancel = {() => props.cancelDelete(record)}
                okText="Yes"
                cancelText="No"
            >
            <a href='#'>Delete</a>
            </Popconfirm>
            </>
          ),
        },
      ];

    let data = props.data.map((item) => {
            return {
                id: item.id,
                date: moment.utc(item.date).format(`DD-MM-YYYY`),
                age: item.age,
                height: item.height,
                weight: item.weight,
                bmi: Math.round((item.weight/(Math.pow(item.height/100,2)))*100)/100
            }
    }).sort((a,b) => a.date > b.date ? -1 : 1).map((item,index) => {return{...item, key: ++index}})

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
