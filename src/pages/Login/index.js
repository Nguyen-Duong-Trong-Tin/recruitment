import React from 'react';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { login } from '../../services/companiesServices';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../helpers/cookies';
import { useDispatch } from 'react-redux';
import { checkLogin } from '../../actions/login';
import "./Login.scss";

function Login() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { email, password } = values;
    const result = await login(email, password);

    if (result.length <= 0) {
      openNotificationWithIcon("error", "Error", "Wrong the email or the password");

      return;
    }

    setCookie("id", result[0].id, 1);
    setCookie("companyName", result[0].companyName, 1);
    setCookie("email", result[0].email, 1);
    setCookie("token", result[0].token, 1);
    dispatch(checkLogin(true));
    navigate("/");
  };
  
  const onFinishFailed = (errorInfo) => {
    openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
  };

  return (
    <>
      <div className='login'>
        <div>
          {contextHolder}
        </div>
        <h1 className='login__title'>Login</h1>
        <div className='login__form'>
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[15, 10]}>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login;