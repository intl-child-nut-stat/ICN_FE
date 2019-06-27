import React from 'react'
import {Link} from 'react-router-dom'
import {Table, Popconfirm} from 'antd'

function DataTable(props) {
    const columnHeader = props.name
    const columns = [
        {
          title: columnHeader,
          dataIndex: 'name',
          key: 'name',
          render: (text,record) => (<Link to={`/dashboard/${props.item}/${record.key}`}>{text}</Link>),
          width: `80%`
        },  
        {
          title: 'Manage',
          key: 'manage',
          width: `20%`,
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

    let filteredData = props.data
    if(props.item === "community")
        filteredData = props.data.filter(item => item[props.filter] === Number(props.match))
    let data = filteredData.map(item => {
            let key = props.item
            if(props.name==='Child')
                key=props.extra
            return {
                key: item.id,
                name: item[key]
            }
    }).sort((a,b) => a.name.localeCompare(b.name))
    

    

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
