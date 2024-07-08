import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Select } from 'antd';
import { getCities } from '../../services/citiesServices';
import { useNavigate } from 'react-router-dom';
import { handleSearchCitiesParams } from '../../helpers/handleParams';

function SearchForm() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCities();
      setData(result);
    }
    fetchApi();
  }, []);

  const onFinish = (values) => {
    if (values.cities === undefined && values.keyword === undefined) return;

    let paramCities = "";

    if (values.cities) {
      if (values.cities.find(item => item === "All")) {
        values.cities = ["All"];
      }

      paramCities = handleSearchCitiesParams(values.cities);
    }

    let paramKeyword = "";

    if (values.keyword) {
      paramKeyword = `tags_like=${values.keyword}`;
    }

    navigate(`/resultSearch?${paramCities}&${paramKeyword}`);
  };
  const onFinishFailed = () => {
    openNotificationWithIcon("error", "Error", "Something is happening! Try later...");
  };

  const fillOptions = () => {
    const result = data.map(item => (
      {
        label: item.value,
        value: item.value
      }
    ));

    result.unshift(
      {
        label: "All",
        value: "All"
      }
    );

    return result;
  }

  return (
    <>
      <div className='search-form'>
        <div>
          {contextHolder}
        </div>
        <div>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[15, 10]}>
              <Col md={8} sm={10} xs={24}>
                <Form.Item
                  name="cities"
                >
                  <Select
                    mode="multiple"
                    placeholder="Select cities"
                    options={fillOptions()}
                  />
                </Form.Item>
              </Col>
              <Col md={8} sm={10} xs={24}>
                <Form.Item
                  name="keyword"
                >
                  <Input
                    placeholder="Input keyword"
                  />
                </Form.Item>
              </Col>
              <Col md={8} sm={4} xs={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Search</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SearchForm;