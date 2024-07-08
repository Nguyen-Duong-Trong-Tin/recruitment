import { useRef } from "react";
import GoBack from "../../components/GoBack";
import ApplyForm from "./ApplyForm";
import JobInfo from "./JobInfo";

function JobDetail() {
  const applyFormRef = useRef(null);

  const handleApplyClick = () => {
    if (applyFormRef.current) {
      applyFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <GoBack />

      <JobInfo onApplyClick={handleApplyClick} />

      <div ref={applyFormRef}>
        <ApplyForm />
      </div>
    </>
  )
}

export default JobDetail;