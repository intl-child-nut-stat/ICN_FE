import React, { Component } from 'react'
import {message, Modal, Button, Form, Input} from 'antd';
import DataTable from '../components/DataTable'
import {connect} from 'react-redux'
import {getData, addData, deleteData, updateData} from '../actions'
import styled from 'styled-components'
class DataView extends Component {
    state = {
        visible: false,
        activeItem: '',
        actionType: '',
        activeKey: ''
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

    showModal = (actionType) => {
        this.setState({
            visible: true,
            actionType
        })
    }

    handleOk = e => {
        e.preventDefault();
        let object = this.prepareObject();
        if(this.state.actionType ==="add")
            this.props.addData(this.props.postUrl || this.props.url, object, this.props.item)
        else
            this.props.updateData(this.props.postUrl || this.props.url, this.state.activeKey, object, this.props.item)
        this.setState({
            visible: false,
            activeItem: '',
            actionType: '',
            activeKey: ''
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            activeItem: '',
            actionType: '',
            activeKey: ''
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
            default:
                return {}
        }
    }
    
    editItem = (text) => {
        this.setState({
            ...this.state,
            activeItem: text.name,
            activeKey: text.key
        }, () => this.showModal("edit"))
    }

    render() {
        console.log(this.props.pageClicked, this.props.header)
        return (
            <DataDiv>
                {this.props.pageClicked && <h2 className="header">{this.props.pageClicked[this.props.header]}</h2>}
                <DataTable 
                    data={this.props[this.props.item]}
                    confirmDelete = {this.confirmDelete}
                    cancelDelete = {this.cancelDelete}
                    item={this.props.item}
                    name={this.props.name}
                    extra={this.props.extra}
                    match={this.props.match.params.id}
                    filter={this.props.filter}
                    edit={this.editItem}
                    link={this.props.link}
                    gettingData = {this.props.gettingData}
                />
                {this.props.isAdmin && this.props.item==="country" && <div className="button/modal">
                    <Button type="primary" onClick={() => this.showModal("add")}>
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
                    <Button type="primary" onClick={() => this.showModal("add")}>
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
            </DataDiv>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    [ownProps.item]: state.data[ownProps.item],
    gettingData: state.data.isGetting,
    pageClicked: state.data[ownProps.header].length && state.data[ownProps.header].filter(item => item.id === Number(ownProps.match.params.id))[0]
})

const mapDispatchToProps = {
    getData,
    addData,
    deleteData,
    updateData
}

export default connect(mapStateToProps, mapDispatchToProps)(DataView)


const DataDiv = styled.div`
    width: 1000px;
    margin: 0 auto;
    background: white;
    text-align: center;

    h2{
        background: #d3d3d3;
        border-bottom: 2px solid black;
        padding: 10px;
        font-size: 25px;
    }
    button{
        margin: 20px 0;
    }

    ul{
        margin-right: 50px;
    }
    
`