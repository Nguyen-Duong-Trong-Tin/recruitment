import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Select, Switch } from 'antd';
import GoBack from "../../components/GoBack";
import { getTags } from '../../services/tagsServices';
import { getCities } from '../../services/citiesServices';
import TextArea from 'antd/es/input/TextArea';
import { getCookie } from '../../helpers/cookies';
import { getTimeNow } from '../../helpers/handleTime';
import { createJob } from '../../services/jobsServices';
import { isEmptyObject } from '../../helpers/isEmptyObject';

function CreateJob() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const [data, setData] = useState();
  const idCompany = getCookie("id");
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      const resultTags = await getTags();
      const resultCities = await getCities();
      setData(
        {
          tags: resultTags,
          cities: resultCities
        }
      );
    }
    fetchApi();
  }, []);

  const fillOptions = (data) => {
    const result = data.map(item => (
      {
        label: item.value,
        value: item.value
      }
    ));
    return result;
  }

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    const options = {
      ...values,
      idCompany: idCompany,
      createAt: getTimeNow()
    }

    const result = await createJob(options);

    if (isEmptyObject(result)) {
      openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
    }
    else {
      openNotificationWithIcon("success", "Success", "Created the job");
      onReset();
    }
  };
  
  const onFinishFailed = () => {
    openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
  };

  return (
    <>
      <div className='createJob'>
        <div>{contextHolder}</div>
        <div>
          <GoBack />
        </div>
        <h1 className='createJob__title'>Create New Job</h1>
        <div>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[15, 10]}>
              <Col span={24}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your job name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col md={16} xs={24}>
                <Form.Item
                  label="Tags"
                  name="tags"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your tags!',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select tags"
                    options={data && fillOptions(data.tags)}
                  />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item
                  label="Salary"
                  name="salary"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your salary!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Cities"
                  name="cities"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your cities!',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select tags"
                    options={data && fillOptions(data.cities)}
                  />
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
                <Form.Item
                  label="Status"
                  name="status"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Create
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div >
    </>
  )
}

export default CreateJob;