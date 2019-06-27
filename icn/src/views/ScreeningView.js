import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getData, addData, getChildName} from '../actions'
import ScreeningTable from '../components/ScreeningTable'
import AddScreening from '../components/AddScreening'
import moment from 'moment'

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
        this.props.getChildName(this.props.match.params.id)                     
    }

    handleOk = values => {
        let object = this.prepareObject(values);
        this.props.addData(this.props.postUrl || this.props.url, object, this.props.item)
        this.setState({
            visible: false
        })
    }

    showDrawer = (actionType) => {
        this.setState({
          visible: true,
        });
    };

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

    prepareObject = (values) => {
        let object = {};
        object.children_id = this.props.childName.id;
        object.height = Number(values.height);
        object.weight = Number(values.weight);
        object.age = values.age
        object.date = moment(values.date._d).format('YYYY/MM/DD')
        return object
    }
    
    editItem = (text) => {
        console.log(text)
        this.setState({
            ...this.state,
            activeItem: text.name,
            activeKey: text.key
        }, () => this.showDrawer("edit"))
    }

    render() {
        return (
            <div>
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
                />
                <div className="button/drawer">
                    <AddScreening 
                        match={this.props.match.params.id}
                        childName={this.props.childName}
                        showDrawer={this.showDrawer}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                        addScreening={this.props.addScreening}
                        visible={this.state.visible}
                    />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    [ownProps.item]: state.data[ownProps.item],
    children: state.data.children,
    childName: state.data.childName
})

const mapDispatchToProps = {
    getData,
    addData,
    getChildName,
}

export default connect(mapStateToProps, mapDispatchToProps)(DataView)
