import React from 'react'
import {Link} from 'react-router-dom'
import {Table, Popconfirm} from 'antd'
import moment from 'moment'
import styled from 'styled-components'
function DataTable(props) {
    const columnHeader = props.name
    const columns = [
        {
          title: columnHeader,
          dataIndex: 'key',
          key: 'key',
          render: text=>(text),
          width: `9%`,
          align: 'center'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: text=>(text),
            width: `15%`,
            align: 'center'
        }, 
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: text=>(text),
            width: `15%`,
            align: 'center'
        }, 
        {
            title: "Height",
            dataIndex: 'height',
            key: 'height',
            render: text=>(text),
            width: `15%`,
            align: 'center'
        },
        {
            title: "Weight",
            dataIndex: 'weight',
            key: 'weight',
            render: text=>(text),
            width: `15%`,
            align: 'center'
        },
        {
            title: "BMI",
            dataIndex: 'bmi',
            key: 'bmi',
            width: '10%',
            align: 'center',
            render: text =>  (text)
        },      
        {
          title: 'Manage',
          key: 'manage',
          width: `20%`,
          align: 'center',
          render: (text, record) => (
            <EditDiv>
                <Link to="#" onClick={() => props.edit(text, "edit")}>Edit</Link>
                <Popconfirm
                    title={`Are you sure you want to delete this ${props.item}?`}
                    onConfirm={() => props.confirmDelete(record)}
                    onCancel = {() => props.cancelDelete(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <a href='#'>Delete</a>
                </Popconfirm>
            </EditDiv>
          ),
        },
      ];

    let data = props.data.map((item) => {
            return {
                id: item.id,
                datePicker: item.date,
                date: moment.utc(item.date).format(`DD-MM-YYYY`),
                age: item.age,
                height: item.height,
                weight: item.weight,
                bmi: Math.round((item.weight/(Math.pow(item.height/100,2)))*100)/100
            }
    }).sort((a,b) => {
        let aDate = new Date(a.datePicker)
        let bDate = new Date(b.datePicker)
        return aDate > bDate ? -1 : 1}).map((item,index) => {return{...item, key: ++index}})
    
    return (
        <div>
            <Table pagination={data.length>10} loading={props.gettingData} columns={columns} dataSource={data} pagination={true}/>
        </div>
    )
}

DataTable.defaultProps={
    data: []
}
export default DataTable

const EditDiv = styled.div`
    display: flex;
    justify-content: spaced-evenly;

    a{
        width: 50%;
    }
`