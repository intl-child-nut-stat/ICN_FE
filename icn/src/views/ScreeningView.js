import React, { Component } from 'react'
import {connect} from 'react-redux'
import {message} from 'antd'
import {getData, addData, updateData, deleteData} from '../actions'
import ScreeningTable from '../components/ScreeningTable'
import AddScreening from '../components/AddScreening'
import moment from 'moment'
import BMIChart from '../components/BMIChart'
import styled from 'styled-components'
class DataView extends Component {
    state = {
        visible: false,
        activeItem: {
            height: '',
            weight: '',
            age: '',
            date: '',
        },
        activeKey: '',
        actionType: ''
    }
    componentDidMount() {
        this.props.getData(`${this.props.url}${this.props.match.params.id}`, this.props.item) 
        this.props.getData('/api/children', "children")
    }

    confirmDelete = (record) => {
        message.error(`You deleted screening ${record.key}`)
        this.props.deleteData(this.props.postUrl || this.props.url, record.id, this.props.item)
    }

    cancelDelete = (record) => {
        message.success(`You saved screening ${record.key}`)
    }
    handleOk = values => {
        let object = this.prepareObject(values);
        if(this.state.actionType ==="add")
            this.props.addData(this.props.postUrl || this.props.url, object, this.props.item)
        else
            this.props.updateData(this.props.postUrl || this.props.url, this.state.activeKey, object, this.props.item)
        this.setState({
            visible: false,
            activeItem: {
                height: '',
                weight: '',
                age: '',
                date: '',
            },
            actionType: '',
            activeKey: ''
        })
        this.setState({
            visible: false
        })
    }

    showDrawer = (actionType) => {
        this.setState({
          visible: true,
          actionType
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            activeItem: {
                height: '',
                weight: '',
                age: '',
                date: '',
            },
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

    prepareObject = (values) => {
        let object = {};
        object.children_id = this.props.match.params.id;
        object.height = Number(values.height);
        object.weight = Number(values.weight);
        object.age = values.age
        object.date = moment(values.date._d).format('YYYY/MM/DD')
        return object
    }
    
    editItem = (text) => {
        this.setState({
            ...this.state,
            activeItem: {
                height: text.height,
                weight: text.weight,
                age: text.age,
                date: moment.utc(text.datePicker).format('DD-MM-YYYY'),
            },
            activeKey: text.id
        }, () => this.showDrawer("edit"))
    }

    render() {
        return (
            <DataDiv>
                <ScreeningTable 
                    data={this.props[this.props.item]}
                    confirmDelete = {this.confirmDelete}
                    cancelDelete = {this.cancelDelete}
                    item={this.props.item}
                    name={this.props.name}
                    extra={this.props.extra}
                    match={this.props.match.params.id}
                    filter={this.props.filter}
                    edit={this.editItem}
                    setBMI={this.props.setBMI}
                    gettingData={this.props.gettingData}
                />
                <div className="button/drawer">
                    <AddScreening 
                        match={this.props.match.params.id}
                        childName={this.props.children.filter(child => child.id === Number(this.props.match.params.id))}
                        showDrawer={this.showDrawer}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                        addScreening={this.props.addScreening}
                        visible={this.state.visible}
                        activeItem={this.state.activeItem}
                    />
                </div>
                {this.props[this.props.item].length>1 ? <BMIChart 
                    data={this.props[this.props.item]}
                    childName={this.props.children.filter(child => child.id === Number(this.props.match.params.id))}
                /> : <div>Add more data to get a BMI chart.</div>}
            </DataDiv>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    [ownProps.item]: state.data[ownProps.item],
    children: state.data.children,
    gettingData: state.data.isGetting
})

const mapDispatchToProps = {
    getData,
    addData,
    updateData,
    deleteData,
}

export default connect(mapStateToProps, mapDispatchToProps)(DataView)


const DataDiv = styled.div`
    width: 1000px;
    margin: 0 auto;
    background: white;
    text-align: center;

    button{
        margin: 20px auto;
    }

    ul{
        margin-right: 50px;
    }
`