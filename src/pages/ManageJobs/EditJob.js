import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Select, Switch } from 'antd';
import { getTags } from '../../services/tagsServices';
import { getCities } from '../../services/citiesServices';
import TextArea from 'antd/es/input/TextArea';
import { getTimeNow } from '../../helpers/handleTime';
import { editJob } from '../../services/jobsServices';
import { isEmptyObject } from '../../helpers/isEmptyObject';

function EditJob(props) {
  const { dataModal, setConfirmLoading, setOpen, handleReload } = props;
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

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

    onReset();
  }, [dataModal]);

  const fillOptions = (data) => {
    const result = data.map(item => (
      {
        label: item.value,
        value: item.value
      }
    ));
    return result;
  }

  const onFinish = async (values) => {
    setConfirmLoading(true);

    const options = {
      ...values,
      updateAt: getTimeNow()
    }

    const result = await editJob(dataModal.id, options);

    if (isEmptyObject(result)) {
      openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
    }
    else {
      openNotificationWithIcon("success", "Success", "Edited the job");

      setOpen(false);
      setConfirmLoading(false);
      handleReload();
    }
  };
  
  const onFinishFailed = () => {
    openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
  };

  return (
    <>
      <div>
        <div>{contextHolder}</div>
        <div>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              name: dataModal.name,
              tags: dataModal.tags,
              salary: dataModal.salary,
              cities: dataModal.cities,
              description: dataModal.description,
              status: dataModal.status
            }}
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
                  <TextArea rows={6} />
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
                    Update
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

export default EditJob;