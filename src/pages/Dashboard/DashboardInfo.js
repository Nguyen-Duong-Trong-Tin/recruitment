import React, { useEffect, useState } from "react";
import { Card, Col, Row } from 'antd';
import "./Dashboard.scss";
import { getJobsByIDCompany } from "../../services/jobsServices";
import { getCookie } from "../../helpers/cookies";
import { getCVsByIDCompany } from "../../services/CVsServices";
import { getCompanyByID } from "../../services/companiesServices";
import { countCvsRead, countJobsOn } from "../../helpers/count";

function DashboardInfo() {
  const [data, setData] = useState();
  const idCompany = getCookie("id");
  const quantityJobs = data && data.jobs.length;
  const quantityJobsOn = data && countJobsOn(data.jobs);
  const quantityCvs = data && data.cvs.length;
  const quantityCvsRead = data && countCvsRead(data.cvs);

  useEffect(() => {
    const fetchApi = async () => {
      const resultJobs = await getJobsByIDCompany(idCompany);
      const resultCVs = await getCVsByIDCompany(idCompany);
      const resultCompany = await getCompanyByID(idCompany);
      setData({
        jobs: resultJobs,
        cvs: resultCVs,
        company: resultCompany
      });
    }
    fetchApi();
  }, []);

  return (
    <>
      <div className="dashboard-info">
        <h2 className="dashboard-info__title">Infomation</h2>
        {data && (
          <>
            <Row gutter={[15, 10]}>
              <Col xl={6} lg={8} md={12} xs={24}>
                <Card
                  title="Jobs"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <p><b>Quantity jobs:</b> {quantityJobs}</p>
                  <p><b>On:</b> {quantityJobsOn}</p>
                  <p><b>Off</b>: {quantityJobs - quantityJobsOn}</p>
                </Card>
              </Col>
              <Col xl={6} lg={8} md={12} xs={24}>
                <Card
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  title="CVs"
                >
                  <p><b>Quantity cvs:</b> {quantityCvs}</p>
                  <p><b>Read:</b> {quantityCvsRead}</p>
                  <p><b>Unread:</b> {quantityCvs - quantityCvsRead}</p>
                </Card>
              </Col>
              <Col xl={6} lg={8} md={12} xs={24}>
                <Card
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  title="Company Infomation"
                >
                  <p><b>Company name:</b> {data.company.companyName}</p>
                  <p><b>Email:</b> {data.company.email}</p>
                  <p><b>Phone:</b> {data.company.phone}</p>
                  <p><b>Quantity people:</b> {data.company.quantityPeople}</p>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  )
}

export default DashboardInfo;