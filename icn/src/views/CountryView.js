import React, { Component } from 'react'
import {connect} from 'react-redux'
import {message, Modal, Button, Form, Input} from 'antd';
import {addCountry, getCountries} from '../actions'
import CountryTable from '../components/CountryTable'

class CountryView extends Component {
    state = {
        visible: false,
        activeCountry: ''
    }
    componentDidMount() {
        this.props.getCountries(this.props.isAdmin, this.props.country_id)
    }
    
    confirmDelete = (record) => {
        message.error(`You deleted ${record.countries}`)
    }

    cancelDelete = (record) => {
        message.success(`You saved ${record.countries}`)
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = e => {
        e.preventDefault();
        this.props.addCountry(this.state.activeCountry)
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
            activeCountry: e.target.value
        })
    }

    render() {
        return (
            <div>
                <CountryTable 
                    countries={this.props.countries}
                    confirmDelete = {this.confirmDelete}
                    cancelDelete = {this.cancelDelete}
                />
                {this.props.isAdmin === 'true' && <div className="button/modal">
                    <Button type="primary" onClick={this.showModal}>
                        Add Country
                    </Button>
                    <Modal
                        title="Add Country"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form onSubmit={this.handleOk}>
                            <Form.Item label="Country Name:">
                                <Input required={true} value={this.state.activeCountry} onChange={this.handleChange}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    countries: state.data.countries
})

const mapDispatchToProps = {
    getCountries,
    addCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryView)
