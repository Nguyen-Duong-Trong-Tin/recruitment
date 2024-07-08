import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobs } from "../../services/jobsServices";
import { Button, Tag } from "antd";
import { getCompanies } from "../../services/companiesServices";

function JobInfo({ onApplyClick }) {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const resultJob = await getJobs(params.id);
      const resultCompany = await getCompanies(resultJob.idCompany);
      setData(
        {
          ...resultJob,
          address: resultCompany.address
        }
      );
    }
    fetchApi();
  }, []);

  return (
    <>
      <div className="job-info">
        {data && (
          <>
            <h1 className="job-info__title">{data.name}</h1>
            <div>
              <Button type="primary" onClick={onApplyClick}>Apply Now</Button>
            </div>
            <p>
              <b>Tags: </b>
              {data.tags.map(item => (
                <Tag color="geekblue">{item}</Tag>
              ))}
            </p>
            <p>
              <b>Cities: </b>
              {data.cities.map(item => (
                <Tag color="gold">{item}</Tag>
              ))}
            </p>
            <p><b>Salary:</b> {data.salary}</p>
            <p><b>Address:</b> {data.address}</p>
            <p><b>Create at:</b> {data.createAt}</p>
            <p><b>Job description:</b> {data.description}</p>
          </>
        )}
      </div>
    </>
  )
}

export default JobInfo;