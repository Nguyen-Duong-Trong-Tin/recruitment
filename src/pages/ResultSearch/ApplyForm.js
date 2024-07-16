import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getCities } from '../../services/citiesServices';
import { createCV } from '../../services/CVsServices';
import { isEmptyObject } from '../../helpers/isEmptyObject';
import { useParams } from 'react-router-dom';
import { getJobByID } from '../../services/jobsServices';
import { getMonthNow, getTimeNow, getYearNow } from '../../helpers/handleTime';
import { createChart, editChart, getChartByIDCompany } from '../../services/chartsServices';
import { updateChart } from '../../helpers/handleChart';

function ApplyForm() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const idJob = useParams().id;

  useEffect(() => {
    const fetchApi = async () => {
      const resultCities = await getCities();
      const resultJob = await getJobByID(idJob);
      setData(
        {
          cities: resultCities,
          job: resultJob
        }
      );
    }
    fetchApi();
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const fillOptions = () => {
    const result = data && data.cities.map(item => (
      {
        label: item.value,
        value: item.value
      }
    ));
    return result;
  }

  const onFinish = async (values) => {
    const idCompany = data && data.job.idCompany;
    const options = {
      ...values,
      idJob: data && data.job.id,
      idCompany: idCompany,
      sent: getTimeNow(),
      statusRead: false
    };

    const resultCreateCV = await createCV(options);

    // UpdateChart
    const resultGetChartByIDCompany = await getChartByIDCompany(idCompany);

    if (resultGetChartByIDCompany.length > 0) {
      const idChart = resultGetChartByIDCompany[0].id;
      updateChart(resultGetChartByIDCompany[0].dataChart);
      await editChart(idChart, {
        dataChart: resultGetChartByIDCompany[0].dataChart
      });
    } else {
      await createChart({
        dataChart: [
          {
            date: `${getMonthNow()}-${getYearNow()}`,
            quantity: 1
          }
        ],
        idCompany: idCompany
      });
    }
    // End UpdateChart

    if (isEmptyObject(resultCreateCV)) {
      openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
    } else {
      openNotificationWithIcon("success", "Success", "We sent your information to employer");
      onReset();
    }
  };
  const onFinishFailed = () => {
    openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
  };

  return (
    <>
      <div className='apply-form'>
        <div>{contextHolder}</div>
        <h1 className='apply-form__title'>Apply Form</h1>
        <div>
          <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[20, 30]}>
              <Col lg={6} sm={12} xs={24}>
                <Form.Item
                  label="Full name"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your full name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={6} sm={12} xs={24}>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={6} sm={12} xs={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={6} sm={12} xs={24}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your city!',
                    },
                  ]}
                >
                  <Select
                    placeholder="Select city"
                    options={fillOptions()}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your description!',
                    },
                  ]}
                >
                  <TextArea rows={8} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Link project"
                  name="linkProject"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your description!',
                    },
                  ]}
                >
                  <TextArea rows={8} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
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

export default ApplyForm;