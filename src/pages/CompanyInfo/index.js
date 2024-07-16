import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { editCompany, getCompanyByID } from '../../services/companiesServices';
import { getCookie } from '../../helpers/cookies';
import { isEmptyObject } from '../../helpers/isEmptyObject';
import "./CompanyInfo.scss";

function CompanyInfo() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [data, setData] = useState();
  const idCompany = getCookie("id");

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCompanyByID(idCompany);
      setData(result);
    }
    fetchApi();
  }, []);

  const fillData = () => {
    return data && (
      {
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        quantityPeople: data.quantityPeople,
        workingTime: data.workingTime,
        website: data.website,
        description: data.description,
      }
    )
  }

  const onReset = () => {
    form.resetFields();
  };
  
  const onFinish = async (values) => {
    const options = { ...values };
    const result = await editCompany(data.id, options);

    if (isEmptyObject(result)) {
      openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
    } else {
      openNotificationWithIcon("success", "Success", "Updated your information");
      setComponentDisabled(true);
    }
  };

  const onFinishFailed = () => {
    openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
  };

  return (
    <>
      <div className='companyInfo'>
        <div>{contextHolder}</div>
        <div>
          <h1 className='companyInfo__title'>Company Information</h1>
          <div className='companyInfo__inner-button'>
            <Button type={componentDisabled && "primary"} onClick={() => {
              onReset();
              setComponentDisabled(!componentDisabled);
            }}>
              {componentDisabled ? "Edit" : "Cancel"}
            </Button>
          </div>
        </div>
        <div>
          {data && (
            <Form
              layout="vertical"
              form={form}
              disabled={componentDisabled}
              initialValues={fillData()}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={[15, 10]}>
                <Col span={24}>
                  <Form.Item

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
                <Col md={8} xs={24}>
                  <Form.Item

                    label="Email"
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item

                    label="Phone"
                    name="phone"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item

                    label="Address"
                    name="address"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item

                    label="Quantity people"
                    name="quantityPeople"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item

                    label="Working time"
                    name="workingTime"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item
                    label="Website"
                    name="website"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                  >
                    <TextArea rows={8} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{
                      marginRight: '20px'
                    }}>
                      Update
                    </Button>
                    <Button htmlType="button" onClick={() => {
                      onReset();
                      setComponentDisabled(true);
                    }}>
                      Reset
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </div>
      </div>

    </>
  )
}

export default CompanyInfo;