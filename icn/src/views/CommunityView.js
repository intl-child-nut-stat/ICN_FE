import React, { Component } from 'react'
import {connect} from 'react-redux'
import {message, Button, Modal, Form, Input} from 'antd'

import {getCommunities, addCommunity} from '../actions'
import CommunityTable from '../components/CommunityTable'

class CommunityView extends Component {
    state = {
        visible: false,
        activeCommunity: ''
    }
    componentDidMount() {
        this.props.getCommunities(this.props.match.params.country)
    }
    
    confirmDelete = (record) => {
        message.error(`You deleted ${record.communities}`)
    }

    cancelDelete = (record) => {
        message.success(`You saved ${record.communities}`)
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = e => {
        e.preventDefault();
        this.props.addCommunity(this.state.activeCommunity, this.props.match.params.country)
        this.setState({
            visible: false
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false
        })
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            activeCommunity: e.target.value
        })
    }
    render() {
        return (
            <div>
                <CommunityTable
                    communities={this.props.communities}
                    confirmDelete={this.confirmDelete}
                    cancelDelete={this.cancelDelete}
                />
                 {this.props.isAdmin === 'true' && <div className="button/modal">
                    <Button type="primary" onClick={this.showModal}>
                        Add Community
                    </Button>
                    <Modal
                        title="Add Community"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form onSubmit={this.handleOk}>
                            <Form.Item label="Community Name:">
                                <Input required={true} value={this.state.activeCommunity} onChange={this.handleChange}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    communities: state.data.communities
})

const mapDispatchToProps = {
    getCommunities,
    addCommunity
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityView)