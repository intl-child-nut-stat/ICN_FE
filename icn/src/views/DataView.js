import React, { Component } from 'react'
import {message, Modal, Button, Form, Input} from 'antd';
import DataTable from '../components/DataTable'
import {connect} from 'react-redux'
import {getData, addData, deleteData} from '../actions'

class DataView extends Component {
    state = {
        visible: false,
        activeItem: ''
    }
    componentDidMount() {
        if(this.props.param)
            this.props.getData(`${this.props.url}${this.props.match.params.id}`, this.props.item)
        else 
            this.props.getData(`${this.props.url}`, this.props.item)
    }
    
    confirmDelete = (record) => {
        message.error(`You deleted ${record.name}`)
        this.props.deleteData(this.props.postUrl || this.props.url, record.key, this.props.item)
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
        let object = this.prepareObject();
        this.props.addData(this.props.postUrl || this.props.url, object, this.props.item)
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

    prepareObject = () => {
        switch(this.props.item){
            case "country":
                return{
                    country: this.state.activeItem
                }
            case "community":
                return {
                    community: this.state.activeItem,
                    country_id: this.props.match.params.id
                }
            case "children":
                return {
                    name: this.state.activeItem,
                    community_id: this.props.match.params.id
                }
        }
    }
    
    render() {
        return (
            <div>
                <DataTable 
                    data={this.props[this.props.item]}
                    confirmDelete = {this.confirmDelete}
                    cancelDelete = {this.cancelDelete}
                    item={this.props.item}
                    name={this.props.name}
                    extra={this.props.extra}
                    match={this.props.match.params.id}
                    filter={this.props.filter}
                />
                {this.props.isAdmin && this.props.item==="country" && <div className="button/modal">
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
                {this.props.item!=="country" && <div className="button/modal">
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


const mapStateToProps = (state, ownProps) => ({
    [ownProps.item]: state.data[ownProps.item]
})

const mapDispatchToProps = {
    getData,
    addData,
    deleteData
}

export default connect(mapStateToProps, mapDispatchToProps)(DataView)
