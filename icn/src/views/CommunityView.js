import React, { Component } from 'react'
import {connect} from 'react-redux'
import {message} from 'antd'

import {getCommunities} from '../actions'
import CommunityTable from '../components/CommunityTable'

class CommunityView extends Component {

    componentDidMount() {
        this.props.getCommunities(this.props.match.params.country)
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
                <CommunityTable
                    communities={this.props.communities}
                    confirmDelete={this.confirmDelete}
                    cancelDelete={this.cancelDelete}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    communities: state.data.communities
})

const mapDispatchToProps = {
    getCommunities
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityView)