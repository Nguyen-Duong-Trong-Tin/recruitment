import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getJobs } from "../../services/jobsServices";
import { extractSearchCitiesParams, extractSearchTagsParams } from "../../helpers/handleParams";
import { Button, Card, Col, Row, Tag } from "antd";
import { getCompanies } from "../../services/companiesServices";

function JobsList() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const citiesParam = searchParams.get("cities_like") ? `cities_like=${searchParams.get("cities_like")}` : "";
  const tagsParam = searchParams.get("tags_like") ? `tags_like=${searchParams.get("tags_like")}` : "";

  const citiesArray = extractSearchCitiesParams(citiesParam);
  const tag = extractSearchTagsParams(tagsParam);

  useEffect(() => {
    const fetchApi = async () => {
      const resultJobs = await getJobs(`?${citiesParam}&${tagsParam}&status=true`);
      const resultCompanies = await getCompanies();
      setData(resultJobs.map(item => {
        const resultSearch = resultCompanies.find(itemCompany => itemCompany.id === item.idCompany);

        return resultSearch ? (
          {
            ...item,
            companyName: resultSearch.companyName
          }
        ) : (
          {
            ...item,
            companyName: "NOT FOUND THIS COMPANY",
            disabled: true
          }
        )
      }));
    }
    fetchApi();
  }, []);

  return (
    <>
      <div className="jobs-list">
        <h2 className="jobs-list__title">
          Result Search:
          {citiesArray.map((item, idx) => (
            <Tag key={idx} color="default">{item}</Tag>
          ))}

          {tag && <Tag color="default">{tag}</Tag>}
        </h2>
        <div>
          <Row gutter={[15, 10]}>
            {data.map(item => (
              <Col key={item.id} xl={6} lg={8} md={12} xs={24}>
                <Card
                  title={item.disabled ? (
                    <Button
                      style={{
                        cursor: "no-drop"
                      }}
                    >
                      {item.name}
                    </Button>
                  ) : (
                    <Link to={`${item.id}`}>{item.name}</Link>
                  )}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: `${item.disabled ? "#E9DDDB" : "#ffffff"}`,
                  }}

                >
                  <p>
                    Tags:
                    {item.tags.map(item => (
                      <Tag color="geekblue">{item}</Tag>
                    ))}
                  </p>
                  <p>
                    Cities:
                    {item.cities.map(item => (
                      <Tag color="gold">{item}</Tag>
                    ))}
                  </p>
                  <p>Salary: {item.salary}</p>
                  <p>Company: {item.companyName}</p>
                  <p>Create at: {item.createAt}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  )
}

export default JobsList;