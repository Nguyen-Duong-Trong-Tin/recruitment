import GoBack from "../../components/GoBack";
import JobsList from "./JobsList";
import CompanyInfo from "./CompanyInfo";
import "./CompanyDetail.scss";

function CompanyDetail() {

  return (
    <>
      <GoBack />
      <CompanyInfo />
      <JobsList />
    </>
  )
}

export default CompanyDetail;