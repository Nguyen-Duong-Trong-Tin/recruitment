import { useEffect, useState } from "react";
import { getChartByIDCompany } from "../../services/chartsServices";
import { getCookie } from "../../helpers/cookies";
import { Line } from '@ant-design/plots';

function DashboardChart() {
  const [data, setData] = useState();
  const idCompany = getCookie("id");

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getChartByIDCompany(idCompany);
      setData(result[0]);
    }
    fetchApi();
  }, []);

  const config = {
    data: data ? data.dataChart : [],
    xField: "date",
    yField: "quantity",
    shapeField: "smooth",
    point: true,
    slider: {
      x: 1,
      y: 1
    }
  };

  return (
    <>
      <div className="dashboard-chart">
        <h2 className="dashboard-chart__title">Chart of CVs</h2>
        <Line {...config} />
      </div>
    </>
  )
}

export default DashboardChart;