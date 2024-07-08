import { useEffect, useState } from "react";
import { getTags } from "../../services/tagsServices";
import { Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";

function SearchTags() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTags();
      setData(result);
    }
    fetchApi();
  }, []);

  return (
    <>
      <div className="search-tags">
        <div>
          <Row gutter={[10, 5]}>
            <Col>
              <Link to={`/resultSearch`}>
                <Tag color="gold">All</Tag>
              </Link>
            </Col>
            {data.map(item => (
              <Col key={item.key}>
                <Link to={`/resultSearch?tags_like=${item.value}`}>
                  <Tag color="geekblue">{item.value}</Tag>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  )
}

export default SearchTags;