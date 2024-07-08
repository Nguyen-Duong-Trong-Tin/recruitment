import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { editCV, getCVs } from "../../services/CVsServices";
import { getJobs } from "../../services/jobsServices";

function CVDetail() {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const resultCV = await getCVs(params.id);
      const resultJob = await getJobs(resultCV.idJob);
      setData(
        {
          ...resultCV,
          name: resultJob.name
        }
      );

      const resultEditCV = await editCV(params.id, {
        statusRead: true
      });
    }
    fetchApi();
  }, []);

  return (
    <>
      <div className="cv-detail">
        <div>
          <GoBack />
        </div>
        <div>
          {data && (
            <>
              <h1 className="cv-detail__title">{data.name}</h1>
              <p><b>Full name:</b> {data.fullName}</p>
              <p><b>Phone:</b> {data.phone}</p>
              <p><b>City:</b> {data.city}</p>
              <p><b>Description:</b> {data.description}</p>
              <p><b>Link project:</b> {data.linkProject}</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CVDetail;