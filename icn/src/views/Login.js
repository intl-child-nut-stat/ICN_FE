import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { Form, Icon, Input, Button} from 'antd';

import './Login.scss'

import {attemptLogin} from '../actions'

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.attemptLogin(values)
                    .then(res => {
                        if(res)
                            this.props.history.push("/dashboard")
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                        {`Or `}
                        <NavLink to="/home/signup">sign up now!</NavLink>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    attemptLogin
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
