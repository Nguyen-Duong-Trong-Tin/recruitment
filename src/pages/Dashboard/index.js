import "./Dashboard.scss";
import DashboardChart from "./DashboardChart";
import DashboardInfo from "./DashboardInfo";

function Dashboard() {

  return (
    <>
      <div className="dashboard">
        <h1 className="dashboard__title">Dashboard</h1>
        <DashboardChart />
        <DashboardInfo />
      </div>
    </>
  )
}

export default Dashboard;