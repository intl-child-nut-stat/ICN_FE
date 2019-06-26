import React, { Component } from 'react'
import {message, Modal, Button, Form, Input} from 'antd';
import DataTable from '../components/DataTable'

class DataView extends Component {
    state = {
        visible: false,
        activeItem: ''
    }
    
    confirmDelete = (record) => {
        message.error(`You deleted ${record.name}`)
    }

    cancelDelete = (record) => {
        message.success(`You saved ${record.name}`)
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = e => {
        e.preventDefault();
        this.props.addFunction(this.state.activeItem, this.props.match.params.id)
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
            activeItem: e.target.value
        })
    }

    render() {
        return (
            <div>
                <DataTable 
                    data={this.props.data}
                    confirmDelete = {this.confirmDelete}
                    cancelDelete = {this.cancelDelete}
                    item={this.props.item}
                    name={this.props.name}
                    match={this.props.match.params.id}
                    filter={this.props.filter}
                />
                {this.props.isAdmin && <div className="button/modal">
                    <Button type="primary" onClick={this.showModal}>
                        Add {`${this.props.item}`}
                    </Button>
                    <Modal
                        title={`Add ${this.props.item}`}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form onSubmit={this.handleOk}>
                            <Form.Item label={`${this.props.name} name:`}>
                                <Input required={true} value={this.state.activeItem} onChange={this.handleChange}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>}
            </div>
        )
    }
}


export default DataView
