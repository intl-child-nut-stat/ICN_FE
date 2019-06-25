import React from 'react'
import {Link} from 'react-router-dom'
import {Table, Popconfirm} from 'antd'

function CommunityTable(props) {
    const columns = [
        {
          title: 'Communities',
          dataIndex: 'communities',
          key: 'communities',
          render: text => (<Link to={`/dashboard/community/${text}`}>{text}</Link>),
          width: `80%`
        },  
        {
          title: 'Manage',
          key: 'manage',
          width: `20%`,
          render: (text, record) => (
            <Popconfirm
                title="Are you sure you want to delete this community?"
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
      const data = props.communities.map(community => {
          return {
              key: community.id,
              communities: community.community
          }
      }).sort((a,b) => a.communities.localeCompare(b.communities))
    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={true}/>
        </div>
    )
}

CommunityTable.defaultProps={
    countries: []
}
export default CommunityTable
