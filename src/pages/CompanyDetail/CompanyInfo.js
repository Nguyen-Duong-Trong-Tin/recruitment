import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyByID } from "../../services/companiesServices";

function CompanyInfo() {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCompanyByID(params.id);
      setData(result);
    }
    fetchApi();
  }, []);

  return (
    <>
      <div className="company">
        {data && (
          <>
            <h1 className="company__title">{data.companyName}</h1>
            <p><b>Address:</b> {data.address}</p>
            <p><b>Quantity people:</b> {data.quantityPeople}</p>
            <p><b>Working time:</b> {data.workingTime}</p>
            <p><b>Link website:</b> {data.website}</p>
            <p className="company__desc"><b>Description:</b> {data.description}</p>
          </>
        )}
      </div>
    </>
  )
}

export default CompanyInfo;