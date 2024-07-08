import { useEffect, useState } from "react"
import { getCompanies } from "../../services/companiesServices";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

function CompaniesList() {
  const [data, setData] = useState([]);
  const [watchAll, setWatchAll] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCompanies();
      setData(watchAll ? result : result.slice(0, 2));
    }
    fetchApi();
  }, [watchAll]);

  return (
    <>
      <div className="list-companies">
        <h2 className="list-companies__title">List Of Companies</h2>
        <div>
          <div>
            <Row gutter={[15, 10]}>
              {data.map(item => (
                <Col key={item.id} xl={6} lg={8} md={12} xs={24}>
                  <Card
                    title={
                      <Link to={`/companyDetail/${item.id}`}>
                        {item.companyName}
                      </Link>
                    }
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <p><b>Quantity people:</b> {item.quantityPeople}</p>
                    <p className="list-companies__desc"><b>Address:</b> {item.address}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <div className="list-companies__inner-button">
            <Button onClick={() => setWatchAll(!watchAll)}>
              {watchAll ? "Collapse" : "Watch All"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompaniesList;