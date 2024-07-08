import React from 'react';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import "./Register.scss";
import { generateToken } from '../../helpers/generateToken';
import { createCompany, getCompany } from '../../services/companiesServices';
import { isEmptyObject } from '../../helpers/isEmptyObject';

function Register() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const onFinish = async (values) => {
    const resultGetCompany = await getCompany(values.email);

    if (resultGetCompany.length > 0) {
      openNotificationWithIcon("error", "Error", "The email is exist");

      return;
    }

    const options = {
      ...values,
      token: generateToken(20)
    }

    const resultCreateCompany = await createCompany(options);

    if (isEmptyObject(resultCreateCompany)) {
      openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
    }
    else {
      openNotificationWithIcon("success", "Success", "Created your account");
    }
  };
  const onFinishFailed = () => {
    openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
  };

  return (
    <>
      <div className='register'>
        <div>
          {contextHolder}
        </div>
        <h1 className='register__title'>Register Your Account</h1>
        <div className='register__form'>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[30, 30]}>
              <Col span={24}>
                <Form.Item
                  layout="vertical"
                  label="Company name"
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your company name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  layout="vertical"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: 'Please input your company email!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  layout="vertical"
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      message: 'Please input your company phone!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  layout="vertical"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your company password!',
                    }
                  ]}
                >
                  <Input.Password />
                </Form.Item>

              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form >
        </div>
      </div>
    </>
  )
}

export default Register;