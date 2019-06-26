import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getData, addData} from '../actions'
import ScreeningTable from '../components/ScreeningTable'
import AddScreening from '../components/AddScreening'

class DataView extends Component {
    state = {
        visible: false,
        activeItem: ''
    }
    componentDidMount() {
        this.props.getData(`${this.props.url}${this.props.match.params.id}`, this.props.item)                      
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
        
    }
    
    render() {
        console.log(this.props.children)
        let child = this.props.children.filter(child => child.id === Number(this.props.match.params.id))
        console.log(child.name)
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
                />
                <div className="button/drawer">
                    <AddScreening />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    [ownProps.item]: state.data[ownProps.item],
    children: state.data.children
})

const mapDispatchToProps = {
    getData,
    addData
}

export default connect(mapStateToProps, mapDispatchToProps)(DataView)
