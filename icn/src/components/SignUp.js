//dependencies
import React from 'react'
import {connect} from 'react-redux'
import {Form, Input, Select, Button, Radio} from 'antd';
//styling
import "./SignUp.scss"
//components
import {attemptSignUp, getCountries} from '../actions'

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false, //from antd
        admin: "No",
        isAdmin: false,
    };

    componentDidMount() {
        this.props.getCountries()
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err){ 
                this.props.attemptSignUp(values, this.state.isAdmin)
                    .then(res => {
                        if(res)
                            this.props.history.push("/Home/login")
                    })
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    adminChange = e => {
        if(e.target.value === 'Yes')
            this.setState({
                ...this.state,
                admin: e.target.value,
                isAdmin:true
            })
        else
            this.setState({
                ...this.state,
                admin: e.target.value,
                isAdmin: false,
            })
    }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        //code from antd
        const { Option } = Select;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 16, offset: 8},
            },
        };
        
        const adminOptions = [{label: `Yes`, value: 'Yes'}, {label: "No", value: `No`}]
        const countries = this.props.countries.map(country => <Option key={country.id}>{country.country}</Option>)

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Username">
                    {getFieldDecorator('username', {
                        rules: [
                            {message: 'This username is already taken!'},
                            {required: true, message: 'Please input your username!'},
                        ],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {required: true,message: 'Please input your password!'},
                            {validator: this.validateToNextPassword},
                        ],
                    })(<Input.Password />)}
                </Form.Item>

                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {required: true,message: 'Please confirm your password!'},
                            {validator: this.compareToFirstPassword}
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

                <Form.Item label="Administrator">
                    <Radio.Group options={adminOptions} defaultValue={['No']} value={this.state.admin} onChange={this.adminChange}/>
                </Form.Item>

                {!this.state.isAdmin &&
                    <Form.Item label="Region to Screen">
                        {getFieldDecorator('region', {
                            rules: [{ type: 'string'}],
                        })(
                            <Select
                                showSearch
                                style={{ width: 500 }}
                                placeholder="Select a region"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                            {countries}
                            </Select>
                        )}
                    </Form.Item>
                }

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Sign Up</Button>
                </Form.Item>
            </Form>
        );
    }
}

const SignUp = Form.create({ name: 'register' })(RegistrationForm);

const mapStateToProps = (state) => ({
    countries: state.data.countries
})

const mapDispatchToProps = {
    attemptSignUp, getCountries
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
