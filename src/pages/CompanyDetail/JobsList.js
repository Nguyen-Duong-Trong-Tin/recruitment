import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobsByIDCompany } from "../../services/jobsServices";
import { Button, Card, Col, Row, Tag } from "antd";
import { getCompanyByID } from "../../services/companiesServices";

function JobsList() {
  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const resultJobs = await getJobsByIDCompany(params.id);
      const resultCompany = await getCompanyByID(params.id);
      setData(resultJobs.map(item => (
        {
          ...item,
          companyName: resultCompany.companyName
        }
      )));
    }
    fetchApi();
  }, []);

  return (
    <>
      <div className="job-list">
        <h2 className="job-list__title">List Of Jobs</h2>
        <div>
          <Row gutter={[15, 10]}>
            {data.map(item => (
              <Col key={item.id} xl={6} lg={8} md={12} xs={24}>
                <Card
                  title={item.disabled ? (
                    <Button
                      style={{
                        cursor: "no-drop"
                      }}
                    >
                      {item.name}
                    </Button>
                  ) : (
                    <Link to={`/resultSearch/${item.id}`}>{item.name}</Link>
                  )}
                  style={{
                    backgroundColor: `${item.disabled ? "#E9DDDB" : "#ffffff"}`,
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <p>
                    <b>Tags: </b>
                    {item.tags.map(item => (
                      <Tag color="geekblue">{item}</Tag>
                    ))}
                  </p>
                  <p>
                    <b>Cities: </b>
                    {item.cities.map(item => (
                      <Tag color="gold">{item}</Tag>
                    ))}
                  </p>
                  <p><b>Salary:</b> {item.salary}$</p>
                  <p><b>Company:</b> {item.companyName}</p>
                  <p><b>Create at:</b> {item.createAt}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  )
}

export default JobsList;