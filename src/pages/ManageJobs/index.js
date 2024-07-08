import { Outlet } from "react-router-dom";
import "./ManageJobs.scss";

function ManageJobs() {

  return (
    <>
      <div className="manage-jobs">
        <Outlet />
      </div>
    </>
  )
}

export default ManageJobs;