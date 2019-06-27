import React from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';
import moment from 'moment';
const { Option } = Select;

class DrawerForm extends React.Component {

  addScreening = (e) => {
      e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err){
            this.props.handleOk(values)
        }
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    let options = [];
    for (let i=1; i<=18; i++){
        options.push(<Option key={i} value={i}>{i}</Option>)
    }
    
    return (
      <div>
        <Button type="primary" onClick={() => this.props.showDrawer("add")}>
          <Icon type="plus" /> New screening
        </Button>
        <Drawer
          title="Create a new screening"
          width={720}
          onClose={this.props.handleCancel}
          visible={this.props.visible}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.addScreening}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                    initialValue: this.props.childName.length>0 && this.props.childName[0].name
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Height (cm)">
                  {getFieldDecorator('height', {
                    rules: [{required: true, message: 'Please enter a height (cm)' }],
                  })(
                    <Input placeholder="Enter a height(cm)" />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Weight (kg)">
                  {getFieldDecorator('weight', {
                    rules: [{required: true, message: 'Please enter a weight (kg)' }],
                  })(
                    <Input placeholder="Enter a weight (kg)" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Age">
                  {getFieldDecorator('age', {
                    rules: [{ required: true, message: 'Please enter the age' }],
                  })(
                    <Select 
                        placeholder="Please choose the age"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                            return option.props.value === Number(input)
                        }}
                    >
                      {options}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date">
                  {getFieldDecorator('date', {
                    rules: [{ required: true, message: 'Please choose the date' }],
                  })(
                    <DatePicker
                        showToday
                        format={'DD-MM-YYYY'}
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.props.handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.addScreening} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

DrawerForm.defaultProps = {
    childName: [{name: ''}]
}
const AddScreening = Form.create({mapPropsToFields(props){
    return{
        name: Form.createFormField({
            value: props.childName.length>0 && props.childName[0].name
        }),
        height: Form.createFormField({
            value: props.activeItem.height
        }),
        weight: Form.createFormField({
            value: props.activeItem.weight
        }),
        age: Form.createFormField({
            value: props.activeItem.age
        }),
        date:  Form.createFormField({
            value: (props.activeItem.date !== '' ? moment.utc(props.activeItem.date) : moment())
        })
    }
}})(DrawerForm);

export default AddScreening